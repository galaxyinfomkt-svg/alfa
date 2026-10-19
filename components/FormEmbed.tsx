"use client";

import { useEffect } from "react";
import { company } from "@/data/company";

/**
 * Formulario de orcamento do GHL (FORM SITE ALFA · PiFH0ELuOmHS9iZhGQ5F),
 * exibido exatamente como vem do GHL: sem moldura, sem fundo e sem esqueleto
 * de carregamento por cima (pedido da cliente, out/2026). O visual dos campos
 * e configurado no editor de formularios do GHL.
 *
 * O iframe usa lazy-load nativo do navegador: so baixa quando chega perto da
 * tela. Nao existe mais o atraso artificial por clique/60s, que deixava a
 * area do formulario vazia na primeira tela.
 *
 * TODO(Luiz): qualificacao de lead (tipo de projeto, tamanho da casa) se
 * configura nos campos do formulario dentro do GHL, nao aqui.
 */
export default function FormEmbed({ height = 460 }: { height?: number }) {
  // form_embed.js ajusta a altura do iframe ao conteudo real do formulario.
  useEffect(() => {
    const scriptId = "ghl-form-embed";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/PiFH0ELuOmHS9iZhGQ5F"
        style={{ width: "100%", height, border: "none", display: "block" }}
        loading="lazy"
        scrolling="no"
        id="inline-PiFH0ELuOmHS9iZhGQ5F"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="FORM SITE ALFA"
        data-height={String(height)}
        data-layout-iframe-id="inline-PiFH0ELuOmHS9iZhGQ5F"
        data-form-id="PiFH0ELuOmHS9iZhGQ5F"
        title="Free siding estimate request form"
      />
      {/* Saida de conversao se o iframe do GHL nao carregar. */}
      <noscript>
        <p className="mt-3 text-sm text-ink-soft">
          This form needs JavaScript. Call us instead:{" "}
          <a href={company.phoneTel} className="font-semibold text-gold-ink underline">
            {company.phone}
          </a>
        </p>
      </noscript>
    </div>
  );
}
