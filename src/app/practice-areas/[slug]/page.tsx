import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
  const others = getPracticeAreas().filter((a) => a.slug !== area.slug);

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
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <div className="prose text-lg" dangerouslySetInnerHTML={{ __html: area.html }} />
            <p className="mt-10 border-l-2 border-brass pl-4 text-sm text-muted">
              This description is general information about the areas the practice handles. It is not legal advice.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact">Contact the office</ButtonLink>
            </div>
          </div>
          <nav aria-labelledby="other-areas" className="self-start border border-line bg-parchment p-7">
            <h2 id="other-areas" className="text-2xl">
              Other areas
            </h2>
            <ul className="mt-4 divide-y divide-line">
              {others.map((a) => (
                <li key={a.slug}>
                  <Link href={`/practice-areas/${a.slug}`} className="block py-3 text-ink hover:text-brass-text">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>
    </>
  );
}
