import type { Metadata } from "next";
import { site, siteUrl } from "./site";

const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: site.fullName };

/**
 * Complete per-page metadata. Next.js replaces (does not merge) nested objects
 * such as openGraph, so every field is set here rather than inherited.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.fullName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_IN",
      siteName: site.fullName,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function legalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${siteUrl}/#legalservice`,
    name: site.fullName,
    description: site.shortDescription,
    url: siteUrl,
    image: `${siteUrl}/images/rajesh-thosar-portrait.jpg`,
    logo: `${siteUrl}/logo/rt-monogram.png`,
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
    areaServed: { "@type": "State", name: site.office.state },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
    knowsLanguage: site.languages,
    sameAs: [site.contact.linkedin],
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
    image: `${siteUrl}/images/rajesh-thosar-portrait.jpg`,
    knowsLanguage: site.languages,
    sameAs: [site.contact.linkedin],
    memberOf: { "@type": "Organization", name: site.barCouncil },
    worksFor: { "@id": `${siteUrl}/#legalservice` },
    workLocation: { "@type": "Place", name: `${site.office.city}, ${site.office.district}, ${site.office.state}` },
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
