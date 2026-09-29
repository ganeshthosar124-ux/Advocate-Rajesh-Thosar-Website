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
  children,
}: {
  title: React.ReactNode;
  intro?: string;
  eyebrow?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <div className="stage grain relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/2 right-[-10%] size-[50vw] max-w-[700px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.2),transparent_62%)] motion-safe:animate-drift"
      />
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <Container className="relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ivory/65 motion-safe:animate-fade-up">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {trail.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-brass">
                    /
                  </span>
                )}
                {i < trail.length - 1 ? (
                  <Link href={c.path} className="inline-block py-1 transition-colors hover:text-ivory">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ivory">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="eyebrow mb-5 motion-safe:animate-fade-up" style={{ animationDelay: "80ms" }}>
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl">
          <span className="line-mask">
            <span style={{ "--d": "120ms" } as React.CSSProperties}>{title}</span>
          </span>
        </h1>
        {intro && (
          <p
            className="mt-7 max-w-2xl text-lg leading-relaxed text-ivory/75 motion-safe:animate-fade-up sm:text-xl"
            style={{ animationDelay: "300ms" }}
          >
            {intro}
          </p>
        )}
        {children}
      </Container>
    </div>
  );
}
