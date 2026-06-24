import type { Metadata } from "next";
import { breadcrumbSchema } from "@/data/company";
import { getAllServiceSlugs, getServiceBySlug } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Massachusetts Siding Installation & Replacement | Alfa Construction",
  description:
    "Full-home siding installation & replacement across Massachusetts. Hardie Plank, vinyl, cedar, shake. We specialize exclusively in complete re-sides — not patch repairs. Licensed (MA HIC #192348). Free estimate: (508) 590-9193.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/services" },
};

// SIDING-ONLY — all 10 siding services (the full city × service matrix hub).
const services = getAllServiceSlugs()
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s))
  .map((s) => ({
    slug: s.slug,
    name: s.name,
    description: s.description,
    icon: "siding",
    cta: s.cta,
  }));

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
            Alfa Construction Inc specializes exclusively in complete full-home siding installation and replacement across Massachusetts. Licensed, insured, and backed by 20+ years of experience.
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
