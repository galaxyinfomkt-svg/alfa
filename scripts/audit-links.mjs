#!/usr/bin/env node
// scripts/audit-links.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Trava de SEO que roda no postbuild (npm run build → next build → este script).
// Se falhar, o build falha e a Vercel NAO publica.
//
// Existe porque em 01/09/2026 o rodape foi cortado de 109 para 12 cidades e 97
// paginas de cidade perderam ~98% dos links internos sem ninguem perceber.
//
// Checa, no HTML gerado em .next/server/app:
//   1. Toda URL de scripts/url-baseline.json responde 200 ou 301 → pagina viva.
//   2. Toda pagina de cidade (/massachusetts/<cidade>) indexavel recebe pelo
//      menos MIN_CITY_INBOUND links internos e fica a 1 clique da home.
//   3. Nenhuma pagina indexavel fica orfa (0 links internos apontando).
//   4. Toda URL do sitemap foi gerada, e nenhuma URL do sitemap e noindex.
//
// Uso:
//   node scripts/audit-links.mjs                    audita
//   node scripts/audit-links.mjs --update-baseline  acrescenta URLs novas ao baseline
//   AUDIT_LINKS_SKIP=1 npm run build                emergencia: pula a trava
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const APP = path.join(ROOT, ".next/server/app");
const BASELINE = path.join(ROOT, "scripts/url-baseline.json");
const SITE = "https://alfapaintingcarpentry.com";
// Com o rodape completo cada cidade recebe ~1.130 links. Abaixo de 500 significa
// que ela saiu do rodape (ou de algo equivalente) — e isso nao pode passar.
const MIN_CITY_INBOUND = 500;

if (process.env.AUDIT_LINKS_SKIP === "1") {
  console.warn("⚠️  audit-links: PULADO por AUDIT_LINKS_SKIP=1 — nada foi verificado.");
  process.exit(0);
}

// ── Paginas geradas ──────────────────────────────────────────────────────────
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const pages = new Map(); // url -> { links:Set, noindex:boolean }
for (const file of walk(APP)) {
  let url = file.slice(APP.length, -".html".length);
  if (url === "/index") url = "/";
  if (url.startsWith("/_not-found")) continue;
  const html = fs.readFileSync(file, "utf8");
  const links = new Set();
  for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"#?]*)/g)) {
    let href = m[1].replace(SITE, "");
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    href = href.replace(/\/+$/, "") || "/";
    if (href !== url) links.add(href);
  }
  const robots = html.match(/<meta name="robots" content="([^"]*)"/);
  pages.set(url, { links, noindex: !!robots && robots[1].includes("noindex") });
}

if (pages.size === 0) {
  console.error("✖ audit-links: nenhuma pagina em .next/server/app — rode depois do next build.");
  process.exit(1);
}

// ── Baseline ─────────────────────────────────────────────────────────────────
const baseline = JSON.parse(fs.readFileSync(BASELINE, "utf8"));

if (process.argv.includes("--update-baseline")) {
  const before = new Set(baseline.urls);
  const added = [...pages.keys()].filter((u) => !before.has(u));
  baseline.urls = [...new Set([...baseline.urls, ...added])].sort();
  fs.writeFileSync(BASELINE, JSON.stringify(baseline, null, 1) + "\n");
  console.log(`audit-links: baseline +${added.length} URLs (total ${baseline.urls.length}).`);
  process.exit(0);
}

// ── Redirects (routes-manifest) ──────────────────────────────────────────────
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, ".next/routes-manifest.json"), "utf8"));
const redirects = manifest.redirects
  .filter((r) => !r.internal)
  .map((r) => ({
    re: new RegExp(r.regex),
    params: [...r.source.matchAll(/:(\w+)/g)].map((m) => m[1]),
    destination: r.destination,
  }));

function redirectOf(url) {
  for (const r of redirects) {
    const m = url.match(r.re);
    if (!m) continue;
    let dest = r.destination;
    r.params.forEach((name, i) => {
      dest = dest.replace(new RegExp(`:${name}[*+?]?`), m[i + 1] ?? "");
    });
    return dest.replace(/\/+$/, "") || "/";
  }
  return null;
}

function resolve(url) {
  const seen = [];
  let cur = url;
  for (let hop = 0; hop < 5; hop++) {
    if (pages.has(cur)) return { final: cur, hops: seen };
    const next = redirectOf(cur);
    if (!next) return { final: null, hops: seen };
    seen.push(next);
    cur = next;
  }
  return { final: null, hops: seen };
}

// ── Grafo de links ───────────────────────────────────────────────────────────
const inbound = new Map([...pages.keys()].map((u) => [u, 0]));
for (const { links } of pages.values()) {
  for (const l of links) if (inbound.has(l)) inbound.set(l, inbound.get(l) + 1);
}
const depth = new Map([["/", 0]]);
const queue = ["/"];
while (queue.length) {
  const u = queue.shift();
  for (const l of pages.get(u)?.links ?? []) {
    if (pages.has(l) && !depth.has(l)) {
      depth.set(l, depth.get(u) + 1);
      queue.push(l);
    }
  }
}

// ── Checagens ────────────────────────────────────────────────────────────────
const errors = [];

const lost = baseline.urls.filter((u) => !resolve(u).final);
if (lost.length) {
  errors.push(
    `${lost.length} URL(s) que o site ja publicou agora dao 404 (sem pagina e sem 301):\n` +
      lost.slice(0, 30).map((u) => `    ${u}`).join("\n") +
      (lost.length > 30 ? `\n    … +${lost.length - 30}` : "") +
      `\n  → adicione um 301 em next.config.ts para a pagina viva mais proxima.`,
  );
}

const isCity = (u) => /^\/massachusetts\/[^/]+$/.test(u);
const weakCities = [...pages.entries()]
  .filter(([u, p]) => isCity(u) && !p.noindex)
  .filter(([u]) => inbound.get(u) < MIN_CITY_INBOUND || depth.get(u) !== 1)
  .map(([u]) => `    ${u}  (links internos: ${inbound.get(u)}, cliques da home: ${depth.get(u) ?? "inalcancavel"})`);
if (weakCities.length) {
  errors.push(
    `${weakCities.length} pagina(s) de cidade perderam link interno (minimo ${MIN_CITY_INBOUND}, a 1 clique da home):\n` +
      weakCities.slice(0, 30).join("\n") +
      (weakCities.length > 30 ? `\n    … +${weakCities.length - 30}` : "") +
      `\n  → o rodape (components/Footer.tsx) precisa listar todas as cidades.`,
  );
}

const orphans = [...pages.entries()]
  .filter(([u, p]) => u !== "/" && !p.noindex && inbound.get(u) === 0)
  .map(([u]) => `    ${u}`);
if (orphans.length) {
  errors.push(`${orphans.length} pagina(s) indexavel(is) sem nenhum link interno (orfas):\n` + orphans.slice(0, 30).join("\n"));
}

const sitemapFile = path.join(APP, "sitemap.xml.body");
if (fs.existsSync(sitemapFile)) {
  const locs = [...fs.readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1].replace(SITE, "").replace(/\/+$/, "") || "/",
  );
  const missing = locs.filter((u) => !pages.has(u));
  const noindexed = locs.filter((u) => pages.get(u)?.noindex);
  if (missing.length) errors.push(`${missing.length} URL(s) no sitemap sem pagina gerada:\n` + missing.slice(0, 30).map((u) => `    ${u}`).join("\n"));
  if (noindexed.length) errors.push(`${noindexed.length} URL(s) no sitemap marcadas noindex:\n` + noindexed.slice(0, 30).map((u) => `    ${u}`).join("\n"));
}

// ── Resultado ────────────────────────────────────────────────────────────────
const cityInbound = [...pages.keys()].filter(isCity).map((u) => inbound.get(u)).sort((a, b) => a - b);
const summary =
  `paginas ${pages.size} · baseline ${baseline.urls.length} URLs · ` +
  `links para cidade min/mediana ${cityInbound[0]}/${cityInbound[cityInbound.length >> 1]}`;

if (errors.length) {
  console.error(`\n✖ audit-links FALHOU — deploy bloqueado (${summary})\n`);
  for (const e of errors) console.error(`  • ${e}\n`);
  console.error("  Emergencia: AUDIT_LINKS_SKIP=1 pula a trava. Nao use para esconder regressao.\n");
  process.exit(1);
}
console.log(`✓ audit-links OK — ${summary}`);
