import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { PracticeIcon } from "@/components/ui/PracticeIcon";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { getPracticeArea, getPracticeAreas } from "@/lib/content";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPracticeAreas().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const area = getPracticeArea((await params).slug);
  if (!area) return {};
  return pageMetadata({ title: area.seoTitle, description: area.description, path: `/practice-areas/${area.slug}` });
}

export default async function PracticeAreaPage({ params }: Props) {
  const area = getPracticeArea((await params).slug);
  if (!area) notFound();
  const all = getPracticeAreas();
  const courts = site.courts.filter((c) => area.courts.includes(c.id));
  const related = area.related.map((slug) => all.find((a) => a.slug === slug)).filter((a) => a !== undefined);

  return (
    <>
      <JsonLd data={serviceJsonLd(area)} />
      <PageHeader
        title={area.heading}
        eyebrow="Practice area"
        intro={area.summary}
        crumbs={[
          { name: "Practice Areas", path: "/practice-areas" },
          { name: area.title, path: `/practice-areas/${area.slug}` },
        ]}
      >
        <span className="glass mt-10 inline-grid size-16 place-items-center rounded-2xl text-brass-light motion-safe:animate-fade-up">
          <PracticeIcon slug={area.slug} className="size-8" />
        </span>
      </PageHeader>

      <Section tone="white">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <div className="prose text-lg text-muted" data-reveal dangerouslySetInnerHTML={{ __html: area.html }} />

            {courts.length > 0 && (
              <section aria-labelledby="forums-title" className="mt-14" data-reveal>
                <h2 id="forums-title" className="text-3xl">
                  Courts &amp; forums
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {courts.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/courts#${c.id}`}
                        className="group flex h-full items-start justify-between gap-4 rounded-xl border border-line bg-ivory p-5 transition-colors hover:border-brass/60"
                      >
                        <span>
                          <span className="block font-serif text-xl text-ink">{c.name}</span>
                          <span className="mt-1 block text-sm text-muted">{c.detail}</span>
                        </span>
                        <ArrowIcon className="mt-1.5 size-4 shrink-0 text-brass-text transition-transform duration-500 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {related.length > 0 && (
              <section aria-labelledby="related-title" className="mt-14" data-reveal>
                <h2 id="related-title" className="text-3xl">
                  Related practice areas
                </h2>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/practice-areas/${r.slug}`}
                        className="inline-flex min-h-11 items-center gap-3 rounded-full border border-line bg-ivory py-2 pr-5 pl-3 text-sm font-semibold text-ink transition-colors hover:border-brass/60"
                      >
                        <PracticeIcon slug={r.slug} className="size-5 text-brass-text" />
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="mt-14 max-w-[68ch] rounded-xl border border-line bg-ivory p-5 text-sm text-muted">
              This page is general information about the areas the practice handles. It is not legal advice; the law
              and procedure that apply depend on the facts of each matter.
            </p>
            <div className="mt-10">
              <ButtonLink href="/contact" variant="dark">
                Contact the office
              </ButtonLink>
            </div>
          </div>
          <nav aria-labelledby="all-areas" className="lg:sticky lg:top-28 lg:self-start" data-reveal="right">
            <div className="overflow-hidden rounded-2xl border border-line bg-ivory">
              <h2 id="all-areas" className="border-b border-line px-6 py-5 text-2xl">
                All practice areas
              </h2>
              <ul>
                {all.map((a) => {
                  const current = a.slug === area.slug;
                  return (
                    <li key={a.slug}>
                      <Link
                        href={`/practice-areas/${a.slug}`}
                        aria-current={current ? "page" : undefined}
                        className="group flex items-center gap-4 border-b border-line/70 px-6 py-3.5 text-[0.95rem] text-ink transition-colors last:border-0 hover:bg-white aria-[current=page]:bg-ink aria-[current=page]:text-ivory"
                      >
                        <PracticeIcon
                          slug={a.slug}
                          className="size-5 shrink-0 text-brass-text group-aria-[current=page]:text-brass-light"
                        />
                        {a.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </Section>

      <Section tone="white" labelledBy="contact-panel-title" className="!pt-0">
        <ContactPanel />
      </Section>
    </>
  );
}
