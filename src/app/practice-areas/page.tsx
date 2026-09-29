import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PracticeGrid } from "@/components/sections/PracticeGrid";
import { getPracticeAreas } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Practice Areas",
  description: `Areas of practice of ${site.fullName}, including civil, criminal, family, property, banking and consumer matters.`,
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
      <Section>
        <PracticeGrid areas={getPracticeAreas()} headingLevel="h2" />
      </Section>
    </>
  );
}
