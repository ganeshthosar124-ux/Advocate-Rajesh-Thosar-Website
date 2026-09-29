import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { formatDate, getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// Keep the page out of search results until there is something published.
const hasPublished = getArticles().some((a) => !a.draft);

export const metadata = pageMetadata({
  title: "Insights",
  description: `Articles and legal updates by ${site.name}, advocate in ${site.office.city}, ${site.office.district}. For general information only; not legal advice.`,
  path: "/insights",
  noindex: !hasPublished,
});

export default function InsightsPage() {
  const articles = getArticles();
  return (
    <>
      <PageHeader
        title="Insights"
        eyebrow="Articles & updates"
        intro="Articles on developments in the law, for general information only. They are not legal advice."
        crumbs={[{ name: "Insights", path: "/insights" }]}
      />
      <Section tone="white">
        {articles.length === 0 ? (
          <p className="text-lg text-muted">Articles will be published here soon.</p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {articles.map((a) => (
              <li key={a.slug} className="grid gap-2 py-8 md:grid-cols-[12rem_1fr] md:gap-8">
                <time dateTime={a.date} className="text-sm text-muted md:pt-2">
                  {formatDate(a.date)}
                  {a.draft && <span className="ml-2 bg-maroon px-2 py-0.5 text-xs text-ivory">Draft</span>}
                </time>
                <div>
                  <h2 className="text-3xl">
                    <Link href={`/insights/${a.slug}`} className="hover:underline">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-2xl text-muted">{a.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
