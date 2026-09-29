"use client";

import Image from "next/image";
import Link from "next/link";
import monogram from "../../../public/logo/rt-monogram-reverse.svg";
import { useEffect, useRef } from "react";

const STORAGE_KEY = "disclaimer-accepted";

function hasAccepted() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "yes";
  } catch {
    return false;
  }
}

/**
 * Entry disclaimer shown once per browser session. The page content is still
 * rendered underneath, so search engines index the site normally.
 */
export function DisclaimerGate() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || hasAccepted() || window.location.pathname === "/disclaimer") return;
    dialog.showModal();
  }, []);

  function accept() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "yes");
    } catch {
      // Storage unavailable (private mode): the notice simply shows again next visit.
    }
    dialogRef.current?.close();
  }

  function decline() {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "about:blank";
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="disclaimer-title"
      aria-describedby="disclaimer-body"
      onCancel={(e) => e.preventDefault()}
      className="stage grain m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-brass/30 p-0 text-ivory/85 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] backdrop:bg-ink-950/70 backdrop:backdrop-blur-md open:motion-safe:animate-fade-up"
    >
      <div className="relative z-10 p-7 sm:p-12">
        <div className="flex items-center gap-4">
          <Image src={monogram} alt="" width={48} height={48} unoptimized className="size-12" />
          <p className="eyebrow">Please read before entering</p>
        </div>
        <h2 id="disclaimer-title" className="mt-6 text-4xl sm:text-5xl">
          Disclaimer
        </h2>
        <span className="rule mt-5" aria-hidden="true" />
        <div id="disclaimer-body" className="mt-6 space-y-4 text-[0.97rem] leading-relaxed">
          <p>
            The Bar Council of India does not permit advocates to solicit work or advertise. By clicking &ldquo;I
            agree&rdquo; below, you acknowledge that:
          </p>
          <ul className="space-y-3">
            {[
              "you are seeking information about the advocate of your own accord, and there has been no advertisement, solicitation, invitation or inducement of any kind;",
              "the information on this website is provided only on your request, for informational purposes;",
              "nothing on this website constitutes legal advice, and use of it does not create an advocate–client relationship.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-brass" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ivory/70">
            Read the full{" "}
            <Link href="/disclaimer" onClick={accept} className="text-brass-light underline underline-offset-2">
              disclaimer
            </Link>
            .
          </p>
        </div>
        <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={decline}
            className="min-h-12 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-ivory transition-colors hover:border-white/60"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            autoFocus
            className="min-h-12 rounded-full bg-brass px-8 py-3 text-sm font-bold text-ink-900 transition-colors hover:bg-brass-light"
          >
            I agree
          </button>
        </div>
      </div>
    </dialog>
  );
}
