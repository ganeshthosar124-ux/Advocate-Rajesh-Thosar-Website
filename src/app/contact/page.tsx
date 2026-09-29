import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPracticeAreas } from "@/lib/content";
import { legalServiceJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { MapEmbed } from "./MapEmbed";

export const metadata = pageMetadata({
  title: `Contact the Office in ${site.office.city}, ${site.office.district}`,
  description: `Contact ${site.name}: office at ${site.office.line1}, ${site.office.line2}, ${site.office.city} ${site.office.pincode}. Telephone, WhatsApp, email or enquiry form.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={legalServiceJsonLd(getPracticeAreas())} />
      <PageHeader
        title="Contact the Office"
        eyebrow={`Office · ${site.office.city}`}
        intro={`The office is at ${site.office.line1}, ${site.office.line2}, ${site.office.city} – ${site.office.pincode}, open ${site.contact.days}, ${site.contact.hours}. You may telephone, send a WhatsApp message or email, or use the enquiry form below.`}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <Section tone="white" labelledBy="details-title">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="space-y-6" data-reveal="left">
            <h2 id="details-title" className="text-4xl">
              Office details
            </h2>
            <ContactDetails />
            <MapEmbed query={site.office.mapQuery} />
          </div>
          <div data-reveal="right">
            <div className="rounded-[1.75rem] border border-line bg-ivory p-6 shadow-[0_40px_80px_-50px_rgba(11,26,48,0.5)] sm:p-10">
              <p className="eyebrow mb-4">Enquiry</p>
              <h2 id="form-title" className="text-4xl">
                Send an enquiry
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
