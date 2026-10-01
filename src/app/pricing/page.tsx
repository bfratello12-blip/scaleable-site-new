import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { ManagedPricingCard, SoftwareAccessCard } from "@/components/marketing/PricingPanel";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import { pricingFaqs } from "@/content/faqs";
import { servicePillars } from "@/content/services";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { breadcrumbSchema, faqSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, managedService, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — Managed Growth for Shopify Brands",
  description:
    "ScaleAble managed growth is $1,500 per month: Google Ads and Meta Ads management, creative, CRO, product-level profitability analysis and access to our Shopify profit analytics.",
  path: "/pricing",
  keywords: [
    "Shopify ads agency pricing",
    "paid media retainer",
    "Google Ads management cost",
    "Meta Ads management cost",
  ],
});

const whyFlat = [
  {
    title: "Not a percentage of spend",
    body: "Percentage pricing rewards an agency for spending more of your money. Ours doesn't move when your budget does.",
  },
  {
    title: "Creative isn't a separate invoice",
    body: "Strategy, ad design and creative testing are inside the retainer, because paid media without fresh creative stops working.",
  },
  {
    title: "Analytics included",
    body: "The ScaleAble platform is part of the engagement. It is how we measure, so it is not something you get billed extra for.",
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
          price: managedService.price,
          priceCurrency: managedService.currency,
          url: `${siteConfig.url}/pricing`,
          availability: "https://schema.org/InStock",
          category: "Shopify paid media management",
          seller: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      <PageHero
        eyebrow="Pricing"
        title={
          <>
            {managedService.priceFormatted} a month.
            <br className="hidden sm:block" /> The whole growth function.
          </>
        }
        lede="Paid search, paid social, creative, conversion work and Shopify profit analytics in one flat retainer. No spend percentage, no per-channel fees, no separate creative bill."
        actions={
          <>
            <Button
              href={BOOK_CALL_URL}
              size="lg"
              trailingIcon
              {...tracked(ANALYTICS_EVENTS.pricingCta, "pricing_hero")}
            >
              Book a call
            </Button>
            <Button
              href="/contact"
              variant="light"
              size="lg"
              {...tracked(ANALYTICS_EVENTS.contactCta, "pricing_hero")}
            >
              Send us your numbers
            </Button>
          </>
        }
      />

      {/* ------------------------------------------------------------- CARD */}
      <Section tone="ink" size="md" className="overflow-hidden pt-0">
        <Shell className="relative">
          <Reveal>
            <ManagedPricingCard location="pricing_page_card" />
          </Reveal>
        </Shell>
      </Section>

      {/* ------------------------------------------------------- WHAT YOU GET */}
      <Section tone="white" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Where the work goes"
              title="Four workstreams, running every month."
              lede="Rather than a checklist of deliverables, this is how the retainer actually gets spent."
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

      {/* ------------------------------------------------------------ WHY FLAT */}
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
            {whyFlat.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-ink-900/10 bg-white p-8 shadow-lift">
                  <h3 className="text-[1.1rem] leading-snug text-ink-900">{item.title}</h3>
                  <p className="text-[0.92rem] leading-relaxed text-ink-900/62">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
      <Section tone="mist" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow="Pricing questions" title="The practical details." className="mb-0" />
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
        title="Worth a conversation before you commit."
        body="We'd rather tell you early if we're not the right fit. Book a call and we'll look at your accounts and your margins first."
        primaryLabel="Book a call"
      />
    </>
  );
}
