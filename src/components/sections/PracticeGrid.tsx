import Link from "next/link";
import type { PracticeArea } from "@/lib/content";
import { ArrowIcon } from "@/components/ui/Icons";

export function PracticeGrid({ areas, headingLevel = "h3" }: { areas: PracticeArea[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((area, i) => (
        <li key={area.slug} className="bg-ivory">
          <Link
            href={`/practice-areas/${area.slug}`}
            className="group flex h-full flex-col p-7 transition-colors hover:bg-parchment sm:p-8"
          >
            <span className="font-serif text-lg text-brass-text" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Heading className="mt-3 text-2xl">{area.title}</Heading>
            <p className="mt-3 flex-1 text-[0.97rem] text-muted">{area.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
              Read more
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
