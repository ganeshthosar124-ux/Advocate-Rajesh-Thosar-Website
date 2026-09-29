import Link from "next/link";
import type { PracticeArea } from "@/lib/content";
import { ArrowIcon } from "@/components/ui/Icons";
import { PracticeIcon } from "@/components/ui/PracticeIcon";

/**
 * Practice area cards. "dark" is for the navy stage (glass cards with a gold
 * pointer spotlight); "light" is for ivory backgrounds.
 */
export function PracticeGrid({
  areas,
  headingLevel = "h3",
  tone = "dark",
}: {
  areas: PracticeArea[];
  headingLevel?: "h2" | "h3";
  tone?: "dark" | "light";
}) {
  const Heading = headingLevel;
  const dark = tone === "dark";
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {areas.map((area, i) => (
        <li key={area.slug} data-reveal style={{ "--reveal-delay": (i % 3) * 90 } as React.CSSProperties}>
          <Link
            href={`/practice-areas/${area.slug}`}
            className={`spotlight group flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 sm:p-8 ${
              dark
                ? "border border-white/10 bg-white/[0.03] hover:border-brass/50 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
                : "border border-line bg-white hover:border-brass/60 hover:shadow-[0_30px_60px_-35px_rgba(11,26,48,0.45)]"
            }`}
          >
            <div className="flex items-start justify-between">
              <span
                className={`grid size-14 place-items-center rounded-xl border transition-colors duration-500 ${
                  dark
                    ? "border-brass/30 bg-brass/10 text-brass-light group-hover:bg-brass group-hover:text-ink-900"
                    : "border-brass/40 bg-parchment text-brass-text group-hover:bg-ink group-hover:text-brass-light"
                }`}
              >
                <PracticeIcon slug={area.slug} />
              </span>
              <span aria-hidden="true" className={`font-serif text-2xl ${dark ? "text-white/25" : "text-ink/20"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <Heading className={`mt-8 text-[1.7rem] leading-tight ${dark ? "" : "text-ink"}`}>{area.title}</Heading>
            <p className={`mt-3 flex-1 text-[0.95rem] leading-relaxed ${dark ? "text-ivory/70" : "text-muted"}`}>
              {area.summary}
            </p>
            <span
              className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${dark ? "text-brass-light" : "text-ink"}`}
            >
              Read more
              <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
