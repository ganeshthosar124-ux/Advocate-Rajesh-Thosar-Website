import Link from "next/link";
import { officeAddress, officeHours, site, telHref, whatsappHref } from "@/lib/site";
import { ArrowIcon, ChatIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

/** Dark rounded panel with large contact tiles; used at the end of pages. */
export function ContactPanel({ headingId = "contact-panel-title" }: { headingId?: string }) {
  const tiles = [
    { href: telHref, label: "Telephone", value: site.contact.phoneDisplay, Icon: PhoneIcon },
    { href: whatsappHref, label: "WhatsApp", value: "Send a message", Icon: ChatIcon, external: true },
    { href: `mailto:${site.contact.email}`, label: "Email", value: site.contact.email, Icon: MailIcon },
  ];
  return (
    <div className="stage grain relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-12 lg:px-16 lg:py-20" data-reveal="zoom">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.25),transparent_65%)]"
      />
      <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id={headingId} className="mt-5">
            Contact the <span className="text-gold italic">office</span>
          </h2>
          <ul className="mt-8 space-y-4 text-ivory/80">
            <li className="flex gap-4">
              <PinIcon className="mt-1 size-5 shrink-0 text-brass-light" />
              <address className="not-italic">{officeAddress.join(", ")}</address>
            </li>
            <li className="flex gap-4">
              <ClockIcon className="mt-1 size-5 shrink-0 text-brass-light" />
              <span>{officeHours}</span>
            </li>
          </ul>
          <Link
            href="/contact"
            className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brass-light"
          >
            Enquiry form & map
            <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
        </div>
        <ul className="grid min-w-0 grid-cols-1 gap-4 self-center">
          {tiles.map(({ href, label, value, Icon, external }) => (
            <li key={label} className="min-w-0">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="spotlight group flex items-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-500 hover:border-brass/50 sm:p-6"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brass sm:size-14 text-ink-900 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold tracking-[0.2em] text-brass-light uppercase">{label}</span>
                  <span className="mt-1 block font-serif text-xl [overflow-wrap:anywhere] text-ivory sm:text-2xl xl:text-[1.7rem]">
                    {value}
                  </span>
                </span>
                <ArrowIcon className="size-5 shrink-0 text-ivory/50 transition-all duration-500 group-hover:-rotate-45 group-hover:text-brass-light" />
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
