import { officeAddress, site, telHref, whatsappHref } from "@/lib/site";
import { ChatIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

function Item({
  label,
  Icon,
  wide = false,
  children,
}: {
  label: string;
  Icon: (p: { className?: string }) => React.ReactNode;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className={`flex gap-4 rounded-2xl border border-line bg-ivory p-5 ${wide ? "sm:col-span-2" : ""}`}>
      <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-brass-light">
        <Icon />
      </span>
      <div className="min-w-0">
        <p className="text-[0.7rem] font-bold tracking-[0.2em] text-brass-text uppercase">{label}</p>
        <div className="mt-1 text-ink">{children}</div>
      </div>
    </li>
  );
}

const link = "block py-0.5 font-semibold whitespace-nowrap hover:text-brass-text";

export function ContactDetails() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
        <Item label="Office" Icon={PinIcon} wide>
          <address className="not-italic">{officeAddress.join(", ")}</address>
        </Item>
        <Item label="Office hours" Icon={ClockIcon} wide>
          {site.contact.days}, {site.contact.hours}
        </Item>
        <Item label="Telephone" Icon={PhoneIcon}>
          <a href={telHref} className={link}>
            {site.contact.phoneDisplay}
          </a>
        </Item>
        <Item label="WhatsApp" Icon={ChatIcon}>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
            {site.contact.phoneDisplay}
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
        </Item>
        <Item label="Email" Icon={MailIcon} wide>
          <a href={`mailto:${site.contact.email}`} className={`${link} !whitespace-normal break-all`}>
            {site.contact.email}
          </a>
        </Item>
    </ul>
  );
}
