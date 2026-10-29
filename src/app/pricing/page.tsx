import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FeeCalculator } from "@/components/marketing/FeeCalculator";
import { PageHero } from "@/components/marketing/PageHero";
import { PricingFacts } from "@/components/marketing/PricingFacts";
import { ManagedPricingCard, SoftwareAccessCard } from "@/components/marketing/PricingPanel";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import { pricingFaqs } from "@/content/faqs";
import { servicePillars } from "@/content/services";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import {
  AGENCY_FEE_CAP,
  AGENCY_FEE_CAP_LABEL,
  AGENCY_FEE_CAP_THRESHOLD,
  AGENCY_FEE_FORMULA,
  AGENCY_FEE_RATE_LABEL,
  AGENCY_OFFER_CLARIFICATION,
  AGREED_COST_EXAMPLES,
  ELIGIBLE_PROFIT_DEFINITION,
  feeExamples,
  formatUsd,
} from "@/lib/pricing";
import { breadcrumbSchema, faqSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, managedService, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Pricing — ${AGENCY_FEE_RATE_LABEL} of Eligible Profit, Capped at ${AGENCY_FEE_CAP_LABEL} a Month`,
  description:
    "How our performance-based agency pricing works: 20% of monthly eligible profit after ad spend and agreed direct costs, capped at $3,000 a month, with no agency fee when there is no eligible profit.",
  path: "/pricing",
  keywords: [
    "performance-based marketing agency pricing",
    "profit-based agency fee",
    "ecommerce agency with no retainer",
    "Shopify ads agency pricing",
    "Google Ads management cost",
    "Meta Ads management cost",
  ],
});

const whatYouPayFor = [
  {
    title: "Our agency fee",
    body: `${AGENCY_FEE_RATE_LABEL} of monthly eligible profit, capped at ${AGENCY_FEE_CAP_LABEL} per month. This is the only thing we invoice for the managed service — no setup fee, no retainer, no minimum.`,
  },
  {
    title: "Your advertising spend",
    body: "Paid by you, directly to Google and Meta on your own billing accounts. We never take a margin on media, and the cap does not apply to it.",
  },
  {
    title: "Your business costs",
    body: "Product, shipping, fulfilment, packaging, processing fees and the rest of your operating costs stay with you. Agreed direct costs are deducted before eligible profit is calculated.",
  },
];

const whyThisWay = [
  {
    title: "Not a percentage of ad spend",
    body: "Spend-based pricing pays an agency more for moving more of your money through the platforms. Ours moves with eligible profit instead.",
  },
  {
    title: "Not a flat retainer",
    body: "A retainer is charged whether the work produced profit or not. If a month produces no positive eligible profit, there is no agency fee for that month.",
  },
  {
    title: "Capped, so scaling stays yours",
    body: `Once eligible profit passes ${formatUsd(AGENCY_FEE_CAP_THRESHOLD)} in a month our fee stops at ${AGENCY_FEE_CAP_LABEL}. Everything above that point stays in your business.`,
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <JsonLd data={faqSchema(pricingFaqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Offer",
          name: managedService.name,
          url: `${siteConfig.url}/pricing`,
          availability: "https://schema.org/InStock",
          category: "Performance-based Google Ads and Meta Ads management for Shopify brands",
          seller: { "@id": `${siteConfig.url}/#organization` },
          description: `Performance-based agency fee: ${AGENCY_FEE_RATE_LABEL} of monthly eligible profit calculated after advertising spend and agreed direct costs and before the agency fee, capped at ${AGENCY_FEE_CAP_LABEL} per month. No agency fee in a month without positive eligible profit. Clients fund advertising and business costs directly.`,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: managedService.currency,
            minPrice: 0,
            maxPrice: AGENCY_FEE_CAP,
            unitCode: "MON",
            description: `${AGENCY_FEE_RATE_LABEL} of monthly eligible profit, capped at ${AGENCY_FEE_CAP_LABEL} per month.`,
          },
        }}
      />

      <PageHero
        eyebrow="Performance-based pricing"
        title={
          <>
            {AGENCY_FEE_RATE_LABEL} of eligible profit.
            <br className="hidden sm:block" /> Capped at {AGENCY_FEE_CAP_LABEL} a month.
          </>
        }
        lede="Our agency fee is a share of the profit the work produces, calculated after advertising spend and agreed direct costs and before our fee. No retainer, no setup fee, no percentage of ad spend, and no agency fee in a month without positive eligible profit."
        actions={
          <>
            <Button
              href="/contact"
              size="lg"
              trailingIcon
              {...tracked(ANALYTICS_EVENTS.contactCta, "pricing_hero")}
            >
              Get my free profit analysis
            </Button>
            <Button
              href={BOOK_CALL_URL}
              variant="light"
              size="lg"
              {...tracked(ANALYTICS_EVENTS.pricingCta, "pricing_hero")}
            >
              Book a call
            </Button>
          </>
        }
        meta={[
          { label: "Agency fee", value: `${AGENCY_FEE_RATE_LABEL} of eligible profit` },
          { label: "Monthly cap", value: AGENCY_FEE_CAP_LABEL },
          { label: "Zero profit", value: "$0 agency fee" },
        ]}
      />

      {/* ------------------------------------------------------------- FACTS */}
      <Section tone="ink" size="sm" className="overflow-hidden pt-0">
        <Shell className="relative">
          <Reveal>
            <PricingFacts tone="dark" />
          </Reveal>
        </Shell>
      </Section>

      {/* ----------------------------------------------------------- FORMULA */}
      <Section tone="white" size="md" id="how-the-fee-works">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="The calculation"
                title="How the agency fee is worked out."
                lede="One rate, one cap and one rule for unprofitable months. Nothing in the fee depends on how much you spend on advertising."
              />
              <div className="mt-8 rounded-3xl border border-ink-900/10 bg-mist-50 p-6 sm:p-8">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-700">
                  The formula
                </p>
                <p className="mt-3 font-mono text-[0.9rem] leading-relaxed text-ink-900 sm:text-[1rem]">
                  {AGENCY_FEE_FORMULA}
                </p>
                <ul className="mt-6 flex flex-col gap-3 text-[0.94rem] leading-relaxed text-ink-900/70">
                  <li>
                    <strong className="font-semibold text-ink-900">
                      {AGENCY_FEE_RATE_LABEL} of eligible profit.
                    </strong>{" "}
                    Applied to profit, not revenue and not ad spend.
                  </li>
                  <li>
                    <strong className="font-semibold text-ink-900">
                      {AGENCY_FEE_CAP_LABEL} monthly cap.
                    </strong>{" "}
                    The most we can charge in agency fees in any month.
                  </li>
                  <li>
                    <strong className="font-semibold text-ink-900">Zero profit, zero fee.</strong>{" "}
                    No positive eligible profit means no agency fee for that month.
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="flex h-full flex-col gap-6">
                <div className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-lift sm:p-8">
                  <h3 className="text-[1.2rem] leading-snug text-ink-900">
                    What &ldquo;eligible profit&rdquo; means
                  </h3>
                  <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-900/68">
                    {ELIGIBLE_PROFIT_DEFINITION}
                  </p>
                  <p className="mt-4 text-[0.96rem] leading-relaxed text-ink-900/68">
                    The eligible business activity, the revenue and cost inputs and the measurement
                    method are agreed in writing before work begins, so both sides are calculating
                    the same number from the same data.
                  </p>
                </div>

                <div className="rounded-3xl border border-ink-900/10 bg-mist-100 p-6 sm:p-8">
                  <h3 className="text-[1.05rem] leading-snug text-ink-900">
                    Costs commonly agreed as direct costs
                  </h3>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {AGREED_COST_EXAMPLES.map((cost) => (
                      <li
                        key={cost}
                        className="flex gap-2.5 text-[0.9rem] leading-snug text-ink-900/72"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-brand-600"
                        />
                        {cost}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[0.86rem] leading-relaxed text-ink-900/55">
                    These are examples, not a fixed list. The precise calculation — including which
                    costs are in scope — is agreed before onboarding.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* -------------------------------------------------------- CALCULATOR */}
      <Section tone="mist" size="md" id="fee-calculator">
        <Shell>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Fee calculator"
              title="Put a number in and see the fee."
              lede="Enter a monthly eligible profit figure. We apply the published rate and cap to it — nothing else is assumed about your business."
            />
          </Reveal>
          <Reveal delay={100}>
            <FeeCalculator className="mt-12" />
          </Reveal>
        </Shell>
      </Section>

      {/* ---------------------------------------------------------- EXAMPLES */}
      <Section tone="white" size="md" id="examples">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Worked examples"
              title="The same calculation at five different months."
              lede="Hypothetical figures used to show how the rate and the cap behave. They are not client results or projections."
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto rounded-3xl border border-ink-900/10">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <caption className="sr-only">
                  Hypothetical monthly eligible profit, the resulting agency fee and the eligible
                  profit remaining after that fee.
                </caption>
                <thead>
                  <tr className="bg-mist-100">
                    <th
                      scope="col"
                      className="px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-900/50 sm:px-6"
                    >
                      Eligible profit
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-900/50 sm:px-6"
                    >
                      Agency fee
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-900/50 sm:px-6"
                    >
                      Remaining eligible profit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-900/8">
                  {feeExamples.map((example) => (
                    <tr key={example.eligibleProfit} className="bg-white">
                      <th
                        scope="row"
                        className="px-5 py-4 text-left font-mono text-[0.95rem] font-medium text-ink-900 sm:px-6"
                      >
                        {formatUsd(example.eligibleProfit)}
                      </th>
                      <td className="px-5 py-4 font-mono text-[0.95rem] text-ink-900/75 sm:px-6">
                        {formatUsd(example.fee)}
                      </td>
                      <td className="px-5 py-4 font-mono text-[0.95rem] text-ink-900/75 sm:px-6">
                        {formatUsd(example.remaining)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[0.9rem] leading-relaxed text-ink-900/60">
              Above {formatUsd(AGENCY_FEE_CAP_THRESHOLD)} of monthly eligible profit the fee is
              capped, so the percentage you effectively pay keeps falling as the business grows.{" "}
              {AGENCY_OFFER_CLARIFICATION}
            </p>
          </Reveal>
        </Shell>
      </Section>

      {/* -------------------------------------------------------- WHO PAYS */}
      <Section tone="ink" size="md" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Our fee vs. your costs"
              title="What we charge, and what stays with you."
              lede="The cap applies to our agency fee. It is not a cap on advertising spend or on the cost of running your business."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {whatYouPayFor.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-white/12 bg-white/[0.04] p-8">
                  <h3 className="text-[1.1rem] leading-snug text-white">{item.title}</h3>
                  <p className="text-[0.93rem] leading-relaxed text-white/62">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------- CARD */}
      <Section tone="ink" size="md" className="overflow-hidden pt-0">
        <Shell className="relative">
          <Reveal>
            <ManagedPricingCard location="pricing_page_card" />
          </Reveal>
        </Shell>
      </Section>

      {/* ------------------------------------------------------- WHAT YOU GET */}
      <Section tone="white" size="md" id="whats-included">
        <Shell>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Where the work goes"
              title="Four workstreams, running every month."
              lede="This is the scope the fee covers. It is agreed before we start rather than offered as unlimited output."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {servicePillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-ink-900/10 bg-mist-50 p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.7rem] text-brand-700/50">{pillar.index}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-ink-900/10" />
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-700">
                      {pillar.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-[1.18rem] leading-snug text-ink-900">{pillar.title}</h3>
                  <p className="text-[0.92rem] leading-relaxed text-ink-900/62">{pillar.lede}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {pillar.points.slice(0, 4).map((point) => (
                      <li
                        key={point}
                        className="rounded-full bg-white px-2.5 py-1 text-[0.72rem] text-ink-900/60 ring-1 ring-ink-900/8"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------ WHY THIS WAY */}
      <Section tone="mist" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Why it's priced this way"
              title="The incentive should point at profit."
              lede="How an agency charges tells you what it optimises for. This is what ours is designed to encourage."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {whyThisWay.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-ink-900/10 bg-white p-8 shadow-lift">
                  <h3 className="text-[1.1rem] leading-snug text-ink-900">{item.title}</h3>
                  <p className="text-[0.92rem] leading-relaxed text-ink-900/62">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <p className="mt-10 max-w-2xl text-[0.95rem] leading-relaxed text-ink-900/62">
              New to this model?{" "}
              <Link
                href="/insights/what-is-a-performance-based-marketing-agency"
                className="font-medium text-brand-700 underline-offset-4 hover:underline"
              >
                Read our explainer on how performance-based marketing agencies charge
              </Link>{" "}
              and how profit-based fees compare with retainers and percentage-of-spend pricing.
            </p>
          </Reveal>
        </Shell>
      </Section>

      {/* ------------------------------------------------------- SOFTWARE ONLY */}
      <Section tone="white" size="md">
        <Shell>
          <Reveal>
            <SoftwareAccessCard location="pricing_software_card" />
          </Reveal>
        </Shell>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section tone="mist" size="md" id="pricing-questions">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Pricing questions"
                title="The practical details."
                lede="If something here isn't clear enough to put in a contract, tell us and we'll tighten it."
                className="mb-0"
              />
            </Reveal>
            <Reveal delay={100}>
              <FaqList faqs={pricingFaqs} />
            </Reveal>
          </div>
        </Shell>
      </Section>

      <CtaBand
        location="pricing_footer_cta"
        eyebrow="Get started"
        title="Let's agree the numbers before anything starts."
        body="Send us your store and current spend. We'll look at the accounts and the margins, and tell you early if a profit-based arrangement isn't the right structure for you."
        primaryLabel="Book a call"
      />
    </>
  );
}
