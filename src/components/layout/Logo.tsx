import Image from "next/image";
import Link from "next/link";
import monogram from "../../../public/logo/rt-monogram.svg";
import monogramReverse from "../../../public/logo/rt-monogram-reverse.svg";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const name = tone === "dark" ? "text-ink" : "text-ivory";
  const sub = tone === "dark" ? "text-brass-text" : "text-brass-light";
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="Rajesh A. Thosar, Advocate — home">
      <Image
        src={tone === "dark" ? monogram : monogramReverse}
        alt=""
        width={44}
        height={44}
        unoptimized
        loading="eager"
        className="size-10 sm:size-11"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-xl font-semibold sm:text-2xl ${name}`}>Rajesh A. Thosar</span>
        <span className={`mt-1 text-xs font-semibold uppercase tracking-[0.26em] ${sub}`}>Advocate</span>
      </span>
    </Link>
  );
}
