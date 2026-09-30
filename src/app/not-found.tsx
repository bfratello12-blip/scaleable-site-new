import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Shell } from "@/components/ui/Section";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="surface-ink flex min-h-[80dvh] items-center overflow-hidden pb-24 pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />
      <Shell className="relative">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brand-300">
          404 — not found
        </p>
        <h1 className="mt-5 max-w-2xl text-[clamp(2rem,1.3rem+3vw,3.75rem)] leading-[1.04] text-white">
          That page doesn&apos;t exist. This one does.
        </h1>
        <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-white/60">
          Try one of these, or tell us what you were looking for.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg" trailingIcon>
            Back to home
          </Button>
          <Button href="/contact" variant="light" size="lg">
            Contact us
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-8">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.92rem] text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Shell>
    </section>
  );
}
