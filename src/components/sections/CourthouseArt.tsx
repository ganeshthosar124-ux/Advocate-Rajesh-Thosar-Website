// Line drawing of a classical court building that "draws itself" when revealed.
export function CourthouseArt({ className = "" }: { className?: string }) {
  const columns = [70, 120, 170, 230, 280, 330];
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
      className={`courthouse ${className}`}
    >
      <path pathLength={1} d="M200 20 L360 90 L40 90 Z" />
      <path pathLength={1} d="M200 42 L318 84 L82 84 Z" opacity="0.5" />
      <circle pathLength={1} cx="200" cy="66" r="9" opacity="0.7" />
      <path pathLength={1} d="M36 96 H364 M44 104 H356" />
      {columns.map((x) => (
        <g key={x}>
          <path pathLength={1} d={`M${x - 11} 112 H${x + 11} M${x - 8} 118 V252 M${x + 8} 118 V252 M${x - 11} 258 H${x + 11}`} />
          <path pathLength={1} d={`M${x} 124 V246`} opacity="0.35" />
        </g>
      ))}
      <path pathLength={1} d="M24 266 H376 M14 280 H386 M4 294 H396" />
      <path pathLength={1} d="M185 252 V200 a15 15 0 0 1 30 0 V252" opacity="0.6" />
    </svg>
  );
}
