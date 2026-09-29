// Custom line icons for each practice area, keyed by the content file's slug.
const paths: Record<string, React.ReactNode> = {
  "civil-litigation": (
    <>
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v4h4M10 11h6M10 14h6M10 17h4" />
      <path d="M4 6v15h11" />
    </>
  ),
  "criminal-law": (
    <>
      <path d="M12 3 4 6v5c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6z" />
      <path d="M12 8v5M12 16h.01" />
    </>
  ),
  "cheque-bounce-section-138": (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="1" />
      <path d="M6 10h6M6 13.5h9M15.5 10h2.5" />
      <path d="m14 3 6 18" />
    </>
  ),
  "property-and-succession": (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  "banking-recovery": (
    <>
      <path d="M3 9 12 4l9 5" />
      <path d="M4 9h16M6 9v8M10 9v8M14 9v8M18 9v8M3 20h18M4 17h16" />
    </>
  ),
  "consumer-disputes": (
    <>
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="m9.5 14 2 2 3.5-4" />
    </>
  ),
  "matrimonial-and-family-law": (
    <>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="m10 4 2 3 2-3" />
    </>
  ),
  "writ-petitions": (
    <>
      <path d="M4 20h16M5 17h14M12 3 4 7h16z" />
      <path d="M7 7v10M12 7v10M17 7v10" />
    </>
  ),
  "regulatory-matters": (
    <>
      <rect x="5" y="4" width="14" height="17" rx="1" />
      <path d="M9 4V2.5h6V4M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
};

export function PracticeIcon({ slug, className = "size-7" }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[slug] ?? paths["civil-litigation"]}
    </svg>
  );
}
