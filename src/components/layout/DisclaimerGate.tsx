"use client";

import Link from "next/link";
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
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto border-t-4 border-brass bg-ivory p-0 text-charcoal shadow-2xl backdrop:bg-ink-900/80"
    >
      <div className="p-6 sm:p-10">
        <p className="eyebrow mb-3">Please read</p>
        <h2 id="disclaimer-title" className="text-3xl sm:text-4xl">
          Disclaimer
        </h2>
        <span className="rule mt-4" aria-hidden="true" />
        <div id="disclaimer-body" className="mt-6 space-y-4 text-[0.97rem] leading-relaxed">
          <p>
            The Bar Council of India does not permit advocates to solicit work or advertise. By clicking &ldquo;I
            agree&rdquo; below, you acknowledge that:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              you are seeking information about the advocate of your own accord, and there has been no advertisement,
              solicitation, invitation or inducement of any kind;
            </li>
            <li>the information on this website is provided only on your request, for informational purposes;</li>
            <li>
              nothing on this website constitutes legal advice, and use of it does not create an advocate–client
              relationship.
            </li>
          </ul>
          <p className="text-sm text-muted">
            Read the full{" "}
            <Link href="/disclaimer" onClick={accept} className="text-brass-text underline underline-offset-2">
              disclaimer
            </Link>
            .
          </p>
        </div>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={decline}
            className="min-h-11 border border-ink px-6 py-3 text-sm font-semibold text-ink hover:bg-parchment"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            autoFocus
            className="min-h-11 bg-ink px-6 py-3 text-sm font-semibold text-ivory hover:bg-ink-700"
          >
            I agree
          </button>
        </div>
      </div>
    </dialog>
  );
}
