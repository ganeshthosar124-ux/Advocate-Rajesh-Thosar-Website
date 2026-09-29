import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PracticeGrid } from "@/components/sections/PracticeGrid";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { getPracticeAreas } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Practice Areas",
  description: `Practice areas of ${site.name}: civil, criminal, cheque dishonour, property, banking, consumer, family and writ matters in Maharashtra.`,
  path: "/practice-areas",
});

export default function PracticeAreasPage() {
  return (
    <>
      <PageHeader
        title="Practice Areas"
        eyebrow="Practice"
        intro="The practice handles matters in the following areas. Select an area for a description."
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
