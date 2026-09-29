import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { CourthouseArt } from "@/components/sections/CourthouseArt";
import { ContactPanel } from "@/components/sections/ContactPanel";
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
      <Section tone="white">
        <div className="grid items-start gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <ol className="grid gap-4">
            {site.courts.map((court, i) => (
              <li
                key={court.name}
                data-reveal
                style={{ "--reveal-delay": i * 80 } as React.CSSProperties}
                className="spotlight group grid grid-cols-[3.5rem_1fr] gap-5 overflow-hidden rounded-2xl border border-line bg-ivory p-6 transition-colors duration-500 hover:border-brass/60 sm:p-8"
              >
                <span className="font-serif text-4xl leading-none text-brass-text">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-3xl">{court.name}</h2>
                  <p className="mt-2 text-muted">{court.detail}</p>
                </div>
              </li>
            ))}
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
