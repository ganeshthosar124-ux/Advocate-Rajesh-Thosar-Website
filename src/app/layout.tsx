import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { DisclaimerGate } from "@/components/layout/DisclaimerGate";
import { Effects } from "@/components/layout/Effects";
import { JsonLd } from "@/components/ui/JsonLd";
import { legalServiceJsonLd } from "@/lib/seo";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Advocate, ${site.office.city}, ${site.office.district}`,
    template: `%s | ${site.fullName}`,
  },
  description: site.shortDescription,
  applicationName: site.fullName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.fullName,
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#081325",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          data-skip-link
          className="sr-only z-[70] bg-brass px-4 py-3 font-semibold text-ink-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <JsonLd data={legalServiceJsonLd()} />
        <Effects />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileContactBar />
        <DisclaimerGate />
      </body>
    </html>
  );
}
