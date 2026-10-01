/**
 * Reddit pixel event helpers.
 *
 * The base pixel is initialised once in components/analytics/Analytics.tsx.
 * Nothing here initialises the pixel or sends personal data — standard and
 * custom events only, with no payload beyond the custom event name.
 */

type RedditWindow = Window & { rdt?: (...args: unknown[]) => void };

export const REDDIT_CUSTOM_EVENTS = {
  bookCallClick: "BookCallClick",
  shopifyInstallClick: "ShopifyInstallClick",
} as const;

export type RedditCustomEvent =
  (typeof REDDIT_CUSTOM_EVENTS)[keyof typeof REDDIT_CUSTOM_EVENTS];

/** Best-effort by design: a blocked or missing pixel must never break forms or navigation. */
function send(...args: unknown[]) {
  if (typeof window === "undefined") return;
  try {
    (window as RedditWindow).rdt?.(...args);
  } catch {
    // Pixel blocked, failed to load, or threw — tracking stays silent.
  }
}

export function trackRedditPageVisit() {
  send("track", "PageVisit");
}

/** Fire only once the lead endpoint has confirmed success. */
export function trackRedditLead() {
  send("track", "Lead");
}

export function trackRedditCustom(customEventName: RedditCustomEvent) {
  send("track", "Custom", { customEventName });
}
