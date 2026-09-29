import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PracticeGrid } from "@/components/sections/PracticeGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Portrait } from "@/components/sections/Portrait";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPracticeAreas } from "@/lib/content";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description: `Profile of ${site.name}, Advocate enrolled with the ${site.barCouncil}: practice areas, courts and qualifications.`,
  path: "/about",
});

export default function AboutPage() {
  const areas = getPracticeAreas();
  const details: [string, React.ReactNode][] = [
    ["Bar Council", site.barCouncil],
    ["Qualification", site.qualifications.join(", ")],
    ["Languages", site.languages.join(", ")],
    ["Courts", site.courts.map((c) => c.name).join(", ")],
    ["Office", `${site.office.city}, ${site.office.district}, ${site.office.state}`],
    [
      "LinkedIn",
      <a
        key="li"
        href={site.contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block py-1 text-brass-text underline underline-offset-2 hover:text-ink"
      >
        linkedin.com/in/rajesh-thosar<span className="sr-only"> (opens in a new tab)</span>
      </a>,
    ],
  ];

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <PageHeader
        title={site.name}
        eyebrow="About"
        intro={`Advocate enrolled with the ${site.barCouncil}, practising before courts and forums in ${site.office.state}.`}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <Section tone="white" labelledBy="profile-title">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start" data-reveal="left">
            <div className="mx-auto w-full max-w-sm px-4 lg:mx-0">
              <Portrait />
            </div>
          </div>
          <div data-reveal="right">
            <p className="eyebrow mb-5">Profile</p>
            <h2 id="profile-title">
              {site.name.replace("Adv. ", "")}
              <span className="mt-2 block text-2xl text-brass-text italic">Advocate · {site.qualifications.join(", ")}</span>
            </h2>
            <div className="prose mt-8 text-lg text-muted">
              {site.biography.map((p, i) => (
                <p key={p.slice(0, 24)} className={i === 0 ? "text-xl text-ink" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {details.map(([k, v]) => (
                <div key={k} className="bg-ivory p-6 sm:last:odd:col-span-2">
                  <dt className="text-xs font-bold tracking-[0.2em] text-brass-text uppercase">{k}</dt>
                  <dd className="mt-2 font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="ink" labelledBy="areas-title">
        <SectionHeading
          id="areas-title"
          eyebrow="Practice"
          title={
            <>
              Areas of <span className="text-gold italic">practice</span>
            </>
          }
        />
        <PracticeGrid areas={areas} />
        <div className="mt-12" data-reveal>
          <ButtonLink href="/courts" variant="outline-light">
            Courts & forums
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
