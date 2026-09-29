import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PracticeIcon } from "@/components/ui/PracticeIcon";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { getPracticeArea, getPracticeAreas } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPracticeAreas().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const area = getPracticeArea((await params).slug);
  if (!area) return {};
  return pageMetadata({ title: area.title, description: area.summary, path: `/practice-areas/${area.slug}` });
}

export default async function PracticeAreaPage({ params }: Props) {
  const area = getPracticeArea((await params).slug);
  if (!area) notFound();
  const all = getPracticeAreas();

  return (
    <>
      <PageHeader
        title={area.title}
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
          <div data-reveal>
            <div className="prose text-lg text-muted" dangerouslySetInnerHTML={{ __html: area.html }} />
            <p className="mt-12 max-w-[68ch] rounded-xl border border-line bg-ivory p-5 text-sm text-muted">
              This description is general information about the areas the practice handles. It is not legal advice.
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
