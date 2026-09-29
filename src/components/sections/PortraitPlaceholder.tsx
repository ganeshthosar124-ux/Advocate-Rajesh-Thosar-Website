// Stands in for the advocate's photograph until it is supplied.
// Replace with <Image src="/images/portrait.jpg" ... /> once available.
export function PortraitPlaceholder({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative aspect-[4/5] w-full overflow-hidden border border-brass/60 bg-ink-700 ${className}`}
      aria-label="Portrait photograph to be added"
    >
      <div className="absolute inset-3 border border-brass/40" aria-hidden="true" />
      <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
        <div className="text-center">
          <span className="font-serif text-7xl font-semibold text-brass-light/80 sm:text-8xl">RT</span>
          <span className="mt-3 block text-[0.7rem] uppercase tracking-[0.3em] text-ivory/70">Photograph</span>
        </div>
      </div>
    </figure>
  );
}
