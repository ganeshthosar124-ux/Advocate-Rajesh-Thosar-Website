import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// DRAFT wording: to be reviewed and approved by the advocate before launch.

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: `Disclaimer for the website of ${site.fullName}, in keeping with the Bar Council of India rules on advertising and solicitation.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" path="/disclaimer" updated="[Date of approval]">
      <p>
        The Bar Council of India does not permit advocates to solicit work or advertise. This website is maintained
        to provide information about {site.fullName} to persons who seek it of their own accord.
      </p>
      <p>By accessing this website, you acknowledge and confirm that:</p>
      <ul>
        <li>
          you are seeking information relating to the advocate of your own accord, and there has been no form of
          solicitation, advertisement or inducement by the advocate or anyone acting on the advocate&rsquo;s behalf;
        </li>
        <li>the information on this website is provided on your request, for informational purposes only;</li>
        <li>
          the content of this website does not constitute legal advice and should not be relied upon as such. You
          should obtain specific legal advice about your particular circumstances;
        </li>
        <li>
          accessing this website, or sending an email or enquiry through it, does not create an advocate–client
          relationship;
        </li>
        <li>
          while care is taken to keep the information accurate, no responsibility is accepted for any action taken
          on the basis of the information on this website, and the law may have changed since it was written.
        </li>
      </ul>
      <p>
        Links to external websites, where provided, are for convenience only; the advocate is not responsible for
        their content.
      </p>
    </LegalPage>
  );
}
