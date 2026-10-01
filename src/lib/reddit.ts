/**
 * Reddit pixel event helpers (browser-safe).
 *
 * Each tracked action fires twice: once through the pixel, and once as a server
 * copy forwarded to /api/reddit-event, which relays it to the Conversions API.
 * Both copies share one conversion_id so Reddit deduplicates them.
 *
 * No secrets here. The CAPI access token lives only in lib/reddit-capi.ts.
 */

type RedditWindow = Window & {
  rdt?: (...args: unknown[]) => void;
  /** Conversion ID of the inline PageVisit, handed over to the bundle once. */
  __rdtPageVisitId?: string;
};

export const REDDIT_PIXEL_ID =
  process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID?.trim() || "a2_jgph7mt5j91x";

export const REDDIT_CUSTOM_EVENTS = {
  bookCallClick: "BookCallClick",
  shopifyInstallClick: "ShopifyInstallClick",
} as const;

export type RedditCustomEvent =
  (typeof REDDIT_CUSTOM_EVENTS)[keyof typeof REDDIT_CUSTOM_EVENTS];

/** Events the browser may forward. LEAD is server-authored only. */
export type ForwardableTrackingType = "PAGE_VISIT" | "CUSTOM";

const FORWARD_ENDPOINT = "/api/reddit-event";
const CLICK_ID_PARAM = "rdt_cid";
const CLICK_ID_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

export function isValidConversionId(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9._:-]{8,64}$/.test(value);
}

export function isValidClickId(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9._-]{1,200}$/.test(value);
}

/** Server-side fallback: the persisted cookie rides along with same-origin requests. */
export function clickIdFromCookieHeader(header: string | null): string | null {
  if (!header) return null;
  const match = header.match(/(?:^|;\s*)rdt_cid=([^;]*)/);
  if (!match) return null;
  try {
    const value = decodeURIComponent(match[1]);
    return isValidClickId(value) ? value : null;
  } catch {
    return null;
  }
}

/** Validated server-side before it is forwarded; omitted entirely when implausible. */export function parseScreenDimensions(width: unknown, height: unknown) {
  if (typeof width !== "number" || typeof height !== "number") return undefined;
  if (!Number.isFinite(width) || !Number.isFinite(height)) return undefined;

  const w = Math.round(width);
  const h = Math.round(height);
  if (w <= 0 || h <= 0 || w > 20000 || h > 20000) return undefined;

  return { width: w, height: h };
}

/** screen.width/height at the moment the event occurs. */
export function readScreenDimensions() {
  if (typeof window === "undefined" || !window.screen) return {};
  const { width, height } = window.screen;
  return typeof width === "number" && typeof height === "number"
    ? { screenWidth: width, screenHeight: height }
    : {};
}

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

/**
 * Reddit appends rdt_cid to ad landing pages. Persisted to a cookie and to
 * localStorage per Reddit's click-ID persistence guidance, so it survives
 * refreshes and later navigations.
 */
export function readRedditClickId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const fromUrl = new URLSearchParams(window.location.search).get(CLICK_ID_PARAM);
    if (isValidClickId(fromUrl)) {
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${CLICK_ID_PARAM}=${encodeURIComponent(fromUrl)}; path=/; max-age=${CLICK_ID_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
      try {
        window.localStorage.setItem(CLICK_ID_PARAM, fromUrl);
      } catch {
        // Storage blocked — the cookie still applies.
      }
      return fromUrl;
    }

    const cookieMatch = document.cookie.match(/(?:^|;\s*)rdt_cid=([^;]*)/);
    if (cookieMatch) {
      const value = decodeURIComponent(cookieMatch[1]);
      if (isValidClickId(value)) return value;
    }

    const stored = window.localStorage.getItem(CLICK_ID_PARAM);
    if (isValidClickId(stored)) return stored;
  } catch {
    // Any storage or parse failure just means no click ID is available.
  }

  return null;
}

/** Best-effort by design: a blocked or missing pixel must never break forms or navigation. */
function sendToPixel(...args: unknown[]) {
  if (typeof window === "undefined") return;
  try {
    (window as RedditWindow).rdt?.(...args);
  } catch {
    // Pixel blocked, failed to load, or threw — tracking stays silent.
  }
}

/**
 * Deliberately independent of window.rdt: a blocked pixel must not disable the
 * server copy. sendBeacon goes first so outbound clicks survive the unload.
 */
function forwardToServer(payload: {
  trackingType: ForwardableTrackingType;
  conversionId: string;
  customEventName?: RedditCustomEvent;
}) {
  if (typeof window === "undefined") return;

  try {
    const body = JSON.stringify({
      ...payload,
      eventAt: Date.now(),
      eventSourceUrl: window.location.href,
      clickId: readRedditClickId() ?? undefined,
      ...readScreenDimensions(),
    });

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(FORWARD_ENDPOINT, blob)) return;
    }

    void fetch(FORWARD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      credentials: "same-origin",
    }).catch(() => {
      // Forwarding is best-effort.
    });
  } catch {
    // Never let tracking surface to the user.
  }
}

export function trackRedditPageVisit(conversionId: string = newConversionId()) {
  sendToPixel("track", "PageVisit", { conversionId });
  forwardToServer({ trackingType: "PAGE_VISIT", conversionId });
  return conversionId;
}

export function trackRedditCustom(
  customEventName: RedditCustomEvent,
  conversionId: string = newConversionId(),
) {
  sendToPixel("track", "Custom", { customEventName, conversionId });
  forwardToServer({ trackingType: "CUSTOM", customEventName, conversionId });
  return conversionId;
}

/**
 * Pixel copy only. The server copy is sent by /api/lead once the lead itself
 * succeeds, reusing this same conversion ID.
 */
export function trackRedditLead(conversionId: string = newConversionId()) {
  sendToPixel("track", "Lead", { conversionId });
  return conversionId;
}

/** Server copy for the initial PageVisit, whose pixel event already fired inline. */
export function forwardInitialPageVisit() {
  if (typeof window === "undefined") return;

  const w = window as RedditWindow;
  const conversionId = w.__rdtPageVisitId;
  // Consumed so a Strict Mode remount cannot forward the same event twice.
  delete w.__rdtPageVisitId;

  if (!isValidConversionId(conversionId)) return;
  forwardToServer({ trackingType: "PAGE_VISIT", conversionId });
}
