// Re-mounts on every navigation, giving each page a soft entrance.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="motion-safe:animate-[page-in_0.7s_var(--ease-out-expo)_both]">{children}</div>;
}
