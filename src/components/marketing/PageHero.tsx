import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

/**
 * Shared dark hero for interior pages. The site header sits transparently on
 * top of it, which is why every page opens on an ink surface.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  aside,
  meta,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  meta?: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <section className={cn("surface-ink overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />
      <Shell className="relative">
        <div
          className={cn(
            "grid gap-12",
            aside ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-16" : undefined,
          )}
        >
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="max-w-3xl text-[clamp(2.2rem,1.2rem+3.4vw,4.1rem)] leading-[1.02] text-white">
                {title}
              </h1>
            </Reveal>
            {lede ? (
              <Reveal delay={120}>
                <p className="max-w-xl text-[1.05rem] leading-relaxed text-white/65 sm:text-[1.12rem]">
                  {lede}
                </p>
              </Reveal>
            ) : null}
            {actions ? (
              <Reveal delay={180}>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div>
              </Reveal>
            ) : null}
            {meta ? (
              <Reveal delay={240}>
                <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-3 lg:max-w-xl">
                  {meta.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/35">
                        {item.label}
                      </dt>
                      <dd className="text-[0.95rem] font-medium text-white/85">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}
          </div>

          {aside ? (
            <Reveal delay={140} className="lg:pl-4">
              {aside}
            </Reveal>
          ) : null}
        </div>
      </Shell>
    </section>
  );
}
