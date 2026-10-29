/**
 * Single source of truth for the performance-based agency fee.
 *
 * Every page that mentions the percentage, the cap or the zero-profit rule
 * reads from here so the numbers cannot drift between pages. The fee applies
 * to the managed agency service only — the standalone Shopify app subscription
 * is priced separately on the app site.
 */

/** Share of monthly eligible profit charged as the agency fee. */
export const AGENCY_FEE_RATE = 0.2;

/** Hard ceiling on the monthly agency fee, in USD. */
export const AGENCY_FEE_CAP = 3000;

export const AGENCY_FEE_CURRENCY = "USD";

export const AGENCY_FEE_RATE_LABEL = "20%";
export const AGENCY_FEE_CAP_LABEL = "$3,000";

/** The readable formula shown on the pricing page. */
export const AGENCY_FEE_FORMULA = `Agency fee = min(${AGENCY_FEE_CAP_LABEL}, ${AGENCY_FEE_RATE_LABEL} × max($0, monthly eligible profit))`;

/** Monthly eligible profit at which the fee reaches the cap. */
export const AGENCY_FEE_CAP_THRESHOLD = AGENCY_FEE_CAP / AGENCY_FEE_RATE;

/** One-line description of what the percentage is charged on. */
export const ELIGIBLE_PROFIT_BASIS =
  "monthly eligible profit after advertising spend and agreed direct costs, before our fee";

/** Short offer summary. Reused in hero copy, metadata and social previews. */
export const AGENCY_OFFER_SUMMARY = `We manage your Google Ads and Meta Ads for ${AGENCY_FEE_RATE_LABEL} of monthly eligible profit after ad spend and agreed costs. No retainer. No setup fee. Never more than ${AGENCY_FEE_CAP_LABEL} a month in agency fees.`;

/** The clarification that must stay visible wherever the offer is stated. */
export const AGENCY_OFFER_CLARIFICATION =
  "You fund your advertising and business costs. We agree on how eligible profit is measured before we start.";

/** Plain-English definition of eligible profit. Deliberately scope-neutral. */
export const ELIGIBLE_PROFIT_DEFINITION =
  "Eligible profit is the profit from the business activity we agree to work on, calculated after advertising spend and the direct costs we agree in writing — and before our agency fee. It is a defined, agreed calculation, not an audited net income figure, and it does not automatically sweep in every expense in your business.";

/** Examples of the direct costs commonly agreed before onboarding. */
export const AGREED_COST_EXAMPLES = [
  "Advertising spend on the channels we manage",
  "Product costs (COGS)",
  "Shipping and delivery costs",
  "Fulfilment and packaging",
  "Payment processing and transaction fees",
  "Any other direct costs we both agree in writing",
] as const;

/** Rounds to whole cents, avoiding binary float drift on values like 0.1 + 0.2. */
function roundToCents(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * The agency fee for a month.
 *
 * Zero or negative eligible profit means no fee. Anything above the cap is
 * charged at the cap. Non-finite input is treated as no fee.
 */
export function calculateAgencyFee(eligibleProfit: number): number {
  if (!Number.isFinite(eligibleProfit) || eligibleProfit <= 0) return 0;
  return roundToCents(Math.min(AGENCY_FEE_CAP, eligibleProfit * AGENCY_FEE_RATE));
}

export type FeeBreakdown = {
  /** The eligible profit the fee was calculated from, rounded to cents. */
  eligibleProfit: number;
  fee: number;
  /** Eligible profit left after the agency fee. Negative input stays negative. */
  remaining: number;
  /** True when the uncapped percentage would have exceeded the cap. */
  isCapped: boolean;
  /** True when there is no positive eligible profit, so no fee is due. */
  isZeroFee: boolean;
};

export function calculateFeeBreakdown(eligibleProfit: number): FeeBreakdown {
  const safeProfit = Number.isFinite(eligibleProfit) ? roundToCents(eligibleProfit) : 0;
  const fee = calculateAgencyFee(safeProfit);

  return {
    eligibleProfit: safeProfit,
    fee,
    remaining: roundToCents(safeProfit - fee),
    isCapped: safeProfit > 0 && safeProfit * AGENCY_FEE_RATE > AGENCY_FEE_CAP,
    isZeroFee: fee === 0,
  };
}

/**
 * Parses a free-text currency amount from the calculator input.
 * Returns null for blank or unparseable values so the UI can stay quiet
 * instead of showing a misleading $0.
 */
export function parseProfitInput(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s_]/g, "");
  if (cleaned.length === 0) return null;
  if (!/^-?\d*\.?\d*$/.test(cleaned) || cleaned === "-" || cleaned === "." || cleaned === "-.") {
    return null;
  }

  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

/** Formats USD without trailing ".00" on whole-dollar amounts. */
export function formatUsd(value: number): string {
  const rounded = roundToCents(Number.isFinite(value) ? value : 0);
  const hasCents = !Number.isInteger(rounded);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: AGENCY_FEE_CURRENCY,
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rounded);
}

export type FeeExample = {
  eligibleProfit: number;
  fee: number;
  remaining: number;
};

/** Hypothetical illustrations shown on the pricing page. */
export const feeExamples: FeeExample[] = [0, 5000, 10000, 15000, 25000].map((profit) => {
  const { fee, remaining } = calculateFeeBreakdown(profit);
  return { eligibleProfit: profit, fee, remaining };
});
