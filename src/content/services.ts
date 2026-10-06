export type Capability = {
  title: string;
  body: string;
  items: string[];
};

export type ServicePillar = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  points: string[];
};

/** The four workstreams inside the managed growth retainer. */
export const servicePillars: ServicePillar[] = [
  {
    id: "paid-search",
    index: "01",
    eyebrow: "Paid search",
    title: "Google Ads built around margin, not last-click ROAS",
    lede: "Shopping, Performance Max, Search and Demand Gen restructured so budget follows products and queries that actually clear contribution margin.",
    points: [
      "Account and campaign restructuring",
      "Shopping feed and product segmentation by margin",
      "Performance Max asset group and listing group control",
      "Brand vs. non-brand separation and incrementality checks",
      "Search term and query mining on a fixed cadence",
      "Bid strategy, tROAS and budget pacing tied to profit targets",
    ],
  },
  {
    id: "paid-social",
    index: "02",
    eyebrow: "Paid social",
    title: "Meta Ads that scale without quietly eating your margin",
    lede: "Prospecting and retention built as one system, tested against blended performance instead of in-platform attribution that double-counts revenue.",
    points: [
      "Account structure, consolidation and budget architecture",
      "Prospecting, retargeting and retention sequencing",
      "Creative testing frameworks with clean read-outs",
      "Audience, placement and catalog configuration",
      "Blended MER guardrails as spend increases",
      "Offer and promotion testing against real contribution",
    ],
  },
  {
    id: "creative",
    index: "03",
    eyebrow: "Creative & CRO",
    title: "The ads and the landing experience, treated as one funnel",
    lede: "Most paid media plateaus are creative or onsite problems. We work on both instead of blaming the algorithm.",
    points: [
      "Advertising creative strategy and messaging angles",
      "Static, motion and UGC-style ad design",
      "Structured creative testing roadmap",
      "Landing page and PDP conversion recommendations",
      "Offer, bundle and AOV strategy",
      "Onsite friction and checkout drop-off analysis",
    ],
  },
  {
    id: "analytics",
    index: "04",
    eyebrow: "Profit analytics",
    title: "Every decision checked against your Shopify P&L",
    lede: "ScaleAble is wired into your Shopify data, costs and ad platforms — so we can see whether a change made the business money, not just the ad account.",
    points: [
      "COGS, shipping, fulfilment and fee modelling",
      "Profit and contribution margin tracking",
      "Blended MER / True ROAS against platform ROAS",
      "Product-level profitability and scaling shortlists",
      "Paid, organic and direct channel interaction",
      "Event markers on every material change we make",
    ],
  },
];

/** Flat capability list used for the "what's included" visualisations. */
export const includedCapabilities: { group: string; items: string[] }[] = [
  {
    group: "Media management",
    items: [
      "Google Ads management",
      "Meta Ads management",
      "Campaign creation & restructuring",
      "Budget allocation",
      "Scaling strategy",
      "Ongoing optimisation",
    ],
  },
  {
    group: "Creative & conversion",
    items: [
      "Advertising creative strategy",
      "Ad design",
      "Creative testing",
      "Conversion rate optimisation",
      "Landing page recommendations",
      "Onsite conversion review",
    ],
  },
  {
    group: "Analysis & reporting",
    items: [
      "Shopify profitability analysis",
      "Product-level performance analysis",
      "Paid media strategy",
      "Performance reporting",
      "Strategic recommendations",
      "ScaleAble software access",
    ],
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  body: string;
  detail: string[];
};

export const engagementProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Connect the data",
    body: "ScaleAble is installed on your Shopify store and connected to Google Ads and Meta Ads. Before we touch a campaign, we can see revenue, spend and orders in one place.",
    detail: ["Shopify install", "Google Ads connection", "Meta Ads connection"],
  },
  {
    step: "02",
    title: "Model your real costs",
    body: "COGS, shipping, fulfilment, processing fees, packaging and custom business expenses go in. That turns reported revenue into profit at the product level.",
    detail: ["COGS & variable costs", "Custom expenses", "Contribution margin baseline"],
  },
  {
    step: "03",
    title: "Audit and rebuild",
    body: "We audit the existing accounts against profit rather than platform metrics, then restructure campaigns, budgets and creative around what actually clears margin.",
    detail: ["Account audit", "Restructure plan", "Creative & offer roadmap"],
  },
  {
    step: "04",
    title: "Scale against profit guardrails",
    body: "Spend moves in deliberate increments. Every change is marked as an event, and we watch what happens to profit, MER, organic and direct revenue — not just platform ROAS.",
    detail: ["Event markers", "Profit guardrails", "Monthly strategy review"],
  },
];
