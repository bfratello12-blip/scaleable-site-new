export type Faq = { question: string; answer: string };

export const pricingFaqs: Faq[] = [
  {
    question: "What exactly is included for $1,500 per month?",
    answer:
      "Google Ads and Meta Ads management, paid media strategy, campaign creation and restructuring, budget allocation and scaling strategy, conversion rate optimisation and landing page recommendations, advertising creative strategy, ad design and creative testing, product-level performance analysis, Shopify profitability analysis, ongoing optimisation, and reporting with strategic recommendations. Access to the ScaleAble software is part of the engagement.",
  },
  {
    question: "Does the price change as our ad spend grows?",
    answer:
      "The managed growth retainer is $1,500 per month. It is not a percentage of spend, so our incentive is not simply to spend more of your budget.",
  },
  {
    question: "Do we need the ScaleAble software to work with you?",
    answer:
      "Yes — it is how we measure. ScaleAble connects your Shopify data, real product costs and ad platform spend so we can manage against profit rather than platform-reported ROAS. Installing it is the first step of onboarding.",
  },
  {
    question: "Can we use the software without managed services?",
    answer:
      "Yes. ScaleAble is available on the Shopify App Store and can be used on its own. Managed growth is for brands that want the media buying, creative and analysis handled as well.",
  },
  {
    question: "Which platforms do you manage?",
    answer:
      "Google Ads — including Search, Shopping, Performance Max and Demand Gen — and Meta Ads across Facebook and Instagram.",
  },
  {
    question: "Do you work with brands outside Shopify?",
    answer:
      "The ScaleAble software currently works with Shopify stores, and our managed growth service is built around that data. If you are not on Shopify, the profit analytics that makes this approach work will not be available.",
  },
];

export const generalFaqs: Faq[] = [
  {
    question: "How is this different from a normal PPC agency?",
    answer:
      "A typical agency reports the numbers inside Google Ads and Meta Ads. We build and manage campaigns against profit inside your Shopify business, using our own analytics software to see how spend affects product profitability, organic and direct revenue, and overall margin.",
  },
  {
    question: "Why do you focus on profit rather than ROAS?",
    answer:
      "Ad platforms optimise toward conversions, revenue and platform ROAS because that is what they can see. They do not know your COGS, shipping, fulfilment or fees. Revenue is comparatively easy to grow — profit is the harder and more useful problem.",
  },
  {
    question: "What does onboarding look like?",
    answer:
      "Install ScaleAble on your Shopify store, connect Google Ads and Meta Ads, and load your real costs. We then audit the existing accounts against profit and put a restructure and creative plan in front of you before changing anything material.",
  },
  {
    question: "Who will actually be working on the account?",
    answer:
      "Senior paid media management, not a junior handed a checklist. The same person who builds the strategy is the person in the accounts.",
  },
  {
    question: "How do you report?",
    answer:
      "Reporting runs on the same ScaleAble views we work from: profit, contribution margin, blended MER against platform ROAS, product-level profitability, and event markers for every material change we make.",
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
    question: "How long does setup take?",
    answer:
      "Connecting Shopify and the ad platforms is quick. The work that matters is entering accurate costs — the output is only as good as the cost data behind it.",
  },
];
