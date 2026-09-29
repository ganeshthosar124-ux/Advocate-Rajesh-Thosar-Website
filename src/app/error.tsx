"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { site, telHref } from "@/lib/site";

// Shown (inside the normal header and footer) when a page or the enquiry form
// hits an unexpected error, e.g. the connection drops while sending.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="stage grain relative flex min-h-[70svh] items-center overflow-hidden pt-32 pb-20">
      <Container className="relative z-10 max-w-2xl text-center">
        <p className="eyebrow justify-center">Something went wrong</p>
        <h1 className="mt-5 text-4xl sm:text-5xl">This page could not be completed</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-ivory/75">
          Please try again. If the problem continues, you can contact the office directly.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="min-h-12 rounded-full bg-brass px-8 py-3 text-sm font-bold text-ink-900 transition-colors hover:bg-brass-light"
          >
            Try again
          </button>
          <a
            href={telHref}
            className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-ivory hover:border-brass"
          >
            Call {site.contact.phoneDisplay}
          </a>
          <a
            href={`mailto:${site.contact.email}`}
            className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-ivory hover:border-brass"
          >
            Email the office
          </a>
        </div>
      </Container>
    </section>
  );
}
