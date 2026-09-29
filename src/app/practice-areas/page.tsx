import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PracticeGrid } from "@/components/sections/PracticeGrid";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { getPracticeAreas } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Practice Areas – Advocate in ${site.office.city}`,
  description: `Civil, criminal, cheque bounce, property, banking recovery, consumer, matrimonial and writ matters handled by ${site.name}, ${site.office.city}.`,
  path: "/practice-areas",
});

export default function PracticeAreasPage() {
  return (
    <>
      <PageHeader
        title="Practice Areas"
        eyebrow="Practice"
        intro={`Matters handled from the office in ${site.office.city}, ${site.office.district}, before courts and forums in ${site.office.state}. Select an area for details.`}
        crumbs={[{ name: "Practice Areas", path: "/practice-areas" }]}
      />
      <Section tone="ivory">
        <PracticeGrid areas={getPracticeAreas()} headingLevel="h2" tone="light" />
      </Section>
      <Section tone="ivory" labelledBy="contact-panel-title" className="!pt-0">
        <ContactPanel />
      </Section>
    </>
  );
}
