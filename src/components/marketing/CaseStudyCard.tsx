import Link from "next/link";
import type { CaseStudy } from "@/content/caseStudies";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { cn } from "@/lib/cn";
import { ANALYTICS_EVENTS, tracked } from "@/lib/analytics";

export function CaseStudyCard({
  study,
  tone = "dark",
  featured = false,
  className,
}: {
  study: CaseStudy;
  tone?: "light" | "dark";
  featured?: boolean;
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <Link
      href={`/results/${study.slug}`}
      {...tracked(ANALYTICS_EVENTS.caseStudyOpen, `case_card_${study.slug}`)}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:p-9",
        isDark
          ? "border-white/12 bg-white/[0.035] hover:border-brand-400/40 hover:bg-white/[0.06]"
          : "border-ink-900/10 bg-white shadow-lift hover:border-brand-600/35 hover:shadow-lift-lg",
        featured && "lg:p-12",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand-600/20 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em]",
              isDark ? "bg-brand-400/12 text-brand-300" : "bg-brand-700/8 text-brand-700",
            )}
          >
            {study.vertical}
          </span>
          <span className={cn("text-[0.75rem]", isDark ? "text-white/40" : "text-ink-900/45")}>
            {study.spendBand}
          </span>
        </div>

        <h3
          className={cn(
            featured ? "text-[clamp(1.5rem,1rem+1.6vw,2.25rem)]" : "text-[1.35rem] sm:text-[1.5rem]",
            "leading-[1.14]",
            isDark ? "text-white" : "text-ink-900",
          )}
        >
          {study.headline}
        </h3>

        <p
          className={cn(
            "max-w-xl text-[0.94rem] leading-relaxed",
            isDark ? "text-white/60" : "text-ink-900/62",
          )}
        >
          {study.summary}
        </p>
      </div>

      <div className="relative mt-8 flex flex-col gap-6">
        <div
          className={cn(
            "grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 sm:grid-cols-4",
            isDark ? "border-white/10" : "border-ink-900/10",
          )}
        >
          {study.metrics.slice(0, 4).map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <span
                className={cn(
                  "font-display text-[1.35rem] font-semibold tracking-[-0.03em]",
                  metric.positive === false
                    ? isDark
                      ? "text-white/55"
                      : "text-ink-900/50"
                    : "text-gradient-brand",
                )}
              >
                {metric.delta}
              </span>
              <span
                className={cn(
                  "text-[0.73rem] leading-tight",
                  isDark ? "text-white/45" : "text-ink-900/50",
                )}
              >
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          {study.isPlaceholder ? (
            <PlaceholderNote tone={tone} compact>
              Placeholder data
            </PlaceholderNote>
          ) : (
            <span className={cn("text-[0.75rem]", isDark ? "text-white/40" : "text-ink-900/45")}>
              {study.timeframe} · {study.channels.join(" · ")}
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center gap-2 text-[0.85rem] font-medium",
              isDark ? "text-brand-300" : "text-brand-700",
            )}
          >
            Read the breakdown
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
