import { site } from "@/lib/site";
import { ChatIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";

// Quick contact actions pinned to the bottom of small screens.
export function MobileContactBar() {
  const items = [
    { href: `tel:${site.contact.phone.replace(/\s/g, "")}`, label: "Call", Icon: PhoneIcon },
    { href: `https://wa.me/${site.contact.whatsapp}`, label: "WhatsApp", Icon: ChatIcon, external: true },
    { href: `mailto:${site.contact.email}`, label: "Email", Icon: MailIcon },
  ];
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-700 bg-ink pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-3">
        {items.map(({ href, label, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium tracking-wide text-ivory"
            >
              <Icon className="size-5 text-brass-light" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
