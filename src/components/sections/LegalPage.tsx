import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} eyebrow="Legal" crumbs={[{ name: title, path }]} />
      <Section>
        <p className="mb-8 text-sm text-muted">Last updated: {updated}</p>
        <div className="prose text-[1.02rem]">{children}</div>
      </Section>
    </>
  );
}
