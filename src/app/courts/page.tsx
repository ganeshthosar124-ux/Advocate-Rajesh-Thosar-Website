import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Courts & Forums",
  description: `Courts, tribunals and forums in ${site.office.state} where ${site.name} practises, including the Bombay High Court.`,
  path: "/courts",
});

export default function CourtsPage() {
  return (
    <>
      <PageHeader
        title="Courts & Forums"
        eyebrow="Jurisdiction"
        intro={`The advocate practises before the following courts, tribunals and forums in ${site.office.state}.`}
        crumbs={[{ name: "Courts", path: "/courts" }]}
      />
      <Section>
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {site.courts.map((court) => (
            <li key={court.name} className="bg-ivory p-7 sm:last:odd:col-span-2">
              <h2 className="text-2xl">{court.name}</h2>
              <p className="mt-2 text-muted">{court.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <ButtonLink href="/contact">Contact the office</ButtonLink>
        </div>
      </Section>
    </>
  );
}
