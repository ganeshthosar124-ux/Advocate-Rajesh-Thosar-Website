import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// DRAFT wording: to be reviewed and approved (including against current data
// protection law) by the advocate before launch.

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How the website of ${site.fullName} collects, uses and protects personal data submitted through its enquiry form.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="[Date of approval]">
      <p>
        This notice explains what personal data this website collects, why, and how it is handled. It applies only
        to this website.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Enquiry form:</strong> your name, email address, optional phone number, subject and message, which
          you provide voluntarily.
        </li>
        <li>
          <strong>Technical data:</strong> the hosting provider may record standard server logs (such as IP address,
          browser type and pages requested) for security and to keep the site running.
        </li>
      </ul>
      <p>
        This website does not use advertising or tracking cookies. It sets one functional cookie, which
        remembers for the current browser session that you have accepted the disclaimer. [If privacy-friendly analytics are enabled, name
        the service here and state that it does not use cookies or identify individual visitors.]
      </p>

      <h2>Why we use it</h2>
      <p>
        Details submitted through the enquiry form are used only to respond to your enquiry. They are sent by email
        to the office and are not stored in a database on this website. They are not sold or shared for marketing.
      </p>

      <h2>Consent and withdrawal</h2>
      <p>
        By submitting the form and ticking the consent box you agree to your details being used for the purpose
        above. You may withdraw consent, or ask for your details to be corrected or deleted, by writing to the
        address below.
      </p>

      <h2>Retention</h2>
      <p>[State how long enquiry emails are kept, e.g. deleted after a set period if no engagement follows.]</p>

      <h2>Third-party services</h2>
      <ul>
        <li>Vercel, which hosts this website</li>
        <li>Google (Gmail), which delivers enquiry emails to the office</li>
        <li>Cloudflare Turnstile, if enabled, to protect the form from spam</li>
        <li>Google Maps, only if you choose to load the map on the Contact page</li>
      </ul>

      <h2>Contact</h2>
      <p>
        For any question or request about your personal data, write to{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
