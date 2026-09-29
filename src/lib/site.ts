import siteData from "@content/site.json";

export const site = siteData;

// The site's public address, used for canonical links, the sitemap, social
// previews and structured data. NEXT_PUBLIC_SITE_URL wins when set; otherwise
// the host's own variable is used: URL on Netlify (the main site address, also
// on deploy previews) or VERCEL_PROJECT_PRODUCTION_URL on Vercel.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
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
