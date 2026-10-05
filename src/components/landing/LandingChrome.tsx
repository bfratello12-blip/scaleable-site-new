import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Shell } from "@/components/ui/Section";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";

/**
 * Landing-page chrome. Deliberately navigation-free: the logo is not a link and
 * the only action on screen is the one the ad promised.
 */
export function LandingHeader({
  ctaHref,
  ctaLabel,
  note,
  location,
}: {
  ctaHref: string;
  ctaLabel: string;
  note?: string;
  location: string;
}) {
  return (
    <>
      <a
        href="#lp-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink-900"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-900/80 backdrop-blur-xl">
        <Shell className="flex h-[4.25rem] items-center justify-between gap-4 lg:h-[4.75rem]">
          <Logo tone="onDark" height={28} priority className="lg:[&_img]:!h-[32px]" />

          <div className="flex items-center gap-5">
            {note ? <p className="hidden text-[0.84rem] text-white/50 md:block">{note}</p> : null}
            <Button
              href={ctaHref}
              size="sm"
              className="lg:h-11 lg:px-5 lg:text-[0.9rem]"
              {...tracked(ANALYTICS_EVENTS.contactCta, location)}
            >
              {ctaLabel}
            </Button>
          </div>
        </Shell>
      </header>
    </>
  );
}

export function LandingFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="surface-ink border-t border-white/10">
      <Shell className="flex flex-col items-start gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo tone="onDark" height={28} />
        <div className="flex flex-col gap-1.5 text-[0.82rem] leading-relaxed text-white/45 sm:items-end">
          {children}
        </div>
      </Shell>
    </footer>
  );
}

/**
 * Mobile-only persistent CTA. Pure CSS — no scroll listeners, so it costs
 * nothing on the devices that need it most. The spacer keeps the bar from
 * covering the end of the page.
 */
export function StickyFormCta({
  href,
  label,
  location,
}: {
  href: string;
  label: string;
  location: string;
}) {
  return (
    <>
      <div aria-hidden="true" className="h-[4.75rem] sm:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/92 px-4 py-3 backdrop-blur-xl sm:hidden">
        <Button
          href={href}
          size="lg"
          trailingIcon
          className="w-full"
          {...tracked(ANALYTICS_EVENTS.contactCta, location)}
        >
          {label}
        </Button>
      </div>
    </>
  );
}
