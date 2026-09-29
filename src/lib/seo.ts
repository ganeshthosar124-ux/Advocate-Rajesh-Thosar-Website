import type { Metadata } from "next";
import type { PracticeArea } from "./content";
import { site, siteUrl } from "./site";

/** Social-sharing image (see scripts/make-og-image.mjs). */
export const ogImage = { url: "/og/og-image.jpg", width: 1200, height: 630, alt: `${site.name}, Advocate, Ulhasnagar` };

const portraitUrl = `${siteUrl}/images/rajesh-thosar-portrait.jpg`;
const ids = {
  website: `${siteUrl}/#website`,
  practice: `${siteUrl}/#legalservice`,
  person: `${siteUrl}/about#person`,
};

/**
 * Complete per-page metadata. Next.js replaces (does not merge) nested objects
 * such as openGraph, so every field is set here rather than inherited.
 * `title` is the page-specific part; the layout template appends the name.
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
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
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

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    name: site.fullName,
    alternateName: [site.name, "Rajesh Thosar, Advocate"],
    url: siteUrl,
    inLanguage: "en-IN",
    publisher: { "@id": ids.practice },
  };
}

export function legalServiceJsonLd(areas: PracticeArea[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": ids.practice,
    name: site.fullName,
    description: site.shortDescription,
    url: siteUrl,
    image: portraitUrl,
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
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.office.mapQuery)}`,
    areaServed: [
      { "@type": "City", name: site.office.city },
      { "@type": "State", name: site.office.state },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
    knowsLanguage: site.languages,
    knowsAbout: areas.map((a) => a.title),
    sameAs: [site.contact.linkedin],
    founder: { "@id": ids.person },
  };
}

export function personJsonLd(areas: PracticeArea[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ids.person,
    name: site.fullName,
    jobTitle: "Advocate",
    url: `${siteUrl}/about`,
    image: portraitUrl,
    telephone: site.contact.phone,
    email: site.contact.email,
    knowsLanguage: site.languages,
    knowsAbout: areas.map((a) => a.title),
    hasCredential: site.qualifications.map((q) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: q,
    })),
    memberOf: { "@type": "Organization", name: site.barCouncil },
    worksFor: { "@id": ids.practice },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.office.city,
        addressRegion: site.office.state,
        postalCode: site.office.pincode,
        addressCountry: "IN",
      },
    },
    sameAs: [site.contact.linkedin],
  };
}

export function serviceJsonLd(area: PracticeArea) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: area.heading,
    serviceType: area.title,
    description: area.description,
    url: `${siteUrl}/practice-areas/${area.slug}`,
    provider: { "@type": "LegalService", "@id": ids.practice, name: site.fullName, url: siteUrl },
    areaServed: { "@type": "State", name: site.office.state },
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
