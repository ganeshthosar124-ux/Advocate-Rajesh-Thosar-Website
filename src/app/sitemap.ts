import type { MetadataRoute } from "next";
import { getArticles, getPracticeAreas } from "@/lib/content";
import { site, siteUrl } from "@/lib/site";

// `site.updated` in content/site.json is the last-reviewed date for pages
// without their own date; update it when page content changes.
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = site.updated;
  const portrait = `${siteUrl}/images/rajesh-thosar-portrait.jpg`;
  const articles = getArticles().filter((a) => !a.draft);

  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: updated, changeFrequency: "monthly", priority: 1, images: [portrait] },
    { url: `${siteUrl}/about`, lastModified: updated, changeFrequency: "monthly", priority: 0.9, images: [portrait] },
    { url: `${siteUrl}/practice-areas`, lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    ...getPracticeAreas().map((a) => ({
      url: `${siteUrl}/practice-areas/${a.slug}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/courts`, lastModified: updated, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: updated, changeFrequency: "yearly", priority: 0.8 },
  ];
  if (articles.length) {
    pages.push({ url: `${siteUrl}/insights`, lastModified: articles[0].date, changeFrequency: "weekly", priority: 0.6 });
    for (const a of articles) {
      pages.push({ url: `${siteUrl}/insights/${a.slug}`, lastModified: a.date, changeFrequency: "yearly", priority: 0.6 });
    }
  }
  for (const p of ["/disclaimer", "/privacy-policy", "/terms-of-use"]) {
    pages.push({ url: `${siteUrl}${p}`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 });
  }
  return pages;
}
