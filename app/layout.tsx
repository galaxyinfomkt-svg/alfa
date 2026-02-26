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
    default: "Alfa Construction Inc | #1 Painting & Carpentry in Massachusetts",
    template: "%s | Alfa Construction Inc",
  },
  description:
    "Top-rated painting, carpentry, siding, window & door installation and home remodeling in Massachusetts. Licensed & insured. 18+ years experience. 5-star rated. Free estimates. Call (508) 596-3750.",
  keywords: [
    "painting contractor Massachusetts",
    "painter near me MA",
    "house painting Massachusetts",
    "carpentry services Massachusetts",
    "siding installation MA",
    "window installation Massachusetts",
    "door installation MA",
    "home remodeling Massachusetts",
    "licensed contractor Massachusetts",
    "insured contractor MA",
    "Alfa Construction Inc",
    "Alfa Painting Carpentry",
    "home improvement Massachusetts",
    "exterior painting MA",
    "interior painting Massachusetts",
    "trim work MA",
    "Hardie plank siding Massachusetts",
    "vinyl siding MA",
    "kitchen remodeling Massachusetts",
    "bathroom remodeling MA",
    "Bellingham MA contractor",
    "Framingham MA painter",
    "MetroWest painting",
    "Worcester county contractor",
  ],
  authors: [{ name: "Alfa Construction Inc", url: "https://alfapaintingcarpentry.com" }],
  creator: "Alfa Construction Inc",
  publisher: "Alfa Construction Inc",
  category: "Home Improvement",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alfa Construction Inc",
    title: "Alfa Construction Inc | Expert Painting & Carpentry in Massachusetts",
    description:
      "Top-rated painting, carpentry, siding & home remodeling across Massachusetts. 18+ years. 5-star rated. Free estimates.",
    url: "https://alfapaintingcarpentry.com",
    images: [
      {
        url: "/images/new-construction-siding-windows-board-batten-ma.jpg",
        width: 1200,
        height: 630,
        alt: "Alfa Construction Inc - Professional Painting & Carpentry in Massachusetts",
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
    title: "Alfa Construction Inc | Painting & Carpentry in Massachusetts",
    description:
      "Expert painting, carpentry, siding & remodeling across Massachusetts. 18+ years. 5-star rated. Free estimates.",
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

        {/* Preconnect for form/widget resources (loaded lazily via IntersectionObserver) */}
        <link rel="dns-prefetch" href="https://api.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://appcdn.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://stcdn.leadconnectorhq.com" />
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
