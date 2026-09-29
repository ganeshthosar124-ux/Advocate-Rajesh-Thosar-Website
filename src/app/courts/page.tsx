import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Courts & Forums",
  description: `Courts, tribunals and forums where ${site.fullName} appears.`,
  path: "/courts",
});

export default function CourtsPage() {
  return (
    <>
      <PageHeader
        title="Courts & Forums"
        eyebrow="Jurisdiction"
        intro={`The advocate appears before the following courts, tribunals and forums in ${site.office.state}.`}
        crumbs={[{ name: "Courts", path: "/courts" }]}
      />
      <Section>
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {site.courts.map((court) => (
            <li key={court} className="bg-ivory p-7">
              <h2 className="text-2xl">{court}</h2>
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
