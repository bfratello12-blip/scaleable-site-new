import { after, NextResponse } from "next/server";
import { clientIpFromHeaders, createRateLimiter } from "@/lib/rate-limit";
import { sendRedditCapiEvent } from "@/lib/reddit-capi";
import { clickIdFromCookieHeader, isValidClickId, isValidConversionId, parseScreenDimensions, REDDIT_CUSTOM_EVENTS } from "@/lib/reddit";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Relays a narrow allowlist of browser events to the Reddit Conversions API.
 * Deliberately not a general proxy: LEAD is excluded here because it may only
 * be authored by /api/lead after the lead actually succeeds.
 */

const MAX_BODY_BYTES = 2048;
const ALLOWED_CUSTOM_EVENTS = new Set<string>(Object.values(REDDIT_CUSTOM_EVENTS));
const MAX_EVENT_AGE_MS = 2 * 24 * 60 * 60 * 1000; // Reddit's deduplication window.
const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;
const MAX_URL_LENGTH = 1000;

const rateLimited = createRateLimiter({ windowMs: 60_000, max: 60 });

function allowedHosts(request: Request) {
  const hosts = new Set<string>();
  const forwarded = request.headers.get("x-forwarded-host");
  const host = request.headers.get("host");
  if (forwarded) hosts.add(forwarded.toLowerCase());
  if (host) hosts.add(host.toLowerCase());
  try {
    hosts.add(new URL(siteConfig.url).host.toLowerCase());
  } catch {
    // siteConfig.url misconfigured — header hosts still apply.
  }
  return hosts;
}

function isSameOrigin(request: Request) {
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite && secFetchSite !== "same-origin") return false;

  const origin = request.headers.get("origin");
  if (!origin) return secFetchSite === "same-origin";

  try {
    return allowedHosts(request).has(new URL(origin).host.toLowerCase());
  } catch {
    return false;
  }
}

function validEventSourceUrl(value: unknown, request: Request) {
  if (typeof value !== "string" || value.length === 0 || value.length > MAX_URL_LENGTH) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!allowedHosts(request).has(url.host.toLowerCase())) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return new NextResponse(null, { status: 403 });
  }

  const ip = clientIpFromHeaders(request);
  if (rateLimited(ip ?? "unknown")) {
    return new NextResponse(null, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  const trackingType = body.trackingType;
  if (trackingType !== "PAGE_VISIT" && trackingType !== "CUSTOM") {
    return NextResponse.json({ ok: false, code: "unsupported_event" }, { status: 422 });
  }

  let customEventName: string | undefined;
  if (trackingType === "CUSTOM") {
    if (typeof body.customEventName !== "string" || !ALLOWED_CUSTOM_EVENTS.has(body.customEventName)) {
      return NextResponse.json({ ok: false, code: "unsupported_event" }, { status: 422 });
    }
    customEventName = body.customEventName;
  } else if (body.customEventName !== undefined) {
    return NextResponse.json({ ok: false, code: "unsupported_event" }, { status: 422 });
  }

  if (!isValidConversionId(body.conversionId)) {
    return NextResponse.json({ ok: false, code: "invalid_conversion_id" }, { status: 422 });
  }

  const eventSourceUrl = validEventSourceUrl(body.eventSourceUrl, request);
  if (!eventSourceUrl) {
    return NextResponse.json({ ok: false, code: "invalid_source_url" }, { status: 422 });
  }

  const now = Date.now();
  const claimed = body.eventAt;
  const eventAt =
    typeof claimed === "number" &&
    Number.isFinite(claimed) &&
    claimed <= now + MAX_CLOCK_SKEW_MS &&
    claimed >= now - MAX_EVENT_AGE_MS
      ? Math.round(claimed)
      : now;

  const clickId = isValidClickId(body.clickId)
    ? body.clickId
    : clickIdFromCookieHeader(request.headers.get("cookie"));
  const screenDimensions = parseScreenDimensions(body.screenWidth, body.screenHeight);

  after(async () => {
    await sendRedditCapiEvent({
      trackingType,
      customEventName,
      conversionId: body.conversionId as string,
      eventAt,
      eventSourceUrl,
      clickId,
      userAgent: request.headers.get("user-agent"),
      ipAddress: ip,
      screenDimensions,
    });
  });

  // Accepted for forwarding — not a claim that Reddit accepted it.
  return new NextResponse(null, { status: 202 });
}
