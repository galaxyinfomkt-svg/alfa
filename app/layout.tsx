import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhoneButton from "@/components/PhoneButton";
import DeferredScripts from "@/components/DeferredScripts";
import { localBusinessSchema, websiteSchema, contractorSchema, imageGallerySchema } from "@/data/company";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alfapaintingcarpentry.com"),
  title: {
    default: "Alfa Construction Inc | #1 Siding Installation Contractor in Massachusetts",
    template: "%s | Alfa Construction Inc",
  },
  description:
    "Top-rated siding installation, window & door installation, carpentry and home remodeling in Massachusetts. Licensed & insured. 18+ years experience. 5-star rated. Free estimates. Call (508) 596-3750.",
  keywords: [
    "siding installation Massachusetts",
    "siding contractor near me MA",
    "siding installation MA",
    "Hardie plank siding Massachusetts",
    "vinyl siding installation MA",
    "fiber cement siding Massachusetts",
    "commercial siding installation MA",
    "siding replacement Massachusetts",
    "window installation Massachusetts",
    "door installation MA",
    "carpentry services Massachusetts",
    "home remodeling Massachusetts",
    "licensed contractor Massachusetts",
    "insured contractor MA",
    "Alfa Construction Inc",
    "exterior siding MA",
    "residential siding Massachusetts",
    "siding repair MA",
    "clapboard siding Massachusetts",
    "shake siding installation MA",
    "Bellingham MA contractor",
    "MetroWest siding contractor",
    "Worcester county siding",
    "siding company Massachusetts",
  ],
  authors: [{ name: "Alfa Construction Inc", url: "https://alfapaintingcarpentry.com" }],
  creator: "Alfa Construction Inc",
  publisher: "Alfa Construction Inc",
  category: "Home Improvement",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alfa Construction Inc",
    title: "Alfa Construction Inc | #1 Siding Installation Contractor in Massachusetts",
    description:
      "Top-rated siding installation, carpentry & home remodeling across Massachusetts. 18+ years. 5-star rated. Free estimates.",
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
    title: "Alfa Construction Inc | #1 Siding Installation in Massachusetts",
    description:
      "Expert siding installation, carpentry & remodeling across Massachusetts. 18+ years. 5-star rated. Free estimates.",
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
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  },
  other: {
    "geo.region": "US-MA",
    "geo.placename": "Bellingham, Massachusetts",
    "geo.position": "42.0687;-71.4748",
    "ICBM": "42.0687, -71.4748",
    "revisit-after": "3 days",
    "language": "EN",
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

        {/* Preconnect for form/widget resources (resolves DNS + TCP + TLS early) */}
        <link rel="preconnect" href="https://api.leadconnectorhq.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://appcdn.leadconnectorhq.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://stcdn.leadconnectorhq.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://beta.leadconnectorhq.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://beta.leadconnectorhq.com" />

        {/* Organization + LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* WebSite Schema (for sitelinks search box) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* GeneralContractor Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contractorSchema) }}
        />
        {/* ImageGallery Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
        />

        {/* Reviews widget script - loaded lazily for performance */}
      </head>
      <body className="font-sans antialiased bg-black text-gray-300">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <PhoneButton />

        {/* Chat Widget mount point */}
        <div
          data-chat-widget=""
          data-widget-id="6763359a5436802950cda164"
          data-location-id="BlgWjOKxk32P6dyUTDjY"
        />

        {/* Defer all heavy third-party scripts until user interaction */}
        <DeferredScripts />
      </body>
    </html>
  );
}
