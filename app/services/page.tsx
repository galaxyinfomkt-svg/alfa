import type { Metadata } from "next";
import { breadcrumbSchema } from "@/data/company";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Massachusetts Siding Installation & Replacement | Alfa Construction",
  description:
    "Full-home siding installation & replacement across Massachusetts. Hardie Plank, vinyl, cedar, shake. We specialize exclusively in complete re-sides — not patch repairs. Licensed (MA HIC #192348). Free estimate: (508) 590-9193.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/services" },
};

// PIVOT SIDING-ONLY — Alfa vende um único serviço: siding installation & replacement.
// As 4 cards abaixo são os 4 materiais (escolha do cliente), todos sob a mesma família.
const services = [
  {
    slug: "siding",
    name: "Full-Home Siding Installation",
    description:
      "Complete exterior re-side across Massachusetts. Sheathing inspection, weather-resistant barrier (DuPont Tyvek), Z-flashing at every penetration, manufacturer-spec fastening. Hardie Plank, vinyl, cedar, shake, or board & batten — your choice. We do not take patch jobs or single-panel repairs.",
    icon: "siding",
    cta: "Get a Free Siding Estimate",
  },
  {
    slug: "hardie-plank-siding",
    name: "Hardie Plank Fiber Cement",
    description:
      "30-year transferable manufacturer warranty. ASTM C1186 Type A Grade II, Class A fire rated. Handles MA freeze-thaw cycles, won't rot, won't burn. The long-term forever-home choice — most New England homeowners' best resale move.",
    icon: "siding",
    cta: "Hardie Plank Details",
  },
  {
    slug: "vinyl-siding",
    name: "Premium Vinyl Siding",
    description:
      "Premium 25-year vinyl in 40+ colors, ASTM D3679 certified. The budget-conscious full re-side option. 5-7 day install for a typical 2,000 sqft Massachusetts home. Faster install, lower upfront cost, 20-30 year lifespan.",
    icon: "siding",
    cta: "Vinyl Siding Details",
  },
  {
    slug: "cedar-shake-siding",
    name: "Cedar Shake Siding",
    description:
      "Authentic Western Red Cedar shake — the traditional New England look. Weathers to silver-gray over 3-5 years. Hand-installed on rear-ventilated furring strips for maximum longevity. Best for Cape Cod, historic homes, and waterfront properties.",
    icon: "siding",
    cta: "Cedar Shake Details",
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
