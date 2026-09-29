import { officeAddress, site, telHref, whatsappHref } from "@/lib/site";
import { ChatIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

export function ContactDetails() {
  const icon = "size-5 shrink-0 text-brass-text";
  const item = "grid grid-cols-[1.25rem_1fr] gap-x-4 gap-y-2";
  const label = "col-span-2 flex items-center gap-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brass-text";
  const value = "col-start-2";
  return (
    <dl className="grid content-start gap-8 sm:grid-cols-2">
      <div className={item}>
        <dt className={label}>
          <PinIcon className={icon} />
          Office
        </dt>
        <dd className={value}>
          <address className="not-italic">
            {officeAddress.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </dd>
      </div>
      <div className={item}>
        <dt className={label}>
          <ClockIcon className={icon} />
          Office hours
        </dt>
        <dd className={value}>{site.contact.hours}</dd>
      </div>
      <div className={item}>
        <dt className={label}>
          <PhoneIcon className={icon} />
          Telephone
        </dt>
        <dd className={value}>
          <a
            href={telHref}
            className="inline-block py-1 underline-offset-4 hover:underline"
          >
            {site.contact.phoneDisplay}
          </a>
        </dd>
      </div>
      <div className={item}>
        <dt className={label}>
          <ChatIcon className={icon} />
          WhatsApp
        </dt>
        <dd className={value}>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-1 underline-offset-4 hover:underline"
          >
            {site.contact.phoneDisplay}
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
        </dd>
      </div>
      <div className={item}>
        <dt className={label}>
          <MailIcon className={icon} />
          Email
        </dt>
        <dd className={value}>
          <a href={`mailto:${site.contact.email}`} className="inline-block break-all py-1 underline-offset-4 hover:underline">
            {site.contact.email}
          </a>
        </dd>
      </div>
    </dl>
  );
}
