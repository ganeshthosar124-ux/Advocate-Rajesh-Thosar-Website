import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
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
      <PageHeader title={site.name} eyebrow="About" crumbs={[{ name: "About", path: "/about" }]} />

      <Section labelledBy="profile-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="mx-auto w-full max-w-xs pr-4 pb-4 sm:max-w-sm lg:mx-0">
            <Portrait />
          </div>
          <div>
            <h2 id="profile-title">Profile</h2>
            <span className="rule mt-5" aria-hidden="true" />
            <div className="prose mt-6 text-lg text-muted">
              {site.biography.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="parchment" labelledBy="credentials-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="credentials-title">Details</h2>
            <span className="rule mt-5" aria-hidden="true" />
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {details.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
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
