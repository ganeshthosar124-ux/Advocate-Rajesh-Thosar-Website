import type { Metadata } from "next";
import { site, siteUrl } from "./site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: `${siteUrl}${path}` },
  };
}

export function legalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.fullName,
    url: siteUrl,
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.office.line1}, ${site.office.line2}`,
      addressLocality: site.office.city,
      addressRegion: site.office.state,
      postalCode: site.office.pincode,
      addressCountry: "IN",
    },
    founder: { "@id": `${siteUrl}/about#person` },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/about#person`,
    name: site.fullName,
    jobTitle: "Advocate",
    url: `${siteUrl}/about`,
    knowsLanguage: site.languages,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
