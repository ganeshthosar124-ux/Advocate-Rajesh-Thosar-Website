import Image from "next/image";
import Link from "next/link";
import monogram from "../../public/logo/rt-monogram.svg";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { PracticeGrid } from "@/components/sections/PracticeGrid";
import { CourthouseArt } from "@/components/sections/CourthouseArt";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { formatDate, getArticles, getPracticeAreas } from "@/lib/content";
import { personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const steps = [
  { title: "Understanding the facts", text: "Review of the documents and the facts of the matter, and identification of the issues involved." },
  { title: "Research", text: "Study of the applicable statutes, precedents and procedure before the court or forum concerned." },
  { title: "Drafting", text: "Preparation of petitions, applications, replies, affidavits, appeals and written submissions." },
  { title: "Representation", text: "Appearance and advocacy before the court, tribunal or authority concerned." },
];

export default function HomePage() {
  const areas = getPracticeAreas();
  const articles = getArticles().slice(0, 3);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <JsonLd data={personJsonLd()} />

      <Hero
        facts={[
          { value: pad(areas.length), label: "Practice areas" },
          { value: pad(site.courts.length), label: "Courts & forums" },
          { value: pad(site.languages.length), label: "Languages" },
        ]}
      />

      <Marquee items={areas.map((a) => a.title)} />

      {/* Profile */}
      <Section tone="white" labelledBy="profile-title" className="overflow-hidden">
        <Image
          src={monogram}
          alt=""
          aria-hidden="true"
          unoptimized
          className="pointer-events-none absolute -bottom-32 -left-32 hidden size-[30rem] opacity-[0.04] lg:block"
        />
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div data-reveal="left">
            <p className="eyebrow mb-5">Profile</p>
            <h2 id="profile-title">
              Research, drafting <span className="text-brass-text italic">&amp;</span> advocacy across the courts of{" "}
              {site.office.state}.
            </h2>
            <div className="mt-10 flex flex-wrap gap-2">
              {[site.barCouncil, site.qualifications.join(", "), ...site.languages].map((chip) => (
                <span key={chip} className="rounded-full border border-line bg-ivory px-4 py-1.5 text-sm font-medium text-ink">
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div data-reveal="right">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {site.biography.slice(0, 3).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-10">
              <ButtonLink href="/about" variant="dark">
                Read full profile
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Practice areas */}
      <Section tone="ink" labelledBy="practice-title">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="practice-title"
            eyebrow="Practice"
            title={
              <>
                Areas of <span className="text-gold italic">practice</span>
              </>
            }
            intro="Civil, criminal, property, banking, consumer, matrimonial and constitutional matters before courts and forums in Maharashtra."
          />
          <div className="mb-12 sm:mb-16" data-reveal>
            <ButtonLink href="/practice-areas" variant="outline-light">
              All practice areas
            </ButtonLink>
          </div>
        </div>
        <PracticeGrid areas={areas} />
      </Section>

      {/* Approach */}
      <Section tone="ivory" labelledBy="approach-title">
        <SectionHeading
          id="approach-title"
          eyebrow="Approach"
          title="How a matter proceeds"
          intro="The general sequence in which a matter is handled, from the first reading of the papers to the hearing."
        />
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6" data-reveal>
          <span aria-hidden="true" className="grow-line absolute top-7 right-0 left-0 hidden h-px origin-left bg-gradient-to-r from-brass via-brass/60 to-transparent md:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="relative grid size-14 place-items-center rounded-full border border-brass bg-ivory font-serif text-xl text-brass-text">
                {pad(i + 1)}
              </span>
              <h3 className="mt-6 text-2xl">{s.title}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Courts */}
      <Section tone="ink" labelledBy="courts-title">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              id="courts-title"
              eyebrow="Jurisdiction"
              title={
                <>
                  Courts <span className="text-gold italic">&amp;</span> forums
                </>
              }
            />
            <ul className="border-t border-white/10">
              {site.courts.map((court, i) => (
                <li key={court.name} data-reveal style={{ "--reveal-delay": i * 80 } as React.CSSProperties}>
                  <div className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.03] sm:grid-cols-[4rem_1fr]">
                    <span className="font-serif text-lg text-brass-light">{pad(i + 1)}</span>
                    <div>
                      <h3 className="text-2xl transition-colors group-hover:text-brass-light sm:text-3xl">{court.name}</h3>
                      <p className="mt-1 text-sm text-ivory/65">{court.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/courts"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brass-light"
            >
              More about courts & forums
              <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </Link>
          </div>
          <div data-reveal className="mx-auto w-full max-w-md text-brass-light/80">
            <CourthouseArt />
          </div>
        </div>
      </Section>

      {/* Insights */}
      {articles.length > 0 && (
        <Section tone="white" labelledBy="insights-title">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading id="insights-title" eyebrow="Insights" title="Legal updates & articles" />
            <div className="mb-12 sm:mb-16">
              <ButtonLink href="/insights" variant="outline-dark">
                All articles
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {articles.map((a, i) => (
              <li key={a.slug} data-reveal style={{ "--reveal-delay": i * 90 } as React.CSSProperties}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-ivory p-7 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-brass/60"
                >
                  <time dateTime={a.date} className="text-sm text-muted">
                    {formatDate(a.date)}
                  </time>
                  <h3 className="mt-3 group-hover:text-brass-text">{a.title}</h3>
                  <p className="mt-3 flex-1 text-[0.97rem] text-muted">{a.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Contact */}
      <Section tone="white" labelledBy="contact-panel-title" className="!py-16 sm:!py-20">
        <ContactPanel />
      </Section>
    </>
  );
}
