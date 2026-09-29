import Link from "next/link";
import { Container } from "./Container";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

export function PageHeader({
  title,
  intro,
  eyebrow,
  crumbs,
}: {
  title: string;
  intro?: string;
  eyebrow?: string;
  crumbs: Crumb[];
}) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <div className="border-b border-line bg-parchment py-12 sm:py-16">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {trail.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i < trail.length - 1 ? (
                  <Link href={c.path} className="underline-offset-4 hover:text-ink hover:underline">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1>{title}</h1>
        <span className="rule mt-5" aria-hidden="true" />
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
      </Container>
    </div>
  );
}
