import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { formatDate, getArticle, getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return pageMetadata({ title: article.title, description: article.summary, path: `/insights/${article.slug}` });
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          datePublished: article.date,
          author: { "@type": "Person", name: site.fullName, url: `${siteUrl}/about` },
          mainEntityOfPage: `${siteUrl}/insights/${article.slug}`,
        }}
      />
      <PageHeader
        title={article.title}
        eyebrow={formatDate(article.date)}
        crumbs={[
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />
      <Section tone="white">
        <article>
          <p className="mb-8 text-sm text-muted">
            By {site.fullName} · <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
          <div className="prose text-lg" dangerouslySetInnerHTML={{ __html: article.html }} />
          <p className="mt-12 max-w-[68ch] border-l-2 border-brass pl-4 text-sm text-muted">
            This article is for general information only, reflects the law as understood on the date of
            publication, and is not legal advice. Please consult an advocate about your specific situation.
          </p>
        </article>
      </Section>
    </>
  );
}
