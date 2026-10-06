import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import { engagementProcess } from "@/content/services";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Approach — Profit-First Ecommerce Growth",
  description:
    "How ScaleAble thinks about scaling Shopify brands: profit over platform ROAS, product-level margin over blended averages, and evidence over attribution arguments.",
  path: "/approach",
  keywords: [
    "ecommerce growth agency approach",
    "profit first paid media",
    "Shopify scaling strategy",
    "contribution margin advertising",
  ],
});

const principles = [
  {
    number: "01",
    title: "Profit is the only metric that survives contact with reality",
    body: "Revenue, ROAS, CPA and attributed conversions are all useful diagnostics and terrible objectives. Profit is the number that decides whether the business is better off than it was last month.",
  },
  {
    number: "02",
    title: "Averages hide the decision",
    body: "A healthy store-level margin can be one profitable product carrying four that lose money on every order. Budget decisions belong at the product level, which means product costs have to be real.",
  },
  {
    number: "03",
    title: "Advertising doesn't stay in its own channel",
    body: "Paid spend moves organic, direct and returning-customer revenue. Judging a channel purely on its own attributed return will quietly talk you out of spend that was working.",
  },
  {
    number: "04",
    title: "Write down what you changed",
    body: "Every budget shift, price change, promotion and restructure gets marked as an event. Cause-and-effect is only knowable if someone recorded the cause at the time.",
  },
  {
    number: "05",
    title: "Creative and onsite are part of media buying",
    body: "Most scaling ceilings are creative fatigue or a landing experience problem. Treating them as somebody else's department is how accounts plateau for a year.",
  },
  {
    number: "06",
    title: "Be willing to lose the vanity metric",
    body: "Sometimes the right call lowers platform ROAS and raises profit. We will make that recommendation, and we will show you the evidence behind it.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Approach", path: "/approach" },
        ])}
      />

      <PageHero
        eyebrow="Our approach"
        title={
          <>
            We built the analytics
            <br className="hidden sm:block" /> because the reporting was wrong.
          </>
        }
        lede="ScaleAble started as a Shopify profit analytics product, not as an agency. The managed service exists because knowing where profit is leaking and having the time to fix it are two different problems."
        actions={
          <>
            <Button
              href={BOOK_CALL_URL}
              size="lg"
              trailingIcon
              {...tracked(ANALYTICS_EVENTS.bookCall, "approach_hero")}
            >
              Book a call
            </Button>
            <Button href="/software" variant="light" size="lg">
              See the software
            </Button>
          </>
        }
      />

      {/* -------------------------------------------------------------- STORY */}
      <Section tone="white" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Where this came from"
                title="Two industries with the same blind spot."
              />
              <div className="mt-8 flex flex-col gap-5 text-[1.02rem] leading-relaxed text-ink-900/70">
                <p>
                  Agencies report from inside ad platforms because that is the data they have. Ecommerce
                  analytics tools report on the store because that is the data they have. Neither side
                  can answer the question that matters: did the advertising make the business more
                  money?
                </p>
                <p>
                  We built ScaleAble to close that gap — Shopify revenue, real product costs and ad
                  spend from Google and Meta in a single model, producing profit and
                  contribution margin instead of a platform-flattering return figure.
                </p>
                <p>
                  Once brands could see it, the next question was always the same: can you just run
                  this for us? That is the managed growth service.
                </p>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="flex flex-col gap-5">
                <ImagePlaceholder
                  number={5}
                  kind="portrait"
                  label="Portrait of the ScaleAble team member clients work with directly"
                  width={1200}
                  height={1500}
                  ratio="4:5"
                />
                <div className="rounded-2xl border border-ink-900/10 bg-mist-50 p-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-700">
                    Who you work with
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-900/68">
                    Senior paid media management — the person who builds the strategy is the person in
                    the accounts. Add the bio, background and credentials here.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* --------------------------------------------------------- PRINCIPLES */}
      <Section tone="ink" size="md" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Operating principles"
              title="Six rules we manage by."
              lede="These are not values on a wall. They decide what we recommend when the profitable answer and the comfortable answer disagree."
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, i) => (
              <Reveal key={principle.number} delay={i * 60} className="h-full">
                <div className="flex h-full flex-col gap-4 bg-ink-900 p-8">
                  <span className="font-mono text-[0.72rem] text-brand-300">{principle.number}</span>
                  <h3 className="text-[1.1rem] leading-snug text-white">{principle.title}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-white/58">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------------ PROCESS */}
      <Section tone="mist" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Working together"
              title="What the first 90 days look like."
              lede="Measurement first, then structure, then scale. In that order, every time."
            />
          </Reveal>

          <ol className="mt-14 flex flex-col border-t border-ink-900/10">
            {engagementProcess.map((step, i) => (
              <Reveal key={step.step} delay={i * 70} as="li">
                <div className="grid gap-4 border-b border-ink-900/10 py-9 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-baseline">
                  <span className="font-mono text-[0.75rem] text-brand-700/50">{step.step}</span>
                  <h3 className="max-w-sm text-[1.3rem] leading-snug text-ink-900">{step.title}</h3>
                  <div className="flex flex-col gap-4">
                    <p className="max-w-lg text-[0.98rem] leading-relaxed text-ink-900/65">{step.body}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {step.detail.map((d) => (
                        <li
                          key={d}
                          className="rounded-full bg-white px-2.5 py-1 text-[0.72rem] text-ink-900/60 ring-1 ring-ink-900/8"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* --------------------------------------------------------------- SOFT */}
      <Section tone="white" size="sm">
        <Shell tight>
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Built for Shopify
              </p>
              <p className="text-[clamp(1.25rem,1rem+1.2vw,1.85rem)] leading-snug text-ink-900">
                The ScaleAble platform works with Shopify stores. That focus is deliberate — the
                profit model depends on order, product and cost data being structured the way Shopify
                structures it.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  href={siteConfig.shopifyAppUrl}
                  variant="shopify"
                  size="lg"
                  {...tracked(ANALYTICS_EVENTS.shopifyInstall, "approach_footer")}
                >
                  Install ScaleAble on Shopify
                </Button>
                <Button href="/results" variant="outline" size="lg" trailingIcon>
                  See client results
                </Button>
              </div>
            </div>
          </Reveal>
        </Shell>
      </Section>

      <CtaBand location="approach_footer_cta" />
    </>
  );
}
