import { getArticles } from "./content";
import { navLinks } from "./site";

/** Main navigation. "Insights" appears only once an article is published. */
export function getNavLinks() {
  const hasArticles = getArticles().some((a) => !a.draft);
  return navLinks.filter((l) => l.href !== "/insights" || hasArticles);
}
