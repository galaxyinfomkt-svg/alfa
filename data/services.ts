// PIVOT: city × service matrix (siding-only). The Service shape lives in
// ./serviceType; each siding sub-service is authored in ./services/<slug>.ts.
import type { Service } from "./serviceType";
import hardiePlankSiding from "./services/hardie-plank-siding";
import vinylSiding from "./services/vinyl-siding";
import cedarShakeSiding from "./services/cedar-shake-siding";
import clapboardSiding from "./services/clapboard-siding";
import boardAndBattenSiding from "./services/board-and-batten-siding";
import insulatedSiding from "./services/insulated-siding";
import engineeredWoodSiding from "./services/engineered-wood-siding";
import commercialSiding from "./services/commercial-siding";

export type { Service };

const services: Service[] = [  // ─────────────────────────────────────────────────────────────
  // 1. SIDING INSTALLATION & REPLACEMENT (the only service Alfa sells)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "siding",
    name: "Siding Installation & Replacement",
    shortName: "Siding",
    description:
      "Complete full-home siding installation and replacement across Massachusetts. From Hardie Plank fiber cement to vinyl and cedar, Alfa Construction re-sides your home's entire exterior with durable, beautiful siding. We take full-exterior re-sides, not patch jobs.",
    longDescription:
      "Your home's siding is its first line of defense against the elements — and its biggest visual statement from the street. At Alfa Construction, we install and replace siding using the highest-quality materials on the market, including James Hardie fiber cement, premium vinyl, engineered wood, and natural cedar. Our process begins with a thorough inspection of your existing siding and the substrate beneath it. We identify water damage, insulation deficiencies, and structural issues before a single panel goes up. Then we install a proper moisture barrier, ensure adequate ventilation, and mount your new siding with precision fastening for a watertight, wind-resistant finish. Whether your siding has been battered by decades of Massachusetts nor'easters or you simply want a modern aesthetic upgrade, we deliver results that protect your home, slash energy costs, and dramatically boost curb appeal. Every project comes with a detailed warranty and our commitment to your complete satisfaction.",
    icon: "Home",
    heroImage: "/images/dark-shake-siding-renovation-after-ma.jpg",
    keywords: [
      "siding installation Massachusetts",
      "Hardie Plank installer MA",
      "siding replacement Massachusetts",
      "vinyl siding installation Massachusetts",
      "fiber cement siding MA",
      "siding replacement near me",
      "cedar siding Massachusetts",
      "siding contractor MA",
      "home siding near me",
      "exterior siding Massachusetts",
    ],
    painPoints: [
      "Old, cracked, or warped siding that makes your home look neglected and exposes it to weather damage",
      "Rising energy bills caused by poor insulation and air infiltration through gaps in damaged siding",
      "Water getting behind your siding, leading to mold, rot, and structural damage you cannot see from outside",
      "An outdated exterior appearance that drags down your home's curb appeal and market value",
      "Siding that requires constant maintenance — scraping, painting, caulking — that never seems to end",
    ],
    solutions: [
      "James Hardie fiber cement siding installation — the industry gold standard for durability, fire resistance, and authentic wood-grain appearance",
      "Premium vinyl siding in a wide range of colors and profiles that never needs painting and resists dents, fading, and moisture",
      "Full-home siding replacement that strips the old cladding to the sheathing — the complete re-side, not a patch job",
      "Complete siding replacement with proper housewrap, flashing, and ventilation for a watertight building envelope",
      "Insulated siding options that add R-value to your walls, reducing energy loss and lowering heating and cooling costs year-round",
    ],
    process: [
      {
        step: 1,
        title: "Free Exterior Inspection & Estimate",
        description:
          "We inspect your current siding, check for hidden moisture damage, evaluate your home's insulation and ventilation, and discuss your goals and budget. You receive a detailed written estimate that covers materials, labor, timeline, and warranty information.",
      },
      {
        step: 2,
        title: "Material Selection",
        description:
          "We help you choose the right siding material for your home, climate, and budget. We bring samples so you can see colors and textures against your roof, trim, and landscape. We explain the pros and cons of each option — Hardie Plank, vinyl, cedar, engineered wood — so you can make an informed decision.",
      },
      {
        step: 3,
        title: "Removal & Substrate Preparation",
        description:
          "Our crew carefully removes old siding, disposes of debris, and inspects the sheathing beneath. Any rot, mold, or structural issues are replaced. We install or replace housewrap and flashing to create a continuous moisture barrier before any new siding goes on.",
      },
      {
        step: 4,
        title: "Professional Installation",
        description:
          "New siding is installed following manufacturer specifications and building code requirements. Every panel is leveled, properly gapped for expansion, and fastened securely. We pay special attention to corners, windows, doors, and transitions where water infiltration is most likely.",
      },
      {
        step: 5,
        title: "Final Inspection & Warranty",
        description:
          "We inspect every inch of the completed installation, seal all penetrations, and ensure proper ventilation. We walk you through the finished work, explain maintenance recommendations, and provide warranty documentation covering both materials and our labor.",
      },
    ],
    benefits: [
      "Dramatically improved curb appeal that makes your home the standout on the street",
      "Superior weather protection against rain, snow, ice, wind, and UV radiation",
      "Lower energy bills with properly installed siding and insulation that eliminates drafts and thermal bridging",
      "Increased property value — new siding consistently ranks as one of the highest-ROI home improvements",
      "Reduced maintenance with modern materials that resist rot, insects, fading, and warping for decades",
    ],
    cta: "Get a Free Siding Quote",
    ctaDescription:
      "Protect your home and transform its appearance with professional siding from Alfa Construction. We offer free exterior inspections and detailed quotes for homeowners across Massachusetts. Get started today.",
    faqs: [
      {
        question: "What is the best siding material for Massachusetts homes?",
        answer:
          "James Hardie fiber cement siding is widely considered the best option for Massachusetts because it stands up to freeze-thaw cycles, resists moisture and rot, is non-combustible, and holds paint far longer than wood. It is backed by a 30-year warranty. Vinyl is also an excellent choice for homeowners seeking low maintenance and lower upfront cost. We help you choose based on your home, your budget, and your long-term goals.",
      },
      {
        question: "How long does a siding replacement take?",
        answer:
          "A typical full siding replacement for an average Massachusetts home takes 1 to 3 weeks depending on the size of the house, the siding material chosen, the amount of substrate replacement needed, and weather conditions. We provide a clear timeline at the start of every project and keep you updated throughout.",
      },
      {
        question: "Can you install siding over existing siding?",
        answer:
          "In some cases, yes — new vinyl siding can be installed over a single layer of existing siding if the substrate is sound. However, we generally recommend removing old siding first so we can inspect and replace the sheathing, update the moisture barrier, and ensure a proper installation. Layering siding hides potential problems and can void warranties.",
      },
      {
        question: "Do you offer insulated siding?",
        answer:
          "Yes. We offer insulated vinyl siding and insulated fiber cement systems that add significant R-value to your walls. These products reduce thermal bridging, eliminate gaps between the siding and sheathing, and create a tighter building envelope. Homeowners typically see a noticeable reduction in heating and cooling costs, which is especially valuable during Massachusetts winters.",
      },
      {
        question: "Do you take on small siding jobs, or only full replacements?",
        answer:
          "Full replacements only. Every project is a complete re-side: we strip the old cladding down to the sheathing, correct any moisture or rot, install a proper weather-resistant barrier, and re-side the entire exterior. We do not take patch jobs, single-panel work, or partial sections — full exterior re-sides are our only trade.",
      },
    ],
    metaTitle:
      "Siding Installation & Replacement in Massachusetts",
    metaDescription:
      "Complete full-home siding installation & replacement in Massachusetts. Hardie Plank, vinyl, and cedar siding experts. We do full re-sides, not patch jobs. Free estimates from Alfa Construction.",
  },

  // ─── Siding sub-services (city × service matrix) ───
  hardiePlankSiding,
  vinylSiding,
  cedarShakeSiding,
  clapboardSiding,
  boardAndBattenSiding,
  insulatedSiding,
  engineeredWoodSiding,
  commercialSiding,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Uma linha por material, para cards (paginas de cidade, /services). */
const cardSummaries: Record<string, string> = {
  siding: "Complete tear-off and re-side in the material that fits your home and budget.",
  "hardie-plank-siding": "James Hardie fiber cement: non-combustible, rot-proof, 30-year limited warranty.",
  "vinyl-siding": "Premium vinyl in 40+ colors and profiles. The most budget-friendly full re-side.",
  "cedar-shake-siding": "Natural Western Red Cedar shakes and shingles for the classic New England look.",
  "clapboard-siding": "Horizontal lap siding in fiber cement, engineered wood, cedar or vinyl.",
  "board-and-batten-siding": "Vertical boards and battens for a farmhouse or modern exterior.",
  "insulated-siding": "Vinyl with a fused foam backer that adds continuous insulation to the walls.",
  "engineered-wood-siding": "LP SmartSide engineered wood: real wood look, lighter than fiber cement.",
  "commercial-siding": "Re-cladding for multi-family, mixed-use and commercial buildings.",
};

export function getAllServices(): (Service & { cardSummary: string })[] {
  return services.map((s) => ({ ...s, cardSummary: cardSummaries[s.slug] ?? s.description }));
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

export default services;
