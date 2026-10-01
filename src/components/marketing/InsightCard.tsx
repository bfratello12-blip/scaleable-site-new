import Link from "next/link";
import type { InsightPost } from "@/content/insights";
import { formatInsightDate } from "@/content/insights";
import { cn } from "@/lib/cn";

export function InsightCard({
  post,
  featured = false,
  className,
}: {
  post: InsightPost;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-ink-900/10 bg-white p-7 shadow-lift transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-600/35 hover:shadow-lift-lg sm:p-9",
        featured && "lg:p-12",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand-600/15 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-brand-700/8 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-brand-700">
            {post.category}
          </span>
          <span className="text-[0.75rem] text-ink-900/45">{post.readingMinutes} min read</span>
        </div>

        <h2
          className={cn(
            "leading-[1.14] text-ink-900",
            featured ? "text-[clamp(1.5rem,1rem+1.6vw,2.25rem)]" : "text-[1.3rem] sm:text-[1.45rem]",
          )}
        >
          {post.title}
        </h2>

        <p className="max-w-xl text-[0.94rem] leading-relaxed text-ink-900/62">{post.excerpt}</p>
      </div>

      <div className="relative mt-8 flex items-center justify-between gap-4 border-t border-ink-900/10 pt-6">
        <time dateTime={post.publishedAt} className="text-[0.82rem] text-ink-900/45">
          {formatInsightDate(post.publishedAt)}
        </time>
        <span className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-brand-700">
          Read guide
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
