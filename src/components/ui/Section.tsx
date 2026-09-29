import { Container } from "./Container";

type Tone = "ivory" | "white" | "parchment" | "ink";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory",
  white: "bg-white",
  parchment: "bg-parchment",
  ink: "stage grain overflow-hidden",
};

export function Section({
  children,
  tone = "ivory",
  className = "",
  labelledBy,
  id,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  labelledBy?: string;
  id?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-20 sm:py-24 lg:py-32 ${tones[tone]} ${className}`}>
      <Container className="relative z-10">{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={`mb-12 max-w-3xl sm:mb-16 ${center ? "mx-auto text-center" : ""}`} data-reveal>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {intro && <p className={`mt-6 text-lg leading-relaxed opacity-80 ${center ? "mx-auto" : ""} max-w-2xl`}>{intro}</p>}
    </div>
  );
}
