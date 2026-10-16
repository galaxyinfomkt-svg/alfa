import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { breadcrumbSchema, company } from "@/data/company";
import { getAllServices } from "@/data/services";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  // Antes esta pagina e a home tinham o MESMO title e description, o que as
  // punha para competir entre si no mesmo resultado. Diferenciado.
  title: "Siding Services We Install in Massachusetts",
  description:
    "Hardie Plank, vinyl, cedar shake, clapboard, board & batten and more — every siding we install in MA. Free estimate: (508) 590-9193.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/services" },
};

// O servico geral ("siding") abre a pagina como destaque; os 8 materiais
// formam a grade: 8 cards em lg:4 colunas = 2 linhas cheias, sem card sozinho.
const all = getAllServices();
const main = all.find((s) => s.slug === "siding")!;
const materials = all.filter((s) => s.slug !== "siding");

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Services", url: "https://alfapaintingcarpentry.com/services" },
      ])) }} />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">What we install</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4 leading-tight [text-wrap:balance]">
            Siding Services in Massachusetts
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
            Full-home siding installation and replacement — nine materials and systems, one licensed crew based in Bellingham, MA.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-7 py-4 rounded-lg transition-colors text-lg">
              Get a Free Estimate
            </Link>
            <a href={company.phoneTel} className="inline-flex items-center justify-center whitespace-nowrap bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-lg transition-colors border border-white/30 text-lg">
              Call {company.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Destaque: re-side completo */}
      <section className="py-16 md:py-20 bg-alfa-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <Link href={`/services/${main.slug}`} className="group block bg-alfa-card border border-white/5 hover:border-alfa-gold/40 rounded-2xl overflow-hidden transition-colors">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[380px]">
                <Image src={main.heroImage} alt={`${main.name} by Alfa Construction`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <p className="text-alfa-gold font-semibold text-sm uppercase tracking-wider mb-2">Our core service</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-alfa-gold transition-colors">{main.name}</h2>
                <p className="text-gray-300 leading-relaxed mb-6">{main.cardSummary}</p>
                <span className="text-alfa-gold font-semibold">How a full re-side works →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Materiais */}
      <section className="pb-16 md:pb-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">Siding materials we install</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-center mb-10">Each page covers the product standard, warranty, what it costs to maintain and how we install it.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group block">
                <article className="h-full flex flex-col bg-alfa-card rounded-2xl border border-white/5 overflow-hidden hover:border-alfa-gold/40 transition-colors">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image src={s.heroImage} alt={`${s.name} — Alfa Construction project`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-alfa-gold transition-colors">{s.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{s.cardSummary}</p>
                    <span className="text-alfa-gold font-semibold text-sm">Learn more →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
