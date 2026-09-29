import type { MetadataRoute } from "next";
import { getArticles, getPracticeAreas } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/practice-areas", "/courts", "/insights", "/contact", "/disclaimer", "/privacy-policy", "/terms-of-use"];
  return [
    ...staticPaths.map((p) => ({ url: `${siteUrl}${p}` })),
    ...getPracticeAreas().map((a) => ({ url: `${siteUrl}/practice-areas/${a.slug}` })),
    ...getArticles()
      .filter((a) => !a.draft)
      .map((a) => ({ url: `${siteUrl}/insights/${a.slug}`, lastModified: a.date })),
  ];
}
