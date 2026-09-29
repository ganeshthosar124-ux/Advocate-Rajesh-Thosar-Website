import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "content");
const showDrafts = process.env.NODE_ENV !== "production";

export type PracticeArea = {
  slug: string;
  title: string;
  summary: string;
  order: number;
  html: string;
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  draft: boolean;
  html: string;
};

function readCollection(dir: string) {
  const full = path.join(contentDir, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), "utf8"));
      // Content is authored in this repository, so rendering its HTML is trusted.
      const html = marked.parse(content, { async: false });
      return { slug: file.replace(/\.md$/, ""), data, html };
    });
}

export function getPracticeAreas(): PracticeArea[] {
  return readCollection("practice-areas")
    .map(({ slug, data, html }) => ({
      slug,
      title: String(data.title),
      summary: String(data.summary ?? ""),
      order: Number(data.order ?? 99),
      html,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getPracticeArea(slug: string) {
  return getPracticeAreas().find((p) => p.slug === slug);
}

function toIsoDate(value: unknown) {
  const d = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

export function getArticles(): Article[] {
  return readCollection("insights")
    .map(({ slug, data, html }) => ({
      slug,
      title: String(data.title),
      summary: String(data.summary ?? ""),
      date: toIsoDate(data.date),
      draft: Boolean(data.draft),
      html,
    }))
    .filter((a) => showDrafts || !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string) {
  return getArticles().find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
