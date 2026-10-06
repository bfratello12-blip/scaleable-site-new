import { cn } from "@/lib/cn";

type Point = { x: number; y: number };

/** Smooth cubic path through points (Catmull-Rom converted to bezier). */
function smoothPath(points: Point[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

const W = 720;
const H = 330;
const PAD = { top: 26, right: 18, bottom: 34, left: 18 };
const INNER_W = W - PAD.left - PAD.right;
const INNER_H = H - PAD.top - PAD.bottom;

function buildPoints(values: number[], max: number): Point[] {
  const n = values.length;
  return values.map((v, i) => ({
    x: PAD.left + (n === 1 ? INNER_W / 2 : (INNER_W * i) / (n - 1)),
    y: PAD.top + INNER_H - (v / max) * INNER_H,
  }));
}

/**
 * Dual-series chart: profit as a filled area, ad spend as a line.
 * Each series is scaled independently — the point is the shape of the
 * relationship, not a shared magnitude.
 */
export function ProfitSpendChart({
  labels,
  profit,
  spend,
  profitLabel = "Profit",
  spendLabel = "Ad spend",
  tone = "dark",
  className,
  caption,
}: {
  labels: string[];
  profit: number[];
  spend: number[];
  profitLabel?: string;
  spendLabel?: string;
  tone?: "dark" | "light";
  className?: string;
  caption?: string;
}) {
  const id = `${profitLabel}-${labels.length}-${profit[0]}`.replace(/[^a-z0-9]/gi, "");
  const maxProfit = Math.max(...profit) * 1.18;
  const maxSpend = Math.max(...spend) * 1.85;

  const profitPoints = buildPoints(profit, maxProfit);
  const spendPoints = buildPoints(spend, maxSpend);
  const profitLine = smoothPath(profitPoints);
  const spendLine = smoothPath(spendPoints);
  const areaPath = `${profitLine} L ${profitPoints[profitPoints.length - 1].x} ${PAD.top + INNER_H} L ${profitPoints[0].x} ${PAD.top + INNER_H} Z`;

  const isDark = tone === "dark";
  const axisColor = isDark ? "rgba(255,255,255,0.10)" : "rgba(11,17,32,0.09)";
  const labelColor = isDark ? "rgba(255,255,255,0.42)" : "rgba(11,17,32,0.42)";

  return (
    <figure className={cn("w-full", className)}>
      <figcaption className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span
          className={cn(
            "inline-flex items-center gap-2 text-[0.78rem] font-medium",
            isDark ? "text-white/80" : "text-ink-900/75",
          )}
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-[3px] bg-gradient-to-br from-brand-400 to-brand-700"
          />
          {profitLabel}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-2 text-[0.78rem] font-medium",
            isDark ? "text-white/55" : "text-ink-900/55",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-0.5 w-5 rounded-full",
              isDark ? "bg-white/45" : "bg-ink-900/35",
            )}
          />
          {spendLabel}
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${profitLabel} plotted against ${spendLabel} across ${labels.length} periods`}
      >
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#68B4FF" stopOpacity={isDark ? 0.42 : 0.34} />
            <stop offset="100%" stopColor="#074BBF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`line-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#68B4FF" />
            <stop offset="100%" stopColor={isDark ? "#4E9BFF" : "#074BBF"} />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={PAD.left}
            x2={W - PAD.right}
            y1={PAD.top + INNER_H * t}
            y2={PAD.top + INNER_H * t}
            stroke={axisColor}
            strokeWidth="1"
          />
        ))}

        <path d={areaPath} fill={`url(#area-${id})`} />
        <path
          d={spendLine}
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.45)" : "rgba(11,17,32,0.32)"}
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
        />
        <path
          d={profitLine}
          fill="none"
          stroke={`url(#line-${id})`}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {profitPoints.map((p, i) => (
          <circle
            key={`p-${labels[i]}`}
            cx={p.x}
            cy={p.y}
            r={i === profitPoints.length - 1 ? 5 : 3}
            fill={i === profitPoints.length - 1 ? "#68B4FF" : isDark ? "#0B1120" : "#FFFFFF"}
            stroke="#68B4FF"
            strokeWidth="2"
          />
        ))}

        {labels.map((label, i) => (
          <text
            key={label}
            x={profitPoints[i].x}
            y={H - 10}
            textAnchor="middle"
            fontSize="12"
            fill={labelColor}
            fontFamily="ui-monospace, monospace"
          >
            {label}
          </text>
        ))}
      </svg>

      {caption ? (
        <p
          className={cn(
            "mt-3 text-[0.75rem] leading-relaxed",
            isDark ? "text-white/40" : "text-ink-900/45",
          )}
        >
          {caption}
        </p>
      ) : null}
    </figure>
  );
}

/**
 * The homepage argument in one picture: platform-reported ROAS holding steady
 * while profit falls away underneath it.
 */
export function DivergenceChart({ className }: { className?: string }) {
  const roas = [3.2, 3.3, 3.4, 3.35, 3.45, 3.4, 3.5, 3.45];
  const profit = [100, 103, 99, 92, 84, 73, 64, 52];

  const roasPoints = buildPoints(roas, Math.max(...roas) * 1.35);
  const profitPoints = buildPoints(profit, Math.max(...profit) * 1.2);

  const roasLine = smoothPath(roasPoints);
  const profitLine = smoothPath(profitPoints);
  const area = `${profitLine} L ${profitPoints[profitPoints.length - 1].x} ${PAD.top + INNER_H} L ${profitPoints[0].x} ${PAD.top + INNER_H} Z`;

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Illustration: platform-reported ROAS stays flat while profit declines"
      >
        <defs>
          <linearGradient id="divergence-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF7A6B" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#FF7A6B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={PAD.left}
            x2={W - PAD.right}
            y1={PAD.top + INNER_H * t}
            y2={PAD.top + INNER_H * t}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        <path d={area} fill="url(#divergence-area)" />
        <path
          d={roasLine}
          fill="none"
          stroke="#68B4FF"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
        <path d={profitLine} fill="none" stroke="#FF7A6B" strokeWidth="2.75" strokeLinecap="round" />

        <text x={PAD.left + 6} y={roasPoints[0].y - 14} fontSize="13" fill="#68B4FF" fontFamily="ui-monospace, monospace">
          Platform ROAS
        </text>
        <text
          x={W - PAD.right - 6}
          y={profitPoints[profitPoints.length - 1].y - 16}
          fontSize="13"
          fill="#FF7A6B"
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
        >
          Profit
        </text>
      </svg>
    </figure>
  );
}
