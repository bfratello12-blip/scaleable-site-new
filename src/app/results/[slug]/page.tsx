import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProfitSpendChart } from "@/components/charts/ProfitSpendChart";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return pageMetadata({ title: "Case study", description: "Case study", path: `/results/${slug}` });

  return pageMetadata({
    title: `${study.vertical} — ${study.headline}`,
    description: study.summary,
    path: `/results/${study.slug}`,
    keywords: ["Shopify case study", study.vertical, ...study.channels],
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((s) => s.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Client Success Stories", path: "/results" },
          { name: study.vertical, path: `/results/${study.slug}` },
        ])}
      />

      <PageHero
        eyebrow={`${study.vertical} · ${study.platform}`}
        title={study.headline}
        lede={study.summary}
        actions={
          <>
            <Button
              href={BOOK_CALL_URL}
              size="lg"
              trailingIcon
              {...tracked(ANALYTICS_EVENTS.bookCall, `case_${study.slug}_hero`)}
            >
              Book a call
            </Button>
            <Button href="/results" variant="light" size="lg">
              All case studies
            </Button>
          </>
        }
        meta={[
          { label: "Ad spend", value: study.spendBand },
          { label: "Timeframe", value: study.timeframe },
          { label: "Channels", value: study.channels.join(", ") },
        ]}
        aside={
          <div className="flex flex-col gap-5 rounded-3xl border border-white/12 bg-white/[0.04] p-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-300">
              Headline outcome
            </p>
            <p className="font-display text-[clamp(3rem,2rem+4vw,4.75rem)] font-semibold leading-none tracking-[-0.05em] text-gradient-brand">
              {study.heroMetric.value}
            </p>
            <div>
              <p className="text-[1.05rem] font-medium text-white">{study.heroMetric.label}</p>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-white/55">
                {study.heroMetric.caption}
              </p>
            </div>
            {study.isPlaceholder ? <PlaceholderNote tone="dark" compact /> : null}
          </div>
        }
      />

      {/* --------------------------------------------------------- METRICS */}
      <Section tone="white" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Before and after"
              title="What actually changed."
              lede="Measured in ScaleAble against the store's own Shopify data across the engagement window."
            />
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-ink-900/10">
              {/* Desktop table */}
              <table className="hidden w-full border-collapse sm:table">
                <thead>
                  <tr className="bg-mist-100 text-left">
                    {["Metric", "Before", "After", "Change"].map((head) => (
                      <th
                        key={head}
                        scope="col"
                        className="px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-900/50"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-900/8">
                  {study.metrics.map((metric) => (
                    <tr key={metric.label} className="bg-white">
                      <th scope="row" className="px-6 py-5 text-left text-[0.98rem] font-medium text-ink-900">
                        {metric.label}
                        {metric.note ? (
                          <span className="mt-0.5 block text-[0.78rem] font-normal text-ink-900/45">
                            {metric.note}
                          </span>
                        ) : null}
                      </th>
                      <td className="px-6 py-5 font-mono text-[0.95rem] text-ink-900/55">{metric.before}</td>
                      <td className="px-6 py-5 font-mono text-[0.95rem] text-ink-900">{metric.after}</td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.85rem] font-semibold ${
                            metric.positive === false
                              ? "bg-ink-900/6 text-ink-900/55"
                              : "bg-profit-500/12 text-[#0B7A55]"
                          }`}
                        >
                          {metric.delta}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile cards */}
              <div className="divide-y divide-ink-900/8 sm:hidden">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[0.98rem] font-medium text-ink-900">{metric.label}</p>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[0.8rem] font-semibold ${
                          metric.positive === false
                            ? "bg-ink-900/6 text-ink-900/55"
                            : "bg-profit-500/12 text-[#0B7A55]"
                        }`}
                      >
                        {metric.delta}
                      </span>
                    </div>
                    <dl className="mt-3 flex gap-6 font-mono text-[0.88rem]">
                      <div>
                        <dt className="text-[0.65rem] uppercase tracking-[0.12em] text-ink-900/40">Before</dt>
                        <dd className="text-ink-900/60">{metric.before}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.65rem] uppercase tracking-[0.12em] text-ink-900/40">After</dt>
                        <dd className="text-ink-900">{metric.after}</dd>
                      </div>
                    </dl>
                    {metric.note ? (
                      <p className="mt-2 text-[0.78rem] text-ink-900/45">{metric.note}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {study.isPlaceholder ? (
            <div className="mt-5">
              <PlaceholderNote tone="light" />
            </div>
          ) : null}
        </Shell>
      </Section>

      {/* ----------------------------------------------------------- CHART */}
      <Section tone="ink" size="md" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Shell className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeading
                tone="light"
                eyebrow="The trend"
                title="Profit and spend, plotted together."
                lede="The view we manage from. If the profit line does not respond to the spend line, the spend is not working — regardless of what the ad platform says."
                className="mb-0"
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-3xl border border-white/12 bg-white/[0.035] p-6 sm:p-8">
                <ProfitSpendChart
                  labels={study.series.labels}
                  profit={study.series.contributionProfit}
                  spend={study.series.adSpend}
                  tone="dark"
                  caption={
                    study.isPlaceholder
                      ? "Placeholder series — replace with the client's actual monthly figures. Values shown in $000s."
                      : "Monthly figures, $000s."
                  }
                />
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* --------------------------------------------------------- NARRATIVE */}
      <Section tone="white" size="md">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading eyebrow="The breakdown" title="Problem, change, outcome." className="mb-0" />
                <div className="mt-8 flex flex-col gap-3 text-[0.88rem] text-ink-900/55">
                  <p>
                    <span className="font-medium text-ink-900">Vertical</span> · {study.vertical}
                  </p>
                  <p>
                    <span className="font-medium text-ink-900">Spend</span> · {study.spendBand}
                  </p>
                  <p>
                    <span className="font-medium text-ink-900">Window</span> · {study.timeframe}
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col gap-14">
              <Reveal>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  The problem
                </h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {study.problem.map((item) => (
                    <li key={item} className="flex gap-4 text-[1.02rem] leading-relaxed text-ink-900/72">
                      <span aria-hidden="true" className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-danger-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  What we changed
                </h3>
                <div className="mt-5 grid gap-px overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2">
                  {study.approach.map((item, i) => (
                    <div key={item.title} className="bg-white p-6">
                      <span className="font-mono text-[0.68rem] text-brand-700/50">0{i + 1}</span>
                      <h4 className="mt-2 text-[1.02rem] font-semibold leading-snug text-ink-900">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-900/62">{item.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  What happened
                </h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {study.outcome.map((item) => (
                    <li key={item} className="flex gap-4 text-[1.02rem] leading-relaxed text-ink-900/72">
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-profit-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 8.5 3.2 3.2L13 4.8" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                {study.quote ? (
                  <blockquote className="rounded-3xl border border-ink-900/10 bg-mist-50 p-8 sm:p-10">
                    <p className="text-[1.15rem] leading-relaxed text-ink-900">
                      &ldquo;{study.quote.text}&rdquo;
                    </p>
                    <footer className="mt-5 text-[0.88rem] text-ink-900/55">
                      {study.quote.attribution}
                    </footer>
                  </blockquote>
                ) : (
                  <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-ink-900/15 bg-mist-50 p-8 sm:p-10">
                    <PlaceholderNote tone="light">Client quote slot</PlaceholderNote>
                    <p className="text-[1.02rem] leading-relaxed text-ink-900/55">
                      A short, approved quote from the founder or marketing lead goes here — two or three
                      sentences about the change in how decisions get made. Add it to{" "}
                      <code className="rounded bg-ink-900/6 px-1.5 py-0.5 font-mono text-[0.82rem]">quote</code>{" "}
                      on this case study once you have written permission.
                    </p>
                  </div>
                )}
              </Reveal>

              <Reveal>
                <ImagePlaceholder
                  number={10}
                  kind="image"
                  label={`Brand or product imagery for the ${study.vertical.toLowerCase()} case study`}
                  width={1600}
                  height={900}
                  ratio="16:9"
                />
              </Reveal>
            </div>
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------- NEXT */}
      <Section tone="mist" size="sm">
        <Shell>
          <Reveal>
            <Link
              href={`/results/${next.slug}`}
              {...tracked(ANALYTICS_EVENTS.caseStudyOpen, `case_next_${next.slug}`)}
              className="group flex flex-col justify-between gap-6 rounded-3xl border border-ink-900/10 bg-white p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-brand-600/35 sm:flex-row sm:items-center sm:p-10"
            >
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Next case study
                </p>
                <h2 className="mt-3 max-w-xl text-[1.35rem] leading-snug text-ink-900">
                  {next.headline}
                </h2>
                <p className="mt-2 text-[0.88rem] text-ink-900/50">
                  {next.vertical} · {next.spendBand}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 whitespace-nowrap text-[0.9rem] font-medium text-brand-700">
                Read it
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </Link>
          </Reveal>
        </Shell>
      </Section>

      <CtaBand location={`case_${study.slug}_footer_cta`} />
    </>
  );
}
