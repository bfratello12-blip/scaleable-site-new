import type { Faq } from "@/content/faqs";
import { cn } from "@/lib/cn";

/** Accordion built on native <details> — no JavaScript, keyboard accessible by default. */
export function FaqList({
  faqs,
  tone = "light",
  className,
}: {
  faqs: Faq[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div className={cn("divide-y", isDark ? "divide-white/10" : "divide-ink-900/10", className)}>
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5 sm:py-6">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-6 text-left",
              isDark ? "text-white" : "text-ink-900",
            )}
          >
            <span className="text-[1.02rem] font-medium leading-snug sm:text-[1.1rem]">
              {faq.question}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-open:rotate-45",
                isDark ? "border-white/20 text-white/70" : "border-ink-900/15 text-ink-900/60",
              )}
            >
              <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <path d="M7 2v10M2 7h10" />
              </svg>
            </span>
          </summary>
          <p
            className={cn(
              "mt-3 max-w-2xl text-[0.95rem] leading-relaxed",
              isDark ? "text-white/60" : "text-ink-900/65",
            )}
          >
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
