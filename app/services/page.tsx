import type { Metadata } from "next";
import { breadcrumbSchema } from "@/data/company";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services in MA · Siding, Windows, Carpentry · 5★ Free Estimate",
  description:
    "Siding, windows, carpentry & remodeling across Massachusetts by Fabio's 18-year crew. License #192348 · 22 ★★★★★ reviews. Free estimate in 24h. Call (508) 590-9193.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/services" },
};

const services = [
  {
    slug: "siding",
    name: "Siding Installation & Repair",
    description:
      "Protect and beautify your home with professional siding services. We specialize in Hardie Plank fiber cement siding — the gold standard for New England homes — as well as vinyl siding installation and repair. Full replacement or targeted repairs, built to withstand harsh Massachusetts weather.",
    icon: "siding",
    cta: "Get a Free Siding Quote",
  },
  {
    slug: "windows-doors",
    name: "Window & Door Installation",
    description:
      "Upgrade your comfort and energy efficiency with professional window and door installation. We install energy-efficient windows that reduce drafts and lower utility bills, plus exterior and interior doors that enhance security and curb appeal. Precise fitting, clean installation, lasting results.",
    icon: "windows-doors",
    cta: "Get a Free Window & Door Estimate",
  },
  {
    slug: "carpentry",
    name: "Carpentry & Trim Work",
    description:
      "Expert carpentry services including trim replacement, door installation, and custom woodwork. We restore rotten trim, install new interior and exterior doors with precision, and deliver the detailed finish work that transforms your home. Quality craftsmanship you can see and feel.",
    icon: "carpentry",
    cta: "Schedule Your Carpentry Consultation",
  },
  {
    slug: "remodeling",
    name: "Home Remodeling & Renovation",
    description:
      "Transform your living spaces with our comprehensive remodeling services. From kitchen and bathroom updates to full-home renovations, we handle drywall, carpentry, and finishing — all under one roof. Increase your home's value and enjoy the spaces you've always envisioned.",
    icon: "remodeling",
    cta: "Start Your Remodeling Project",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Services", url: "https://alfapaintingcarpentry.com/services" },
      ])) }} />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Our Professional Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Alfa Construction Inc offers a complete range of home improvement services across Massachusetts. Licensed, insured, and backed by 18+ years of experience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
