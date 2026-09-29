import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowIcon } from "@/components/ui/Icons";
import { PracticeGrid } from "@/components/sections/PracticeGrid";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { PortraitPlaceholder } from "@/components/sections/PortraitPlaceholder";
import { JsonLd } from "@/components/ui/JsonLd";
import { formatDate, getArticles, getPracticeAreas } from "@/lib/content";
import { personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export default function HomePage() {
  const areas = getPracticeAreas();
  const articles = getArticles().slice(0, 3);

  return (
    <>
      <JsonLd data={personJsonLd()} />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ink text-ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(217,189,140,0.14),transparent_60%)] lg:block"
        />
        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-28">
          <div>
            <p className="eyebrow !text-brass-light">Advocate · {site.office.city}</p>
            <h1 id="hero-title" className="mt-5 !text-ivory">
              Rajesh Thosar
            </h1>
            <span className="rule mt-6" aria-hidden="true" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/85 sm:text-xl">
              Practising in civil, criminal, family and property matters before courts and tribunals in{" "}
              {site.office.state}.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="light">
                Contact the office
              </ButtonLink>
              <Link
                href="/practice-areas"
                className="inline-flex min-h-11 items-center gap-2 px-2 py-3 text-sm font-semibold text-ivory underline-offset-4 hover:underline"
              >
                Areas of practice <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <PortraitPlaceholder />
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <Section labelledBy="intro-title">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="intro-title" eyebrow="About" title="An independent practice" />
            <div className="space-y-5 text-lg text-muted">
              <p>
                [Introductory paragraph to be provided: a short, factual description of the practice, when it was
                established and the kind of matters it handles.]
              </p>
              <p>
                [Second paragraph: the approach taken with matters, e.g. preparation, clear communication and
                attention to documentation.]
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary">
                About the advocate
              </ButtonLink>
            </div>
          </div>
          <aside aria-label="Registration details" className="self-start border border-line bg-parchment p-7 sm:p-8">
            <h3 className="text-2xl">At a glance</h3>
            <dl className="mt-5 divide-y divide-line text-[0.97rem]">
              {[
                ["Enrolled with", site.enrolment.barCouncil],
                ["Enrolment No.", site.enrolment.number],
                ["Enrolled on", site.enrolment.date],
                ["Languages", site.languages.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium text-ink sm:text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      {/* Practice areas */}
      <Section tone="parchment" labelledBy="practice-title">
        <SectionHeading
          id="practice-title"
          eyebrow="Practice"
          title="Areas of practice"
          intro="The practice handles matters in the following areas."
        />
        <PracticeGrid areas={areas} />
      </Section>

      {/* Courts */}
      <Section tone="ink" labelledBy="courts-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading id="courts-title" eyebrow="Jurisdiction" title="Courts & forums" />
          <ul className="grid gap-px self-start border border-ivory/15 bg-ivory/15 sm:grid-cols-2">
            {site.courts.map((court) => (
              <li key={court} className="bg-ink px-6 py-5 font-serif text-xl text-ivory">
                {court}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Insights */}
      {articles.length > 0 && (
        <Section labelledBy="insights-title">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading id="insights-title" eyebrow="Insights" title="Legal updates & articles" />
            <Link href="/insights" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-ink sm:mb-12">
              All articles <ArrowIcon />
            </Link>
          </div>
          <ul className="grid gap-8 md:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug} className="border-t-2 border-brass pt-5">
                <time dateTime={a.date} className="text-sm text-muted">
                  {formatDate(a.date)}
                </time>
                <h3 className="mt-2">
                  <Link href={`/insights/${a.slug}`} className="hover:underline">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.97rem] text-muted">{a.summary}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Contact */}
      <Section tone="parchment" labelledBy="contact-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <SectionHeading id="contact-title" eyebrow="Contact" title="Visit or write to the office" />
            <p className="-mt-4 text-muted">Meetings are by prior appointment.</p>
            <div className="mt-8">
              <ButtonLink href="/contact">Send an enquiry</ButtonLink>
            </div>
          </div>
          <ContactDetails />
        </div>
      </Section>
    </>
  );
}
