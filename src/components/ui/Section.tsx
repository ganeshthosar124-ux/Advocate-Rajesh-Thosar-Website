import { Container } from "./Container";

type Tone = "ivory" | "parchment" | "ink";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory",
  parchment: "bg-parchment",
  ink: "bg-ink text-ivory [&_h2]:text-ivory [&_h3]:text-ivory [&_.eyebrow]:text-brass-light",
};

export function Section({
  children,
  tone = "ivory",
  className = "",
  labelledBy,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section aria-labelledby={labelledBy} className={`py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl sm:mb-12">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      <span className="rule mt-5" aria-hidden="true" />
      {intro && <p className="mt-5 text-lg opacity-90">{intro}</p>}
    </div>
  );
}
