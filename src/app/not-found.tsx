import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-xl py-10 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4">Page not found</h1>
        <span className="rule mx-auto mt-6" aria-hidden="true" />
        <p className="mt-6 text-lg text-muted">The page you are looking for may have moved or no longer exists.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Go to the home page</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact the office
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
