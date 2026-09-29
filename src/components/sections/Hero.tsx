import Image from "next/image";
import portrait from "../../../public/images/rajesh-thosar-portrait.jpg";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/lib/site";

type Fact = { value: string; label: string };

export function Hero({ facts }: { facts: Fact[] }) {
  return (
    <section aria-labelledby="hero-title" className="stage grain relative overflow-hidden">
      {/* Slow-drifting light orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/4 right-[-10%] size-[60vw] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.22),transparent_62%)] motion-safe:animate-drift" />
        <div className="absolute bottom-[-30%] left-[-15%] size-[55vw] max-w-[800px] rounded-full bg-[radial-gradient(circle,rgba(40,80,150,0.35),transparent_65%)] motion-safe:animate-drift [animation-delay:-8s]" />
      </div>

      <Container className="relative z-10 grid grid-cols-1 min-h-[100svh] items-center gap-14 pt-32 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pt-36">
        <div>
          <p className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.18em] text-ivory/85 uppercase motion-safe:animate-fade-up">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-brass opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-brass" />
            </span>
            Advocate · {site.office.city}, {site.office.district}
          </p>

          <h1 id="hero-title" className="mt-8 text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.92]">
            <span className="line-mask">
              <span style={{ "--d": "120ms" } as React.CSSProperties}>Rajesh A.</span>
            </span>
            <span className="line-mask">
              <span style={{ "--d": "260ms" } as React.CSSProperties} className="text-gold italic">
                Thosar
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80 motion-safe:animate-fade-up sm:text-xl"
            style={{ animationDelay: "450ms" }}
          >
            Practising before the Bombay High Court, District and Sessions Courts, Magistrate Courts, Consumer
            Commissions and other forums in {site.office.state}.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 motion-safe:animate-fade-up" style={{ animationDelay: "600ms" }}>
            <ButtonLink href="/contact" variant="gold">
              Contact the office
            </ButtonLink>
            <ButtonLink href="/practice-areas" variant="outline-light">
              Areas of practice
            </ButtonLink>
          </div>

          <dl
            className="mt-14 grid max-w-xl grid-cols-3 divide-x divide-white/15 border-t border-white/15 pt-8 motion-safe:animate-fade-up"
            style={{ animationDelay: "750ms" }}
          >
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse px-3 first:pl-0 sm:px-4">
                <dt className="mt-2 text-xs font-semibold tracking-[0.08em] text-ivory/70 uppercase sm:tracking-[0.14em]">{f.label}</dt>
                <dd className="font-serif text-4xl leading-none text-brass-light sm:text-5xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait in a courthouse-arch frame */}
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:mr-0 lg:max-w-[26rem]">
          <div
            aria-hidden="true"
            className="arch absolute -inset-4 border border-brass/40 motion-safe:animate-fade-up sm:-inset-6"
            style={{ animationDelay: "300ms" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-8 -bottom-10 h-24 rounded-full bg-brass/30 blur-3xl"
          />
          <div
            className="arch studio relative aspect-[4/5] overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] motion-safe:animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <Image
              src={portrait}
              alt={`Portrait of ${site.name}`}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 416px, (min-width: 640px) 448px, 352px"
              className="size-full object-cover object-top"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent" />
            <p className="absolute inset-x-0 bottom-6 text-center font-serif text-2xl text-ivory">{site.name}</p>
          </div>

          <div className="glass-dark absolute top-12 -left-4 hidden rounded-xl px-5 py-4 motion-safe:animate-float sm:-left-20 sm:block">
            <p className="text-xs font-semibold tracking-[0.18em] text-brass-light uppercase">Enrolled with</p>
            <p className="mt-1 font-serif text-lg leading-tight text-ivory">{site.barCouncil}</p>
          </div>
          <div className="glass-dark absolute -right-2 bottom-28 hidden rounded-xl px-5 py-4 motion-safe:animate-float [animation-delay:-3.5s] sm:-right-12 sm:block">
            <p className="text-xs font-semibold tracking-[0.18em] text-brass-light uppercase">Office hours</p>
            <p className="mt-1 text-sm font-semibold text-ivory">Mon – Sat · 10 am – 6 pm</p>
          </div>
        </div>
      </Container>

    </section>
  );
}
