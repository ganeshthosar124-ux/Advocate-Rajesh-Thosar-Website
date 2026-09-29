"use client";

import { useState } from "react";
import { PinIcon } from "@/components/ui/Icons";

// Loads Google Maps only when the visitor asks for it, which keeps the page
// fast and avoids contacting Google until then.
export function MapEmbed({ query }: { query: string }) {
  const [show, setShow] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-parchment sm:aspect-[16/10]">
      {show ? (
        <iframe
          src={src}
          title="Office location on Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <PinIcon className="size-8 text-brass-text" />
          <p className="max-w-xs text-sm text-muted">The map is provided by Google and loads only when you choose to view it.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setShow(true)}
              className="min-h-11 bg-ink px-5 py-2 text-sm font-semibold text-ivory hover:bg-ink-700"
            >
              Show map
            </button>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center border border-ink px-5 py-2 text-sm font-semibold text-ink hover:bg-ivory"
            >
              Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
