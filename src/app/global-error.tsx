"use client";

import { useEffect } from "react";
import { site, telHref } from "@/lib/site";
import "./globals.css";

// Last-resort error page, used only if the root layout itself fails. It
// replaces the whole document, so it must render its own <html> and <body>.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body className="stage flex min-h-dvh items-center justify-center px-4 text-center">
        <main>
          <h1 className="text-4xl">Something went wrong</h1>
          <p className="mx-auto mt-5 max-w-md text-ivory/75">
            Please try again. If the problem continues, contact the office on{" "}
            <a href={telHref} className="underline">
              {site.contact.phoneDisplay}
            </a>{" "}
            or at{" "}
            <a href={`mailto:${site.contact.email}`} className="underline">
              {site.contact.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 min-h-12 rounded-full bg-brass px-8 py-3 text-sm font-bold text-ink-900"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
