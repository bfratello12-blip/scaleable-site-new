import type { Metadata } from "next";
import { DivergenceChart } from "@/components/charts/ProfitSpendChart";
import { LeadForm } from "@/components/forms/LeadForm";
import { LandingFooter, LandingHeader, StickyFormCta } from "@/components/landing/LandingChrome";
import { HeroConsole } from "@/components/marketing/HeroConsole";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import type { Faq } from "@/content/faqs";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, managedService, siteConfig } from "@/lib/site";

/**
 * Standalone landing page for paid Reddit traffic.
 *
 * Single conversion goal: the free profit analysis form at #profit-analysis.
 * Site navigation is suppressed by `ChromeGate` (see `lib/site.ts` BARE_ROUTE_PREFIXES),
 * and the page is noindexed so it never competes with the marketing site in organic.
 */

const FORM_ANCHOR = "#profit-analysis";
const CTA_LABEL = "Get my free profit analysis";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Free Profit Analysis for Shopify Brands Running Meta & Google Ads",
    description:
      "Good ROAS and growing revenue don't mean growing profit. We'll show you what your Meta and Google spend is actually doing to contribution profit — free, for Shopify brands.",
    path: "/lp/shopify-profit-analysis",
  }),
  robots: { index: false, follow: false },
};

const marqueeItems = [
  "Contribution profit",
  "Blended MER",
  "Product-level margin",
  "COGS & shipping",
  "Meta Ads",
  "Google Ads",
  "True ROAS",
  "Profit per SKU",
  "Shopify",
];

const gaps = [
  {
    title: "A 4x ROAS can still lose money.",
    body: "Google and Meta have never seen your COGS, shipping, fulfilment or payment fees. They grade their own homework on revenue they believe they caused.",
  },
  {
    title: "Revenue grew. Profit didn't follow.",
    body: "Spend goes up, the dashboards look healthy, and the bank balance disagrees. Without real costs in the picture, scale is just a faster way to lose margin.",
  },
  {
    title: "Nobody can explain why it moved.",
    body: "Was it the budget shift, the promotion, the product mix or the price increase? Without event tracking, every performance conversation stays a debate.",
  },
];

const deliverables = [
  {
    id: "profit-vs-spend",
    eyebrow: "01 — Profit vs. ad spend",
    title: "What each extra dollar of spend is actually earning",
    body: "Contribution profit plotted against your daily and monthly ad spend, so the point where more budget stops producing more profit is visible instead of theoretical.",
    bullets: [
      "The spend level where margin starts to compress",
      "Your last budget increase, measured on profit",
    ],
    image: { number: 12, label: "Contribution profit charted against daily ad spend", width: 1800, height: 1100, ratio: "~16:10" },
  },
  {
    id: "true-roas",
    eyebrow: "02 — MER vs. platform ROAS",
    title: "What the platforms claim, next to what Shopify says",
    body: "Blended MER — total Shopify revenue over total ad spend — sitting alongside platform-reported ROAS, so the gap between the two is a number rather than an argument.",
    bullets: [
      "Where reported ROAS holds while blended performance falls",
      "Forward-window attribution for delayed revenue",
    ],
    image: { number: 13, label: "Blended MER and True ROAS against platform-reported ROAS", width: 1800, height: 1100, ratio: "~16:10" },
  },
  {
    id: "product-profit",
    eyebrow: "03 — Product profitability",
    title: "Which products are worth scaling, and which are funded losses",
    body: "Real per-product costs applied to revenue, so you see contribution profit, margin and profit per unit at SKU level — the list that should be deciding where budget goes.",
    bullets: [
      "Hero products that are unprofitable once costs land",
      "The SKUs your Shopping and catalog budget should follow",
    ],
    image: { number: 14, label: "Product performance — profit, margin and profit per unit by SKU", width: 1800, height: 1150, ratio: "~16:10" },
  },
  {
    id: "channels",
    eyebrow: "04 — Channel & halo impact",
    title: "What paid spend does to organic and direct",
    body: "Ad spend charted against paid, organic, direct and unknown revenue, so the halo effect — or the lack of one — is measured instead of assumed in either direction.",
    bullets: [
      "Whether scaling paid lifts or cannibalises other channels",
      "Cleaner context for brand vs. non-brand budget calls",
    ],
    image: { number: 15, label: "Channel revenue versus ad spend — paid, organic, direct and unknown", width: 1800, height: 1050, ratio: "~16:9" },
  },
];

const steps = [
  {
    step: "01",
    title: "Send us the basics",
    body: "Store URL, roughly what you spend a month, and the platforms you're on. Under two minutes — the detail box is optional and no call is required.",
  },
  {
    step: "02",
    title: "We model your real economics",
    body: "Shopify revenue, product costs, shipping, fulfilment and fees go in alongside Google Ads and Meta Ads spend — inside the same analytics platform we run client accounts on.",
  },
  {
    step: "03",
    title: "You get the analysis",
    body: "Contribution profit by product and channel, where spend is making money, where it isn't, and the first three changes we'd make. Yours to keep, with no obligation to hire us.",
  },
];

const returns = [
  "Contribution profit and margin for the period we review",
  "Blended MER against the ROAS your platforms report",
  "Your most and least profitable products after real costs",
  "Where we'd move budget first, and what we'd expect it to do",
];

const faqs: Faq[] = [
  {
    question: "Is the profit analysis actually free?",
    answer: `Yes. The analysis itself costs nothing and carries no obligation — plenty of brands take it and act on it themselves, which is a perfectly good outcome. If you do want us running the accounts afterwards, managed growth is ${managedService.priceFormatted} per month, flat.`,
  },
  {
    question: "What do you need from us?",
    answer:
      "To start: your store URL and roughly what you're spending. To go deep: read-only access to Shopify, Google Ads and Meta Ads, plus your product costs. We'll tell you exactly what to share and you can stop at any point.",
  },
  {
    question: "How is this different from a normal PPC agency audit?",
    answer:
      "A typical audit reports the numbers already inside Google Ads and Meta Ads. We build the analysis on contribution profit inside your Shopify business — how spend affects product profitability, organic and direct revenue, and overall margin.",
  },
  {
    question: "Why do you focus on profit rather than ROAS?",
    answer:
      "Ad platforms optimise toward conversions, revenue and platform ROAS because that is what they can see. They do not know your COGS, shipping, fulfilment or fees. Revenue is comparatively easy to grow — profit is the harder and more useful problem.",
  },
  {
    question: "What happens if we want you to run the ads?",
    answer: `Managed growth is ${managedService.priceFormatted} per month, flat — Google Ads, Meta Ads, creative, CRO and the ScaleAble analytics in one retainer. It is not a percentage of spend, so our incentive is never simply to spend more of your budget.`,
  },
  {
    question: "Do you work with brands that aren't on Shopify?",
    answer:
      "Not for this. The analysis is built on Shopify data, so if you're on another platform the profit analytics that makes this approach work won't be available.",
  },
];

export default function RedditProfitAnalysisPage() {
  return (
    <>
      <LandingHeader
        ctaHref={FORM_ANCHOR}
        ctaLabel="Get my free analysis"
        note="Free profit analysis for Shopify brands"
        location="lp_profit_analysis_header"
      />

      {/* ---------------------------------------------------------------- HERO */}
      <section
        id="lp-main"
        className="surface-ink overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />
        <Shell className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <Reveal>
                <p className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-300">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                  Shopify brands running Meta &amp; Google Ads
                </p>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="text-[clamp(2.15rem,1.15rem+3.3vw,3.7rem)] leading-[1.02] text-white">
                  Your Shopify revenue is growing.
                  <br />
                  <span className="text-gradient-brand">Is your profit?</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="max-w-xl text-[1.08rem] leading-relaxed text-white/68 sm:text-[1.15rem]">
                  Google and Meta report the performance they can attribute to themselves. ScaleAble
                  shows whether that ad spend is actually increasing contribution profit — after COGS,
                  shipping, fulfilment and fees. We&apos;ll run that analysis on your store, free.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    href={FORM_ANCHOR}
                    size="lg"
                    trailingIcon
                    {...tracked(ANALYTICS_EVENTS.contactCta, "lp_profit_analysis_hero")}
                  >
                    {CTA_LABEL}
                  </Button>
                  <Button
                    href="#whats-included"
                    variant="light"
                    size="lg"
                    {...tracked(ANALYTICS_EVENTS.contactCta, "lp_profit_analysis_hero_secondary")}
                  >
                    See what&apos;s in it
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={210}>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.84rem] text-white/45">
                  <span>The analysis is free</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-500/60" />
                  <span>No obligation to hire us</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-500/60" />
                  <span>
                    Managed growth is {managedService.priceFormatted}/month if you want it
                  </span>
                </p>
              </Reveal>

              <Reveal delay={240}>
                <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-3">
                  {[
                    { label: "The analysis", value: "Free" },
                    {
                      label: "Managed growth",
                      value: `${managedService.priceFormatted} / month`,
                    },
                    { label: "Measured in", value: "Contribution profit" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/35">
                        {item.label}
                      </dt>
                      <dd className="text-[0.95rem] font-medium text-white/85">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <HeroConsole />
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------- MARQUEE */}
      <div className="surface-ink border-y border-white/8 py-4">
        <div className="mask-fade-edges overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-10 pr-10">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-10 text-[0.8rem] uppercase tracking-[0.16em] text-white/35"
              >
                {item}
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-500/60" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- THE GAP */}
      <Section tone="white" size="md">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="The gap nobody reports on"
                title={
                  <>
                    Your ad account is not
                    <br className="hidden sm:block" /> your profit and loss.
                  </>
                }
                lede="Google and Meta optimise toward the outcomes they can see: conversions, revenue, CPA, platform ROAS. They have never seen your COGS, your shipping costs, your fulfilment, or your fees. Most reporting is written from inside that same blind spot."
              />
              <div className="mt-10 flex flex-col divide-y divide-ink-900/10 border-t border-ink-900/10">
                {gaps.map((gap, i) => (
                  <div key={gap.title} className="flex gap-5 py-6">
                    <span className="mt-1 font-mono text-[0.72rem] text-brand-700/60">0{i + 1}</span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[1.08rem] font-semibold text-ink-900">{gap.title}</h3>
                      <p className="max-w-md text-[0.94rem] leading-relaxed text-ink-900/62">
                        {gap.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-ink-900 p-7 sm:p-9">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-700/35 blur-[80px]"
                />
                <div className="relative">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-300">
                    What that looks like
                  </p>
                  <h3 className="mt-3 max-w-sm text-[1.35rem] leading-snug text-white">
                    Platform ROAS holds steady. Contribution profit quietly walks out the door.
                  </h3>
                  <DivergenceChart className="mt-6" />
                  <p className="mt-5 border-t border-white/10 pt-5 text-[0.78rem] leading-relaxed text-white/40">
                    Illustrative pattern, not client data. It is also the single most common thing we
                    find when we first connect a store&apos;s real costs.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* -------------------------------------------------------- DELIVERABLES */}
      <Section id="whats-included" tone="ink" size="md" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              tone="light"
              align="center"
              eyebrow="The free profit analysis"
              title="Four views the ad platforms can't give you."
              lede="We build it in ScaleAble — our own Shopify profit analytics, the same product we run client accounts on. Your real costs go in, and the numbers below come out."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {deliverables.map((item, i) => (
              <Reveal key={item.id} delay={(i % 2) * 90} className="h-full">
                <div className="flex h-full flex-col gap-5 rounded-3xl border border-white/12 bg-white/[0.04] p-6 sm:p-8">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-brand-300">
                    {item.eyebrow}
                  </p>
                  <h3 className="text-[1.3rem] leading-snug text-white">{item.title}</h3>
                  <p className="text-[0.94rem] leading-relaxed text-white/60">{item.body}</p>
                  <ul className="flex flex-col gap-2.5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[0.88rem] leading-relaxed text-white/70">
                        <span aria-hidden="true" className="mt-2.5 h-px w-5 shrink-0 bg-brand-400/70" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <ImagePlaceholder
                    number={item.image.number}
                    kind="chart"
                    tone="dark"
                    label={item.image.label}
                    width={item.image.width}
                    height={item.image.height}
                    ratio={item.image.ratio}
                    className="mt-auto"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-12 flex flex-col items-center gap-5">
              <p className="max-w-2xl text-center text-[1.05rem] leading-relaxed text-white/70">
                The point isn&apos;t a prettier dashboard. It&apos;s knowing which half of your ad
                spend is building the business and which half is renting revenue.
              </p>
              <Button
                href={FORM_ANCHOR}
                size="lg"
                trailingIcon
                {...tracked(ANALYTICS_EVENTS.contactCta, "lp_profit_analysis_deliverables")}
              >
                {CTA_LABEL}
              </Button>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------- PROCESS */}
      <Section tone="mist" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Three steps, and only one of them is yours."
              lede="No discovery sequence, no SDR, no deck. The person who would run your accounts is the person who does the analysis."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.step} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-ink-900/10 bg-white p-7 shadow-lift">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 font-mono text-[0.72rem] text-white">
                      {step.step}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-ink-900/10" />
                  </div>
                  <h3 className="text-[1.12rem] leading-snug text-ink-900">{step.title}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-ink-900/62">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* --------------------------------------------------------- WHY LISTEN */}
      <Section tone="white" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Why us"
                title="An agency and an analytics product, built to work as one thing."
                lede="Most brands choose between a media buyer who can't see the P&L and a dashboard that can't run campaigns. We built both sides because neither works properly on its own — and the analysis you get is a direct output of that."
              />
            </Reveal>

            <Reveal delay={110}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: "Our own software",
                    body: "ScaleAble is a live Shopify app, not a spreadsheet template.",
                  },
                  {
                    label: "Senior hands only",
                    body: "The person building the strategy is the person in the accounts.",
                  },
                  {
                    label: `${managedService.priceFormatted} / month, flat`,
                    body: "If you hire us: paid search, paid social, creative, CRO and analytics in one retainer.",
                  },
                  {
                    label: "Never a % of spend",
                    body: "Our incentive is your contribution profit, not your budget.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-2 rounded-3xl border border-ink-900/10 bg-mist-50 p-6"
                  >
                    <p className="text-[0.95rem] font-semibold text-ink-900">{item.label}</p>
                    <p className="text-[0.88rem] leading-relaxed text-ink-900/62">{item.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ---------------------------------------------------------------- FORM */}
      <Section id="profit-analysis" tone="ink" size="md" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b"
        />
        <Shell className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                tone="light"
                eyebrow="Free profit analysis"
                title="Tell us what you're spending and selling."
                lede="Store, spend and platforms is enough to start. The more context you add, the more specific the analysis comes back."
                className="mb-10"
              />
              <LeadForm
                tone="dark"
                location="lp_profit_analysis_form"
                submitLabel={CTA_LABEL}
                messageLabel="Anything specific you want us to look at?"
                messageRequired={false}
                messagePlaceholder="Spend is up 40% this year and revenue followed, but profit hasn't moved. We're running Shopping and Meta and can't tell which products are actually worth pushing."
                successTitle="Request received — thank you."
                successBody="We read every submission personally and reply within one business day with what we need to run the analysis."
                footnote={`Goes straight to ${siteConfig.contactEmail}. No sequences, no sales floor.`}
              />
            </Reveal>

            <Reveal delay={110}>
              <div className="flex flex-col gap-6">
                <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-8">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-300">
                    What you get back
                  </p>
                  <ul className="mt-5 flex flex-col gap-4">
                    {returns.map((item) => (
                      <li key={item} className="flex gap-3.5 text-[0.92rem] leading-relaxed text-white/72">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-profit-500/15 text-profit-400">
                          <svg
                            viewBox="0 0 20 20"
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="m4 10.5 4 4 8-9" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-ink-850/60 p-8">
                  <h3 className="text-[1.1rem] leading-snug text-white">
                    Free analysis. Paid service only if you want one.
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-white/60">
                    The analysis costs nothing and nothing is conditional on hiring us. If you do want
                    us running Google Ads and Meta Ads afterwards, managed growth is{" "}
                    {managedService.priceFormatted} per month, flat — paid search, paid social,
                    creative, CRO and the analytics in one retainer, never a percentage of spend.
                  </p>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-white/60">
                    And if you&apos;re not on Shopify, or the numbers don&apos;t support that retainer
                    yet, we&apos;ll say so — you still keep the analysis.
                  </p>
                  <p className="mt-5 border-t border-white/10 pt-5 text-[0.88rem] leading-relaxed text-white/50">
                    Prefer to talk it through first?{" "}
                    <a
                      href={BOOK_CALL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-300 underline-offset-4 hover:underline"
                      {...tracked(ANALYTICS_EVENTS.bookCall, "lp_profit_analysis_form")}
                    >
                      Book a 30-minute call
                    </a>
                    .
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section tone="mist" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Before you send it"
                title="The questions we get asked most."
                className="mb-0"
              />
            </Reveal>
            <Reveal delay={100}>
              <FaqList faqs={faqs} />
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="mt-14 flex justify-center">
              <Button
                href={FORM_ANCHOR}
                size="lg"
                trailingIcon
                {...tracked(ANALYTICS_EVENTS.contactCta, "lp_profit_analysis_faq")}
              >
                {CTA_LABEL}
              </Button>
            </div>
          </Reveal>
        </Shell>
      </Section>

      <LandingFooter>
        <p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-white/70 underline-offset-4 transition-colors hover:text-brand-300 hover:underline"
            {...tracked(ANALYTICS_EVENTS.contactCta, "lp_profit_analysis_footer")}
          >
            {siteConfig.contactEmail}
          </a>
        </p>
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Profit-first paid media for Shopify brands.
        </p>
      </LandingFooter>

      <StickyFormCta
        href={FORM_ANCHOR}
        label={CTA_LABEL}
        location="lp_profit_analysis_sticky"
      />
    </>
  );
}
