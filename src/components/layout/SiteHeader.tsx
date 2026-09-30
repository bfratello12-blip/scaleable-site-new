"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";
import { BOOK_CALL_URL, primaryNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink-900"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-white/10 bg-ink-900/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <LogoLink tone="onDark" height={30} priority className="lg:[&_img]:!h-[34px]" />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? "text-white"
                    : "text-white/65 hover:text-white",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-brand-700 transition-transform duration-300",
                    isActive(item.href) && "scale-x-100",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Button
              href="/contact"
              variant="light"
              size="sm"
              {...tracked(ANALYTICS_EVENTS.contactCta, "header")}
            >
              Get a plan
            </Button>
            <Button
              href={BOOK_CALL_URL}
              variant="primary"
              size="sm"
              trailingIcon
              {...tracked(ANALYTICS_EVENTS.bookCall, "header")}
            >
              Book a call
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-5 bg-white transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-5 bg-white transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink-950/97 pt-[4.5rem] backdrop-blur-xl lg:hidden"
      >
        <div className="shell flex min-h-[calc(100dvh-4.5rem)] flex-col justify-between gap-10 py-8">
          <nav aria-label="Mobile" className="flex flex-col">
            {primaryNav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border-b border-white/8 py-5"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[1.65rem] font-semibold tracking-[-0.03em] text-white">
                    {item.label}
                  </span>
                  <span className="font-mono text-[0.65rem] text-brand-400/70">
                    0{i + 1}
                  </span>
                </span>
                {item.description ? (
                  <span className="mt-1.5 block max-w-sm text-sm leading-relaxed text-white/50">
                    {item.description}
                  </span>
                ) : null}
              </Link>
            ))}
            <Link href="/contact" className="border-b border-white/8 py-5">
              <span className="font-display text-[1.65rem] font-semibold tracking-[-0.03em] text-white">
                Contact
              </span>
            </Link>
          </nav>

          <div className="flex flex-col gap-3 pb-6">
            <Button
              href={BOOK_CALL_URL}
              size="lg"
              className="w-full"
              trailingIcon
              {...tracked(ANALYTICS_EVENTS.bookCall, "mobile_nav")}
            >
              Book a call
            </Button>
            <Button
              href={siteConfig.shopifyAppUrl}
              variant="light"
              size="lg"
              className="w-full"
              {...tracked(ANALYTICS_EVENTS.shopifyInstall, "mobile_nav")}
            >
              Install ScaleAble on Shopify
            </Button>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="pt-2 text-center text-sm text-white/50 underline-offset-4 hover:text-white hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
