import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, Shell } from "@/components/ui/Section";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { BOOK_CALL_URL, managedService, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Talk to ScaleAble",
  description:
    "Tell us about your Shopify store and your current ad spend. We'll tell you where we'd expect to find profit before you commit to anything.",
  path: "/contact",
  keywords: ["contact Shopify ads agency", "book a call paid media", "ecommerce growth consultation"],
});

const expectations = [
  {
    title: "A reply from a person",
    body: "No sequence, no SDR, no discovery form gate. The person who would run your accounts is the person who reads this.",
  },
  {
    title: "A view before a pitch",
    body: "If you're comfortable sharing access, we'll look at the accounts and your margins before we tell you what we'd do.",
  },
  {
    title: "An honest answer on fit",
    body: "If you're not on Shopify, or the numbers don't support a $1,500 retainer yet, we'll say so.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${siteConfig.url}/contact`,
          mainEntity: {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
            email: siteConfig.contactEmail,
          },
        }}
      />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what you&apos;re
            <br className="hidden sm:block" /> spending and selling.
          </>
        }
        lede="The more specific you are, the more useful the first conversation is. Store, spend, platforms, and the thing that's actually bothering you."
        meta={[
          { label: "Email", value: siteConfig.contactEmail },
          { label: "Managed growth", value: `${managedService.priceFormatted} / month` },
          { label: "Response", value: "Within one business day" },
        ]}
      />

      <Section tone="mist" size="md">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <Reveal>
              <LeadForm location="contact_page" />
            </Reveal>

            <Reveal delay={110}>
              <div className="flex flex-col gap-6">
                <div className="rounded-3xl border border-white/12 bg-ink-900 p-8">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-300">
                    Prefer to talk
                  </p>
                  <h2 className="mt-3 text-[1.4rem] leading-snug text-white">
                    Book a call instead.
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-white/60">
                    Thirty minutes. We look at your current structure, your margins and where we think
                    spend is being wasted.
                  </p>
                  <Button
                    href={BOOK_CALL_URL}
                    size="lg"
                    trailingIcon
                    className="mt-6 w-full"
                    {...tracked(ANALYTICS_EVENTS.bookCall, "contact_page")}
                  >
                    Book a call
                  </Button>
                </div>

                <div className="flex flex-col gap-5 rounded-3xl border border-ink-900/10 bg-white p-8 shadow-lift">
                  <h2 className="text-[1.1rem] leading-snug text-ink-900">What happens next</h2>
                  <ul className="flex flex-col gap-5">
                    {expectations.map((item, i) => (
                      <li key={item.title} className="flex gap-4">
                        <span className="mt-0.5 font-mono text-[0.68rem] text-brand-700/50">
                          0{i + 1}
                        </span>
                        <div>
                          <p className="text-[0.95rem] font-medium text-ink-900">{item.title}</p>
                          <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-900/60">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4 rounded-3xl border border-ink-900/10 bg-mist-100 p-8">
                  <h2 className="text-[1.1rem] leading-snug text-ink-900">
                    Just want the software?
                  </h2>
                  <p className="text-[0.9rem] leading-relaxed text-ink-900/62">
                    ScaleAble is on the Shopify App Store. Install it, add your costs, and see your
                    contribution profit without talking to anyone.
                  </p>
                  <Button
                    href={siteConfig.shopifyAppUrl}
                    variant="shopify"
                    className="w-full sm:w-fit"
                    {...tracked(ANALYTICS_EVENTS.shopifyInstall, "contact_page")}
                  >
                    Install on Shopify
                  </Button>
                </div>

                <p className="text-[0.85rem] leading-relaxed text-ink-900/50">
                  Or email{" "}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-medium text-brand-700 underline-offset-4 hover:underline"
                    {...tracked(ANALYTICS_EVENTS.contactCta, "contact_page_email")}
                  >
                    {siteConfig.contactEmail}
                  </a>{" "}
                  directly.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>
    </>
  );
}
