import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Shell } from "@/components/ui/Section";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { footerNav, managedService, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-ink border-t border-white/10">
      <Shell className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-6">
            <Logo tone="onDark" height={36} />
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              Paid search and paid social managed for Shopify brands — measured against contribution
              profit inside our own analytics platform, not platform-reported ROAS.
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="w-fit text-white/80 underline-offset-4 transition-colors hover:text-brand-300 hover:underline"
                {...tracked(ANALYTICS_EVENTS.contactCta, "footer")}
              >
                {siteConfig.contactEmail}
              </a>
              <p className="text-white/40">
                Managed growth — {managedService.priceFormatted} {managedService.cadence}
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title} className="flex flex-col gap-4">
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-300/80">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => {
                    const isInternal = link.href.startsWith("/");
                    const className =
                      "text-[0.9rem] text-white/60 transition-colors duration-200 hover:text-white";
                    return (
                      <li key={`${group.title}-${link.label}`}>
                        {isInternal ? (
                          <Link href={link.href} className={className}>
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className={className}
                            {...(link.href.startsWith("http")
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                          >
                            {link.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[0.8rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Shopify paid media management</span>
            <span aria-hidden="true" className="text-white/20">
              /
            </span>
            <span>Google Ads &amp; Meta Ads</span>
            <span aria-hidden="true" className="text-white/20">
              /
            </span>
            <span>Ecommerce profit analytics</span>
          </p>
        </div>
      </Shell>
    </footer>
  );
}
