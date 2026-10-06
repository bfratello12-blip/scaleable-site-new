import type { ReactNode } from "react";
import { LogoLink } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Shell } from "@/components/ui/Section";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";

/**
 * Landing-page footer. Trimmed to a logo and contact line so the page ends on
 * the lead form rather than a second navigation block — the shared site header
 * is still present for anyone who wants to explore the rest of the site.
 */
export function LandingFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="surface-ink border-t border-white/10">
      <Shell className="flex flex-col items-start gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <LogoLink tone="onDark" height={28} />
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
