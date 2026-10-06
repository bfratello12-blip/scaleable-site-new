import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/marketing/ArticleBody";
import { CtaBand } from "@/components/marketing/CtaBand";
import { InsightCard } from "@/components/marketing/InsightCard";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import {
  formatInsightDate,
  getInsight,
  insights,
  insightSections,
  sortedInsights,
} from "@/content/insights";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { articleSchema, breadcrumbSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, siteConfig } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) {
    return pageMetadata({ title: "Insight", description: "Insight", path: `/insights/${slug}` });
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${post.slug}`,
    keywords: post.keywords,
    ogType: "article",
  });
}

export default async function InsightPage({ params }: Params) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const sections = insightSections(post);
  const more = sortedInsights().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: post.title, path: `/insights/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.description,
            path: `/insights/${post.slug}`,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            author: post.author,
            keywords: post.keywords,
          }),
        ]}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        lede={post.excerpt}
        actions={
          <>
            <Button
              href={BOOK_CALL_URL}
              size="lg"
              trailingIcon
              {...tracked(ANALYTICS_EVENTS.bookCall, `insight_${post.slug}_hero`)}
            >
              Book a call
            </Button>
            <Button href="/insights" variant="light" size="lg">
              All insights
            </Button>
          </>
        }
        meta={[
          { label: "Published", value: formatInsightDate(post.publishedAt) },
          { label: "Reading time", value: `${post.readingMinutes} minutes` },
          { label: "Written by", value: post.author },
        ]}
      />

      {/* --------------------------------------------------------- ARTICLE */}
      <Section tone="white" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
            <article className="max-w-[44rem]">
              {sections.length > 0 ? (
                <details className="mb-12 rounded-2xl border border-ink-900/10 bg-mist-50 px-5 py-4 lg:hidden">
                  <summary className="cursor-pointer text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-ink-900/55">
                    On this page
                  </summary>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="text-[0.92rem] leading-snug text-ink-900/65 underline-offset-4 hover:text-brand-700 hover:underline"
                        >
                          {section.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              <ArticleBody blocks={post.blocks} />

              <div className="mt-16 flex flex-col gap-5 rounded-3xl border border-ink-900/10 bg-mist-100 p-8">
                <h2 className="text-[1.15rem] leading-snug text-ink-900">
                  See these numbers for your own store.
                </h2>
                <p className="text-[0.95rem] leading-relaxed text-ink-900/65">
                  ScaleAble connects Shopify, Google Ads and Meta Ads into one profit
                  view — the calculations in this guide, maintained automatically.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    href={siteConfig.shopifyAppUrl}
                    variant="shopify"
                    className="w-full sm:w-fit"
                    {...tracked(ANALYTICS_EVENTS.shopifyInstall, `insight_${post.slug}_body`)}
                  >
                    Install on Shopify
                  </Button>
                  <Button href="/software" variant="outline" className="w-full sm:w-fit">
                    See how it works
                  </Button>
                </div>
              </div>
            </article>

            {sections.length > 0 ? (
              <aside className="hidden lg:block">
                <nav aria-label="On this page" className="sticky top-28">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-900/40">
                    On this page
                  </p>
                  <ul className="mt-5 flex flex-col gap-3 border-l border-ink-900/10 pl-4">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-[0.85rem] leading-snug text-ink-900/55 transition-colors duration-200 hover:text-brand-700"
                        >
                          {section.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            ) : null}
          </div>
        </Shell>
      </Section>

      {/* ---------------------------------------------------- MORE READING */}
      {more.length > 0 ? (
        <Section tone="mist" size="md">
          <Shell>
            <Reveal>
              <SectionHeading eyebrow="More reading" title="Keep going." />
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {more.map((item, i) => (
                <Reveal key={item.slug} delay={i * 80} className="h-full">
                  <InsightCard post={item} className="h-full" />
                </Reveal>
              ))}
            </div>
          </Shell>
        </Section>
      ) : null}

      <CtaBand
        eyebrow="Next step"
        title="Find out what your ad spend is actually earning you."
        body="A 30-minute call: we look at your Google Ads and Meta Ads structure against your Shopify economics and tell you where profit is being lost."
        location={`insight_${post.slug}_footer_cta`}
      />
    </>
  );
}
