import type { MetadataRoute } from "next";
import { getArticles, getPracticeAreas } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles().filter((a) => !a.draft);
  const staticPaths = ["", "/about", "/practice-areas", "/courts", "/contact", "/disclaimer", "/privacy-policy", "/terms-of-use"];
  if (articles.length) staticPaths.push("/insights");
  return [
    ...staticPaths.map((p) => ({ url: `${siteUrl}${p}` })),
    ...getPracticeAreas().map((a) => ({ url: `${siteUrl}/practice-areas/${a.slug}` })),
    ...articles.map((a) => ({ url: `${siteUrl}/insights/${a.slug}`, lastModified: a.date })),
  ];
}
