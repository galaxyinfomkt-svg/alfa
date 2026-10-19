import { company } from "@/data/company";

/**
 * Botao flutuante de ligar: so o icone de telefone, redondo, no canto inferior
 * ESQUERDO. O canto direito e do balao do chat do GoHighLevel, que se
 * posiciona sozinho. Substituiu a barra "Call Now / Free Estimate" (pedido da
 * cliente, out/2026): nada de barra fixa ocupando o rodape da tela.
 */
export default function PhoneButton() {
  return (
    <a
      href={company.phoneTel}
      aria-label={`Call Alfa Construction at ${company.phone}`}
      title={`Call ${company.phone}`}
      className="fixed left-4 md:left-6 z-40 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-alfa-gold text-ink shadow-[0_10px_30px_rgba(27,26,23,0.28)] transition-transform duration-300 ease-premium hover:scale-105 active:scale-95"
      style={{ bottom: "calc(20px + env(safe-area-inset-bottom, 0px))" }}
    >
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </a>
  );
}
