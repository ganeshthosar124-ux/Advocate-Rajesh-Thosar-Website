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
| Logo files (SVG for print, PNG for general use) | `public/logo/` — regenerate with `npm run brand:logo` |

## SEO

- Page titles and meta descriptions: practice areas set `seoTitle` and `description` in their Markdown front
  matter; other pages set them in `pageMetadata(...)` at the top of each page file. Keep titles under ~65
  characters and descriptions between 70 and 160, and keep every claim factual (no "best", "top", "expert",
  outcome promises or similar).
- Structured data (JSON-LD, `src/lib/seo.ts`): `WebSite`, `LegalService` and `Person` on the home page,
  `Person` on About, `LegalService` on Contact, `Service` on each practice area, `BreadcrumbList` on inner pages.
- `sitemap.xml` and `robots.txt` are generated. Update `updated` in `content/site.json` when content changes.
- The Insights page is hidden from navigation, the sitemap and search results until an article is published.
- Social preview image: `public/og/og-image.jpg` (regenerate with `npm run brand:og`).

After launch (these need your accounts):

1. Set `NEXT_PUBLIC_SITE_URL` to the final domain in the hosting settings, then redeploy.
2. Add the site to [Google Search Console](https://search.google.com/search-console) and submit
   `https://<domain>/sitemap.xml`. Optionally also Bing Webmaster Tools.
3. Create or claim the **Google Business Profile** for the office, using exactly the same name, address and
   phone number as the website, and link it to the website.
4. Use the same name, address and phone wherever the practice is listed online.

## Brand assets

- `npm run brand:logo` regenerates the logo files in `public/logo/` (outlined SVG for print, PNG for general use).
- `npm run brand:og` regenerates the social preview image from the portrait.

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

## Deployment (Netlify, free plan)

Netlify's free plan allows commercial sites. (Vercel's free Hobby plan is for personal, non-commercial use
only; on Vercel, use the Pro plan.) Build settings are in `netlify.toml`, and Netlify adds its Next.js
runtime automatically.

1. Sign in at <https://app.netlify.com> with the GitHub account that owns this repository.
2. **Add new project → Import an existing project → GitHub**, allow access to
   `Advocate-Rajesh-Thosar-Website`, and select it.
3. Branch to deploy: the branch holding this code. Leave the build settings as detected (they come from
   `netlify.toml`). Choose a project name, e.g. `advocate-rajesh-thosar`; the site address becomes
   `https://<project-name>.netlify.app`. Click **Deploy**.
4. Contact form email: **Project configuration → Environment variables → Add a variable**, then
   **Deploys → Trigger deploy**. With Gmail:
   `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=<gmail address>`,
   `SMTP_PASS=<a Google "App password", not the normal password>`, `CONTACT_TO=<address that receives enquiries>`.
   Leave `CONTACT_FROM` unset so mail is sent from the Gmail address. App passwords require 2-Step
   Verification on the Google account. Send yourself a test enquiry afterwards.
5. Canonical links, the sitemap and social previews use Netlify's site address automatically. After adding a
   custom domain (**Domain management → Add a domain**), redeploy once so they switch to the domain.
6. Optional spam protection: create a free Cloudflare Turnstile widget for the domain and add
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`, then redeploy.

Any Node host also works (`npm run build && npm start`); set `NEXT_PUBLIC_SITE_URL` there.

Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) are set in `next.config.ts`.

## Structure

```
content/              editable content (JSON + Markdown)
src/app/              pages, sitemap, robots, manifest, icon, social image
src/components/       layout (header, footer, disclaimer notice), ui, sections
src/lib/              content loaders, SEO / structured data, form schema
tests/                Playwright smoke + accessibility tests
```
