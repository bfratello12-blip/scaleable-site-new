/**
 * Long-form SEO content for /insights.
 *
 * Articles are structured blocks rather than MDX so they stay type-checked and
 * render through the existing design system. Inline `**bold**` is the only
 * markup supported inside a block's text — see renderInline in ArticleBody.
 *
 * To publish a new post: append to `insights` with a unique slug. The index,
 * sitemap, JSON-LD and static params all derive from this array.
 */

export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "formula"; lines: string[]; caption?: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title?: string; body: string }
  | { type: "quote"; text: string };

export type InsightPost = {
  slug: string;
  title: string;
  /** Shown on the index card. */
  excerpt: string;
  /** Meta description — keep under ~160 characters. */
  description: string;
  category: string;
  keywords: string[];
  /** ISO date. Drives sort order, <time> elements and Article schema. */
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  author: string;
  blocks: InsightBlock[];
};

export const insights: InsightPost[] = [
  {
    slug: "ecommerce-advertising-profitability",
    title: "The Complete Guide to Ecommerce Advertising Profitability",
    excerpt:
      "A campaign can report a 4x ROAS and still lose money. This guide covers contribution profit, break-even ROAS, MER, TACoS and how to tell whether advertising actually made your business more money.",
    description:
      "How to measure ecommerce advertising on contribution profit instead of platform ROAS — covering margins, break-even ROAS, MER, TACoS and profitable scaling.",
    category: "Profitability",
    keywords: [
      "ecommerce advertising profitability",
      "contribution profit ecommerce",
      "break-even ROAS",
      "MER marketing efficiency ratio",
      "TACoS ecommerce",
      "Shopify advertising profitability",
      "is ROAS misleading",
      "contribution margin ecommerce",
    ],
    publishedAt: "2026-09-30",
    readingMinutes: 11,
    author: "Brian Fratello",
    blocks: [
      { type: "p", text: "Getting more sales from advertising is relatively easy to measure." },
      {
        type: "p",
        text: "Knowing whether those sales are actually making your ecommerce business more profitable is much harder.",
      },
      {
        type: "p",
        text: "Google Ads and Meta Ads give you metrics like ROAS, conversion value, cost per purchase, and revenue. Shopify tells you how much your store sold. Analytics platforms tell you where customers came from.",
      },
      {
        type: "p",
        text: "All of that information is useful. But none of those numbers, by themselves, answer the question that ultimately matters:",
      },
      { type: "callout", body: "Did advertising make the business more money?" },
      {
        type: "p",
        text: "A campaign can report a 4x ROAS and still be a poor investment. Another campaign with a lower ROAS can potentially contribute more actual profit.",
      },
      {
        type: "p",
        text: "The difference comes down to your margins, product costs, customer acquisition costs, organic revenue, discounts, returns, and how advertising affects the business as a whole.",
      },
      {
        type: "p",
        text: "This guide explains how to look beyond platform ROAS and measure ecommerce advertising based on what actually matters: **profitable growth.**",
      },

      { type: "h2", text: "What Is Ecommerce Advertising Profitability?" },
      {
        type: "p",
        text: "Advertising profitability measures how much money your business actually generates after accounting for the costs associated with producing those sales.",
      },
      {
        type: "p",
        text: "That sounds obvious, but it's different from the way most advertising platforms report performance.",
      },
      {
        type: "p",
        text: "If you spend $10,000 on Meta Ads and Meta reports $40,000 in purchase revenue, your dashboard will show:",
      },
      { type: "formula", lines: ["ROAS = 4.0x"] },
      { type: "p", text: "That's useful information." },
      { type: "p", text: "But it doesn't mean you made $30,000." },
      {
        type: "p",
        text: "You still have the cost of the products you sold. You may have discounts, transaction fees, fulfillment expenses, returns, shipping subsidies, and other variable expenses.",
      },
      {
        type: "p",
        text: "More importantly, some of the $40,000 attributed to Meta may have happened without the advertising at all.",
      },
      {
        type: "p",
        text: "So while ROAS tells you something about the performance of your advertising, **ROAS is not the same thing as profitability.**",
      },

      { type: "h2", text: "Why ROAS Can Be Misleading" },
      { type: "p", text: "ROAS stands for **Return on Ad Spend**." },
      { type: "p", text: "The basic calculation is:" },
      { type: "formula", lines: ["Revenue attributed to advertising ÷ Advertising spend = ROAS"] },
      { type: "p", text: "If you spend $25 to generate a $100 order:" },
      { type: "formula", lines: ["$100 ÷ $25 = 4x ROAS"] },
      {
        type: "p",
        text: "But imagine two ecommerce businesses both generating exactly that result.",
      },
      { type: "h3", text: "Brand A" },
      { type: "ul", items: ["Revenue: $100", "Product cost: $30", "Ad spend: $25"] },
      { type: "p", text: "That leaves $45 after product cost and advertising." },
      { type: "h3", text: "Brand B" },
      { type: "ul", items: ["Revenue: $100", "Product cost: $60", "Ad spend: $25"] },
      { type: "p", text: "That leaves only $15." },
      { type: "p", text: "Both advertising accounts report the exact same **4x ROAS**." },
      {
        type: "p",
        text: "But those businesses are in completely different financial positions.",
      },
      {
        type: "p",
        text: "That's why asking **\"What's a good ROAS?\"** without knowing the economics of the business is the wrong question.",
      },
      {
        type: "p",
        text: "A 3x ROAS could be excellent for one company and unsustainable for another.",
      },

      { type: "h2", text: "Start With Your Product Economics" },
      {
        type: "p",
        text: "Before deciding whether advertising is profitable, you need to understand what an order is actually worth to your business.",
      },
      { type: "p", text: "At a minimum, you should know:" },
      {
        type: "ul",
        items: [
          "**Average Order Value (AOV)** — The average amount a customer spends per order.",
          "**Cost of Goods Sold (COGS)** — What the products in that order actually cost you.",
          "**Gross Profit** — Revenue remaining after COGS.",
          "**Customer Acquisition Cost (CAC)** — How much advertising spend is required to acquire a customer.",
          "**Contribution Profit** — The money remaining after the variable costs required to generate the sale.",
        ],
      },
      {
        type: "p",
        text: "These numbers give you something an advertising dashboard can't: **business context.**",
      },

      { type: "h2", text: "Contribution Profit Is More Important Than Revenue" },
      { type: "p", text: "Revenue tells you how much you sold." },
      {
        type: "p",
        text: "Contribution profit tells you how much those sales actually contributed to the business.",
      },
      { type: "p", text: "A simplified ecommerce calculation might look like this:" },
      { type: "formula", lines: ["Revenue − COGS − Advertising Spend = Contribution Profit"] },
      {
        type: "p",
        text: "Depending on how your business operates, you may also include other variable costs such as payment processing, fulfillment, shipping subsidies, or other costs directly tied to an order.",
      },
      { type: "p", text: "Consider an ecommerce brand generating:" },
      {
        type: "ul",
        items: ["$100,000 in revenue", "$35,000 in product costs", "$25,000 in advertising spend"],
      },
      { type: "p", text: "Before additional variable expenses, contribution profit would be:" },
      { type: "formula", lines: ["$100,000 − $35,000 − $25,000 = $40,000"] },
      { type: "p", text: "Now imagine the following month:" },
      {
        type: "ul",
        items: ["$125,000 in revenue", "$50,000 in product costs", "$45,000 in advertising spend"],
      },
      { type: "p", text: "Revenue increased **25%**." },
      { type: "p", text: "But contribution profit fell to:" },
      { type: "formula", lines: ["$30,000"] },
      {
        type: "p",
        text: "The company grew revenue while actually producing **less contribution profit**.",
      },
      {
        type: "p",
        text: "If you only looked at sales growth, you might call that a great month.",
      },
      { type: "p", text: "The economics tell a different story." },

      { type: "h2", text: "Contribution Margin Makes the Comparison Even Easier" },
      {
        type: "p",
        text: "Contribution margin expresses contribution profit as a percentage of revenue.",
      },
      { type: "p", text: "The calculation is:" },
      { type: "formula", lines: ["Contribution Profit ÷ Revenue × 100 = Contribution Margin"] },
      { type: "p", text: "Using our first example:" },
      {
        type: "formula",
        lines: ["$40,000 contribution profit ÷ $100,000 revenue = 40% contribution margin"],
      },
      {
        type: "p",
        text: "Contribution margin becomes especially useful when comparing different periods.",
      },
      { type: "p", text: "For example:" },
      {
        type: "table",
        head: ["", "Month 1", "Month 2"],
        rows: [
          ["Revenue", "$100,000", "$125,000"],
          ["Ad Spend", "$25,000", "$45,000"],
          ["Contribution Profit", "$40,000", "$30,000"],
          ["Contribution Margin", "40%", "24%"],
        ],
      },
      { type: "p", text: "Looking only at revenue, Month 2 appears better." },
      {
        type: "p",
        text: "Looking at profitability tells you that the business became significantly less efficient as advertising increased.",
      },
      {
        type: "p",
        text: "That's the type of change ecommerce operators need to see before deciding whether to continue scaling.",
      },

      { type: "h2", text: "Know Your Break-Even ROAS" },
      {
        type: "p",
        text: "Once you understand your margins, you can calculate the ROAS required for advertising to break even.",
      },
      {
        type: "p",
        text: "For a simplified example, assume a product sells for $100 and costs $60 to produce.",
      },
      { type: "p", text: "That leaves **$40 in gross profit**." },
      { type: "p", text: "Your gross margin is therefore **40%**." },
      {
        type: "p",
        text: "If you're willing to spend the entire $40 acquiring the sale, your break-even ROAS is:",
      },
      { type: "formula", lines: ["1 ÷ 0.40 = 2.5x"] },
      {
        type: "p",
        text: "At 2.5x ROAS, advertising has consumed the entire gross profit from the order before accounting for other expenses.",
      },
      { type: "p", text: "Now compare that with a company operating at a 70% gross margin:" },
      { type: "formula", lines: ["1 ÷ 0.70 = 1.43x"] },
      { type: "p", text: "That business can theoretically break even at a much lower ROAS." },
      {
        type: "p",
        text: "This is another reason generic benchmarks such as **\"You should target a 4x ROAS\"** aren't particularly useful.",
      },
      { type: "p", text: "Your target should be based on **your economics**." },

      { type: "h2", text: "MER Gives You Another View of Advertising Performance" },
      {
        type: "p",
        text: "ROAS usually looks at revenue attributed to a particular advertising platform.",
      },
      {
        type: "p",
        text: "MER, or **Marketing Efficiency Ratio**, looks at the relationship between total revenue and advertising spend.",
      },
      { type: "p", text: "A simplified calculation is:" },
      { type: "formula", lines: ["Total Revenue ÷ Total Ad Spend = MER"] },
      {
        type: "p",
        text: "If your Shopify store generates $100,000 and you spend $20,000 across Google and Meta:",
      },
      { type: "formula", lines: ["MER = 5x"] },
      {
        type: "p",
        text: "MER gives you a broader view of advertising efficiency because it isn't dependent on Meta and Google agreeing about who deserves credit for each purchase.",
      },
      { type: "p", text: "That's particularly useful because they often don't." },

      { type: "h2", text: "Why Meta, Google and Shopify Revenue Don't Match" },
      { type: "p", text: "This causes a lot of confusion for ecommerce businesses." },
      {
        type: "ul",
        items: [
          "Meta may report one revenue number.",
          "Google Ads reports another.",
          "Google Analytics reports something different.",
          "Shopify gives you the actual store revenue.",
        ],
      },
      { type: "p", text: "That doesn't necessarily mean something is broken." },
      {
        type: "p",
        text: "Each platform has its own attribution methodology and is trying to determine which purchases its advertising influenced.",
      },
      { type: "p", text: "A customer could:" },
      {
        type: "ul",
        items: [
          "Discover your company through a Meta ad.",
          "Visit your website.",
          "Leave.",
          "Search for your brand on Google two days later.",
          "Click a Google ad.",
          "Purchase.",
        ],
      },
      { type: "p", text: "Meta may claim credit." },
      { type: "p", text: "Google may also claim credit." },
      { type: "p", text: "Shopify records one order." },
      {
        type: "p",
        text: "If you simply add Meta's attributed revenue and Google's attributed revenue together, you can end up with more \"advertising revenue\" than your business actually generated.",
      },
      {
        type: "p",
        text: "That's why profitability analysis should ultimately reconcile back to the **actual business results**, not just the individual ad platforms.",
      },

      { type: "h2", text: "Organic and Direct Revenue Matter Too" },
      {
        type: "p",
        text: "This is one of the most overlooked parts of ecommerce advertising analysis.",
      },
      { type: "p", text: "Advertising doesn't operate in isolation." },
      {
        type: "p",
        text: "Someone may see a Meta ad today and visit your website directly tomorrow.",
      },
      {
        type: "p",
        text: "A Google Shopping campaign might introduce thousands of people to your brand who later search for your company organically.",
      },
      {
        type: "p",
        text: "Customers may see several ads before purchasing through another channel.",
      },
      {
        type: "p",
        text: "That's why it's useful to monitor the relationship between **paid revenue** and **non-paid revenue** as advertising spend changes.",
      },
      {
        type: "p",
        text: "Suppose your business normally generates $50,000 per month without advertising.",
      },
      {
        type: "p",
        text: "You begin spending $20,000 per month on ads and total revenue increases to $120,000.",
      },
      { type: "p", text: "Looking only at platform attribution misses part of the story." },
      { type: "p", text: "The more important question is:" },
      {
        type: "quote",
        text: "What happened to the entire business after we introduced that advertising spend?",
      },

      { type: "h2", text: "This Is Where TACoS Can Be Useful" },
      { type: "p", text: "TACoS stands for **Total Advertising Cost of Sales**." },
      { type: "p", text: "It's commonly calculated as:" },
      { type: "formula", lines: ["Advertising Spend ÷ Total Revenue × 100 = TACoS"] },
      {
        type: "p",
        text: "If you spend $20,000 on advertising and generate $100,000 in total revenue:",
      },
      { type: "formula", lines: ["TACoS = 20%"] },
      { type: "p", text: "Another way to express the same relationship is:" },
      { type: "formula", lines: ["$100,000 ÷ $20,000 = 5x MER"] },
      { type: "p", text: "These metrics provide a blended view of advertising efficiency." },
      { type: "p", text: "Instead of asking:" },
      { type: "quote", text: "How much revenue does Meta say Meta generated?" },
      { type: "p", text: "You're asking:" },
      {
        type: "quote",
        text: "How much advertising did we need to generate the total revenue the business produced?",
      },
      {
        type: "p",
        text: "Neither metric should be viewed in isolation, but together with contribution profit and margin, they provide a much clearer picture.",
      },

      { type: "h2", text: "Scaling Ads Changes the Economics" },
      {
        type: "p",
        text: "One of the biggest mistakes ecommerce businesses make is assuming that advertising efficiency will remain constant as spend increases.",
      },
      { type: "p", text: "Suppose you're spending $500 per day at a 5x ROAS." },
      { type: "p", text: "It's tempting to think:" },
      { type: "quote", text: "If we spend $1,000 per day, we'll simply double our sales." },
      { type: "p", text: "Sometimes revenue does scale efficiently." },
      { type: "p", text: "Often it doesn't." },
      {
        type: "p",
        text: "As budgets increase, platforms may need to reach less-qualified customers. Frequency can increase. Your best-performing audiences can become saturated. Customer acquisition costs can rise.",
      },
      { type: "p", text: "That's why scaling should be evaluated incrementally." },
      { type: "p", text: "Instead of simply asking **\"Did revenue increase?\"**, ask:" },
      {
        type: "callout",
        body: "Did the additional advertising spend generate enough additional contribution profit to justify it?",
      },
      { type: "p", text: "That's a much higher standard." },
      { type: "p", text: "And it's how profitable scaling should be evaluated." },

      { type: "h2", text: "Don't Ignore Average Order Value" },
      {
        type: "p",
        text: "Customer acquisition cost gets most of the attention, but average order value can be just as important.",
      },
      { type: "p", text: "Suppose it costs $30 to acquire a customer." },
      { type: "p", text: "If the average customer spends $50, the economics may be difficult." },
      { type: "p", text: "If that same customer spends $100, the picture changes considerably." },
      {
        type: "p",
        text: "That's why profitable ecommerce growth isn't always about finding cheaper traffic.",
      },
      {
        type: "p",
        text: "Sometimes the biggest opportunity is improving what happens **after the customer reaches the store**.",
      },
      { type: "p", text: "That could mean:" },
      {
        type: "ul",
        items: [
          "Product bundles",
          "Quantity discounts",
          "Cross-sells",
          "Upsells",
          "Free-shipping thresholds",
          "Better product recommendations",
          "Improved merchandising",
        ],
      },
      {
        type: "p",
        text: "Increasing AOV allows the business to support a higher acquisition cost without necessarily sacrificing profitability.",
      },

      { type: "h2", text: "Conversion Rate Matters for the Same Reason" },
      { type: "p", text: "Imagine you're paying $1 per website visitor." },
      { type: "p", text: "At a 1% conversion rate:" },
      {
        type: "formula",
        lines: ["100 visitors = $100 in traffic", "1 purchase = $100 CAC"],
      },
      { type: "p", text: "At a 2% conversion rate:" },
      {
        type: "formula",
        lines: ["100 visitors = $100 in traffic", "2 purchases = $50 CAC"],
      },
      {
        type: "p",
        text: "You cut your effective acquisition cost in half without reducing your cost per click.",
      },
      {
        type: "p",
        text: "This is why advertising optimization and website optimization shouldn't be treated as completely separate disciplines.",
      },
      { type: "p", text: "The ad gets the customer to the store." },
      { type: "p", text: "The store still has to convert them." },

      { type: "h2", text: "The Metrics Ecommerce Brands Should Watch Together" },
      { type: "p", text: "There isn't one metric that tells you everything." },
      { type: "p", text: "A strong profitability view combines several:" },
      {
        type: "ul",
        items: [
          "**Revenue** tells you the size of the business.",
          "**Ad Spend** tells you how much you're investing in customer acquisition.",
          "**ROAS** tells you how efficiently an individual platform reports generating revenue.",
          "**MER/TACoS** shows advertising spend relative to total business revenue.",
          "**AOV** tells you how much each order is worth.",
          "**CAC** tells you what it costs to acquire a customer.",
          "**COGS** tells you how much of your revenue is consumed by the products being sold.",
          "**Contribution Profit** tells you how much money remains after important variable costs.",
          "**Contribution Margin** tells you how efficiently revenue turns into contribution profit.",
        ],
      },
      { type: "p", text: "The important part isn't finding one \"perfect\" KPI." },
      { type: "p", text: "It's understanding **how these metrics interact**." },

      { type: "h2", text: "What Profitable Scaling Actually Looks Like" },
      { type: "p", text: "Profitable ecommerce growth isn't simply:" },
      { type: "formula", lines: ["Spend more → Generate more revenue"] },
      { type: "p", text: "It's:" },
      {
        type: "formula",
        lines: [
          "Spend more → Generate additional revenue → Preserve acceptable margins → Increase total contribution profit",
        ],
      },
      {
        type: "p",
        text: "There may be times when accepting a lower margin makes sense because total profit is increasing substantially.",
      },
      {
        type: "p",
        text: "There may also be times when revenue growth isn't worth pursuing because acquisition costs are rising faster than sales.",
      },
      { type: "p", text: "The objective isn't necessarily to maximize ROAS." },
      { type: "p", text: "And it isn't necessarily to maximize revenue." },
      {
        type: "p",
        text: "The objective is to find the point where advertising creates the **best economic outcome for the business.**",
      },

      { type: "h2", text: "Stop Managing Your Business From Inside the Ad Platforms" },
      { type: "p", text: "Meta is extremely useful for understanding Meta Ads." },
      { type: "p", text: "Google Ads is extremely useful for understanding Google Ads." },
      { type: "p", text: "Neither platform has a complete view of your business." },
      {
        type: "p",
        text: "They don't naturally combine your actual Shopify revenue, product costs, organic sales, and advertising spend into one profitability model.",
      },
      { type: "p", text: "That's the problem we built **ScaleAble** to solve." },
      {
        type: "p",
        text: "ScaleAble brings together Shopify revenue, real product costs, and advertising spend from Google and Meta so ecommerce brands can see metrics such as contribution profit, contribution margin, paid vs. non-paid revenue, and overall advertising efficiency in one place.",
      },
      { type: "p", text: "Instead of asking:" },
      { type: "quote", text: "What ROAS did Meta report?" },
      { type: "p", text: "you can start asking:" },
      { type: "quote", text: "Did increasing our advertising actually make the business more profitable?" },
      { type: "p", text: "That's ultimately the number worth scaling." },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((post) => post.slug === slug);
}

/** Newest first. Used by the index page and the "more reading" rail. */
export function sortedInsights() {
  return [...insights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Section headings, used to build the in-article table of contents. */
export function insightSections(post: InsightPost) {
  return post.blocks
    .filter((block): block is Extract<InsightBlock, { type: "h2" }> => block.type === "h2")
    .map((block) => ({ id: slugifyHeading(block.text), text: block.text }));
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function formatInsightDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
