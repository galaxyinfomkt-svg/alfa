import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhoneButton from "@/components/PhoneButton";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alfapaintingcarpentry.com"),
  title: {
    default: "Alfa Construction Inc | Painting & Carpentry Services in Massachusetts",
    template: "%s | Alfa Construction Inc",
  },
  description:
    "Expert painting, carpentry, siding, window & door installation and home remodeling in Massachusetts. Licensed & insured. 18+ years experience. Free estimates. Call (508) 596-3750.",
  keywords: [
    "painting Massachusetts",
    "carpentry MA",
    "siding installation Massachusetts",
    "window installation MA",
    "home remodeling Massachusetts",
    "licensed contractor MA",
    "Alfa Construction",
    "Alfa Painting Carpentry",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alfa Construction Inc",
    images: [
      {
        url: "/images/new-construction-siding-windows-board-batten-ma.jpg",
        width: 1200,
        height: 630,
        alt: "Alfa Construction Inc - Professional Painting & Carpentry in Massachusetts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
        {/* Reviews widget script */}
        <script
          type="text/javascript"
          src="https://reputationhub.site/reputation/assets/review-widget.js"
          defer
        />
      </head>
      <body className="font-sans antialiased bg-black text-gray-300">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <PhoneButton />

        {/* Chat Widget */}
        <div
          data-chat-widget=""
          data-widget-id="6763359a5436802950cda164"
          data-location-id="BlgWjOKxk32P6dyUTDjY"
        />
        <Script
          src="https://beta.leadconnectorhq.com/loader.js"
          data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6763359a5436802950cda164"
          strategy="lazyOnload"
        />

        {/* Form embed script */}
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
