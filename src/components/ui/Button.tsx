import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ink" | "outline" | "ghost" | "light" | "shopify";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-[0_10px_30px_-12px_rgba(7,75,191,0.9)] hover:bg-brand-600 hover:shadow-[0_18px_44px_-14px_rgba(22,96,232,0.95)] hover:-translate-y-0.5",
  ink: "bg-ink-900 text-white hover:bg-ink-800 hover:-translate-y-0.5 shadow-[0_10px_30px_-14px_rgba(11,17,32,0.8)]",
  outline:
    "border border-ink-900/15 bg-white/70 text-ink-900 backdrop-blur hover:border-brand-600/50 hover:bg-white hover:-translate-y-0.5",
  ghost: "text-ink-900 hover:bg-ink-900/5",
  light:
    "border border-white/25 bg-white/10 text-white backdrop-blur hover:border-white/50 hover:bg-white/18 hover:-translate-y-0.5",
  shopify:
    "bg-profit-500 text-ink-950 hover:bg-profit-400 hover:-translate-y-0.5 shadow-[0_12px_34px_-14px_rgba(18,201,138,0.9)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.82rem]",
  md: "h-11 px-5 text-[0.92rem]",
  lg: "h-13 px-7 text-[0.98rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  trailingIcon?: boolean;
};

type LinkProps = CommonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ActionProps = LinkProps | ButtonProps;

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function Button(props: ActionProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    trailingIcon = false,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span className="relative">{children}</span>
      {trailingIcon ? <Arrow /> : null}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorRest } = rest as unknown as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const isInternal = href.startsWith("/") && !href.startsWith("//");

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {content}
        </Link>
      );
    }

    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
