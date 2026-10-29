export type Faq = { question: string; answer: string };

export const pricingFaqs: Faq[] = [
  {
    question: "What makes your pricing performance-based?",
    answer:
      "Our agency fee is a share of the profit the work produces rather than a fixed retainer. Each month we charge 20% of eligible profit — the profit from the agreed business activity after advertising spend and the direct costs we agree in writing, and before our fee. The fee is capped at $3,000 per month, and a month with no positive eligible profit carries no agency fee.",
  },
  {
    question: "Is the percentage based on revenue or profit?",
    answer:
      "Profit, not revenue and not ad spend. A percentage of revenue or of ad spend can grow while the business is losing money. Our 20% is applied to eligible profit after advertising spend and the agreed direct costs, so the fee only grows when the profit it is calculated from grows.",
  },
  {
    question: "How is eligible profit calculated?",
    answer:
      "Eligible profit is revenue from the agreed business activity, less advertising spend on the channels we manage, less the direct costs we agree in writing — typically product costs, shipping, fulfilment, packaging and payment processing fees — and before our agency fee. It is a defined calculation agreed with you before onboarding. It is not an audited net income figure and it does not automatically include every expense in your business.",
  },
  {
    question: "What happens if we make no eligible profit?",
    answer:
      "There is no agency fee for that month. The fee is 20% of a positive figure, so if eligible profit is zero or negative the fee is zero. You still fund your own advertising and business costs, because those are paid to the ad platforms and your suppliers, not to us.",
  },
  {
    question: "What happens when the fee reaches $3,000?",
    answer:
      "It stops there. $3,000 per month is the maximum total agency fee, so once eligible profit reaches $15,000 in a month the fee is capped and every additional dollar of eligible profit stays with you. The cap applies to our agency fee only — it is not a cap on your advertising spend or your operating costs.",
  },
  {
    question: "Who pays for advertising?",
    answer:
      "You do, directly to Google and Meta on your own billing accounts. The same applies to your product, shipping, fulfilment and other business costs. We never take a margin on media, and your ad spend is not part of our fee.",
  },
  {
    question: "Are there setup fees, retainers or minimums?",
    answer:
      "No. There is no setup fee, no retainer, no minimum agency payment and no separate software charge for managed-service clients. The performance fee is the only thing we invoice for the managed service.",
  },
  {
    question: "Is the ScaleAble software included?",
    answer:
      "Yes. Access to the ScaleAble Shopify profit analytics is included in the managed service at no extra charge. It is how both sides see profit, product-level margin and the effect of ad spend — including the figures the fee is calculated from. The standalone subscription on the Shopify App Store is a separate product for brands who only want the software.",
  },
  {
    question: "How do we review the numbers?",
    answer:
      "The revenue, cost inputs and measurement method are agreed in writing before work begins, and the same ScaleAble views are open to both of us throughout. Each month we review the eligible profit calculation together alongside the performance reporting, so the fee is derived from figures you can inspect rather than a number you are asked to trust.",
  },
  {
    question: "What makes a business suitable for this arrangement?",
    answer:
      "It works best for Shopify brands already selling at a level where advertising can produce measurable profit, with product costs they can state accurately and a willingness to agree the calculation up front. If costs cannot be pinned down, or the economics do not support paid media yet, a profit share is the wrong structure and we will say so rather than take the engagement.",
  },
  {
    question: "Which platforms do you manage?",
    answer:
      "Google Ads — including Search, Shopping, Performance Max and Demand Gen — and Meta Ads across Facebook and Instagram.",
  },
  {
    question: "Do you work with brands outside Shopify?",
    answer:
      "The ScaleAble software currently works with Shopify stores, and the profit measurement this fee structure depends on is built around that data. If you are not on Shopify, we cannot measure eligible profit the way this arrangement requires.",
  },
];

export const generalFaqs: Faq[] = [
  {
    question: "How does a performance-based agency fee work?",
    answer:
      "We charge 20% of monthly eligible profit — the profit from the agreed activity after advertising spend and agreed direct costs, before our fee — capped at $3,000 per month. There is no retainer, no setup fee and no agency fee in a month without positive eligible profit. You fund your advertising and business costs directly.",
  },
  {
    question: "What work is included?",
    answer:
      "Google Ads and Meta Ads management — strategy, campaign builds, restructuring, budget allocation and ongoing optimisation — plus advertising creative strategy, ad design and creative testing, conversion rate and landing page recommendations, product-level profitability analysis, and reporting with recommendations. Access to the ScaleAble software is part of the engagement. Scope is agreed before we start rather than promised as unlimited output.",
  },
  {
    question: "How is this different from a normal PPC agency?",
    answer:
      "A typical agency charges a retainer or a percentage of ad spend and reports the numbers inside Google Ads and Meta Ads. We are paid from eligible profit and manage against profit inside your Shopify business, using our own analytics software to see how spend affects product profitability, organic and direct revenue, and overall margin.",
  },
  {
    question: "Why do you focus on profit rather than ROAS?",
    answer:
      "Ad platforms optimise toward conversions, revenue and platform ROAS because that is what they can see. They do not know your COGS, shipping, fulfilment or fees. Revenue is comparatively easy to grow — profit is the harder and more useful problem, and under this fee structure it is the one we are paid on.",
  },
  {
    question: "What does onboarding look like?",
    answer:
      "We agree the eligible business activity, the revenue and cost inputs, and how eligible profit will be measured — in writing, before work begins. Then ScaleAble goes on your Shopify store, Google Ads and Meta Ads are connected and real costs are loaded. We audit the existing accounts against profit and put a restructure and creative plan in front of you before changing anything material.",
  },
  {
    question: "Who will actually be working on the account?",
    answer:
      "Senior paid media management, not a junior handed a checklist. The same person who builds the strategy is the person in the accounts.",
  },
  {
    question: "How do you report?",
    answer:
      "Reporting runs on the same ScaleAble views we work from: profit, contribution margin, blended MER against platform ROAS, product-level profitability, and event markers for every material change we make. The eligible profit our fee is calculated from is reviewed in the same place.",
  },
];

export const softwareFaqs: Faq[] = [
  {
    question: "What data does ScaleAble connect to?",
    answer:
      "Shopify for orders, revenue, products and channel data; Google Ads and Meta Ads for spend and performance; and the product and business costs you define — COGS, shipping, fulfilment, processing fees, packaging and custom expenses.",
  },
  {
    question: "What is profit?",
    answer:
      "Revenue minus the variable costs of producing and delivering the order — product cost, shipping, fulfilment, payment processing and packaging — before fixed overhead. It is the number that tells you whether an additional order was actually worth having.",
  },
  {
    question: "What is MER or True ROAS?",
    answer:
      "Total Shopify revenue divided by total advertising spend across all platforms. Unlike platform ROAS it does not depend on any ad network's attribution model, so it cannot double-count the same order twice.",
  },
  {
    question: "How does the software relate to your agency fee?",
    answer:
      "Our managed service is paid from eligible profit, so both sides need to be looking at the same figures. ScaleAble is where revenue, ad spend and the agreed direct costs come together, which is what makes the fee calculation reviewable rather than asserted. Software access is included for managed clients; the standalone subscription is priced separately on the app site.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Connecting Shopify and the ad platforms is quick. The work that matters is entering accurate costs — the output is only as good as the cost data behind it.",
  },
];
