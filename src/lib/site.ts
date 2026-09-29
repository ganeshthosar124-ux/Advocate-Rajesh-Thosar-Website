import siteData from "@content/site.json";

export const site = siteData;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const officeAddress = [
  site.office.line1,
  site.office.line2,
  `${site.office.city}, ${site.office.state} ${site.office.pincode}`,
];

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/courts", label: "Courts" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;
