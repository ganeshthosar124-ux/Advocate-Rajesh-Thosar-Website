import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PortraitPlaceholder } from "@/components/sections/PortraitPlaceholder";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPracticeAreas } from "@/lib/content";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description: `Profile of ${site.fullName}: qualifications, enrolment details, practice areas and courts.`,
  path: "/about",
});

export default function AboutPage() {
  const areas = getPracticeAreas();
  const details: [string, React.ReactNode][] = [
    ["State Bar Council", site.enrolment.barCouncil],
    ["Enrolment No.", site.enrolment.number],
    ["Date of enrolment", site.enrolment.date],
    [
      "Qualifications",
      <ul key="q" className="space-y-1">
        {site.qualifications.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>,
    ],
    ["Languages", site.languages.join(", ")],
  ];

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <PageHeader title={site.fullName} eyebrow="About" crumbs={[{ name: "About", path: "/about" }]} />

      <Section labelledBy="profile-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <PortraitPlaceholder />
          </div>
          <div>
            <h2 id="profile-title">Profile</h2>
            <span className="rule mt-5" aria-hidden="true" />
            <div className="prose mt-6 text-lg text-muted">
              <p>
                [Biography to be provided: education, year of enrolment, chambers or seniors trained under, and the
                development of the practice. Keep it factual and in the third person.]
              </p>
              <p>
                [Second paragraph: the courts regularly appeared before, and the kinds of clients and matters the
                practice handles, described factually.]
              </p>
              <p>[Optional: memberships of bar associations, publications, lectures.]</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="parchment" labelledBy="credentials-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="credentials-title">Enrolment & qualifications</h2>
            <span className="rule mt-5" aria-hidden="true" />
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {details.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2>Areas of practice</h2>
            <span className="rule mt-5" aria-hidden="true" />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/practice-areas/${a.slug}`}
                    className="flex min-h-12 items-center justify-between py-3 font-serif text-xl text-ink hover:text-brass-text"
                  >
                    {a.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/courts" variant="secondary">
                Courts & forums
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
