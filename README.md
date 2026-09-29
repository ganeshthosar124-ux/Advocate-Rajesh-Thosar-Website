# Advocate Rajesh A. Thosar — Website

Website of Advocate Rajesh A. Thosar, built with Next.js (App Router), TypeScript and Tailwind CSS. Every page is
pre-rendered as static HTML; the only server code is the contact form.

## Editing content

All editable content lives in `content/`. Values in `[square brackets]` are placeholders awaiting confirmation.

| What | Where |
|---|---|
| Name, Bar Council, qualification, biography, courts, phone, WhatsApp, email, LinkedIn, address, hours | `content/site.json` |
| Practice areas (one Markdown file each; `order` sets position) | `content/practice-areas/*.md` |
| Articles / legal updates (`draft: true` hides one on the live site) | `content/insights/*.md` |
| Disclaimer, Privacy Policy, Terms of Use (**drafts, to be approved**) | `src/app/disclaimer`, `src/app/privacy-policy`, `src/app/terms-of-use` |
| Portrait photograph | `public/images/rajesh-thosar-portrait.jpg` (replace the file, keep the name) |
| Logo files (SVG for print, PNG for general use) | `public/logo/` — regenerate with `scripts/make-logo.mjs` |

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in values as needed
npm run dev                  # http://localhost:3000
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e   # Playwright: every page on desktop + mobile, axe accessibility, no horizontal scroll, headers
```

If Chromium is preinstalled somewhere, point the tests at it with `PLAYWRIGHT_CHROMIUM_PATH`; otherwise run
`npx playwright install chromium` once.

## Contact form

Enquiries are validated on the server and emailed via SMTP; nothing is stored. Configure in the hosting
environment (see `.env.example`):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM`, `CONTACT_TO`
- Optional spam protection: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` (Cloudflare Turnstile)

Without SMTP settings the form shows a message asking visitors to telephone or email instead.
Protections: server-side validation, honeypot field, per-IP rate limit, optional Turnstile.

## Deployment (Vercel, free Hobby plan)

1. Sign in at <https://vercel.com> with the GitHub account that owns this repository.
2. **Add New → Project**, pick `Advocate-Rajesh-Thosar-Website`, keep the detected Next.js settings, and in
   **Settings → Git** set the production branch to the branch holding this code.
3. Under **Settings → Environment Variables** add the contact-form settings, then redeploy.
   With Gmail: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=<gmail address>`,
   `SMTP_PASS=<a Google "App password", not the normal password>`, `CONTACT_TO=<address that receives enquiries>`.
   (App passwords require 2-Step Verification on the Google account.)
4. The site is then live at `https://<project>.vercel.app`; until a domain is set, canonical URLs and the
   sitemap use that address automatically.
5. After buying a `.com`/`.in` domain: **Settings → Domains → Add**, create the DNS records Vercel shows at the
   registrar, and set `NEXT_PUBLIC_SITE_URL=https://<domain>`.

Any Node host also works (`npm run build && npm start`).

Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) are set in `next.config.ts`.

## Structure

```
content/              editable content (JSON + Markdown)
src/app/              pages, sitemap, robots, manifest, icon, social image
src/components/       layout (header, footer, disclaimer notice), ui, sections
src/lib/              content loaders, SEO / structured data, form schema
tests/                Playwright smoke + accessibility tests
```
