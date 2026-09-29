"use client";

import Link from "next/link";
import Script from "next/script";
import { useActionState, useEffect, useRef } from "react";
import { sendEnquiry } from "./actions";
import type { ContactFieldErrors, ContactState } from "@/lib/contact-schema";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputClass =
  "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3.5 text-base text-charcoal outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted/60 focus:border-brass focus:shadow-[0_0_0_4px_rgba(197,160,89,0.18)] aria-[invalid=true]:border-maroon";

function Field({
  name,
  label,
  errors,
  required = true,
  children,
}: {
  name: keyof ContactFieldErrors;
  label: string;
  errors?: ContactFieldErrors;
  required?: boolean;
  children: (props: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const error = errors?.[name];
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {!required && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined })}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-maroon">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendEnquiry, { status: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "idle") return;
    statusRef.current?.focus();
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const errors = state.errors;
  // Re-applied after React resets the form, so a failed submission keeps its input.
  const v = state.status === "error" ? (state.values ?? {}) : {};

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-6">
      <div
        ref={statusRef}
        tabIndex={-1}
        role={state.status === "error" ? "alert" : "status"}
        className={
          state.status === "idle"
            ? "sr-only"
            : `rounded-xl border-l-4 p-4 text-sm outline-none ${state.status === "success" ? "border-ink bg-parchment text-ink" : "border-maroon bg-maroon/5 text-maroon"}`
        }
      >
        {state.message}
      </div>

      <p className="rounded-xl border border-line bg-parchment p-4 text-sm text-muted">
        Please do not include confidential details of your matter in this form. Submitting an enquiry does not
        create an advocate–client relationship.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" errors={errors}>
          {(p) => <input {...p} defaultValue={v.name} name="name" type="text" autoComplete="name" required maxLength={100} className={inputClass} />}
        </Field>
        <Field name="email" label="Email" errors={errors}>
          {(p) => <input {...p} defaultValue={v.email} name="email" type="email" autoComplete="email" required maxLength={200} className={inputClass} />}
        </Field>
        <Field name="phone" label="Phone" errors={errors} required={false}>
          {(p) => <input {...p} defaultValue={v.phone} name="phone" type="tel" autoComplete="tel" maxLength={20} className={inputClass} />}
        </Field>
        <Field name="subject" label="Subject" errors={errors}>
          {(p) => <input {...p} defaultValue={v.subject} name="subject" type="text" required maxLength={150} className={inputClass} />}
        </Field>
      </div>

      <Field name="message" label="Message" errors={errors}>
        {(p) => <textarea {...p} defaultValue={v.message} name="message" rows={6} required maxLength={2000} className={inputClass} />}
      </Field>

      {/* Honeypot field, hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            name="consent"
            defaultChecked={v.consent}
            type="checkbox"
            required
            aria-invalid={errors?.consent ? true : undefined}
            aria-describedby={errors?.consent ? "consent-error" : undefined}
            className="mt-0.5 size-6 shrink-0 accent-ink"
          />
          <span>
            I have read the{" "}
            <Link href="/privacy-policy" className="text-brass-text underline underline-offset-2">
              privacy notice
            </Link>{" "}
            and consent to the details above being used to respond to my enquiry.
          </span>
        </label>
        {errors?.consent && (
          <p id="consent-error" className="mt-2 text-sm text-maroon">
            {errors.consent}
          </p>
        )}
      </div>

      {turnstileSiteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />
        </>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-3.5 text-sm font-semibold tracking-wide text-ivory transition-colors hover:bg-ink-700 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
