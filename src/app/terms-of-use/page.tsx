import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// Wording chosen as a reasonable default; the advocate should review it.

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms of use for the website of ${site.fullName}, Ulhasnagar: information only, no advocate–client relationship, and use of content.`,
  path: "/terms-of-use",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms-of-use" updated="29 September 2026">
      <p>By using this website you agree to the following terms.</p>

      <h2>Information only</h2>
      <p>
        The content of this website is general information and is not legal advice. It should not be relied upon
        as a substitute for advice on your specific circumstances. See also the <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>No advocate–client relationship</h2>
      <p>
        Using this website, or contacting the office through it, does not create an advocate–client relationship.
        Please do not send confidential information through the website or by email until an engagement has been
        agreed.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, design and images on this website belong to {site.fullName} or are used with permission. They may
        not be reproduced without prior written consent, except for personal, non-commercial reference.
      </p>

      <h2>External links</h2>
      <p>Links to other websites are provided for convenience; their content is not endorsed or controlled.</p>

      <h2>Changes</h2>
      <p>These terms may be updated from time to time. The date above shows when they were last revised.</p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any dispute arising from the use of this website is subject to
        the jurisdiction of the courts at Thane, Maharashtra.
      </p>
    </LegalPage>
  );
}
