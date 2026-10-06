import { isLandingRoute } from "@/lib/site";

export const AD_SPEND_BANDS = [
  "Under $10k / month",
  "$10k – $25k / month",
  "$25k – $50k / month",
  "$50k – $100k / month",
  "$100k – $250k / month",
  "$250k+ / month",
  "Not advertising yet",
] as const;

export const CHANNEL_OPTIONS = ["Google Ads", "Meta Ads", "Other channels", "Nothing yet"] as const;

export type LeadPayload = {
  name: string;
  email: string;
  store: string;
  adSpend: string;
  channels: string[];
  message: string;
  sourcePath: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type ValidationResult =
  | { ok: true; data: LeadPayload }
  | { ok: false; errors: Record<string, string> };

const MAX = { name: 120, email: 160, store: 200, message: 4000, sourcePath: 200 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validateLead(input: unknown): ValidationResult {
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = str(raw.name, MAX.name);
  const email = str(raw.email, MAX.email);
  const store = str(raw.store, MAX.store);
  const adSpend = str(raw.adSpend, 64);
  const message = str(raw.message, MAX.message);
  const sourcePath = str(raw.sourcePath, MAX.sourcePath) || "/";
  const website = str(raw.website, 200);

  const channels = Array.isArray(raw.channels)
    ? raw.channels
        .filter((c): c is string => typeof c === "string")
        .map((c) => c.trim())
        .filter((c) => (CHANNEL_OPTIONS as readonly string[]).includes(c))
        .slice(0, CHANNEL_OPTIONS.length)
    : [];

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (store.length < 3) errors.store = "Please enter your store or Shopify URL.";
  if (!(AD_SPEND_BANDS as readonly string[]).includes(adSpend)) {
    errors.adSpend = "Please select your current monthly ad spend.";
  }
  // Landing routes trade the message for a lower-friction submit; everywhere
  // else it is the field that makes the first reply useful.
  if (!isLandingRoute(sourcePath) && message.length < 10) {
    errors.message = "A sentence or two is enough — tell us what you need.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: { name, email, store, adSpend, channels, message, sourcePath, website },
  };
}

/** Escapes values before they are interpolated into the notification email. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
