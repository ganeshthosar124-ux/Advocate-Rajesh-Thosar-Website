import Link from "next/link";

// Placeholder wordmark until the final logo is supplied.
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const name = tone === "dark" ? "text-ink" : "text-ivory";
  const sub = tone === "dark" ? "text-brass-text" : "text-brass-light";
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Rajesh Thosar, Advocate — home">
      <span
        aria-hidden="true"
        className={`grid size-10 place-items-center border ${tone === "dark" ? "border-ink text-ink" : "border-brass-light text-ivory"} font-serif text-lg font-semibold`}
      >
        RT
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-xl font-semibold sm:text-2xl ${name}`}>Rajesh Thosar</span>
        <span className={`mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${sub}`}>Advocate</span>
      </span>
    </Link>
  );
}
