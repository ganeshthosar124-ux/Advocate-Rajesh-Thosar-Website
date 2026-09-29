"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { contactSchema, type ContactFieldErrors, type ContactState } from "@/lib/contact-schema";

// Simple per-IP rate limit (5 submissions / 10 minutes). In-memory, so it
// resets on redeploy and is per-instance; adequate for a low-traffic site.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company")) return { status: "success", message: "Thank you. Your enquiry has been sent." };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Too many enquiries were sent from your connection. Please try again later." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    subject: formData.get("subject") ?? "",
    message: formData.get("message") ?? "",
    consent: formData.get("consent") ?? "",
  });

  if (!parsed.success) {
    const errors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFieldErrors;
      errors[key] ??= issue.message;
    }
    return { status: "error", message: "Please correct the highlighted fields.", errors };
  }

  if (!(await verifyTurnstile(String(formData.get("cf-turnstile-response") ?? ""), ip))) {
    return { status: "error", message: "The spam check failed. Please reload the page and try again." };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !CONTACT_TO) {
    console.warn("Contact form: SMTP_HOST / CONTACT_TO not configured; enquiry not sent.");
    return {
      status: "error",
      message: "The enquiry form is not available at the moment. Please contact the office by telephone or email.",
    };
  }

  const d = parsed.data;
  const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: Number(SMTP_PORT) === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
    await transport.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: { name: oneLine(d.name), address: d.email },
      subject: `Website enquiry: ${oneLine(d.subject)}`,
      text: `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "-"}\n\n${d.message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(d.name)}<br><strong>Email:</strong> ${escapeHtml(d.email)}<br><strong>Phone:</strong> ${escapeHtml(d.phone || "-")}</p><p>${escapeHtml(d.message).replace(/\n/g, "<br>")}</p>`,
    });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return {
      status: "error",
      message: "Your enquiry could not be sent. Please try again, or contact the office by telephone or email.",
    };
  }

  return { status: "success", message: "Thank you. Your enquiry has been sent and the office will respond by email." };
}
