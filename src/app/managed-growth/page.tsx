import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import { engagementProcess, includedCapabilities, servicePillars } from "@/content/services";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, managedService, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Managed Growth — Shopify Paid Media Management",
  description:
    "Google Ads and Meta Ads management for Shopify brands, with creative, CRO and product-level profitability analysis included. Managed against contribution profit, not platform ROAS.",
  path: "/managed-growth",
  keywords: [
    "Shopify paid media management",
    "Google Ads for Shopify",
    "Meta Ads for Shopify",
    "Shopify advertising agency",
    "ecommerce paid media agency",
    "ecommerce conversion rate optimization",
  ],
});

const fitFor = [
  "Shopify brands already spending meaningfully on advertising",
  "Founders and marketing teams who want profit, not a prettier dashboard",
  "Businesses where product margins differ enough to matter",
  "Teams willing to load real COGS and cost data",
];

const notFor = [
  "Brands looking for the cheapest possible media buyer",
  "Anyone who wants platform ROAS defended at all costs",
  "Stores not on Shopify — the analytics won't work",
  "Businesses that want reporting without changing decisions",
];

const placeholderByPillar: Record<string, { label: string; width: number; height: number; ratio?: string; kind: "dashboard" | "chart" | "image" }> = {
  "paid-search": {
    kind: "dashboard",
    label: "Google Ads structure — Shopping campaigns segmented by product margin tier",
    width: 1600,
    height: 1100,
    ratio: "~16:11",
  },
  "paid-social": {
    kind: "chart",
    label: "Meta Ads spend scaled against blended MER and contribution profit",
    width: 1600,
    height: 1100,
    ratio: "~16:11",
  },
  creative: {
    kind: "image",
    label: "Ad creative grid — static, motion and UGC-style concepts in test",
    width: 1600,
    height: 1200,
    ratio: "4:3",
  },
  analytics: {
    kind: "dashboard",
    label: "ScaleAble product profitability view used for budget allocation",
    width: 1800,
    height: 1150,
    ratio: "~16:10",
  },
};

export default function ManagedGrowthPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Managed Growth", path: "/managed-growth" },
        ])}
      />

      <PageHero
        eyebrow="Managed growth"
        title={
          <>
            Paid media for Shopify brands,
            <br className="hidden sm:block" /> managed against profit.
          </>
        }
        lede="Google Ads and Meta Ads built, restructured and scaled by an experienced operator — with creative, conversion work and product-level profitability analysis in the same engagement."
        actions={
          <>
            <Button
              href={BOOK_CALL_URL}
              size="lg"
              trailingIcon
              {...tracked(ANALYTICS_EVENTS.bookCall, "managed_hero")}
            >
              Book a call
            </Button>
            <Button href="/pricing" variant="light" size="lg">
              {managedService.priceFormatted} / month — what&apos;s included
            </Button>
          </>
        }
        meta={[
          { label: "Retainer", value: `${managedService.priceFormatted} / month` },
          { label: "Platforms", value: "Google Ads + Meta Ads" },
          { label: "Measured in", value: "Contribution profit" },
        ]}
      />

      {/* ------------------------------------------------------- POSITIONING */}
      <Section tone="white" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="The standard we work to"
                title="If the change didn't improve profit, it didn't work."
                lede="Plenty of levers make an ad account look better while making the business worse. Brand search inflates returns. Retargeting claims credit for orders that were already coming. Shopping happily pushes your lowest-margin bestseller."
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="flex h-full flex-col justify-center gap-6 text-[1.02rem] leading-relaxed text-ink-900/70">
                <p>
                  We manage to a different standard. Every restructure, budget move and creative test
                  is marked as an event in ScaleAble, and reviewed against contribution profit,
                  contribution margin and blended MER across the whole store.
                </p>
                <p>
                  Sometimes that means accepting a lower platform ROAS because the business made more
                  money. That trade is only defensible when it is measurable — which is exactly why we
                  built the software.
                </p>
                <p className="border-l-2 border-brand-600 pl-5 font-medium text-ink-900">
                  Your agency shouldn&apos;t be optimising from half the picture.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ----------------------------------------------------------- PILLARS */}
      {servicePillars.map((pillar, index) => {
        const isEven = index % 2 === 0;
        const placeholder = placeholderByPillar[pillar.id];

        return (
          <Section
            key={pillar.id}
            id={pillar.id}
            tone={isEven ? "ink" : "mist"}
            size="md"
            className="overflow-hidden"
          >
            {isEven ? (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
            ) : null}
            <Shell className="relative">
              <div
                className={`grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                  isEven ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                <Reveal>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-[0.75rem] ${isEven ? "text-brand-300/70" : "text-brand-700/60"}`}
                      >
                        {pillar.index}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-px w-10 ${isEven ? "bg-white/20" : "bg-ink-900/15"}`}
                      />
                      <span
                        className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${
                          isEven ? "text-brand-300" : "text-brand-700"
                        }`}
                      >
                        {pillar.eyebrow}
                      </span>
                    </div>

                    <h2
                      className={`max-w-lg text-[clamp(1.65rem,1.1rem+2vw,2.6rem)] leading-[1.08] ${
                        isEven ? "text-white" : "text-ink-900"
                      }`}
                    >
                      {pillar.title}
                    </h2>

                    <p
                      className={`max-w-lg text-[1.02rem] leading-relaxed ${
                        isEven ? "text-white/65" : "text-ink-900/65"
                      }`}
                    >
                      {pillar.lede}
                    </p>

                    <ul className="mt-2 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className={`flex gap-3 text-[0.9rem] leading-snug ${
                            isEven ? "text-white/72" : "text-ink-900/72"
                          }`}
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className={`mt-[0.3rem] h-3 w-3 shrink-0 ${isEven ? "text-brand-400" : "text-brand-700"}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m3 8.5 3.2 3.2L13 4.8" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={110}>
                  <ImagePlaceholder
                    number={6 + index}
                    kind={placeholder.kind}
                    tone={isEven ? "dark" : "light"}
                    chrome={placeholder.kind === "dashboard"}
                    label={placeholder.label}
                    width={placeholder.width}
                    height={placeholder.height}
                    ratio={placeholder.ratio}
                  />
                </Reveal>
              </div>
            </Shell>
          </Section>
        );
      })}

      {/* ---------------------------------------------------------- INCLUDED */}
      <Section tone="white" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Everything in the retainer"
              title="One price. No line items."
              lede={`Managed growth is ${managedService.priceFormatted} ${managedService.cadence}. Creative, conversion work and analytics are not billed separately — they are part of doing the job properly.`}
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {includedCapabilities.map((group, i) => (
              <Reveal key={group.group} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-5 rounded-3xl border border-ink-900/10 bg-mist-50 p-8">
                  <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-700">
                    {group.group}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.95rem] leading-snug text-ink-900/78">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                href={BOOK_CALL_URL}
                size="lg"
                trailingIcon
                {...tracked(ANALYTICS_EVENTS.bookCall, "managed_included")}
              >
                Book a call
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                See pricing detail
              </Button>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* ----------------------------------------------------------- PROCESS */}
      <Section tone="ink" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Onboarding"
              title="The first month is about measurement, not motion."
              lede="Changing campaigns before the profit picture exists is how agencies end up arguing about attribution six months later."
            />
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {engagementProcess.map((step, i) => (
              <Reveal key={step.step} delay={i * 80} as="li" className="h-full">
                <div className="flex h-full flex-col gap-4 bg-ink-900 p-8">
                  <span className="font-mono text-[0.72rem] text-brand-300">{step.step}</span>
                  <h3 className="text-[1.12rem] leading-snug text-white">{step.title}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-white/58">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* --------------------------------------------------------------- FIT */}
      <Section tone="mist" size="md">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="flex h-full flex-col gap-6 rounded-3xl border border-ink-900/10 bg-white p-8 shadow-lift sm:p-10">
                <h2 className="text-[1.5rem] leading-snug text-ink-900">This works well for</h2>
                <ul className="flex flex-col gap-4">
                  {fitFor.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-900/75">
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-profit-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 8.5 3.2 3.2L13 4.8" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex h-full flex-col gap-6 rounded-3xl border border-ink-900/10 bg-mist-100 p-8 sm:p-10">
                <h2 className="text-[1.5rem] leading-snug text-ink-900">It&apos;s a poor fit for</h2>
                <ul className="flex flex-col gap-4">
                  {notFor.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-900/60">
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-ink-900/30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M4 4l8 8M12 4l-8 8" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-4 text-[0.88rem] leading-relaxed text-ink-900/50">
                  Not on Shopify?{" "}
                  <Link href="/contact" className="font-medium text-brand-700 underline-offset-4 hover:underline">
                    Tell us what you&apos;re running
                  </Link>{" "}
                  and we&apos;ll be straight with you about whether we can help.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------ SOFTWARE LINK */}
      <Section tone="white" size="sm">
        <Shell>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-ink-900/10 bg-mist-50 p-8 sm:p-10 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  The measurement layer
                </p>
                <h2 className="mt-3 text-[1.5rem] leading-snug text-ink-900">
                  Every client runs on the ScaleAble platform.
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-900/65">
                  It is how we see contribution profit, product-level margin and the effect of spend on
                  organic and direct revenue. You get access to it too.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button href="/software" size="lg" trailingIcon>
                  Explore the software
                </Button>
                <Button
                  href={siteConfig.shopifyAppUrl}
                  variant="shopify"
                  size="lg"
                  {...tracked(ANALYTICS_EVENTS.shopifyInstall, "managed_software_link")}
                >
                  Install on Shopify
                </Button>
              </div>
            </div>
          </Reveal>
        </Shell>
      </Section>

      <CtaBand
        location="managed_footer_cta"
        title="Let's look at what your advertising is actually earning."
        body="Send us your store and current spend. We'll tell you where we think profit is leaking before you commit to anything."
      />
    </>
  );
}
