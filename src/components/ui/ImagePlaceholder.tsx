import { cn } from "@/lib/cn";

type Kind = "image" | "dashboard" | "chart" | "portrait" | "video" | "logo";
type Tone = "light" | "dark";

const KIND_LABEL: Record<Kind, string> = {
  image: "IMAGE PLACEHOLDER",
  dashboard: "DASHBOARD SCREENSHOT",
  chart: "CHART / DATA VIEW",
  portrait: "PORTRAIT PLACEHOLDER",
  video: "VIDEO PLACEHOLDER",
  logo: "LOGO PLACEHOLDER",
};

const IMAGE_SOURCES: Record<number, string> = {
  1: "/brand/_scaleable_profit_dashboard_main_01.png",
  2: "/brand/scaleable_product_profit_02.png",
  3: "/brand/scaleable_profit_roas_mer_03.png",
  4: "/brand/scaleable_channel_performance_04.png",
};

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function ratioOf(width: number, height: number) {
  const divisor = gcd(width, height);
  const w = width / divisor;
  const h = height / divisor;
  if (w > 32 || h > 32) return `~${(width / height).toFixed(2)}:1`;
  return `${w}:${h}`;
}

/**
 * Designed placeholder for imagery that will be supplied later.
 * Always states what belongs there, the recommended pixel size and the aspect ratio.
 */
export function ImagePlaceholder({
  number,
  imageSrc,
  kind = "image",
  label,
  width,
  height,
  ratio,
  tone = "light",
  className,
  chrome = false,
  chromeLabel = "app.scaleableapp.com / dashboard",
}: {
  number: number;
  imageSrc?: string;
  kind?: Kind;
  label: string;
  width: number;
  height: number;
  ratio?: string;
  tone?: Tone;
  className?: string;
  /** Adds a browser frame — use for application screenshots. */
  chrome?: boolean;
  chromeLabel?: string;
}) {
  const isDark = tone === "dark";
  const aspect = ratio ?? ratioOf(width, height);
  const resolvedImageSrc = imageSrc ?? IMAGE_SOURCES[number];

  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        isDark
          ? "border border-white/12 bg-ink-850 text-white"
          : "border border-ink-900/10 bg-mist-100 text-ink-900",
        className,
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-label={`Image ${number.toString().padStart(2, "0")}: ${label}`}
    >
      <div
        aria-hidden="true"
        className={cn("absolute inset-0", isDark ? "bg-grid" : "bg-grid-ink")}
        style={{ backgroundSize: "40px 40px" }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[radial-gradient(120%_90%_at_50%_0%,rgba(22,96,232,0.30),transparent_65%)]"
            : "bg-[radial-gradient(120%_90%_at_50%_0%,rgba(104,180,255,0.22),transparent_65%)]",
        )}
      />

      {resolvedImageSrc ? (
        <img
          src={resolvedImageSrc}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      <span
        className={cn(
          "absolute right-4 top-4 z-10 inline-flex h-8 min-w-8 items-center justify-center rounded-full border px-2 font-mono text-[0.68rem] font-semibold tracking-[0.08em]",
          isDark
            ? "border-white/15 bg-ink-900/65 text-white/80"
            : "border-ink-900/12 bg-white/75 text-ink-900/70",
        )}
      >
        {number.toString().padStart(2, "0")}
      </span>

      {chrome ? (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 flex h-9 items-center gap-2 border-b px-4",
            isDark ? "border-white/10 bg-white/5" : "border-ink-900/10 bg-white/70",
          )}
        >
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-danger-400/70" />
            <span className="h-2 w-2 rounded-full bg-signal-400/70" />
            <span className="h-2 w-2 rounded-full bg-profit-400/70" />
          </span>
          <span
            className={cn(
              "ml-2 min-w-0 truncate rounded-md px-2 py-0.5 font-mono text-[0.62rem] tracking-tight",
              isDark ? "bg-white/8 text-white/55" : "bg-ink-900/5 text-ink-900/50",
            )}
          >
            {chromeLabel}
          </span>
        </div>
      ) : null}

      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-6 text-center",
          chrome && "pt-9",
          resolvedImageSrc && "hidden",
        )}
      >
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em]",
            isDark ? "bg-brand-400/15 text-brand-300" : "bg-brand-700/10 text-brand-700",
          )}
        >
          <PlaceholderGlyph kind={kind} />
          {KIND_LABEL[kind]}
        </span>

        <p
          className={cn(
            "max-w-[34ch] text-balance text-[0.95rem] font-medium leading-snug",
            isDark ? "text-white/85" : "text-ink-900/80",
          )}
        >
          {label}
        </p>

        <p
          className={cn(
            "font-mono text-[0.68rem] leading-relaxed tracking-tight",
            isDark ? "text-white/45" : "text-ink-900/45",
          )}
        >
          Recommended: {width.toLocaleString()} × {height.toLocaleString()}px
          <br />
          Aspect ratio: {aspect}
        </p>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-2 rounded-xl border border-dashed",
          isDark ? "border-white/12" : "border-ink-900/12",
        )}
      />
    </figure>
  );
}

function PlaceholderGlyph({ kind }: { kind: Kind }) {
  const common = {
    viewBox: "0 0 16 16",
    className: "h-3 w-3",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "chart" || kind === "dashboard") {
    return (
      <svg {...common}>
        <path d="M2 13h12M4 10.5V7M7.5 13V4.5M11 13V8.5" />
      </svg>
    );
  }
  if (kind === "video") {
    return (
      <svg {...common}>
        <path d="M6.5 5.5 11 8l-4.5 2.5z" />
        <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="2" />
      <path d="m2.5 11 3.25-3.25 2.5 2.5L10.75 8l2.75 2.75" />
      <circle cx="10" cy="5.75" r="1" />
    </svg>
  );
}
