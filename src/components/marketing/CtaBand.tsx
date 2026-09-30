import { LogoMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, Shell } from "@/components/ui/Section";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { BOOK_CALL_URL, managedService, siteConfig } from "@/lib/site";

export function CtaBand({
  eyebrow = "Next step",
  title = "Find out what your ad spend is actually earning you.",
  body = "A 30-minute call: we look at your current Google Ads and Meta Ads structure, your Shopify economics, and tell you where profit is being lost. No deck, no pitch theatre.",
  primaryLabel = "Book a call",
  secondaryLabel = "Send us your numbers",
  location = "page_footer_cta",
  showInstall = false,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  location?: string;
  showInstall?: boolean;
}) {
  return (
    <Section tone="ink" size="md" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-b"
      />
      <Shell>
        <Reveal className="relative overflow-hidden rounded-4xl border border-white/12 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950 p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-brand-700/35 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand-400/12 blur-[90px]"
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end">
            <div className="flex flex-col gap-5">
              <p className="inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                {eyebrow}
              </p>
              <h2 className="max-w-2xl text-[clamp(1.85rem,1.1rem+2.6vw,3.1rem)] leading-[1.06] text-white">
                {title}
              </h2>
              <p className="max-w-xl text-[1.03rem] leading-relaxed text-white/65">{body}</p>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href={BOOK_CALL_URL}
                  size="lg"
                  trailingIcon
                  {...tracked(ANALYTICS_EVENTS.bookCall, location)}
                >
                  {primaryLabel}
                </Button>
                <Button
                  href="/contact"
                  variant="light"
                  size="lg"
                  {...tracked(ANALYTICS_EVENTS.contactCta, location)}
                >
                  {secondaryLabel}
                </Button>
                {showInstall ? (
                  <Button
                    href={siteConfig.shopifyAppUrl}
                    variant="shopify"
                    size="lg"
                    {...tracked(ANALYTICS_EVENTS.shopifyInstall, location)}
                  >
                    Install on Shopify
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="relative flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <LogoMark tone="onDark" size={52} className="shrink-0 opacity-90" />
              <div className="text-sm leading-relaxed text-white/60">
                <p className="font-medium text-white">
                  {managedService.priceFormatted} {managedService.cadence}
                </p>
                <p>
                  Paid search, paid social, creative, CRO and profit analytics in one retainer.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Shell>
    </Section>
  );
}
