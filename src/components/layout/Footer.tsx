import Link from "next/link";
import { navLinks, officeAddress, site, telHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const legalLinks = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

export function Footer() {
  return (
    <footer className="bg-ink-900 pb-24 text-ivory/85 lg:pb-0">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-5 text-sm leading-relaxed">
            {site.qualifications.join(", ")}
            <br />
            Enrolled with the {site.barCouncil}
          </p>
          <a
            href={site.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block py-1.5 text-sm hover:text-ivory hover:underline"
          >
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">Office</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            {officeAddress.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <ul className="mt-3 text-sm">
            <li>
              <a
                href={telHref}
                className="inline-block py-1.5 hover:text-ivory hover:underline"
              >
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="inline-block py-1.5 hover:text-ivory hover:underline">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">Pages</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ivory hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">Legal</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ivory hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-ivory/15">
        <Container className="flex flex-col gap-3 py-6 text-xs leading-relaxed text-ivory/70 md:flex-row md:justify-between">
          <p>
            The information on this website is for general information only and does not constitute legal advice or
            solicitation. Visiting this website does not create an advocate–client relationship.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} {site.fullName}</p>
        </Container>
      </div>
    </footer>
  );
}
