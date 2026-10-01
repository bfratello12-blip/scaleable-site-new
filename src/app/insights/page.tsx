import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { InsightCard } from "@/components/marketing/InsightCard";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import { sortedInsights } from "@/content/insights";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Insights — Ecommerce Profitability & Paid Media Guides",
  description:
    "Practical guides on measuring ecommerce advertising by contribution profit instead of platform ROAS — margins, break-even ROAS, MER, TACoS and profitable scaling.",
  path: "/insights",
  keywords: [
    "ecommerce advertising guides",
    "Shopify paid media blog",
    "ecommerce profitability",
    "contribution profit",
    "break-even ROAS",
  ],
});

const themes = [
  {
    title: "Profit, not attributed revenue",
    body: "Every guide works from the same premise: the only result that counts is what the business keeps after product and variable costs.",
  },
  {
    title: "Written from live accounts",
    body: "These are the patterns we hit repeatedly managing Google Ads and Meta Ads for Shopify brands — not theory assembled from other blogs.",
  },
  {
    title: "Usable without our software",
    body: "The calculations here work in a spreadsheet. ScaleAble automates them, but nothing in these guides depends on buying anything.",
  },
];

export default function InsightsPage() {
  const posts = sortedInsights();
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${siteConfig.url}/insights#blog`,
            name: `${siteConfig.name} Insights`,
            description:
              "Guides on ecommerce advertising profitability, contribution profit and paid media for Shopify brands.",
            url: `${siteConfig.url}/insights`,
            publisher: { "@id": `${siteConfig.url}/#organization` },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              url: `${siteConfig.url}/insights/${post.slug}`,
              datePublished: post.publishedAt,
              author: { "@type": "Person", name: post.author },
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="Insights"
        title={
          <>
            Everything we know about
            <br className="hidden sm:block" /> scaling ads profitably.
          </>
        }
        lede="Long-form guides on the economics behind paid media for Shopify brands — how to read your numbers, what the ad platforms leave out, and when scaling actually makes you money."
        actions={
          <Button
            href={BOOK_CALL_URL}
            size="lg"
            trailingIcon
            {...tracked(ANALYTICS_EVENTS.bookCall, "insights_hero")}
          >
            Book a call
          </Button>
        }
        meta={[
          { label: "Focus", value: "Contribution profit" },
          { label: "Channels", value: "Google Ads + Meta Ads" },
          { label: "Platform", value: "Shopify" },
        ]}
      />

      {/* ----------------------------------------------------------- POSTS */}
      <Section tone="mist" size="md">
        <Shell>
          {featured ? (
            <Reveal>
              <InsightCard post={featured} featured />
            </Reveal>
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={i * 80} className="h-full">
                  <InsightCard post={post} className="h-full" />
                </Reveal>
              ))}
            </div>
          ) : null}
        </Shell>
      </Section>

      {/* ---------------------------------------------------------- THEMES */}
      <Section tone="ink" size="md" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="What you'll find here"
              title="No benchmark posts."
              lede="We don't publish 'the average ecommerce ROAS is 4x' content. Your numbers are the only benchmark that matters."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {themes.map((theme, i) => (
              <Reveal key={theme.title} delay={i * 90} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-white/12 bg-white/[0.035] p-8">
                  <h3 className="text-[1.08rem] leading-snug text-white">{theme.title}</h3>
                  <p className="text-[0.92rem] leading-relaxed text-white/60">{theme.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      <CtaBand
        eyebrow="Next step"
        title="Want this done on your account instead of in a spreadsheet?"
        body="We run Google Ads and Meta Ads for Shopify brands against contribution profit, using the same analytics these guides describe."
        location="insights_footer_cta"
      />
    </>
  );
}
