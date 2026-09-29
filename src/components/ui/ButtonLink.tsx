import Link from "next/link";
import { ArrowIcon } from "./Icons";

type Variant = "gold" | "dark" | "outline-light" | "outline-dark";

const variants: Record<Variant, { base: string; fill: string; icon: string }> = {
  gold: { base: "bg-brass text-ink-900", fill: "bg-brass-light", icon: "bg-ink-900 text-brass-light" },
  dark: { base: "bg-ink text-ivory", fill: "bg-ink-700", icon: "bg-brass text-ink-900" },
  "outline-light": {
    base: "border border-white/30 text-ivory hover:border-brass",
    fill: "bg-white/5",
    icon: "bg-white/10 text-brass-light",
  },
  "outline-dark": {
    base: "border border-ink/25 text-ink hover:border-ink",
    fill: "bg-ink/5",
    icon: "bg-ink text-ivory",
  },
};

/** Pill button with a sliding fill and a rotating arrow on hover. */
export function ButtonLink({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
}) {
  const v = variants[variant];
  return (
    <Link
      href={href}
      className={`group relative isolate inline-flex min-h-12 items-center gap-4 overflow-hidden rounded-full py-2 pr-2 pl-7 text-sm font-semibold tracking-wide transition-colors ${v.base}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${v.fill}`}
      />
      {children}
      <span
        aria-hidden="true"
        className={`grid size-9 place-items-center rounded-full transition-transform duration-500 group-hover:-rotate-45 ${v.icon}`}
      >
        <ArrowIcon />
      </span>
    </Link>
  );
}
