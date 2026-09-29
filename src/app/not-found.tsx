import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="stage grain relative flex min-h-[80svh] items-center overflow-hidden pt-28 pb-20">
      <Container className="relative z-10 text-center">
        <p aria-hidden="true" className="text-gold font-serif text-[clamp(6rem,20vw,14rem)] leading-none italic">
          404
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-ivory/75">
          The page you are looking for may have moved or no longer exists.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="gold">
            Go to the home page
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Contact the office
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
