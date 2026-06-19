// data/siteConfig.ts
// ─────────────────────────────────────────────────────────────────────────────
// FONTE ÚNICA DE VERDADE — NAP, posicionamento siding-only, números.
// Todo o schema e o copy dinâmico leem daqui.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Alfa Construction Inc",
  url: "https://alfapaintingcarpentry.com",

  // ⚠️ TELEFONE CANÔNICO — unificado neste número em 100% do site.
  // Site/Maps/About já usam este. social/build.mjs e social/CAPTIONS.md
  // ainda têm o antigo (508) 596-3750 mas são docs internos de IG (não-site).
  phone: "+15085909193",
  phoneDisplay: "(508) 590-9193",
  email: "info@alfapaintingcarpentry.com",

  logo: "https://alfapaintingcarpentry.com/images/logo.png",
  image:
    "https://alfapaintingcarpentry.com/images/dark-shake-siding-renovation-after-ma.jpg",

  // NAP (Name-Address-Phone) — tratado como SERVICE-AREA business: exibimos só
  // "Bellingham, MA" (sem rua) no site e no schema vivo. O endereço de rua
  // "34 Pearl Street" só existe no schema legado/morto de data/company.ts.
  // ⚠️ TODO(Luiz): confirmar o NAP OFICIAL do Google Business Profile e garantir
  // que name + address + phone batam EXATAMENTE entre site, schema e GBP. Se o
  // GBP expõe endereço de rua, decidir entre (a) exibir a rua aqui também, ou
  // (b) ocultar a rua no GBP (service-area). Não misturar os dois.
  address: {
    addressLocality: "Bellingham",
    addressRegion: "MA",
    postalCode: "02019",
    addressCountry: "US",
  },
  // ⚠️ Conferir contra o pino do GBP (o embed do Maps fica em ~42.130, -71.443).
  geo: { latitude: 42.0687, longitude: -71.4748 },

  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],

  // Schema.org price tier ($ = budget, $$ = mid, $$$ = premium, $$$$ = luxury).
  // This is a tier indicator, NOT a dollar amount. Standard for GBP / LocalBusiness.
  priceRange: "$$$",
  foundingDate: "2006",
  yearsExperience: 20,
  founder: "Fabio",
  licenseLabel: "MA HIC License",
  licenseNumber: "192348",
  languages: ["English", "Portuguese"],
  citiesServed: 109,

  // ⚠️ CONFIRMAR no GBP ao vivo antes de publicar. A home afirma 5.0 × 22 e há
  // link real do Google (g.page). Se não bater, corrija — ou deixe reviewCount
  // VAZIO ("") para suprimir a nota e nunca publicar review não verificada.
  rating: "5.0",
  reviewCount: "22",

  // ── POSICIONAMENTO: SIDING-ONLY ──────────────────────────────────────
  // Único serviço comercializado. Carpintaria (trim/fascia/soffit/rot/sheathing)
  // só como PARTE do re-side. Janelas/portas só como add-on dentro do projeto.
  services: [
    {
      slug: "siding",
      name: "Siding Installation & Replacement",
      description:
        "Complete full-home siding installation and replacement across Massachusetts — Hardie Plank fiber cement, vinyl, cedar, and shake. Full-exterior re-sides, not patch repairs.",
    },
  ],

  sidingMaterials: [
    "James Hardie fiber cement (HardiePlank)",
    "Vinyl siding",
    "Cedar siding",
    "Shake siding",
    "Board & batten",
  ],

  sameAs: [
    "https://www.instagram.com/alfaconstructioninc/",
    "https://www.facebook.com/alfacarpentrypainting", // ⚠️ renomear handle/descrição p/ siding
    "https://g.page/r/CZ1rhJ3jJReMEAE",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
