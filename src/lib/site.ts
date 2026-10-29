/**
 * Single source of truth for everything that is likely to change:
 * contact details, pricing, external URLs, navigation and social links.
 */

import {
  AGENCY_FEE_CAP,
  AGENCY_FEE_CAP_LABEL,
  AGENCY_FEE_CURRENCY,
  AGENCY_FEE_RATE,
  AGENCY_FEE_RATE_LABEL,
} from "@/lib/pricing";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/**
 * The live origin. Falls back to the production domain rather than a
 * placeholder so canonicals, the sitemap, robots and the Reddit CAPI
 * `event_source_url` stay correct even if the env var is missing.
 */
const DEFAULT_SITE_URL = "https://www.scaleableapp.com";

export const siteConfig = {
  name: "ScaleAble",
  shortName: "ScaleAble",
  url: rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl.replace(/\/$/, "") : DEFAULT_SITE_URL,
  tagline: "Performance-based paid media for Shopify brands.",
  description:
    "ScaleAble is a performance-based marketing agency for Shopify brands. We manage Google Ads and Meta Ads for 20% of monthly eligible profit after ad spend and agreed costs, capped at $3,000 a month. No retainer, no setup fee.",
  contactEmail: "hello@scaleableapp.com",
  softwareSiteUrl: "https://scaleableapp.com",
  shopifyAppUrl: "https://apps.shopify.com/scaleable",
  founder: "Brian Fratello",
} as const;

/**
 * Performance-based agency fee. Numbers come from `lib/pricing` so the rate and
 * the cap can never drift between pages.
 */
export const managedService = {
  name: "ScaleAble Managed Growth",
  currency: AGENCY_FEE_CURRENCY,
  rate: AGENCY_FEE_RATE,
  rateLabel: AGENCY_FEE_RATE_LABEL,
  cap: AGENCY_FEE_CAP,
  capLabel: AGENCY_FEE_CAP_LABEL,
  /** Compact one-liner for dense UI such as the footer and nav descriptions. */
  summaryShort: `${AGENCY_FEE_RATE_LABEL} of eligible profit, capped at ${AGENCY_FEE_CAP_LABEL}/mo`,
} as const;

/**
 * Every "Book a Call" CTA reads from here.
 * NEXT_PUBLIC_BOOK_CALL_URL overrides the default scheduling link site-wide.
 */
const DEFAULT_BOOK_CALL_URL = "https://calendar.app.google/DipKGPYwU4EP6HK97";
const bookCallEnv = process.env.NEXT_PUBLIC_BOOK_CALL_URL?.trim();

export const BOOK_CALL_URL =
  bookCallEnv && bookCallEnv.length > 0 ? bookCallEnv : DEFAULT_BOOK_CALL_URL;

export const BOOK_CALL_IS_EXTERNAL = BOOK_CALL_URL.startsWith("http");

export const MAILTO_CONTACT = `mailto:${siteConfig.contactEmail}`;

/**
 * Standalone landing routes for paid traffic. They keep the site header so
 * visitors can still reach the rest of the site, but drop the shared footer so
 * the page ends on the lead form. `lib/lead.ts` also treats them as
 * low-friction, making the message field optional.
 */
export const LANDING_ROUTE_PREFIXES = ["/lp"] as const;

/** On-page lead form anchor. Shared so header CTAs can target it directly. */
export const LANDING_FORM_ANCHOR = "#profit-analysis";

export function isLandingRoute(pathname: string) {
  return LANDING_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  {
    label: "Managed Growth",
    href: "/managed-growth",
    description: "Performance-based Google Ads and Meta Ads management for Shopify brands.",
  },
  {
    label: "Software",
    href: "/software",
    description: "The Shopify profit analytics we measure every decision — and our fee — against.",
  },
  {
    label: "Results",
    href: "/results",
    description: "Case studies and measured ecommerce outcomes.",
  },
  {
    label: "Pricing",
    href: "/pricing",
    description: `${managedService.summaryShort}. No profit, no agency fee.`,
  },
  { label: "Approach", href: "/approach", description: "How we think about scaling profitably." },
  {
    label: "Insights",
    href: "/insights",
    description: "Guides on ecommerce advertising profitability.",
  },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Managed Growth", href: "/managed-growth" },
      { label: "Google Ads for Shopify", href: "/managed-growth#paid-search" },
      { label: "Meta Ads for Shopify", href: "/managed-growth#paid-social" },
      { label: "Creative & CRO", href: "/managed-growth#creative" },
      { label: "Performance-based pricing", href: "/pricing" },
      { label: "Agency fee calculator", href: "/pricing#fee-calculator" },
    ],
  },
  {
    title: "Software",
    links: [
      { label: "ScaleAble Analytics", href: "/software" },
      { label: "Profit vs. ad spend", href: "/software#profit-vs-spend" },
      { label: "Product profitability", href: "/software#product-profit" },
      { label: "Channel & halo analysis", href: "/software#channels" },
      { label: "Install on Shopify", href: siteConfig.shopifyAppUrl },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Approach", href: "/approach" },
      { label: "Client Results", href: "/results" },
      { label: "Insights", href: "/insights" },
      {
        label: "What is a performance-based agency?",
        href: "/insights/what-is-a-performance-based-marketing-agency",
      },
      { label: "Contact", href: "/contact" },
      { label: "Book a Call", href: BOOK_CALL_URL },
    ],
  },
];

export const socialLinks: NavItem[] = [
  { label: "Email", href: MAILTO_CONTACT },
  { label: "Shopify App Store", href: siteConfig.shopifyAppUrl },
  { label: "ScaleAble App", href: siteConfig.softwareSiteUrl },
];
