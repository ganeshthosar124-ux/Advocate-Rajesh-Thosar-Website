// Decorative ticker of practice areas. The content is duplicated so the loop is
// seamless; the whole band is hidden from assistive technology because the
// same list appears as real links further down the page.
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 font-serif text-4xl whitespace-nowrap text-ink/85 italic sm:text-6xl">{item}</span>
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-brass" fill="currentColor">
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line bg-ivory py-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] sm:py-10"
    >
      <div className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
