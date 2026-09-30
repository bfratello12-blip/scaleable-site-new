import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import { caseStudies } from "@/content/caseStudies";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Client Success Stories — Shopify Growth Case Studies",
  description:
    "How Shopify brands changed the way they scale paid media: the problem, what ScaleAble changed, and what happened to contribution profit, margin and blended MER afterwards.",
  path: "/results",
  keywords: [
    "Shopify case studies",
    "ecommerce paid media results",
    "Shopify advertising case study",
    "ecommerce profitability case study",
  ],
});

const measurementStandards = [
  {
    title: "Contribution profit, not attributed revenue",
    body: "Every result is stated in terms of profit after product and variable costs, measured in ScaleAble against the store's own Shopify data.",
  },
  {
    title: "Blended, not platform-reported",
    body: "Returns are reported as blended MER across all spend. Platform ROAS is included only where it is useful context.",
  },
  {
    title: "Events on the record",
    body: "Budget shifts, promotions, price changes and restructures are marked in the platform, so before-and-after comparisons are honest.",
  },
];

export default function ResultsPage() {
  const [featured, ...rest] = caseStudies;
  const hasPlaceholders = caseStudies.some((study) => study.isPlaceholder);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Client Success Stories", path: "/results" },
        ])}
      />

      <PageHero
        eyebrow="Client success stories"
        title={
          <>
            The number that moved
            <br className="hidden sm:block" /> was profit.
          </>
        }
        lede="Each story follows the same structure: what was actually wrong, what we changed, and what happened to the economics of the business afterwards."
        actions={
          <Button
            href={BOOK_CALL_URL}
            size="lg"
            trailingIcon
            {...tracked(ANALYTICS_EVENTS.bookCall, "results_hero")}
          >
            Book a call
          </Button>
        }
        meta={[
          { label: "Platform", value: "Shopify" },
          { label: "Channels", value: "Google Ads + Meta Ads" },
          { label: "Measured in", value: "Contribution profit" },
        ]}
      />

      {hasPlaceholders ? (
        <div className="border-b border-signal-400/25 bg-signal-400/8">
          <Shell className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
            <PlaceholderNote tone="light" />
            <p className="text-[0.82rem] leading-relaxed text-ink-900/60">
              Structure and layout are production-ready. Swap the data in{" "}
              <code className="rounded bg-ink-900/6 px-1.5 py-0.5 font-mono text-[0.78rem]">
                src/content/caseStudies.ts
              </code>{" "}
              and set <code className="rounded bg-ink-900/6 px-1.5 py-0.5 font-mono text-[0.78rem]">isPlaceholder: false</code>.
            </p>
          </Shell>
        </div>
      ) : null}

      {/* -------------------------------------------------------- FEATURED */}
      <Section tone="mist" size="md">
        <Shell>
          <Reveal>
            <CaseStudyCard study={featured} tone="light" featured />
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {rest.map((study, i) => (
              <Reveal key={study.slug} delay={i * 80} className="h-full">
                <CaseStudyCard study={study} tone="light" className="h-full" />
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ---------------------------------------------------- HOW WE MEASURE */}
      <Section tone="ink" size="md" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="How we report"
              title="Numbers that survive a finance conversation."
              lede="Growth claims are easy to make when the metric is chosen after the fact. These are the rules we hold ourselves to."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {measurementStandards.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-white/12 bg-white/[0.04] p-8">
                  <span className="font-mono text-[0.7rem] text-brand-300">0{i + 1}</span>
                  <h3 className="text-[1.12rem] leading-snug text-white">{item.title}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-white/58">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      <CtaBand
        location="results_footer_cta"
        eyebrow="Your turn"
        title="What would this look like on your store?"
        body="Tell us what you're spending and what you're selling. We'll tell you, specifically, where we'd expect to find margin."
      />
    </>
  );
}
