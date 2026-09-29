import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { MapEmbed } from "./MapEmbed";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Office address, telephone, WhatsApp, email and enquiry form for ${site.name}, ${site.office.city}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        eyebrow="Office"
        intro="You may telephone, send a WhatsApp message or email the office, or send an enquiry using the form below."
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
