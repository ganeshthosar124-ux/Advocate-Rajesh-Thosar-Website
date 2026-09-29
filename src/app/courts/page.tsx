import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PracticeIcon } from "@/components/ui/PracticeIcon";
import { CourthouseArt } from "@/components/sections/CourthouseArt";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { getPracticeAreas } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Bombay High Court & Maharashtra Courts",
  description: `Courts where ${site.name} practises: Bombay High Court, District & Sessions Courts, JMFC/CJM courts, Consumer Commissions and other forums.`,
  path: "/courts",
});

export default function CourtsPage() {
  const areas = getPracticeAreas();
  return (
    <>
      <PageHeader
        title="Courts & Forums"
        eyebrow="Jurisdiction"
        intro={`From the office in ${site.office.city}, the advocate practises before the following courts, tribunals and forums in ${site.office.state}.`}
        crumbs={[{ name: "Courts", path: "/courts" }]}
      />
      <Section tone="white">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <ol className="grid gap-4">
            {site.courts.map((court, i) => {
              const heard = areas.filter((a) => a.courts.includes(court.id));
              return (
                <li
                  key={court.id}
                  id={court.id}
                  data-reveal
                  style={{ "--reveal-delay": i * 80 } as React.CSSProperties}
                  className="spotlight group grid scroll-mt-28 grid-cols-[3.5rem_1fr] gap-5 overflow-hidden rounded-2xl border border-line bg-ivory p-6 transition-colors duration-500 target:border-brass hover:border-brass/60 sm:p-8"
                >
                  <span className="font-serif text-4xl leading-none text-brass-text">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <h2 className="text-3xl">{court.name}</h2>
                    <p className="mt-2 text-muted">{court.detail}</p>
                    {heard.length > 0 && (
                      <>
                        <h3 className="mt-5 font-sans text-xs font-bold tracking-[0.2em] text-brass-text uppercase">
                          Related practice areas
                        </h3>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {heard.map((a) => (
                            <li key={a.slug}>
                              <Link
                                href={`/practice-areas/${a.slug}`}
                                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-4 pl-2.5 text-sm font-medium text-ink transition-colors hover:border-brass/60"
                              >
                                <PracticeIcon slug={a.slug} className="size-4 text-brass-text" />
                                {a.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="text-ink/70 lg:sticky lg:top-32" data-reveal="right">
            <CourthouseArt />
          </div>
        </div>
      </Section>
      <Section tone="white" labelledBy="contact-panel-title" className="!pt-0">
        <ContactPanel />
      </Section>
    </>
  );
}
