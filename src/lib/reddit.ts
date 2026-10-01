/**
 * Reddit pixel event helpers.
 *
 * The base pixel is initialised once in components/analytics/Analytics.tsx.
 * Nothing here initialises the pixel or sends personal data — events carry only
 * a custom event name and a random conversionId.
 *
 * Every tracker accepts an optional conversionId so a future server-side event
 * can be sent with the same ID as its browser counterpart, and returns the ID
 * it used.
 */

type RedditWindow = Window & { rdt?: (...args: unknown[]) => void };

export const REDDIT_CUSTOM_EVENTS = {
  bookCallClick: "BookCallClick",
  shopifyInstallClick: "ShopifyInstallClick",
} as const;

export type RedditCustomEvent =
  (typeof REDDIT_CUSTOM_EVENTS)[keyof typeof REDDIT_CUSTOM_EVENTS];

/**
 * Random only — never derived from user input, so it carries no personal data.
 * randomUUID needs a secure context, hence the getRandomValues fallback.
 */
export function newConversionId(): string {
  try {
    if (typeof crypto !== "undefined") {
      if (typeof crypto.randomUUID === "function") return crypto.randomUUID();

      if (typeof crypto.getRandomValues === "function") {
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
      }
    }
  } catch {
    // Fall through to the non-crypto path below.
  }
  return `rdt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Best-effort by design: a blocked or missing pixel must never break forms or navigation. */
function send(...args: unknown[]) {
  if (typeof window === "undefined") return;
  try {
    (window as RedditWindow).rdt?.(...args);
  } catch {
    // Pixel blocked, failed to load, or threw — tracking stays silent.
  }
}

export function trackRedditPageVisit(conversionId: string = newConversionId()) {
  send("track", "PageVisit", { conversionId });
  return conversionId;
}

/** Fire only once the lead endpoint has confirmed success. */
export function trackRedditLead(conversionId: string = newConversionId()) {
  send("track", "Lead", { conversionId });
  return conversionId;
}

export function trackRedditCustom(
  customEventName: RedditCustomEvent,
  conversionId: string = newConversionId(),
) {
  send("track", "Custom", { customEventName, conversionId });
  return conversionId;
}
