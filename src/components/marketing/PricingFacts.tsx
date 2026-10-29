import {
  AGENCY_FEE_CAP_LABEL,
  AGENCY_FEE_RATE_LABEL,
  AGENCY_OFFER_CLARIFICATION,
} from "@/lib/pricing";
import { cn } from "@/lib/cn";

/**
 * The three facts that have to be unmistakable wherever the offer appears:
 * the rate, the zero-profit rule and the monthly cap.
 */
export const pricingFacts = [
  {
    value: AGENCY_FEE_RATE_LABEL,
    label: "of eligible profit",
    detail: "Calculated after ad spend and agreed direct costs, before our fee.",
  },
  {
    value: "$0",
    label: "agency fee at zero profit",
    detail: "No positive eligible profit in a month means no agency fee for that month.",
  },
  {
    value: AGENCY_FEE_CAP_LABEL,
    label: "maximum per month",
    detail: "Our agency fee never exceeds this, however much eligible profit there is.",
  },
] as const;

export function PricingFacts({
  tone = "dark",
  className,
  showClarification = true,
}: {
  /** "dark" = light text on an ink surface. */
  tone?: "dark" | "light";
  className?: string;
  showClarification?: boolean;
}) {
  const isDark = tone === "dark";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <dl className="grid gap-3 sm:grid-cols-3">
        {pricingFacts.map((fact) => (
          <div
            key={fact.label}
            className={cn(
              "flex flex-col gap-1 rounded-2xl border p-4 sm:p-5",
              isDark ? "border-white/12 bg-white/[0.045]" : "border-ink-900/10 bg-white shadow-lift",
            )}
          >
            <dt
              className={cn(
                "font-display text-[1.75rem] font-semibold leading-none tracking-[-0.03em] sm:text-[2rem]",
                isDark ? "text-white" : "text-ink-900",
              )}
            >
              {fact.value}
            </dt>
            <dd className="flex flex-col gap-1">
              <span
                className={cn(
                  "text-[0.86rem] font-medium",
                  isDark ? "text-white/80" : "text-ink-900/85",
                )}
              >
                {fact.label}
              </span>
              <span
                className={cn(
                  "text-[0.8rem] leading-relaxed",
                  isDark ? "text-white/55" : "text-ink-900/68",
                )}
              >
                {fact.detail}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {showClarification ? (
        <p
          className={cn(
            "max-w-xl text-[0.88rem] leading-relaxed",
            isDark ? "text-white/60" : "text-ink-900/62",
          )}
        >
          {AGENCY_OFFER_CLARIFICATION}
        </p>
      ) : null}
    </div>
  );
}
