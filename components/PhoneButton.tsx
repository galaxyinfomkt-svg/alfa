import Link from "next/link";
import { company } from "@/data/company";

/**
 * Barra fixa de acao no celular (some a partir de lg, onde o header ja tem o
 * telefone).
 *
 * Substitui o botao redondo flutuante. A auditoria de out/2026 mediu que ele
 * cobria o CTA principal ja na primeira tela em 654 paginas e cobria algum link
 * ou botao em ~9 de cada 20 telas de rolagem. Uma barra com fundo solido e
 * espaco reservado no fim da pagina (ver o pb do <main> no layout) nunca fica
 * em cima de conteudo parado, e mostra as duas acoes que importam.
 *
 * O canto direito fica livre (pr-20) para o balao do chat do GoHighLevel, que
 * se posiciona sozinho no canto inferior direito.
 */
export default function PhoneButton() {
  return (
    <div
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-alfa-gold/30 bg-black/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex gap-2 py-2 pl-3 pr-20">
        <a
          href={company.phoneTel}
          className="flex-1 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-alfa-gold px-3 py-3 text-sm font-bold text-black"
          aria-label={`Call Alfa Construction at ${company.phone}`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-white/25 px-3 py-3 text-sm font-bold text-white"
        >
          Free Estimate
        </Link>
      </div>
    </div>
  );
}
