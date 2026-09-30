import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Shell } from "@/components/ui/Section";
import { softwareFaqs } from "@/content/faqs";
import { softwareDataPoints, softwareModules, softwareOutputs } from "@/content/software";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { breadcrumbSchema, faqSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "ScaleAble Software — Shopify Profit Analytics",
  description:
    "ScaleAble connects Shopify, Google Ads and Meta Ads with your real product costs to show contribution profit, blended MER, product-level profitability and how ad spend affects every channel.",
  path: "/software",
  keywords: [
    "Shopify profit analytics",
    "Shopify profit tracking app",
    "contribution margin Shopify",
    "MER true ROAS",
    "ecommerce profitability software",
    "Shopify COGS tracking",
  ],
});

const questions = [
  "Are we still profitable at this level of spend?",
  "Which products are actually worth scaling?",
  "Did profit move because of spend, price, promo or mix?",
  "Is paid lifting organic and direct, or cannibalising them?",
  "Where does margin start to break?",
];

export default function SoftwarePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Software", path: "/software" },
        ])}
      />
      <JsonLd data={faqSchema(softwareFaqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ScaleAble",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web — Shopify",
          url: siteConfig.softwareSiteUrl,
          installUrl: siteConfig.shopifyAppUrl,
          description:
            "Shopify profit analytics that combines revenue, real product costs and advertising spend into contribution profit, contribution margin, blended MER and product-level profitability.",
          publisher: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      <PageHero
        eyebrow="ScaleAble software"
        title={
          <>
            Shopify profit analytics
            <br className="hidden sm:block" /> built for scaling decisions.
          </>
        }
        lede="Shopify revenue, your real product costs and ad spend from Google and Meta in one model — so you can see contribution profit, not just what the ad platforms report about themselves."
        actions={
          <>
            <Button
              href={siteConfig.shopifyAppUrl}
              variant="shopify"
              size="lg"
              trailingIcon
              {...tracked(ANALYTICS_EVENTS.shopifyInstall, "software_hero")}
            >
              Install ScaleAble on Shopify
            </Button>
            <Button
              href={BOOK_CALL_URL}
              variant="light"
              size="lg"
              {...tracked(ANALYTICS_EVENTS.bookCall, "software_hero")}
            >
              Have us run it for you
            </Button>
          </>
        }
        aside={
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand-700/22 blur-[70px]"
            />
            <ImagePlaceholder
              number={11}
              kind="dashboard"
              tone="dark"
              chrome
              label="ScaleAble dashboard home — profit, ad spend, MER and revenue at a glance"
              width={1800}
              height={1150}
              ratio="~16:10"
              className="relative shadow-glow"
            />
          </div>
        }
      />

      {/* ------------------------------------------------------- INPUT/OUTPUT */}
      <Section tone="white" size="md">
        <Shell>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="How it works"
              title="Four inputs. One honest number."
              lede="The model is not complicated. Getting brands to trust it is the hard part — which is why every cost is yours to define and every figure traces back to a real Shopify order."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] lg:items-center">
            <Reveal>
              <div className="flex flex-col gap-3">
                {softwareDataPoints.map((point, i) => (
                  <div
                    key={point.label}
                    className="flex items-start gap-4 rounded-2xl border border-ink-900/10 bg-mist-50 px-5 py-4"
                    style={{ marginLeft: `${i * 6}px` }}
                  >
                    <span className="mt-0.5 font-mono text-[0.65rem] text-brand-700/50">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-[0.95rem] font-medium text-ink-900">{point.label}</p>
                      <p className="mt-0.5 text-[0.85rem] leading-relaxed text-ink-900/58">
                        {point.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="flex items-center justify-center lg:px-2">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 rotate-90 items-center justify-center rounded-full border border-ink-900/12 bg-white text-brand-700 lg:rotate-0"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </div>

            <Reveal delay={100}>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2">
                {softwareOutputs.map((output) => (
                  <div key={output.metric} className="bg-white p-6">
                    <p className="text-[0.98rem] font-semibold text-ink-900">{output.metric}</p>
                    <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-900/58">
                      {output.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ----------------------------------------------------------- MODULES */}
      {softwareModules.map((module, index) => {
        const isDark = index % 2 === 0;
        return (
          <Section
            key={module.id}
            id={module.id}
            tone={isDark ? "ink" : "mist"}
            size="md"
            className="overflow-hidden"
          >
            {isDark ? (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
            ) : null}
            <Shell className="relative">
              <div
                className={`grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className="flex flex-col gap-6">
                    <span
                      className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${
                        isDark ? "text-brand-300" : "text-brand-700"
                      }`}
                    >
                      {module.eyebrow}
                    </span>
                    <h2
                      className={`max-w-lg text-[clamp(1.6rem,1.1rem+1.9vw,2.5rem)] leading-[1.08] ${
                        isDark ? "text-white" : "text-ink-900"
                      }`}
                    >
                      {module.title}
                    </h2>
                    <p
                      className={`max-w-lg text-[1.02rem] leading-relaxed ${
                        isDark ? "text-white/65" : "text-ink-900/65"
                      }`}
                    >
                      {module.body}
                    </p>
                    <ul className="mt-1 flex flex-col gap-3">
                      {module.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className={`flex gap-3 text-[0.92rem] leading-snug ${
                            isDark ? "text-white/72" : "text-ink-900/72"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-[0.55rem] h-1 w-1 shrink-0 rounded-full ${
                              isDark ? "bg-brand-400" : "bg-brand-600"
                            }`}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={110}>
                  <ImagePlaceholder
                    number={12 + index}
                    kind="dashboard"
                    tone={isDark ? "dark" : "light"}
                    chrome
                    chromeLabel={`app.scaleableapp.com / ${module.id}`}
                    label={module.placeholder.label}
                    width={module.placeholder.width}
                    height={module.placeholder.height}
                    ratio={module.placeholder.ratio}
                  />
                </Reveal>
              </div>
            </Shell>
          </Section>
        );
      })}

      {/* --------------------------------------------------------- QUESTIONS */}
      <Section tone="white" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="What you get to answer"
                title="Questions a normal ecommerce dashboard can't settle."
                lede="ScaleAble is not another reporting layer. It exists to end specific arguments about where budget should go."
              />
            </Reveal>
            <Reveal delay={100}>
              <ul className="flex flex-col divide-y divide-ink-900/10 border-y border-ink-900/10">
                {questions.map((question, i) => (
                  <li key={question} className="flex items-baseline gap-5 py-5">
                    <span className="font-mono text-[0.72rem] text-brand-700/50">0{i + 1}</span>
                    <p className="text-[1.05rem] leading-snug text-ink-900 sm:text-[1.15rem]">
                      {question}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ------------------------------------------------------ MANAGED BRIDGE */}
      <Section tone="ink" size="md" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Shell className="relative">
          <Reveal>
            <div className="grid gap-10 rounded-4xl border border-brand-400/25 bg-gradient-to-br from-brand-700/20 via-ink-900/50 to-transparent p-8 sm:p-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
              <div className="flex flex-col gap-5">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-300">
                  Software + managed growth
                </span>
                <h2 className="max-w-xl text-[clamp(1.7rem,1.1rem+2.1vw,2.7rem)] leading-[1.08] text-white">
                  Good data still needs someone to act on it.
                </h2>
                <p className="max-w-xl text-[1.02rem] leading-relaxed text-white/65">
                  Plenty of brands install ScaleAble, see exactly where profit is leaking, and then run
                  out of time to fix it. If you would rather have the campaign work, creative testing
                  and conversion changes handled, that is our managed growth service.
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href={BOOK_CALL_URL}
                    size="lg"
                    trailingIcon
                    {...tracked(ANALYTICS_EVENTS.bookCall, "software_managed_bridge")}
                  >
                    Book a call
                  </Button>
                  <Button href="/managed-growth" variant="light" size="lg">
                    See managed growth
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-3xl border border-white/12 bg-ink-950/40 p-7">
                {[
                  "We run the Google Ads and Meta Ads accounts",
                  "We build and test the creative",
                  "We recommend the onsite conversion changes",
                  "You keep the profit data either way",
                ].map((line) => (
                  <p key={line} className="flex gap-3 text-[0.92rem] leading-snug text-white/72">
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-[0.2rem] h-3.5 w-3.5 shrink-0 text-brand-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 8.5 3.2 3.2L13 4.8" />
                    </svg>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section tone="mist" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow="Software questions" title="Before you install." className="mb-0" />
            </Reveal>
            <Reveal delay={100}>
              <FaqList faqs={softwareFaqs} />
            </Reveal>
          </div>
        </Shell>
      </Section>

      <CtaBand
        location="software_footer_cta"
        eyebrow="Get started"
        title="Install it on Shopify, or let us run the whole thing."
        body="ScaleAble is on the Shopify App Store. If you want the media buying handled as well, book a call and we'll look at your accounts first."
        showInstall
      />
    </>
  );
}
