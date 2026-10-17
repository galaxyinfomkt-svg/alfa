// lib/cityProfile.ts
// ─────────────────────────────────────────────────────────────────────────────
// Conteudo proprio de cada pagina de cidade, derivado de numeros REAIS do
// Censo (data/cityHousing.ts) — nao de frases trocando so o nome da cidade.
// Cada bloco muda de acordo com a idade das casas, o tipo de imovel e o valor
// mediano, entao duas cidades so recebem o mesmo texto se tiverem o mesmo
// perfil habitacional.
//
// Fatos regulatorios usados (todos de fonte primaria, nao inventar outros):
//  - EPA Renovation, Repair and Painting Rule (40 CFR Part 745): renovacao que
//    mexe em superficie pintada em casa construida antes de 1978 exige empresa
//    certificada e praticas lead-safe. Em MA o programa e administrado pelo
//    Department of Labor Standards (DLS).
//  - Remocao de telha/siding de cimento-amianto e regulada pela MassDEP
//    (310 CMR 7.15).
//  - Troca de siding em MA exige alvara do building department e empreiteiro
//    registrado como Home Improvement Contractor (780 CMR / M.G.L. c.142A).
// ─────────────────────────────────────────────────────────────────────────────

import { cityHousing, type CityHousing } from "@/data/cityHousing";
import type { City } from "@/data/cities";

export type Era = "prewar" | "postwar" | "late20" | "modern";

export interface CityProfile {
  h: CityHousing;
  era: Era;
  /** % das cidades atendidas com mediana de construcao MAIS NOVA que esta. */
  olderThanPct: number;
  multiFamily: boolean;
  valueBand: "high" | "mid" | "lower";
  /** Paragrafos sobre o estoque de casas da cidade. */
  housingParagraphs: string[];
  /** O que costuma aparecer atras do siding velho nessa cidade. */
  behindTheSiding: { title: string; text: string }[];
  /** Materiais sugeridos para o perfil, com o motivo. */
  materialPicks: { slug: string; label: string; why: string }[];
  faqs: { q: string; a: string }[];
}

const all = Object.values(cityHousing);
const fmtInt = (n: number) => n.toLocaleString("en-US");
const fmtUsd = (n: number) => `$${fmtInt(Math.round(n / 1000) * 1000)}`;

function eraOf(year: number): Era {
  if (year < 1950) return "prewar";
  if (year < 1980) return "postwar";
  if (year < 2000) return "late20";
  return "modern";
}

const medianValues = all.map((x) => x.medianHomeValue).sort((a, b) => a - b);
const q = (p: number) => medianValues[Math.floor(p * (medianValues.length - 1))];
const HIGH = q(0.67);
const LOW = q(0.33);

export function getCityProfile(city: City): CityProfile | null {
  const h = cityHousing[city.slug];
  if (!h || !h.medianYearBuilt) return null;

  const era = eraOf(h.medianYearBuilt);
  const newer = all.filter((x) => x.medianYearBuilt > h.medianYearBuilt).length;
  const olderThanPct = Math.round((100 * newer) / all.length);
  const multiFamily = h.pctTwoToFourUnits >= 15;
  const valueBand = h.medianHomeValue >= HIGH ? "high" : h.medianHomeValue <= LOW ? "lower" : "mid";
  const n = city.name;

  // ── Estoque de casas ──────────────────────────────────────────────────────
  const housingParagraphs: string[] = [];
  const ageSentence =
    era === "prewar"
      ? `${n} has one of the older housing stocks we work in: the median home was built in ${h.medianYearBuilt}, and ${h.pctBuiltBefore1940}% of its ${fmtInt(h.housingUnits)} homes went up before 1940.`
      : era === "postwar"
        ? `The typical ${n} home dates from the post-war building boom — the median year built is ${h.medianYearBuilt}, and ${h.pctBuiltBefore1980}% of the town's ${fmtInt(h.housingUnits)} homes were built before 1980.`
        : era === "late20"
          ? `Much of ${n} was built in the late 20th century: the median home dates from ${h.medianYearBuilt}, and only ${h.pctBuiltBefore1940}% of its ${fmtInt(h.housingUnits)} homes predate 1940.`
          : `${n} is one of the newer towns we serve — the median home was built in ${h.medianYearBuilt}, and ${h.pctBuilt2000OrLater}% of its ${fmtInt(h.housingUnits)} homes are from 2000 or later.`;
  housingParagraphs.push(
    `${ageSentence} That makes its homes older than those in ${olderThanPct}% of the towns on our service list.`,
  );

  housingParagraphs.push(
    multiFamily
      ? `${n} also has a large share of two- to four-family buildings (${h.pctTwoToFourUnits}% of homes, against ${h.pctSingleFamilyDetached}% single-family detached). Re-siding a two-family or a triple-decker means more staging, taller walls and more trim per elevation, and we price that line by line instead of by the square.`
      : h.pctSingleFamilyDetached >= 75
        ? `It is a town of single-family houses: ${h.pctSingleFamilyDetached}% of homes are detached single-family and ${h.pctOwnerOccupied}% are owner-occupied, which is the kind of project we do most — one house, one owner, a complete exterior.`
        : `About ${h.pctSingleFamilyDetached}% of homes are detached single-family and ${h.pctOwnerOccupied}% are owner-occupied, with the rest split between condos, multi-family and apartments.`,
  );

  // ── Atras do siding velho ─────────────────────────────────────────────────
  const behindTheSiding: CityProfile["behindTheSiding"] = [];
  if (h.pctBuiltBefore1980 >= 40) {
    behindTheSiding.push({
      title: "Lead paint on older trim and clapboard",
      text: `With ${h.pctBuiltBefore1980}% of ${n} homes built before 1980, many still have lead paint on the original trim and wood siding. Federal EPA rules require lead-safe work practices whenever painted surfaces are disturbed on a home built before 1978, so tear-off on these houses is contained, misted and cleaned up to that standard.`,
    });
  }
  if (era === "prewar" || h.pctBuiltBefore1940 >= 20) {
    behindTheSiding.push({
      title: "Board sheathing and hidden rot",
      text: `Pre-war houses in ${n} were usually sheathed in solid boards rather than plywood, and decades of leaks show up as soft boards around windows, sills and corners. We open the walls, replace what is rotten and only then wrap and side.`,
    });
  }
  if (h.medianYearBuilt < 1985) {
    behindTheSiding.push({
      title: "Asbestos-cement shingles",
      text: `With the median ${n} home dating from ${h.medianYearBuilt}, we regularly find asbestos-cement shingles, sometimes buried under a later layer of vinyl or aluminum. Their removal falls under MassDEP asbestos rules, so we identify them at the estimate and plan the removal before the job is priced.`,
    });
  }
  if (era === "late20" || era === "modern") {
    behindTheSiding.push({
      title: "First-generation vinyl and OSB sheathing",
      text: `Homes from the 1980s onward usually have their original vinyl over OSB or plywood. The siding is often faded and brittle rather than rotten, but missing or torn house wrap is common, so every re-side gets a new weather-resistant barrier and window flashing.`,
    });
  }

  // ── Materiais sugeridos ───────────────────────────────────────────────────
  const picks: CityProfile["materialPicks"] = [];
  if (era === "prewar" || city.category === "historic") {
    picks.push({ slug: "clapboard-siding", label: "Clapboard", why: `Keeps the narrow lap lines of ${n}'s older houses; available in fiber cement so it never needs scraping.` });
    picks.push({ slug: "cedar-shake-siding", label: "Cedar shake", why: "The traditional New England finish for Capes and shingle-style homes." });
  }
  if (valueBand === "high") {
    picks.push({ slug: "hardie-plank-siding", label: "Hardie Plank", why: `With a median home value of ${fmtUsd(h.medianHomeValue)}, most owners here choose fiber cement for its 30-year warranty and resale appeal.` });
  } else {
    picks.push({ slug: "vinyl-siding", label: "Premium vinyl", why: `The most cost-effective full re-side for a ${n} home, with no painting ever.` });
  }
  if (multiFamily) {
    picks.push({ slug: "insulated-siding", label: "Insulated siding", why: "Adds continuous insulation to the long walls of two- and three-family buildings." });
  }
  if (valueBand !== "high" && !picks.some((p) => p.slug === "hardie-plank-siding")) {
    picks.push({ slug: "hardie-plank-siding", label: "Hardie Plank", why: "The upgrade pick when the house is a long-term home: non-combustible and rot-proof." });
  }
  if (era === "modern" || city.category === "rural") {
    picks.push({ slug: "board-and-batten-siding", label: "Board & batten", why: "A popular farmhouse look on newer and rural homes." });
  }
  // Completa ate 3 sugestoes com opcoes que servem para qualquer perfil.
  const fallback: CityProfile["materialPicks"] = [
    { slug: "clapboard-siding", label: "Clapboard", why: "The classic New England lap look, in fiber cement, engineered wood or vinyl." },
    { slug: "insulated-siding", label: "Insulated siding", why: "Fused foam backing adds continuous insulation to the walls of an older home." },
    { slug: "cedar-shake-siding", label: "Cedar shake", why: "Natural Western Red Cedar that weathers to the traditional silver-gray." },
  ];
  for (const f of fallback) if (picks.length < 3 && !picks.some((p) => p.slug === f.slug)) picks.push(f);
  const materialPicks = picks.slice(0, 3);

  // ── FAQ propria ───────────────────────────────────────────────────────────
  // Respostas montadas com os numeros da propria cidade: duas cidades so
  // repetem uma resposta se tiverem o mesmo perfil e os mesmos numeros.
  const decade = `${Math.floor(h.medianYearBuilt / 10) * 10}s`;
  const pickNames = materialPicks.map((p) => p.label.toLowerCase());
  const faqs: CityProfile["faqs"] = [
    {
      q: `What siding works best on ${n} homes?`,
      a: `For a town where the typical house dates from the ${decade} and ${h.pctSingleFamilyDetached}% of homes are single-family, we most often recommend ${pickNames.slice(0, -1).join(", ")} or ${pickNames[pickNames.length - 1]}. The right pick depends on your house; Fabio brings samples to the estimate.`,
    },
    {
      q: `Who issues the siding permit in ${n}?`,
      a: `The ${n} building department, in ${city.county} County. Massachusetts requires a permit for a re-side and a registered Home Improvement Contractor; we hold MA HIC registration and file the permit ourselves.`,
    },
  ];
  if (h.pctBuiltBefore1980 >= 40) {
    faqs.push({
      q: `My ${n} house was built before 1978. Does that change the job?`,
      a: `It changes how the old siding comes off. That applies to roughly ${h.pctBuiltBefore1980}% of ${n} homes, and on those we work lead-safe: containment sheeting, no dry scraping, careful cleanup, listed as its own line on the estimate.`,
    });
  }
  if (multiFamily) {
    faqs.push({
      q: "Do you re-side two-family homes and triple-deckers?",
      a: `Yes. They are common in ${n}. The estimate covers the extra staging, the porch and stair details and the trim on each floor, so the price reflects the real building, not just its footprint.`,
    });
  }

  return { h, era, olderThanPct, multiFamily, valueBand, housingParagraphs, behindTheSiding, materialPicks, faqs };
}
