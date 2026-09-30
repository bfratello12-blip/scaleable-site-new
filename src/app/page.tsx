import Link from "next/link";
import type { Metadata } from "next";
import { DivergenceChart } from "@/components/charts/ProfitSpendChart";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { CtaBand } from "@/components/marketing/CtaBand";
import { HeroConsole } from "@/components/marketing/HeroConsole";
import { ManagedPricingCard } from "@/components/marketing/PricingPanel";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell, Eyebrow } from "@/components/ui/Section";
import { caseStudies } from "@/content/caseStudies";
import { generalFaqs } from "@/content/faqs";
import { engagementProcess, servicePillars } from "@/content/services";
import { softwareOutputs } from "@/content/software";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, managedService, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "ScaleAble — Profit-First Paid Media for Shopify Brands",
  description:
    "ScaleAble manages Google Ads and Meta Ads for Shopify brands using our own Shopify profit analytics. Scale on contribution profit, not platform ROAS. $2,000/month, everything included.",
  path: "/",
  keywords: [
    "Shopify paid media management",
    "Shopify advertising agency",
    "Google Ads for Shopify",
    "Meta Ads for Shopify",
    "ecommerce paid media",
    "Shopify profit analytics",
    "ecommerce profitability",
  ],
});

const marqueeItems = [
  "Google Ads",
  "Meta Ads",
  "Contribution profit",
  "Product-level margin",
  "Blended MER",
  "Creative testing",
  "Conversion rate optimisation",
  "Shopify analytics",
  "Scaling strategy",
];

const problems = [
  {
    title: "Revenue grows. Profit doesn't.",
    body: "Spend goes up, the dashboard looks healthy, and the bank balance disagrees. Without real costs in the picture, scale is just a faster way to lose margin.",
  },
  {
    title: "ROAS doesn't know your costs.",
    body: "A 4x return is excellent or catastrophic depending on COGS, shipping, fulfilment and fees. The ad platform has never seen any of those numbers.",
  },
  {
    title: "Nobody can explain why it changed.",
    body: "Profit moved. Was it the budget shift, the promotion, the product mix, or the price increase? Without event tracking it stays a debate.",
  },
];

export default function HomePage() {
  const featured = caseStudies.slice(0, 2);

  return (
    <>
      <JsonLd data={faqSchema(generalFaqs.slice(0, 4))} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: managedService.name,
          serviceType: "Shopify paid media management",
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: "Worldwide",
          audience: { "@type": "Audience", audienceType: "Shopify ecommerce brands" },
          offers: {
            "@type": "Offer",
            price: managedService.price,
            priceCurrency: managedService.currency,
            url: `${siteConfig.url}/pricing`,
            availability: "https://schema.org/InStock",
          },
        }}
      />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="surface-ink overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />
        <Shell className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <Reveal>
                <p className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-300">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                  Paid media for Shopify brands
                </p>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="text-[clamp(2.4rem,1.3rem+4vw,4.6rem)] leading-[0.98] text-white">
                  Revenue is easy to grow.
                  <br />
                  <span className="text-gradient-brand">Profit is harder.</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="max-w-xl text-[1.08rem] leading-relaxed text-white/68 sm:text-[1.15rem]">
                  We manage Google Ads and Meta Ads for Shopify brands — and we measure every decision
                  inside our own Shopify analytics platform, against contribution profit rather than
                  the numbers the ad platforms report about themselves.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    href={BOOK_CALL_URL}
                    size="lg"
                    trailingIcon
                    {...tracked(ANALYTICS_EVENTS.bookCall, "home_hero")}
                  >
                    Book a call
                  </Button>
                  <Button
                    href="/managed-growth"
                    variant="light"
                    size="lg"
                    {...tracked(ANALYTICS_EVENTS.contactCta, "home_hero")}
                  >
                    See what we manage
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-3">
                  {[
                    { label: "Managed growth", value: `${managedService.priceFormatted} / month` },
                    { label: "Platforms", value: "Google Ads + Meta Ads" },
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

      {/* ------------------------------------------------------------- PROBLEM */}
      <Section tone="white" size="md">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="The gap"
                title={
                  <>
                    Your ad account is not
                    <br className="hidden sm:block" /> your profit and loss.
                  </>
                }
                lede="Google and Meta optimise toward the outcomes they can see: conversions, revenue, CPA, platform ROAS. They have never seen your COGS, your shipping costs, your fulfilment, or your fees. Most agencies report from inside that same blind spot."
              />
              <div className="mt-10 flex flex-col divide-y divide-ink-900/10 border-t border-ink-900/10">
                {problems.map((problem, i) => (
                  <div key={problem.title} className="flex gap-5 py-6">
                    <span className="mt-1 font-mono text-[0.72rem] text-brand-700/60">
                      0{i + 1}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[1.08rem] font-semibold text-ink-900">{problem.title}</h3>
                      <p className="max-w-md text-[0.94rem] leading-relaxed text-ink-900/62">
                        {problem.body}
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

      {/* ---------------------------------------------------------- DIFFERENCE */}
      <Section tone="ink" size="md" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              tone="light"
              align="center"
              eyebrow="Why ScaleAble"
              title="An agency and an analytics product, built to work as one thing."
              lede="Most brands choose between a media buyer who can't see the P&L and a dashboard that can't run campaigns. We built both sides because neither works properly on its own."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-4">
            <Reveal className="h-full">
              <div className="flex h-full flex-col gap-5 rounded-3xl border border-white/12 bg-white/[0.04] p-8 sm:p-10">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-300">
                  Managed services
                </p>
                <h3 className="text-[1.55rem] leading-snug text-white">
                  Experienced hands in the ad accounts
                </h3>
                <p className="text-[0.96rem] leading-relaxed text-white/60">
                  Paid search and paid social built, restructured and scaled by someone who has done
                  it at volume. Creative strategy, ad design, testing and conversion work included —
                  because the account is rarely the only thing holding performance back.
                </p>
                <ul className="mt-auto flex flex-col gap-2.5 pt-4">
                  {servicePillars.slice(0, 3).map((pillar) => (
                    <li key={pillar.id} className="flex items-center gap-3 text-[0.88rem] text-white/70">
                      <span aria-hidden="true" className="h-px w-5 bg-brand-500/60" />
                      {pillar.eyebrow}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="flex items-center justify-center py-2 lg:px-2">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink-850 font-display text-xl text-brand-300"
              >
                +
              </span>
            </div>

            <Reveal delay={100} className="h-full">
              <div className="flex h-full flex-col gap-5 rounded-3xl border border-brand-400/25 bg-gradient-to-b from-brand-700/18 to-transparent p-8 sm:p-10">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-300">
                  Proprietary software
                </p>
                <h3 className="text-[1.55rem] leading-snug text-white">
                  Our own Shopify profit analytics
                </h3>
                <p className="text-[0.96rem] leading-relaxed text-white/60">
                  ScaleAble pulls Shopify revenue, real product costs, business costs and ad spend into one view, so
                  we can see what a budget change did to contribution profit, product margin, organic
                  and direct revenue — not just what Google and Meta claim credit for.
                </p>
                <ul className="mt-auto flex flex-col gap-2.5 pt-4">
                  {["Contribution profit & margin", "Blended MER vs. platform ROAS", "Product-level profitability"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-3 text-[0.88rem] text-white/70">
                        <span aria-hidden="true" className="h-px w-5 bg-brand-400/70" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <p className="mx-auto mt-12 max-w-2xl text-center text-[1.05rem] leading-relaxed text-white/70">
              The result: scaling decisions made on evidence from your Shopify business, not on a
              metric the ad platform grades itself with.
            </p>
          </Reveal>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------ SERVICES */}
      <Section tone="white" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="What we manage"
              title="A full ecommerce growth function, not a bid-management service."
              lede="Four workstreams run in parallel for every brand we take on. They are not add-ons or upsells — they are the job."
            />
          </Reveal>

          <div className="mt-14 border-t border-ink-900/10">
            {servicePillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 70}>
                <Link
                  href={`/managed-growth#${pillar.id}`}
                  className="group grid gap-4 border-b border-ink-900/10 py-9 transition-colors duration-300 hover:bg-mist-50 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1fr)] lg:items-baseline lg:px-4"
                >
                  <span className="font-mono text-[0.75rem] text-brand-700/50">{pillar.index}</span>
                  <div className="flex flex-col gap-2">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-700">
                      {pillar.eyebrow}
                    </p>
                    <h3 className="max-w-lg text-[1.35rem] leading-snug text-ink-900 sm:text-[1.55rem]">
                      {pillar.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="max-w-md text-[0.95rem] leading-relaxed text-ink-900/62">
                      {pillar.lede}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-brand-700">
                      Details
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------ SOFTWARE */}
      <Section tone="ink" size="md" className="overflow-hidden">
        <Shell className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeading
                tone="light"
                eyebrow="The differentiator"
                title="The software your agency doesn't have."
                lede="ScaleAble started as a Shopify analytics product. It is still the reason our media management works differently — every recommendation we make is checked against what actually happened to profit."
              />

              <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {softwareOutputs.slice(0, 4).map((output) => (
                  <div key={output.metric} className="flex flex-col gap-1.5 border-l border-brand-500/40 pl-4">
                    <dt className="text-[0.95rem] font-medium text-white">{output.metric}</dt>
                    <dd className="text-[0.87rem] leading-relaxed text-white/55">{output.body}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/software" size="lg" trailingIcon>
                  Explore the software
                </Button>
                <Button
                  href={siteConfig.shopifyAppUrl}
                  variant="shopify"
                  size="lg"
                  {...tracked(ANALYTICS_EVENTS.shopifyInstall, "home_software")}
                >
                  Install on Shopify
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-brand-700/18 blur-[70px]"
                />
                <div className="relative flex flex-col gap-4">
                  <ImagePlaceholder
                    number={2}
                    kind="dashboard"
                    tone="dark"
                    chrome
                    chromeLabel="app.scaleableapp.com / product-performance"
                    label="Product profitability view — revenue, contribution profit, margin and profit per unit by SKU"
                    width={1800}
                    height={1150}
                    ratio="~16:10"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ImagePlaceholder
                      number={3}
                      kind="chart"
                      tone="dark"
                      label="Blended MER / True ROAS vs. platform-reported ROAS"
                      width={900}
                      height={700}
                      ratio="~9:7"
                    />
                    <ImagePlaceholder
                      number={4}
                      kind="chart"
                      tone="dark"
                      label="Channel revenue — paid, organic and direct against ad spend"
                      width={900}
                      height={700}
                      ratio="~9:7"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------- PROCESS */}
      <Section tone="mist" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="How it runs"
              title="Connect the data. Model the costs. Then start moving budget."
              lede="Nothing material changes in your accounts until we can measure the effect on profit. That order matters more than anything else we do."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagementProcess.map((step, i) => (
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
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {step.detail.map((d) => (
                      <li
                        key={d}
                        className="rounded-full bg-brand-700/7 px-2.5 py-1 text-[0.7rem] text-brand-800"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------- RESULTS */}
      <Section tone="ink" size="md">
        <Shell>
          <Reveal>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                tone="light"
                eyebrow="Client results"
                title="What changes when profit is the scoreboard."
                className="mb-0"
              />
              <Button href="/results" variant="light" trailingIcon className="shrink-0">
                All case studies
              </Button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featured.map((study, i) => (
              <Reveal key={study.slug} delay={i * 90} className="h-full">
                <CaseStudyCard study={study} tone="dark" className="h-full" />
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------- PRICING */}
      <Section tone="white" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Pricing"
              title="One retainer. The whole growth function."
              lede="No percentage of ad spend, no per-channel pricing, no separate creative invoice."
            />
          </Reveal>
          <Reveal delay={100}>
            <ManagedPricingCard location="home_pricing" className="mt-12" />
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 text-center text-[0.9rem] text-ink-900/55">
              Want the detail?{" "}
              <Link href="/pricing" className="font-medium text-brand-700 underline-offset-4 hover:underline">
                See exactly what&apos;s included
              </Link>
              .
            </p>
          </Reveal>
        </Shell>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section tone="mist" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <Eyebrow>Common questions</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.08] text-ink-900">
                The things brands ask before they start.
              </h2>
              <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-ink-900/62">
                If yours isn&apos;t here,{" "}
                <Link href="/contact" className="font-medium text-brand-700 underline-offset-4 hover:underline">
                  ask it directly
                </Link>
                .
              </p>
            </Reveal>
            <Reveal delay={100}>
              <FaqList faqs={generalFaqs} />
            </Reveal>
          </div>
        </Shell>
      </Section>

      <CtaBand location="home_footer_cta" />
    </>
  );
}
