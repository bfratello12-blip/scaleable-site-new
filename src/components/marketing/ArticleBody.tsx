import type { InsightBlock } from "@/content/insights";
import { slugifyHeading } from "@/content/insights";

/** Splits on `**bold**` and returns React nodes — never raw HTML. */
function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-ink-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function Block({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={slugifyHeading(block.text)}
          className="mt-16 scroll-mt-28 text-[clamp(1.5rem,1.1rem+1.3vw,2.1rem)] leading-[1.15] text-ink-900 first:mt-0"
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="mt-10 text-[1.15rem] font-semibold leading-snug text-ink-900">
          {block.text}
        </h3>
      );

    case "p":
      return (
        <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink-900/72">
          {renderInline(block.text)}
        </p>
      );

    case "ul":
      return (
        <ul className="mt-5 flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 text-[1.02rem] leading-[1.7] text-ink-900/72">
              <span
                aria-hidden="true"
                className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600/60"
              />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "formula":
      return (
        <div className="mt-7 rounded-2xl border border-ink-900/10 bg-mist-100 px-6 py-5">
          {block.lines.map((line, i) => (
            <p
              key={i}
              className="font-mono text-[0.92rem] leading-relaxed text-ink-900 sm:text-[0.98rem]"
            >
              {line}
            </p>
          ))}
          {block.caption ? (
            <p className="mt-2 text-[0.82rem] text-ink-900/50">{block.caption}</p>
          ) : null}
        </div>
      );

    case "callout":
      return (
        <div className="mt-8 rounded-2xl border border-brand-600/20 bg-brand-50 px-6 py-6 sm:px-8">
          {block.title ? (
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-700">
              {block.title}
            </p>
          ) : null}
          <p className="mt-1 text-[1.1rem] font-medium leading-snug text-ink-900">
            {renderInline(block.body)}
          </p>
        </div>
      );

    case "quote":
      return (
        <blockquote className="mt-7 border-l-2 border-brand-600/40 pl-5 text-[1.08rem] font-medium leading-relaxed text-ink-900/80">
          {block.text}
        </blockquote>
      );

    case "table":
      return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-ink-900/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-mist-100">
                {block.head.map((cell, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-4 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-900/50 sm:px-6"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-900/8">
              {block.rows.map((row, i) => (
                <tr key={i} className="bg-white">
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th
                        key={j}
                        scope="row"
                        className="px-4 py-4 text-left text-[0.92rem] font-medium text-ink-900 sm:px-6"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td
                        key={j}
                        className="px-4 py-4 font-mono text-[0.9rem] text-ink-900/70 sm:px-6"
                      >
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function ArticleBody({ blocks }: { blocks: InsightBlock[] }) {
  return (
    <div>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
