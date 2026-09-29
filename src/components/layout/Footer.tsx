import Link from "next/link";
import { navLinks, officeAddress, officeHours, site, telHref, whatsappHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";

const legalLinks = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

const heading = "font-sans text-[0.7rem] font-bold uppercase tracking-[0.24em] text-brass-light";
const link = "inline-block py-1.5 transition-colors hover:text-ivory";

export function Footer() {
  return (
    <footer className="stage grain overflow-hidden pb-24 text-ivory/75 lg:pb-0">
      {/* Oversized name as a closing signature */}
      <Container className="relative z-10 border-b border-white/10 pt-20 pb-14">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Advocate · {site.office.city}</p>
            <p className="mt-5 font-serif text-5xl leading-none text-ivory sm:text-7xl">
              Rajesh A. <span className="text-gold italic">Thosar</span>
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 self-start rounded-full border border-brass/60 py-3 pr-3 pl-7 text-sm font-semibold text-ivory transition-colors hover:border-brass lg:self-auto"
          >
            Contact the office
            <span className="grid size-10 place-items-center rounded-full bg-brass text-ink-900 transition-transform duration-500 group-hover:rotate-[-45deg]">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </Container>

      <Container className="relative z-10 grid gap-10 py-14 text-sm sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_0.8fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 leading-relaxed">
            {site.qualifications.join(", ")} · Enrolled with the {site.barCouncil}
          </p>
          <p className="mt-1">Languages: {site.languages.join(", ")}</p>
          <a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer" className={`${link} mt-3 text-brass-light`}>
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div>
          <h2 className={heading}>Office</h2>
          <address className="mt-4 not-italic leading-relaxed">
            {officeAddress.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-3">{officeHours}</p>
          <ul className="mt-2">
            <li>
              <a href={telHref} className={link}>
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
                WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className={`${link} break-all`}>
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className={heading}>Pages</h2>
          <ul className="mt-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className={heading}>Legal</h2>
          <ul className="mt-4">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="relative z-10 border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs leading-relaxed text-ivory/65 md:flex-row md:justify-between">
          <p className="max-w-3xl">
            The information on this website is for general information only and does not constitute legal advice or
            solicitation. Visiting this website does not create an advocate–client relationship.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} {site.fullName}</p>
        </Container>
      </div>
    </footer>
  );
}
