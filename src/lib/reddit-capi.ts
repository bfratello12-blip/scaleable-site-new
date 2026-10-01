/**
 * Reddit Conversions API v3 client. SERVER ONLY.
 *
 * REDDIT_CAPI_ACCESS_TOKEN must never reach the browser: it has no
 * NEXT_PUBLIC_ prefix, this module is imported only by route handlers, and the
 * guard below fails loudly if that ever changes. Neither the token nor Reddit's
 * response body is ever logged.
 *
 * Schema: https://ads-api.reddit.com/docs/v3/api/post-conversion-events
 */

import { createHash } from "node:crypto";
import { REDDIT_PIXEL_ID } from "@/lib/reddit";

if (typeof window !== "undefined") {
  throw new Error("lib/reddit-capi.ts is server-only and must not be imported by client code.");
}

const ENDPOINT =
  process.env.REDDIT_CAPI_ENDPOINT?.trim() ||
  `https://ads-api.reddit.com/api/v3/pixels/${REDDIT_PIXEL_ID}/conversion_events`;
const REQUEST_TIMEOUT_MS = 4000;

export type CapiTrackingType = "PAGE_VISIT" | "LEAD" | "CUSTOM";

export type CapiEvent = {
  trackingType: CapiTrackingType;
  /** Required when trackingType is CUSTOM. Must match the pixel event name exactly. */
  customEventName?: string;
  /** Shared with the pixel copy of the same action — this is what deduplicates them. */
  conversionId: string;
  /** Unix milliseconds. Retries must reuse the original value. */
  eventAt: number;
  eventSourceUrl: string;
  clickId?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  screenDimensions?: { width: number; height: number };
  /** Already normalized and SHA-256 hashed by hashRedditEmail. Lead events only. */
  hashedEmail?: string | null;
};

/**
 * Reddit's documented canonicalization, applied before SHA-256:
 * lowercase, drop any +alias, strip non-alphanumerics from the username, then
 * hash to 64 lowercase hex characters.
 * https://business.reddithelp.com/s/article/advanced-matching-for-developers
 */
export function hashRedditEmail(email: string): string | null {
  const lowered = email.trim().toLowerCase();
  const at = lowered.lastIndexOf("@");
  if (at <= 0 || at === lowered.length - 1) return null;

  const domain = lowered.slice(at + 1);
  if (!domain.includes(".")) return null;

  let username = lowered.slice(0, at);
  const alias = username.indexOf("+");
  if (alias !== -1) username = username.slice(0, alias);
  username = username.replace(/[^a-z0-9]/g, "");
  if (!username) return null;

  return createHash("sha256").update(`${username}@${domain}`).digest("hex");
}

export type CapiDeliveryResult =
  | { delivered: true; status: number }
  | { delivered: false; reason: "token_missing" | "rejected" | "timeout" | "network_error"; status?: number };

function describe(event: CapiEvent) {
  return event.customEventName
    ? `${event.trackingType}/${event.customEventName}`
    : event.trackingType;
}

export async function sendRedditCapiEvent(event: CapiEvent): Promise<CapiDeliveryResult> {
  const token = process.env.REDDIT_CAPI_ACCESS_TOKEN?.trim();
  if (!token) {
    console.warn("[reddit-capi] REDDIT_CAPI_ACCESS_TOKEN is not set — event not forwarded.");
    return { delivered: false, reason: "token_missing" };
  }

  // Optional match keys are omitted entirely rather than sent empty.
  const user: Record<string, unknown> = {};
  if (event.userAgent) user.user_agent = event.userAgent;
  if (event.ipAddress) user.ip_address = event.ipAddress;
  if (event.screenDimensions) user.screen_dimensions = event.screenDimensions;
  if (event.hashedEmail) user.email = event.hashedEmail;

  const payload = {
    data: {
      events: [
        {
          event_at: event.eventAt,
          action_source: "WEBSITE",
          event_source_url: event.eventSourceUrl,
          type: {
            tracking_type: event.trackingType,
            ...(event.customEventName ? { custom_event_name: event.customEventName } : {}),
          },
          metadata: { conversion_id: event.conversionId },
          ...(event.clickId ? { click_id: event.clickId } : {}),
          ...(Object.keys(user).length > 0 ? { user } : {}),
        },
      ],
    },
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) {
      // Status only — the response body can echo submitted data.
      console.warn(`[reddit-capi] rejected ${describe(event)}: status=${response.status}`);
      return { delivered: false, reason: "rejected", status: response.status };
    }

    return { delivered: true, status: response.status };
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    const reason = timedOut ? "timeout" : "network_error";
    console.warn(`[reddit-capi] delivery failed for ${describe(event)}: ${reason}`);
    return { delivered: false, reason };
  }
}
