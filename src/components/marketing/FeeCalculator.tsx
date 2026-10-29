"use client";

import { useId, useMemo, useState } from "react";
import {
  AGENCY_FEE_CAP_LABEL,
  AGENCY_FEE_FORMULA,
  AGENCY_FEE_RATE_LABEL,
  calculateFeeBreakdown,
  formatUsd,
  parseProfitInput,
} from "@/lib/pricing";
import { cn } from "@/lib/cn";

const PRESETS = [5000, 10000, 15000, 25000];

/**
 * Single-input illustration of the agency fee. Deliberately not a forecast:
 * the visitor supplies the eligible profit figure and we only apply the
 * published rate and cap to it.
 */
export function FeeCalculator({ className }: { className?: string }) {
  const inputId = useId();
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const [raw, setRaw] = useState("10000");

  const parsed = useMemo(() => parseProfitInput(raw), [raw]);
  const isBlank = raw.trim().length === 0;
  const isInvalid = !isBlank && parsed === null;
  const breakdown = calculateFeeBreakdown(parsed ?? 0);
  const hasValue = parsed !== null;

  const announcement = !hasValue
    ? "Enter a monthly eligible profit figure to see the agency fee."
    : `With ${formatUsd(breakdown.eligibleProfit)} of monthly eligible profit, the agency fee is ${formatUsd(
        breakdown.fee,
      )} and ${formatUsd(breakdown.remaining)} of eligible profit remains.`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-4xl border border-ink-900/10 bg-white shadow-lift",
        className,
      )}
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ------------------------------------------------------------ INPUT */}
        <div className="flex flex-col gap-6 border-b border-ink-900/10 p-7 sm:p-9 lg:border-b-0 lg:border-r">
          <div className="flex flex-col gap-2">
            <h3 className="text-[1.25rem] leading-snug text-ink-900">Estimate the agency fee</h3>
            <p className="text-[0.92rem] leading-relaxed text-ink-900/62">
              Enter a monthly figure and we apply the published rate and cap to it. This is an
              illustration, not a profit forecast or a complete accounting statement.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={inputId} className="text-[0.92rem] font-medium text-ink-900">
              Monthly eligible profit after ad spend and agreed costs
            </label>
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.05rem] font-medium text-ink-900/40"
              >
                $
              </span>
              <input
                id={inputId}
                name="eligible-profit"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                spellCheck={false}
                value={raw}
                onChange={(event) => setRaw(event.target.value)}
                aria-describedby={isInvalid ? `${hintId} ${errorId}` : hintId}
                aria-invalid={isInvalid || undefined}
                placeholder="10,000"
                className={cn(
                  "h-14 w-full rounded-2xl border bg-mist-50 pl-9 pr-4 font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-ink-900 outline-none transition-colors duration-200",
                  "focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-brand-600/30",
                  isInvalid ? "border-danger-400" : "border-ink-900/15",
                )}
              />
            </div>
            <p id={hintId} className="text-[0.82rem] leading-relaxed text-ink-900/55">
              Use a negative number to see a loss-making month. {AGENCY_FEE_FORMULA}
            </p>
            {isInvalid ? (
              <p id={errorId} className="text-[0.84rem] font-medium text-danger-600">
                Enter a number, for example 10000 or $12,500.50.
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setRaw(String(preset))}
                className="inline-flex min-h-9 items-center rounded-full border border-ink-900/12 bg-white px-3.5 py-1.5 text-[0.82rem] font-medium text-ink-900/70 transition-colors duration-200 hover:border-brand-600/50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
              >
                {formatUsd(preset)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setRaw("0")}
              className="inline-flex min-h-9 items-center rounded-full border border-ink-900/12 bg-white px-3.5 py-1.5 text-[0.82rem] font-medium text-ink-900/70 transition-colors duration-200 hover:border-brand-600/50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
            >
              No profit
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------- OUTPUT */}
        <div className="flex flex-col gap-6 bg-mist-50 p-7 sm:p-9">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
            Illustration
          </p>

          <dl className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-[0.86rem] text-ink-900/60">Our agency fee</dt>
              <dd className="font-display text-[clamp(2.2rem,1.6rem+2vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-ink-900">
                {hasValue ? formatUsd(breakdown.fee) : "—"}
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-t border-ink-900/10 pt-5">
              <dt className="text-[0.86rem] text-ink-900/60">
                Eligible profit remaining after our fee
              </dt>
              <dd className="font-display text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-ink-900">
                {hasValue ? formatUsd(breakdown.remaining) : "—"}
              </dd>
            </div>
          </dl>

          <p
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-[0.88rem] leading-relaxed text-ink-900/70"
          >
            {announcement}
          </p>

          {hasValue && breakdown.isZeroFee ? (
            <p className="text-[0.86rem] leading-relaxed text-ink-900/62">
              No positive eligible profit, so there is no agency fee for that month. You still fund
              your own advertising and business costs.
            </p>
          ) : null}

          {hasValue && breakdown.isCapped ? (
            <p className="text-[0.86rem] leading-relaxed text-ink-900/62">
              {AGENCY_FEE_RATE_LABEL} of that figure would be more than {AGENCY_FEE_CAP_LABEL}, so
              the fee stops at the cap. Every dollar of eligible profit above that point stays with
              you.
            </p>
          ) : null}

          <p className="mt-auto border-t border-ink-900/10 pt-5 text-[0.8rem] leading-relaxed text-ink-900/50">
            Figures are illustrative only. Your actual fee depends on the eligible business
            activity, revenue, cost inputs and measurement method we agree in writing before work
            begins.
          </p>
        </div>
      </div>
    </div>
  );
}
