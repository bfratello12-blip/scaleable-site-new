/**
 * Analytics plumbing.
 *
 * No vendor IDs are hard-coded. Add GA4 / Google Ads / Meta / Reddit by setting the
 * relevant NEXT_PUBLIC_* env vars and wiring the loader in `components/analytics/Analytics.tsx`.
 *
 * Every meaningful CTA in the UI carries `data-analytics-id` (stable event name) and
 * `data-analytics-location` (where on the site it was clicked), so a tag manager or a
 * single delegated listener can capture conversions without touching component code.
 */

export const ANALYTICS_EVENTS = {
  bookCall: "book_call_click",
  leadFormView: "lead_form_view",
  leadFormSubmit: "lead_form_submit",
  leadFormSuccess: "lead_generated",
  pricingCta: "pricing_cta_click",
  shopifyInstall: "shopify_install_click",
  contactCta: "contact_cta_click",
  navCta: "nav_cta_click",
  caseStudyOpen: "case_study_open",
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type TrackedProps = {
  "data-analytics-id": AnalyticsEvent;
  "data-analytics-location": string;
};

/** Spread onto any interactive element to make it trackable. */
export function tracked(event: AnalyticsEvent, location: string): TrackedProps {
  return {
    "data-analytics-id": event,
    "data-analytics-location": location,
  };
}

type DataLayerWindow = Window & {
  dataLayer?: unknown[];
};

/** Pushes an event to the dataLayer when one exists. Safe no-op otherwise. */
export function pushEvent(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  if (!Array.isArray(w.dataLayer)) return;
  w.dataLayer.push({ event, ...payload });
}
