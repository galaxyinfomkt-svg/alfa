import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalStrip from "@/components/LegalStrip";
import PhoneButton from "@/components/PhoneButton";
import DeferredScripts from "@/components/DeferredScripts";
import { getLocalBusiness, getWebSite } from "@/data/schema";

const inter = Inter({
  subsets: ["latin"],
  // "optional" gives the browser a 100ms budget to load the font.
  // After that it falls back to the system font and never swaps in
  // — eliminates FOIT/FOUT and the layout shift Lighthouse measures.
  display: "optional",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alfapaintingcarpentry.com"),
  title: {
    default: "Massachusetts Full-Home Siding Installation | Alfa Construction",
    template: "%s | Alfa Construction",
  },
  // Medida em pixels: a anterior tinha 1.568px contra o corte de ~920px do
  // snippet, e o que sumia era todo o final, telefone incluido.
  description:
    "Full-home siding installation & replacement across Massachusetts. Hardie Plank, vinyl, cedar, shake. Free estimate: (508) 590-9193.",
  // meta `keywords` removed — Google ignores it and it still listed
  // window/door/carpentry/remodeling + "siding replacement MA" (off-positioning).
  authors: [{ name: "Alfa Construction Inc", url: "https://alfapaintingcarpentry.com" }],
  creator: "Alfa Construction Inc",
  publisher: "Alfa Construction Inc",
  category: "Home Improvement",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alfa Construction Inc",
    title: "Massachusetts Full-Home Siding Installation | Alfa Construction",
    description:
      "Full-home siding installation & replacement across Massachusetts. Hardie Plank · vinyl · cedar · shake. We specialize in complete re-sides, not patch jobs. Licensed (MA HIC #192348) · 20+ years.",
    url: "https://alfapaintingcarpentry.com",
    images: [
      {
        url: "/images/new-construction-siding-windows-board-batten-ma.jpg",
        width: 1200,
        height: 630,
        alt: "Alfa Construction Inc - Professional Siding Installation in Massachusetts",
        type: "image/jpeg",
      },
      {
        url: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg",
        width: 1200,
        height: 630,
        alt: "Exterior siding installation by Alfa Construction in Bellingham MA",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massachusetts Full-Home Siding Installation | Alfa Construction",
    description:
      "Full-home siding installation & replacement across Massachusetts. Hardie Plank · vinyl · cedar · shake. License #192348 · 20+ years.",
    images: ["/images/new-construction-siding-windows-board-batten-ma.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://alfapaintingcarpentry.com",
  },
  verification: {
    // Google Search Console verified via galaxyinfomkt@gmail.com
  },
  other: {
    // geo.* are legitimate local-business hints; kept. Legacy "revisit-after"
    // (ignored by Google) and redundant "language" (html lang covers it) removed.
    "geo.region": "US-MA",
    "geo.placename": "Bellingham, Massachusetts",
    "geo.position": "42.0687;-71.4748",
    "ICBM": "42.0687, -71.4748",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=yes" />

        {/* LLMs.txt for AI search engines */}
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM documentation" />

        {/* Preconnect — max 4 most-critical origins (Lighthouse rule).
            Form iframe is now lazy-loaded so we only preconnect to the
            first-paint critical domains. LeadConnector sub-origins resolve
            via the lazy DNS at iframe-load time. */}
        <link rel="preconnect" href="https://api.leadconnectorhq.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://appcdn.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://stcdn.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://link.msgsndr.com" />

        {/* GeneralContractor schema (siding-only positioning) — generated
            from data/siteConfig.ts via data/schema.ts. Replaces the old
            LocalBusiness/Organization/Contractor/ImageGallery JSON-LD that
            was telling Google we offered 4 trades. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusiness()) }}
        />
        {/* WebSite (sitelinks search box) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebSite()) }}
        />

        {/* Reviews widget script - loaded lazily for performance */}
      </head>
      <body className="font-sans antialiased bg-black text-gray-300">
        <Header />
        <main className="min-h-screen">{children}</main>
        <LegalStrip />
        <Footer />
        <PhoneButton />

        {/* Defer all heavy third-party scripts until user interaction.
            Chat widget mount-point is now injected inside DeferredScripts
            on first pointerdown/touchstart/keydown — keeps initial paint
            free of LeadConnector preconnects + Facebook Pixel x4. */}
        <DeferredScripts />
      </body>
    </html>
  );
}
