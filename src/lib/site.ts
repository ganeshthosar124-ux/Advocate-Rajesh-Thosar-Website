import siteData from "@content/site.json";

export const site = siteData;

// NEXT_PUBLIC_SITE_URL is the final domain. Until one is set, fall back to the
// Vercel production URL (set automatically by Vercel), then localhost.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/$/, "");

export const officeHours = `${site.contact.days}, ${site.contact.hours}`;

export const officeAddress = [
  site.office.line1,
  site.office.line2,
  `${site.office.city} – ${site.office.pincode}`,
  `${site.office.district}, ${site.office.state}`,
];

export const telHref = `tel:${site.contact.phone}`;
export const whatsappHref = `https://wa.me/${site.contact.whatsapp}`;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/courts", label: "Courts" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;
