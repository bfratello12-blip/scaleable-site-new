import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "mist" | "ink" | "transparent";

const tones: Record<Tone, string> = {
  white: "bg-white text-ink-900",
  mist: "surface-mist text-ink-900",
  ink: "surface-ink",
  transparent: "",
};

export function Section({
  children,
  tone = "white",
  className,
  id,
  as: Tag = "section",
  size = "md",
  bleedTop = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  as?: ElementType;
  size?: "sm" | "md" | "lg" | "none";
  bleedTop?: boolean;
}) {
  const padding = {
    none: "",
    sm: "py-14 sm:py-16 lg:py-20",
    md: "py-20 sm:py-24 lg:py-32",
    lg: "py-24 sm:py-32 lg:py-40",
  }[size];

  return (
    <Tag
      id={id}
      className={cn("relative", tones[tone], padding, bleedTop && "-mt-px", className)}
    >
      {children}
    </Tag>
  );
}

export function Shell({
  children,
  className,
  tight = false,
}: {
  children: ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return <div className={cn("shell", tight && "shell-tight", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em]",
        tone === "dark" ? "text-brand-700" : "text-brand-300",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "dark" ? "bg-brand-600" : "bg-brand-400",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
  align = "left",
  className,
  as: Tag = "h2",
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  as?: ElementType;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          "text-[clamp(1.9rem,1.15rem+2.6vw,3.35rem)] leading-[1.06]",
          tone === "light" ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </Tag>
      {lede ? (
        <p
          className={cn(
            "text-[1.0625rem] leading-relaxed sm:text-lg",
            tone === "light" ? "text-white/70" : "text-ink-900/65",
          )}
        >
          {lede}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/** Thin luminous divider used between full-bleed sections. */
export function EdgeRule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("edge-top w-full", className)} />;
}
