import Link from "next/link";
import { company } from "@/data/company";

/**
 * Faixa curta de conversao para o meio de uma pagina longa: uma linha de texto
 * e as duas acoes que importam. A secao completa com formulario (CTASection)
 * fica no fim da pagina.
 */
export default function CtaBand({
  headline = "Ready for your free estimate?",
  sub = "Licensed and insured. No obligation, no pressure.",
  tone = "dark",
}: {
  headline?: string;
  sub?: string;
  tone?: "gold" | "dark";
}) {
  const isGold = tone === "gold";

  return (
    <section className={isGold ? "py-10 bg-alfa-gold" : "py-10 bg-charcoal"}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={`text-xl sm:text-2xl font-bold ${isGold ? "text-ink" : "text-white"}`}>{headline}</p>
          <p className={`mt-1 text-sm ${isGold ? "text-ink/75" : "text-white/70"}`}>{sub}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:shrink-0">
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold transition-colors ${
              isGold ? "bg-ink text-white hover:bg-charcoal" : "bg-alfa-gold text-ink hover:bg-alfa-gold-light"
            }`}
          >
            Get My Free Estimate
          </Link>
          <a
            href={company.phoneTel}
            className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold border transition-colors ${
              isGold ? "border-ink/30 text-ink hover:border-ink" : "border-white/30 text-white hover:border-white"
            }`}
          >
            Call {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
