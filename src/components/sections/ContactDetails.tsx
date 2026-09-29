import { officeAddress, site } from "@/lib/site";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

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
          Hours
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
            href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
            className="inline-block py-1 underline-offset-4 hover:underline"
          >
            {site.contact.phoneDisplay}
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
