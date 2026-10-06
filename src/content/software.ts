export type SoftwareModule = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  placeholder: {
    label: string;
    width: number;
    height: number;
    ratio?: string;
  };
};

/**
 * Deep-dive sections for the software page. Each one owns a screenshot slot —
 * replace the placeholder with a real ScaleAble dashboard capture.
 */
export const softwareModules: SoftwareModule[] = [
  {
    id: "profit-vs-spend",
    eyebrow: "Profit vs. ad spend",
    title: "Watch what happens to profit as spend goes up",
    body: "The single view that changes how brands scale. Ad spend and profit plotted together, so the point where additional spend stops producing additional profit is visible instead of theoretical.",
    bullets: [
      "Profit charted against daily and monthly ad spend",
      "Spot the spend level where margin starts to compress",
      "Compare periods before and after a budget change",
      "See profit per additional dollar of spend, not just ROAS",
    ],
    placeholder: {
      label: "ScaleAble Profit vs. Ad Spend dashboard — trended profit over ad spend",
      width: 1800,
      height: 1100,
      ratio: "~16:10",
    },
  },
  {
    id: "true-roas",
    eyebrow: "MER & True ROAS",
    title: "Platform ROAS on one line. Business truth on the other.",
    body: "Google and Meta each report the conversions they believe they caused. ScaleAble puts blended MER — total Shopify revenue over total ad spend — alongside platform-reported ROAS so the gap is measurable.",
    bullets: [
      "Blended MER / True ROAS trended over time",
      "Forward-window attribution to see delayed revenue impact",
      "Identify when platform ROAS looks healthy but blended performance is falling",
      "A shared number that ends the attribution argument",
    ],
    placeholder: {
      label: "Ad ROAS vs. True ROAS attribution chart with forward windows",
      width: 1800,
      height: 1100,
      ratio: "~16:10",
    },
  },
  {
    id: "product-profit",
    eyebrow: "Product profitability",
    title: "Which products are actually worth scaling",
    body: "Store-level reporting hides the problem. ScaleAble applies real per-product costs so you can see revenue, profit, margin and profit per unit at the SKU level — the list that decides where budget goes.",
    bullets: [
      "Revenue, profit, margin and profit per unit by product",
      "True cost per product after COGS, shipping, fulfilment and fees",
      "Rising products, declining products and low-inventory risk",
      "The shortlist we build Shopping and catalog campaigns around",
    ],
    placeholder: {
      label: "Product Performance table — profit, margin and profit per unit by SKU",
      width: 1800,
      height: 1150,
      ratio: "~16:10",
    },
  },
  {
    id: "channels",
    eyebrow: "Channel impact",
    title: "Paid spend moves organic and direct too",
    body: "Advertising rarely stays in its own lane. ScaleAble charts ad spend against paid, organic, direct and unknown revenue so the halo effect — or the lack of one — is visible instead of assumed.",
    bullets: [
      "Ad spend compared to organic, direct, paid and unknown revenue",
      "See whether scaling paid lifts or cannibalises other channels",
      "Quantify halo effects single-channel dashboards miss",
      "Better context for brand vs. non-brand budget decisions",
    ],
    placeholder: {
      label: "Channel revenue vs. ad spend — paid, organic, direct and unknown",
      width: 1800,
      height: 1050,
      ratio: "~16:9",
    },
  },
  {
    id: "events",
    eyebrow: "Event markers",
    title: "Cause and effect, recorded as it happens",
    body: "Price change, promotion, budget shift, new campaign, supplier change. Every material decision gets marked, then compared before and after — so performance conversations are about evidence rather than memory.",
    bullets: [
      "Mark pricing, promotion, budget and launch events",
      "Before / after comparison on revenue, orders, profit and AOV",
      "Understand why profit moved, not just that it moved",
      "A clean audit trail of everything we changed",
    ],
    placeholder: {
      label: "Event performance comparison — before vs. after a tracked business change",
      width: 1800,
      height: 1000,
      ratio: "~16:9",
    },
  },
];

export const softwareDataPoints: { label: string; body: string }[] = [
  { label: "Shopify", body: "Orders, revenue, products, refunds and channel attribution." },
  { label: "Google Ads", body: "Spend, conversions and campaign-level performance." },
  { label: "Meta Ads", body: "Spend, results and attributed revenue." },
  { label: "Your costs", body: "COGS, shipping, fulfilment, fees, packaging, custom expenses." },
];

export const softwareOutputs: { metric: string; body: string }[] = [
  { metric: "Profit", body: "Revenue after product and variable costs — the number worth scaling." },
  { metric: "Contribution margin", body: "Where margin sits today and how it moves as spend changes." },
  { metric: "MER / True ROAS", body: "Total revenue over total spend, independent of platform attribution." },
  { metric: "Product profitability", body: "Profit, margin and profit per unit for every SKU." },
  { metric: "Channel mix", body: "Paid, organic, direct and unknown revenue against spend." },
  { metric: "Event impact", body: "Measured before/after effect of every change you make." },
];
