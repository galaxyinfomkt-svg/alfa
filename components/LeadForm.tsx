"use client";

import { useState } from "react";
import { company } from "@/data/company";

/**
 * Formulario NATIVO de lead — o caminho de conversao que nao depende de
 * terceiro nenhum.
 *
 * A auditoria (A-08) nao achou um unico <form> em 1.133 paginas: a captacao
 * inteira do site dependia de um iframe do GoHighLevel. Se o GHL cair, um ad
 * blocker barrar o dominio, ou o JS nao rodar, nao sobra caminho nenhum alem
 * do telefone.
 *
 * Este componente e HTML de verdade: `method="POST"` com `action`, entao ele
 * envia e funciona com JavaScript DESLIGADO. Quando o JS esta ligado, o submit
 * e interceptado e enviado por fetch so para mostrar o estado inline sem
 * recarregar a pagina — o comportamento e o mesmo nos dois casos.
 *
 * Ele nao substitui o formulario do GHL: e o fallback que aparece dentro do
 * <noscript> e quando o iframe nao carrega. Ver components/FormEmbed.tsx.
 */
export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { accept: "application/json" },
        body: new FormData(form),
      });
      const data = (await res.json()) as { ok: boolean; message: string };
      setMessage(data.message);
      setState(data.ok ? "ok" : "error");
      if (data.ok) form.reset();
    } catch {
      setMessage(
        `We could not submit that. Please call ${company.phone} — Fabio answers.`,
      );
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div
        className="rounded-xl border border-alfa-gold/30 bg-white/5 p-6 text-center"
        role="status"
      >
        <p className="text-white font-bold text-lg mb-1">Got it.</p>
        <p className="text-gray-300 text-sm">{message}</p>
      </div>
    );
  }

  const field =
    "w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-gray-500 focus:border-alfa-gold focus:outline-none focus:ring-2 focus:ring-alfa-gold/40";

  return (
    <form
      method="POST"
      action="/api/lead"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Honeypot — escondido de gente, visivel para bot. Nao usa display:none
          para nao ser obvio, e fica fora da ordem de tabulacao. */}
      <div aria-hidden className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor="company_website">Do not fill this in</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="lead-name" className="block text-sm font-medium text-gray-300 mb-1.5">
          Name <span className="text-alfa-gold">*</span>
        </label>
        <input id="lead-name" name="name" required maxLength={100} autoComplete="name" className={field} placeholder="Your name" />
      </div>

      <div className={compact ? "" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-300 mb-1.5">
            Phone <span className="text-alfa-gold">*</span>
          </label>
          <input id="lead-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" className={field} placeholder="(508) 555-0100" />
        </div>
        {!compact && (
          <div>
            <label htmlFor="lead-email" className="block text-sm font-medium text-gray-300 mb-1.5">
              Email
            </label>
            <input id="lead-email" name="email" type="email" maxLength={120} autoComplete="email" className={field} placeholder="you@example.com" />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="lead-city" className="block text-sm font-medium text-gray-300 mb-1.5">
          Your town in MA
        </label>
        <input id="lead-city" name="city" maxLength={80} autoComplete="address-level2" className={field} placeholder="Framingham" />
      </div>

      <div>
        <label htmlFor="lead-message" className="block text-sm font-medium text-gray-300 mb-1.5">
          What needs siding?
        </label>
        <textarea id="lead-message" name="message" rows={compact ? 2 : 3} maxLength={2000} className={field} placeholder="Whole house, roughly 2,000 sq ft, currently vinyl." />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/25 rounded-lg px-4 py-3" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full bg-alfa-gold hover:bg-alfa-gold-light disabled:opacity-60 text-black font-bold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
      >
        {state === "sending" ? "Sending…" : "Request My Free Estimate"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Or call{" "}
        <a href={company.phoneTel} className="text-alfa-gold hover:text-alfa-gold-light font-semibold">
          {company.phone}
        </a>{" "}
        — Fabio answers. English or Portuguese.
      </p>
    </form>
  );
}
