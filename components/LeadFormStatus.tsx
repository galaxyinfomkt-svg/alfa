"use client";

import { useSearchParams } from "next/navigation";
import { company } from "@/data/company";

/**
 * Banner de confirmacao do envio SEM JavaScript.
 *
 * app/api/lead/route.ts responde 303 para /contact?sent=1 (ou ?error=1) quando
 * o formulario nativo e enviado sem JS. Ler esse parametro direto na page
 * (searchParams) tornaria /contact DINAMICA — e ela e a pagina de maior
 * intencao do site, a que mais interessa servir estatica e do cache. Como
 * client component dentro de <Suspense>, a pagina continua estatica e so este
 * pedaco hidrata.
 */
export default function LeadFormStatus() {
  const params = useSearchParams();
  const sent = params.get("sent");
  const error = params.get("error");

  if (sent) {
    return (
      <div role="status" className="max-w-2xl mx-auto mb-8 rounded-xl border border-alfa-gold/40 bg-alfa-gold/10 px-6 py-5">
        <p className="text-white font-bold text-lg mb-1">Got it — thank you.</p>
        <p className="text-gray-300 text-sm">
          Fabio will get back to you within one business day. Need it sooner? Call{" "}
          <a href={company.phoneTel} className="text-alfa-gold font-semibold hover:text-alfa-gold-light">{company.phone}</a>.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="max-w-2xl mx-auto mb-8 rounded-xl border border-red-500/40 bg-red-500/10 px-6 py-5">
        <p className="text-white font-bold text-lg mb-1">That did not go through.</p>
        <p className="text-gray-300 text-sm">
          Please call{" "}
          <a href={company.phoneTel} className="text-alfa-gold font-semibold hover:text-alfa-gold-light">{company.phone}</a>{" "}
          — Fabio answers, English or Portuguese.
        </p>
      </div>
    );
  }

  return null;
}
