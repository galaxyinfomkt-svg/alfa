// data/faqData.ts
// ─────────────────────────────────────────────────────────────────────────────
// FAQ da home (EN — público dos EUA), posicionamento SIDING-ONLY.
// ⚠️ Renderizar este MESMO texto na página (o FAQPage schema precisa bater com
// a FAQ visível). A pergunta nº 2 é o FILTRO — mantenha-a.
// ─────────────────────────────────────────────────────────────────────────────

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "What types of siding do you install?",
    a: "We install and replace all major siding systems: James Hardie fiber cement (HardiePlank), vinyl, cedar, shake, and board & batten. Every project is a complete installation or full-home replacement built to manufacturer spec for New England weather.",
  },
  {
    q: "Do you take on small siding jobs, or only full installations?",
    a: "We focus exclusively on complete full-home siding installation and replacement — we don't take on patch jobs, single-panel work, or touch-ups. Full exterior re-sides are all we do, and that focus is how we deliver the quality and warranty our clients expect.",
  },
  {
    q: "How do you quote a full siding replacement?",
    a: "Fabio walks every elevation of your home in person before quoting. The written estimate is fully itemized — materials, labor, permits, disposal, and cleanup — with no bundled mystery costs. The number depends on the material chosen, home size, and the condition of the sheathing and trim work uncovered during teardown. We price every probable surprise in writing before work begins, so the number you receive is the number you pay.",
  },
  {
    q: "What areas do you serve?",
    a: "We are based in Bellingham, MA and work across MetroWest, Worcester County, Norfolk County and Middlesex County. Most of our jobs are within about 30 miles of Bellingham — the full list of towns, sorted by distance, is on our service area page.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Alfa Construction Inc is a licensed and insured Massachusetts contractor (MA HIC #192348) with 20+ years of experience, owner-operated by Fabio. Our team is bilingual (English & Portuguese).",
  },
  {
    q: "How long does a full siding installation take?",
    a: "A typical full-home exterior re-side runs 5–7 days, depending on home size, material, and weather. We give you a firm timeline in writing with your estimate, and we walk every detail with you at final sign-off — backed by a 1-year workmanship warranty.",
  },
  {
    q: "Do you replace windows or doors during a re-side?",
    a: "Yes — as part of a full siding project. Replacing windows and doors while the exterior is open is the most cost-effective time to do it, so we offer it as an add-on to a complete re-side. We do not take on standalone single-window or single-door jobs.",
  },
];
