import { site, telHref, whatsappHref } from "@/lib/site";
import { ChatIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";

// Quick contact actions pinned to the bottom of small screens.
export function MobileContactBar() {
  const items = [
    { href: telHref, label: "Call", Icon: PhoneIcon },
    { href: whatsappHref, label: "WhatsApp", Icon: ChatIcon, external: true },
    { href: `mailto:${site.contact.email}`, label: "Email", Icon: MailIcon },
  ];
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 overflow-hidden rounded-full border border-brass/30 bg-ink-900/90 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:hidden"
    >
      <ul className="grid grid-cols-3 divide-x divide-white/10">
        {items.map(({ href, label, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex min-h-14 items-center justify-center gap-2 text-[0.8rem] font-semibold tracking-wide text-ivory active:bg-white/5"
            >
              <Icon className="size-[1.1rem] text-brass-light" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
