import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Our Services | Professional Painting, Carpentry & Remodeling in MA",
  description:
    "Explore Alfa Construction's full range of services: painting, carpentry, siding, window & door installation, and home remodeling across Massachusetts. Licensed & insured. Free estimates.",
};

const services = [
  {
    slug: "painting",
    name: "Interior & Exterior Painting",
    description:
      "From single rooms to complete exterior makeovers, our painting team delivers flawless results. We handle all prep work, use premium paints, and ensure a finish that lasts through New England's toughest seasons. Whether your walls are faded, peeling, or you simply want a fresh new look, we have you covered.",
    icon: "painting",
    cta: "Get Your Free Painting Estimate",
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
    slug: "remodeling",
    name: "Home Remodeling & Renovation",
    description:
      "Transform your living spaces with our comprehensive remodeling services. From kitchen and bathroom updates to full-home renovations, we handle drywall, painting, carpentry, and finishing — all under one roof. Increase your home's value and enjoy the spaces you've always envisioned.",
    icon: "remodeling",
    cta: "Start Your Remodeling Project",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-alfa-blue">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Our Professional Services
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Alfa Construction Inc offers a complete range of home improvement services across Massachusetts. Licensed, insured, and backed by 18+ years of experience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-alfa-gray">
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
