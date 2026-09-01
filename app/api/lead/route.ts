import { NextResponse } from "next/server";

/**
 * Recebe o formulario NATIVO de lead e encaminha para o GHL.
 *
 * POR QUE EXISTE
 * A auditoria (A-08) encontrou zero elementos <form> em 1.133 paginas. O unico
 * caminho de conversao alem do telefone era um iframe do GoHighLevel — se o
 * terceiro cair, for bloqueado por um ad blocker, ou o JS nao rodar, o site
 * fica sem nenhuma forma de captar lead. Um ponto unico de falha em cima da
 * unica coisa que o site precisa fazer.
 *
 * Este handler existe para que o <form> de components/LeadForm.tsx funcione
 * com method="POST" puro, SEM JavaScript nenhum. Com JS ele e interceptado e
 * enviado por fetch, mas o caminho sem JS e o que garante que sempre haja
 * conversao.
 *
 * CONFIGURACAO — falta um passo, e so um:
 *   defina GHL_INBOUND_WEBHOOK_URL nas variaveis de ambiente da Vercel com a
 *   URL do inbound webhook do GHL (Automations -> Workflows -> trigger
 *   "Inbound Webhook" -> copiar a URL).
 *
 * Enquanto a variavel nao estiver definida este endpoint responde 503 e a
 * interface mostra o telefone. Preferi deixar assim a chutar o contrato de
 * submissao: um endpoint errado aceita o POST e perde o lead em silencio, o
 * que e pior que nao ter formulario.
 */

export const runtime = "nodejs";

const MAX_FIELD = 500;
const MAX_MESSAGE = 2000;

type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  city: string;
  message: string;
};

function clean(value: FormDataEntryValue | null, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValid(lead: LeadPayload): boolean {
  if (lead.name.length < 2) return false;
  // Precisa de telefone OU email — nao adianta receber um lead sem retorno.
  const digits = lead.phone.replace(/\D/g, "");
  const hasPhone = digits.length >= 10;
  const hasEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email);
  return hasPhone || hasEmail;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  // Sem JS o browser envia application/x-www-form-urlencoded; com JS o
  // LeadForm envia o mesmo formato, para haver um caminho so.
  const wantsJson = request.headers.get("accept")?.includes("application/json");

  let form: FormData;
  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as Record<string, string>;
      form = new FormData();
      for (const [k, v] of Object.entries(body)) form.append(k, String(v));
    } else {
      form = await request.formData();
    }
  } catch {
    return respond(400, "We could not read that submission.", wantsJson);
  }

  // Honeypot: um campo escondido que humano nao preenche e bot preenche.
  // Responde 200 para o bot nao aprender que foi barrado.
  if (clean(form.get("company_website"), MAX_FIELD)) {
    return respond(200, "Thanks — we'll be in touch.", wantsJson);
  }

  const lead: LeadPayload = {
    name: clean(form.get("name"), MAX_FIELD),
    phone: clean(form.get("phone"), MAX_FIELD),
    email: clean(form.get("email"), MAX_FIELD),
    city: clean(form.get("city"), MAX_FIELD),
    message: clean(form.get("message"), MAX_MESSAGE),
  };

  if (!isValid(lead)) {
    return respond(
      422,
      "Please add your name and either a phone number or an email so we can reply.",
      wantsJson,
    );
  }

  const webhook = process.env.GHL_INBOUND_WEBHOOK_URL;
  if (!webhook) {
    // Falha explicita e barulhenta, nunca silenciosa: perder um lead calado e
    // exatamente o que este endpoint existe para evitar.
    console.error(
      "[lead] GHL_INBOUND_WEBHOOK_URL nao definido — lead NAO foi entregue.",
    );
    return respond(
      503,
      "Our form is being connected right now. Please call (508) 590-9193 — Fabio answers.",
      wantsJson,
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...lead,
        source: "alfapaintingcarpentry.com — native form",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error(`[lead] webhook respondeu ${res.status} — lead NAO entregue.`);
      return respond(
        502,
        "We could not submit that. Please call (508) 590-9193 — Fabio answers.",
        wantsJson,
      );
    }
  } catch (err) {
    console.error("[lead] webhook falhou:", err);
    return respond(
      502,
      "We could not submit that. Please call (508) 590-9193 — Fabio answers.",
      wantsJson,
    );
  }

  return respond(200, "Thanks — we'll be in touch within one business day.", wantsJson);
}

/**
 * Sem JS o browser precisa de um redirect (303) para nao reenviar o POST no
 * refresh. Com JS o LeadForm le o JSON e mostra o estado inline.
 */
function respond(status: number, message: string, wantsJson?: boolean) {
  if (wantsJson) {
    return NextResponse.json({ ok: status === 200, message }, { status });
  }
  const target = new URL(
    status === 200 ? "/contact?sent=1" : "/contact?error=1",
    "https://alfapaintingcarpentry.com",
  );
  return NextResponse.redirect(target, 303);
}
