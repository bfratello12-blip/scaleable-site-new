import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const chips = [
  { label: "Contribution profit", value: "$238,410", delta: "+18.4%", positive: true },
  { label: "Blended MER", value: "3.82x", delta: "+0.41", positive: true },
  { label: "Platform ROAS", value: "4.10x", delta: "diagnostic only", positive: false },
];

/**
 * Hero visual: a framed application surface with the real screenshot slot in the
 * middle and the metrics ScaleAble manages against floating around it.
 */
export function HeroConsole() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand-700/20 blur-[70px]"
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-ink-850/80 p-2.5 shadow-glow backdrop-blur-sm">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </span>
          <span className="ml-2 min-w-0 truncate rounded-md bg-white/5 px-2.5 py-1 font-mono text-[0.62rem] text-white/45">
            app.scaleableapp.com / profit-overview
          </span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-profit-500/12 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-profit-400">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-profit-400" />
            live
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 px-1 pb-2.5">
          {chips.map((chip) => (
            <div
              key={chip.label}
              className="min-w-0 rounded-xl border border-white/8 bg-white/[0.035] px-3 py-3"
            >
              <p className="text-[0.58rem] leading-tight uppercase tracking-[0.08em] text-white/40 sm:text-[0.62rem] sm:tracking-[0.1em]">
                {chip.label}
              </p>
              <p className="mt-1 font-display text-[1.05rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.25rem]">
                {chip.value}
              </p>
              <p
                className={`mt-0.5 text-[0.62rem] leading-tight sm:text-[0.65rem] ${
                  chip.positive ? "text-profit-400" : "text-white/35"
                }`}
              >
                {chip.delta}
              </p>
            </div>
          ))}
        </div>

        <ImagePlaceholder
          number={1}
          imageSrc="/brand/_scaleable_profit_dashboard_main_01.png"
          kind="dashboard"
          tone="dark"
          label="ScaleAble profit overview — contribution profit plotted against daily ad spend"
          width={1800}
          height={1100}
          ratio="~16:10"
          className="rounded-2xl border-white/8"
        />
      </div>

      <div className="pointer-events-none absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/12 bg-ink-900/90 px-4 py-3 shadow-lift-lg backdrop-blur sm:block">
        <p className="text-[0.6rem] uppercase tracking-[0.14em] text-white/40">Event marker</p>
        <p className="mt-0.5 text-[0.82rem] font-medium text-white">Meta budget +25% · Mar 04</p>
      </div>
    </div>
  );
}
