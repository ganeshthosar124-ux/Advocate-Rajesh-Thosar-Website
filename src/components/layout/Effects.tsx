"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Site-wide progressive enhancements, all driven by plain data attributes and
 * classes so pages can stay server components:
 *  - [data-reveal]  fades/slides elements in as they enter the viewport
 *  - .spotlight     cards get --x/--y CSS vars that follow the pointer
 *  - a thin gold scroll-progress bar at the top of the page
 */
export function Effects() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  // Reveal on scroll. A MutationObserver picks up content inserted later
  // (client-side navigation, back/forward restores), so nothing stays hidden.
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-visible");
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already above the viewport (e.g. after the
          // browser restores a scroll position on Back), so scrolling up never
          // shows empty space.
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    const observed = new WeakSet<Element>();
    const scan = () => {
      const vh = window.innerHeight;
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        // Only content that starts below the fold is hidden and animated in;
        // anything already on screen (or scrolled past) is left untouched.
        if (el.getBoundingClientRect().top < vh * 0.9) return reveal(el);
        el.classList.add("reveal-pending");
        io.observe(el);
      });
    };
    scan();
    let frame = 0;
    const mo = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), scan()));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Backstop for fast scrolling: if an element crosses the whole viewport
    // between two rendering frames, the observer never reports it, so on each
    // scroll frame reveal anything pending that has reached the viewport.
    let sweepFrame = 0;
    const sweep = () => {
      sweepFrame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal-pending:not(.is-visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < vh) {
          reveal(el);
          io.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      if (!sweepFrame) sweepFrame = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(sweepFrame);
    };
  }, []);

  // Pointer-following spotlight
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - r.left}px`);
      card.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-brass via-brass-light to-brass"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
