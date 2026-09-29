import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { MapEmbed } from "./MapEmbed";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Office address, telephone, email and enquiry form for ${site.fullName}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        eyebrow="Office"
        intro="Meetings are by prior appointment. You may telephone, email, or send an enquiry using the form below."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <Section labelledBy="details-title">
        <h2 id="details-title" className="sr-only">
          Contact details
        </h2>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactDetails />
          <MapEmbed query={site.office.mapQuery} />
        </div>
      </Section>
      <Section tone="parchment" labelledBy="form-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="form-title">Send an enquiry</h2>
          <span className="rule mt-5 mb-8" aria-hidden="true" />
          <div className="border border-line bg-ivory p-6 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
