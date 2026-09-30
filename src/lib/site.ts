/**
 * Single source of truth for everything that is likely to change:
 * contact details, pricing, external URLs, navigation and social links.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "ScaleAble",
  shortName: "ScaleAble",
  url: rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl.replace(/\/$/, "") : "https://scaleable.com",
  tagline: "Profit-first paid media for Shopify brands.",
  description:
    "ScaleAble manages Google Ads and Meta Ads for Shopify brands using our own Shopify profit analytics — so scaling decisions are made on contribution profit, not platform ROAS.",
  contactEmail: "brian@scaleableapp.com",
  softwareSiteUrl: "https://scaleableapp.com",
  shopifyAppUrl: "https://apps.shopify.com/scaleable",
  founder: "Brian Fratello",
} as const;

/** Managed growth retainer. Referenced everywhere pricing appears. */
export const managedService = {
  price: 2000,
  priceFormatted: "$2,000",
  currency: "USD",
  cadence: "per month",
  cadenceShort: "/mo",
  name: "ScaleAble Managed Growth",
} as const;

/**
 * Every "Book a Call" CTA reads from here.
 * Set NEXT_PUBLIC_BOOK_CALL_URL to the real scheduling link and the whole site updates.
 * Until then CTAs open a pre-addressed email.
 */
const bookCallEnv = process.env.NEXT_PUBLIC_BOOK_CALL_URL?.trim();

export const BOOK_CALL_URL =
  bookCallEnv && bookCallEnv.length > 0
    ? bookCallEnv
    : `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
        "Book a Call — ScaleAble Managed Growth",
      )}&body=${encodeURIComponent(
        "Hi Brian,\n\nI'd like to book a call about ScaleAble managed growth.\n\nStore / Shopify URL:\nCurrent monthly ad spend:\nBest times to talk:\n\nThanks,",
      )}`;

export const BOOK_CALL_IS_EXTERNAL = Boolean(bookCallEnv && bookCallEnv.startsWith("http"));

export const MAILTO_CONTACT = `mailto:${siteConfig.contactEmail}`;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  {
    label: "Managed Growth",
    href: "/managed-growth",
    description: "Google Ads, Meta Ads, creative and CRO — run on profit data.",
  },
  {
    label: "Software",
    href: "/software",
    description: "The Shopify profit analytics behind every decision we make.",
  },
  {
    label: "Results",
    href: "/results",
    description: "Case studies and measured ecommerce outcomes.",
  },
  { label: "Pricing", href: "/pricing", description: "One retainer. Everything included." },
  { label: "Approach", href: "/approach", description: "How we think about scaling profitably." },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Managed Growth", href: "/managed-growth" },
      { label: "Google Ads for Shopify", href: "/managed-growth#paid-search" },
      { label: "Meta Ads for Shopify", href: "/managed-growth#paid-social" },
      { label: "Creative & CRO", href: "/managed-growth#creative" },
      { label: "Pricing", href: "/pricing" },
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
