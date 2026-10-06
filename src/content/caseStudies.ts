/**
 * ---------------------------------------------------------------------------
 * PLACEHOLDER CASE STUDY DATA
 * ---------------------------------------------------------------------------
 * Every record below is illustrative structure only. No client names, logos,
 * testimonials or performance figures here are real.
 *
 * To publish a real case study:
 *   1. Replace the metric values, chart series and narrative copy.
 *   2. Set `isPlaceholder: false` — the "placeholder data" badges disappear
 *      automatically across the results index and the detail page.
 *   3. Add a `quote` object only once you have written client approval.
 * ---------------------------------------------------------------------------
 */

export type CaseMetric = {
  label: string;
  before: string;
  after: string;
  delta: string;
  direction: "up" | "down";
  /** Whether "up" is the good outcome for this metric. */
  positive?: boolean;
  note?: string;
};

export type CaseStudy = {
  slug: string;
  isPlaceholder: boolean;
  vertical: string;
  brandLabel: string;
  platform: string;
  spendBand: string;
  timeframe: string;
  channels: string[];
  headline: string;
  summary: string;
  heroMetric: { value: string; label: string; caption: string };
  metrics: CaseMetric[];
  problem: string[];
  approach: { title: string; body: string }[];
  outcome: string[];
  /** Monthly series used by the profit/spend chart on the detail page. */
  series: {
    labels: string[];
    adSpend: number[];
    contributionProfit: number[];
    revenue: number[];
  };
  quote?: { text: string; attribution: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "home-goods-profit-reset",
    isPlaceholder: true,
    vertical: "Home & kitchen",
    brandLabel: "Home & kitchen brand",
    platform: "Shopify",
    spendBand: "$60k–$90k / month ad spend",
    timeframe: "7 months",
    channels: ["Google Ads", "Meta Ads", "Creative", "CRO"],
    headline: "Revenue was flat for a year. Profit had been falling the whole time.",
    summary:
      "Platform ROAS looked stable at 3.4x while contribution margin quietly eroded. Restructuring Shopping around product-level margin and cutting three unprofitable hero SKUs from paid rotation changed the economics without changing top-line spend.",
    heroMetric: {
      value: "+68%",
      label: "Profit",
      caption: "Same ad budget, different allocation",
    },
    metrics: [
      { label: "Profit", before: "$142k", after: "$239k", delta: "+68%", direction: "up", positive: true },
      { label: "Contribution margin", before: "18.4%", after: "27.1%", delta: "+8.7pt", direction: "up", positive: true },
      { label: "Blended MER", before: "2.9x", after: "3.8x", delta: "+31%", direction: "up", positive: true },
      { label: "Ad spend", before: "$74k", after: "$76k", delta: "+3%", direction: "up", positive: true, note: "Held broadly flat" },
    ],
    problem: [
      "Google Ads and Meta Ads were both hitting their platform ROAS targets, so nothing looked broken inside the accounts.",
      "Shopping and Performance Max were pushing budget toward the highest-revenue SKUs, several of which had single-digit contribution margin after shipping and fulfilment.",
      "No one in the business could answer whether a budget increase in the previous quarter had made or lost money.",
    ],
    approach: [
      {
        title: "Modelled true cost per product",
        body: "COGS, shipping, fulfilment, processing fees and packaging were loaded into ScaleAble, producing profit and margin for every SKU rather than a blended store-level number.",
      },
      {
        title: "Rebuilt Shopping around margin tiers",
        body: "Products were segmented into margin tiers with separate campaigns, budgets and target returns. High-revenue, low-margin SKUs were removed from aggressive bidding entirely.",
      },
      {
        title: "Reset Performance Max control",
        body: "Asset groups and listing groups were restructured so the campaign could no longer quietly reallocate budget to the products with the best platform ROAS but the worst margin.",
      },
      {
        title: "Tested offers instead of bids",
        body: "Bundle and AOV testing on the highest-margin range did more for profit than any bid adjustment available in the accounts.",
      },
    ],
    outcome: [
      "Profit grew while ad spend stayed effectively flat.",
      "Paid revenue dipped slightly in month two before recovering — visible in ScaleAble, and accepted deliberately because profit was rising.",
      "Budget decisions moved from monthly ROAS reviews to weekly profit checks with event markers on every change.",
    ],
    series: {
      labels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"],
      adSpend: [74, 71, 72, 74, 75, 76, 76],
      contributionProfit: [142, 138, 163, 188, 206, 224, 239],
      revenue: [772, 741, 786, 812, 836, 858, 871],
    },
  },
  {
    slug: "apparel-scaling-ceiling",
    isPlaceholder: true,
    vertical: "Apparel & accessories",
    brandLabel: "Apparel brand",
    platform: "Shopify",
    spendBand: "$120k–$210k / month ad spend",
    timeframe: "9 months",
    channels: ["Meta Ads", "Google Ads", "Creative testing"],
    headline: "They could scale spend. They just couldn't tell where it stopped working.",
    summary:
      "Every budget increase produced more revenue and a slightly worse blended return. Mapping profit against spend in ScaleAble found the ceiling, and creative volume moved it higher instead of guessing at it.",
    heroMetric: {
      value: "+74%",
      label: "Ad spend",
      caption: "Contribution margin held within 1.5 points",
    },
    metrics: [
      { label: "Ad spend", before: "$121k", after: "$211k", delta: "+74%", direction: "up", positive: true },
      { label: "Shopify revenue", before: "$498k", after: "$902k", delta: "+81%", direction: "up", positive: true },
      { label: "Profit", before: "$96k", after: "$178k", delta: "+85%", direction: "up", positive: true },
      { label: "Contribution margin", before: "19.3%", after: "19.7%", delta: "+0.4pt", direction: "up", positive: true },
    ],
    problem: [
      "Meta was the primary growth channel and creative fatigue was capping how much spend the account could absorb.",
      "Platform-reported ROAS and blended MER were drifting apart, so in-account performance no longer described the business.",
      "Scaling decisions were being made monthly, well after margin damage had already happened.",
    ],
    approach: [
      {
        title: "Established the profit ceiling",
        body: "Historic spend and profit were plotted together to find the spend level where incremental profit flattened — the real constraint, rather than a ROAS target someone picked.",
      },
      {
        title: "Built a creative testing system",
        body: "A weekly cadence of new angles, formats and hooks, with clean read-outs at the ad level and a standing rule that nothing scales on platform ROAS alone.",
      },
      {
        title: "Separated brand demand from new demand",
        body: "Google brand search was isolated so it stopped flattering blended returns, making non-brand acquisition economics visible for the first time.",
      },
      {
        title: "Scaled in measured increments",
        body: "Budget moved up in controlled steps with event markers, and each step was held until profit confirmed the increase was working.",
      },
    ],
    outcome: [
      "Ad spend increased significantly while contribution margin stayed within 1.5 points of baseline.",
      "Creative throughput — not bidding — turned out to be the thing that raised the ceiling.",
      "Organic and direct revenue rose alongside paid, which the channel view made measurable rather than anecdotal.",
    ],
    series: {
      labels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9"],
      adSpend: [121, 128, 139, 152, 166, 178, 190, 202, 211],
      contributionProfit: [96, 101, 112, 124, 133, 145, 158, 169, 178],
      revenue: [498, 527, 578, 631, 686, 738, 792, 851, 902],
    },
  },
  {
    slug: "supplements-subscription-margin",
    isPlaceholder: true,
    vertical: "Health & supplements",
    brandLabel: "Supplements brand",
    platform: "Shopify",
    spendBand: "$40k–$55k / month ad spend",
    timeframe: "6 months",
    channels: ["Meta Ads", "Google Ads", "CRO", "Offer strategy"],
    headline: "Acquisition looked expensive because the offer was wrong, not the targeting.",
    summary:
      "A first-order-only view made paid acquisition look unaffordable. Once repeat contribution was modelled properly, the constraint turned out to be the landing experience and the entry offer.",
    heroMetric: {
      value: "+41%",
      label: "Contribution margin",
      caption: "Driven by offer and onsite changes",
    },
    metrics: [
      { label: "Contribution margin", before: "14.8%", after: "20.9%", delta: "+41%", direction: "up", positive: true },
      { label: "Conversion rate", before: "1.62%", after: "2.31%", delta: "+43%", direction: "up", positive: true },
      { label: "Average order value", before: "$48", after: "$67", delta: "+40%", direction: "up", positive: true },
      { label: "Blended CPA", before: "$38", after: "$31", delta: "−18%", direction: "down", positive: true },
    ],
    problem: [
      "Paid acquisition was judged on first-order return, which made almost every campaign look like a loss.",
      "The primary landing page sent all traffic to a single low-priced entry product with thin margin.",
      "Google and Meta were optimising toward cheap conversions, which pulled the mix further toward the least profitable SKU.",
    ],
    approach: [
      {
        title: "Rebuilt the entry offer",
        body: "Bundles and a higher-value starter set replaced the single low-margin entry product as the primary paid destination.",
      },
      {
        title: "Fixed the landing experience",
        body: "Page structure, proof placement, offer clarity and mobile checkout friction were reworked before any further budget went in.",
      },
      {
        title: "Re-pointed platform optimisation",
        body: "Conversion actions and value rules were changed so both platforms optimised toward higher-contribution purchases rather than cheapest conversions.",
      },
      {
        title: "Tracked repeat contribution",
        body: "Repeat purchase behaviour was modelled into contribution so acquisition targets reflected the actual economics instead of first order only.",
      },
    ],
    outcome: [
      "Contribution margin improved substantially without increasing spend.",
      "Higher AOV made previously unaffordable audiences profitable.",
      "Onsite conversion work produced more margin than any in-platform optimisation that month.",
    ],
    series: {
      labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
      adSpend: [41, 42, 44, 48, 52, 55],
      contributionProfit: [31, 34, 41, 49, 57, 64],
      revenue: [209, 218, 241, 267, 289, 306],
    },
  },
  {
    slug: "outdoor-equipment-channel-halo",
    isPlaceholder: true,
    vertical: "Outdoor equipment",
    brandLabel: "Outdoor equipment brand",
    platform: "Shopify",
    spendBand: "$90k–$95k / month ad spend",
    timeframe: "5 months",
    channels: ["Google Ads", "Meta Ads", "Measurement"],
    headline: "Cutting spend to protect margin was making the whole business smaller.",
    summary:
      "Paid pullbacks improved in-platform efficiency and reduced total profit. Charting ad spend against organic and direct revenue showed how much non-paid demand the advertising was creating.",
    heroMetric: {
      value: "+29%",
      label: "Organic + direct revenue",
      caption: "Measured alongside a paid budget increase",
    },
    metrics: [
      { label: "Organic + direct revenue", before: "$186k", after: "$240k", delta: "+29%", direction: "up", positive: true },
      { label: "Blended MER", before: "3.1x", after: "3.6x", delta: "+16%", direction: "up", positive: true },
      { label: "Profit", before: "$118k", after: "$167k", delta: "+42%", direction: "up", positive: true },
      { label: "Platform ROAS", before: "4.2x", after: "3.7x", delta: "−12%", direction: "down", positive: false, note: "Deliberately accepted" },
    ],
    problem: [
      "Every time budget was cut to defend platform ROAS, total revenue fell further than the paid channel alone explained.",
      "Organic and direct performance was reported separately, so the relationship with paid spend was invisible.",
      "The business was optimising a single channel while the P&L was moving in the other direction.",
    ],
    approach: [
      {
        title: "Charted channels against spend",
        body: "Paid, organic, direct and unknown revenue were plotted alongside ad spend to make the interaction between channels measurable.",
      },
      {
        title: "Ran a controlled spend test",
        body: "Budget was increased in a defined window with event markers, and the effect on every channel — not just paid — was reviewed against profit.",
      },
      {
        title: "Rewrote the reporting standard",
        body: "Platform ROAS was demoted to a diagnostic. Profit and blended MER became the numbers the team managed against.",
      },
      {
        title: "Reallocated brand budget",
        body: "Brand search spend was reduced where it was capturing demand the business already owned, freeing budget for genuine acquisition.",
      },
    ],
    outcome: [
      "Platform ROAS fell and profit rose — a trade the business could only justify because it was measurable.",
      "Organic and direct revenue moved with paid spend in a way the team could finally quantify.",
      "Reporting arguments stopped, because everyone was looking at the same profit number.",
    ],
    series: {
      labels: ["M1", "M2", "M3", "M4", "M5"],
      adSpend: [78, 84, 89, 93, 95],
      contributionProfit: [118, 127, 142, 157, 167],
      revenue: [552, 594, 641, 683, 712],
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

/** Aggregate figures shown on the results index. Illustrative until real data replaces them. */
export const resultsHighlights: { value: string; label: string; sub: string }[] = [
  { value: "Profit", label: "is the scoreboard", sub: "Not platform ROAS, not attributed revenue" },
  { value: "SKU-level", label: "budget decisions", sub: "Margin tiers drive spend allocation" },
  { value: "Weekly", label: "profit review cadence", sub: "Event markers on every material change" },
];
