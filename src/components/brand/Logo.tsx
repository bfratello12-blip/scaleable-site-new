import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

// Intrinsic dimensions of the supplied master logo.
const LOGO_W = 1560.5931;
const LOGO_H = 355.37827;
const LOGO_RATIO = LOGO_W / LOGO_H;

export function Logo({
  tone = "onLight",
  height = 34,
  className,
  priority = false,
}: {
  /** `onDark` swaps to the light-neutral variant for dark surfaces. */
  tone?: "onLight" | "onDark";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const src = tone === "onDark" ? "/brand/scaleable-logo-dark.svg" : "/brand/scaleable-logo.svg";

  return (
    <Image
      src={src}
      alt={`${siteConfig.name} logo`}
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height, width: "auto" }}
    />
  );
}

export function LogoMark({
  tone = "onLight",
  size = 40,
  className,
}: {
  tone?: "onLight" | "onDark";
  size?: number;
  className?: string;
}) {
  const src = tone === "onDark" ? "/brand/scaleable-mark-dark.svg" : "/brand/scaleable-mark.svg";
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={cn("select-none", className)}
    />
  );
}

export function LogoLink({
  tone = "onLight",
  height = 34,
  className,
  priority = false,
}: {
  tone?: "onLight" | "onDark";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-lg transition-opacity duration-200 hover:opacity-85",
        className,
      )}
    >
      <Logo tone={tone} height={height} priority={priority} />
    </Link>
  );
}
