import { cn } from "@/lib/cn";

/** Marks illustrative content that must be replaced with verified client data. */
export function PlaceholderNote({
  tone = "dark",
  className,
  children = "Placeholder data — replace with verified client results before publishing.",
  compact = false,
}: {
  tone?: "light" | "dark";
  className?: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  const isDark = tone === "dark";
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-mono uppercase leading-none tracking-[0.12em]",
        compact ? "px-2.5 py-1 text-[0.58rem]" : "px-3 py-1.5 text-[0.62rem]",
        isDark
          ? "border-signal-400/35 bg-signal-400/10 text-signal-400"
          : "border-signal-400/45 bg-signal-400/12 text-[#9A5A12]",
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal-400" />
      {children}
    </p>
  );
}
