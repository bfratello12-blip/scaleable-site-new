import { Button } from "@/components/ui/Button";
import { includedCapabilities } from "@/content/services";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { BOOK_CALL_URL, managedService, siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

function Check({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn("mt-[0.28rem] h-3.5 w-3.5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 8.5 3.2 3.2L13 4.8" />
    </svg>
  );
}

export function ManagedPricingCard({
  location = "pricing_card",
  className,
}: {
  location?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-4xl border border-white/12 bg-gradient-to-b from-ink-850 to-ink-950 p-8 sm:p-10 lg:p-12",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-brand-700/40 blur-[80px]"
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-14">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-300">
              Managed growth
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[clamp(2.8rem,2rem+3vw,4.25rem)] font-semibold leading-none tracking-[-0.045em] text-white">
                {managedService.priceFormatted}
              </span>
              <span className="text-[1rem] text-white/50">{managedService.cadence}</span>
            </div>
            <p className="text-[0.85rem] text-white/45">
              Flat retainer. Not a percentage of your ad spend.
            </p>
          </div>

          <p className="max-w-sm text-[0.98rem] leading-relaxed text-white/65">
            One team running paid search, paid social, creative and conversion work for your Shopify
            store — measured against contribution profit in the ScaleAble platform.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              href={BOOK_CALL_URL}
              size="lg"
              trailingIcon
              className="w-full sm:w-auto lg:w-full"
              {...tracked(ANALYTICS_EVENTS.pricingCta, location)}
            >
              Book a call
            </Button>
            <Button
              href="/contact"
              variant="light"
              size="lg"
              className="w-full sm:w-auto lg:w-full"
              {...tracked(ANALYTICS_EVENTS.contactCta, location)}
            >
              Send us your numbers
            </Button>
          </div>

          <p className="text-[0.78rem] leading-relaxed text-white/40">
            Every engagement starts with the ScaleAble app installed on your Shopify store — it is how
            we measure what the advertising is actually doing.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 lg:border-l lg:border-white/10 lg:pl-12">
          {includedCapabilities.map((group) => (
            <div key={group.group} className="flex flex-col gap-4">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                {group.group}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.88rem] leading-snug text-white/75">
                    <Check className="text-brand-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SoftwareAccessCard({
  location = "pricing_software_card",
  className,
}: {
  location?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-4xl border border-ink-900/10 bg-white p-8 shadow-lift sm:p-10",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-700">
          Software only
        </p>
        <h3 className="text-[1.6rem] leading-tight text-ink-900">
          Want the profit data without the managed service?
        </h3>
      </div>

      <p className="max-w-xl text-[0.98rem] leading-relaxed text-ink-900/65">
        ScaleAble is a Shopify app. Install it, load your real costs, connect Google Ads and Meta Ads,
        and you get contribution profit, blended MER and product-level profitability on your own.
        Plans and current pricing live on the app site.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          href={siteConfig.shopifyAppUrl}
          variant="shopify"
          size="lg"
          {...tracked(ANALYTICS_EVENTS.shopifyInstall, location)}
        >
          Install ScaleAble on Shopify
        </Button>
        <Button href="/software" variant="outline" size="lg" trailingIcon>
          See what it does
        </Button>
      </div>
    </div>
  );
}
