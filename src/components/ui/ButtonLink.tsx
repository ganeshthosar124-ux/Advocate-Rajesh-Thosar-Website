import Link from "next/link";

type Variant = "primary" | "secondary" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ivory hover:bg-ink-700",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-ivory",
  light: "border border-brass-light text-ivory hover:bg-brass-light hover:text-ink-900",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
