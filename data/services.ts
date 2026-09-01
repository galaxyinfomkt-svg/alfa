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
    heroImage: "/images/commercial-siding-installation-massachusetts.png",
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
    cityIntros: {
      historic: [
        "In {cityName}, where colonial clapboards and Victorian-era wood siding define the streetscape, choosing the right siding material and installer matters deeply. Alfa Construction serves {cityName} homeowners with siding solutions that preserve your home's historic character while delivering the weather resistance and longevity that modern materials provide. We match profiles, textures, and proportions to blend seamlessly with your home's original design.",
        "Many of the most beautiful homes in {cityName} were built long before modern siding existed. Original wood clapboards and shingles have character, but after a century of New England weather, they often need more than another coat of paint. Alfa Construction helps {cityName} homeowners make the transition to fiber cement or engineered wood siding that captures the historic look while eliminating the rot and maintenance problems that plague original materials.",
        "Preserving the architectural integrity of a {cityName} historic home while upgrading its building envelope is a delicate balance. Alfa Construction brings that balance to every siding project in {cityName}. We understand local historic guidelines, we source materials that replicate period profiles, and we install everything with the precision that older homes demand.",
      ],
      suburban: [
        "Your {cityName} home's siding is its most visible feature and its primary defense against the weather. Alfa Construction provides professional siding installation and replacement for {cityName} homeowners who want their property to look great and stay protected. Whether you are upgrading from tired vinyl to modern Hardie Plank or replacing storm-damaged siding, we deliver clean, efficient results you will love.",
        "In {cityName} neighborhoods, exterior appearance matters. A home with faded, cracked, or mismatched siding drags down curb appeal and property values for the entire street. Alfa Construction helps {cityName} homeowners take pride in their exterior with beautiful, durable siding installed by experienced professionals who take the time to get every detail right.",
        "If your {cityName} home was built in the last 20 to 30 years, there is a good chance its original siding is reaching the end of its lifespan. Vinyl becomes brittle, colors fade unevenly, and exposure to decades of Massachusetts weather takes its toll. Alfa Construction offers modern siding replacement that improves your home's appearance, energy efficiency, and weather resistance all at once.",
      ],
      rural: [
        "Homes in {cityName} face siding challenges that suburban properties rarely encounter. Open exposure to wind, driving rain, and heavy snow loads puts enormous stress on exterior cladding. Alfa Construction installs siding systems specifically selected for the demands of rural {cityName} properties — products that resist impact, shed water effectively, and hold up against the most punishing New England conditions.",
        "For {cityName} homeowners maintaining farmhouses, Cape Cods, or country homes, siding replacement is often a top priority. Original wood siding may have decades of deferred maintenance, and patching only goes so far. Alfa Construction provides complete siding solutions for {cityName} properties — from full removal and substrate replacement to professional installation of materials that will serve your home for 30 years or more.",
        "Living in {cityName} means your home's exterior works harder than most. Without trees or neighboring buildings to block the wind, siding takes a constant beating. Alfa Construction serves {cityName} with siding products and installation methods engineered for maximum durability in exposed locations, giving rural homeowners the protection and peace of mind they deserve.",
      ],
      urban: [
        "In the tight-knit neighborhoods of {cityName}, your home's siding makes a statement about your property and your block. Alfa Construction provides professional siding services to {cityName} homeowners who want their exterior to reflect pride of ownership. We navigate the close-quarters logistics of urban siding work and deliver results that elevate your home's appearance and protection.",
        "Urban homes in {cityName} face unique siding challenges: road salt splash, vehicle exhaust deposits, proximity to adjacent buildings, and limited access for scaffolding and material staging. Alfa Construction has extensive experience working in {cityName}'s densest neighborhoods, managing these challenges efficiently while delivering siding installations that look flawless and perform for decades.",
        "{cityName} property owners — whether single-family, condo, or multi-unit — deserve a siding contractor who understands urban construction. Alfa Construction brings that understanding to every {cityName} project, from material selection suited to your specific exposure to installation logistics that respect your neighbors and comply with local building requirements.",
      ],
    },
    cityPainPoints: {
      historic: [
        "Original wood siding on {cityName} historic homes requires constant upkeep — scraping, priming, painting, caulking — and even with diligent maintenance, moisture eventually finds its way in. Many {cityName} homeowners spend thousands of dollars per decade on exterior maintenance only to see the same problems return. The cycle is exhausting and expensive.",
        "Previous siding replacements on {cityName} historic homes are often painfully obvious. Mismatched profiles, inconsistent reveal widths, and different wood species create a patchwork appearance that detracts from the home's character. Finding a contractor who can make new siding blends into the original facade requires skill that many siding installers simply do not have.",
        "Beneath the surface of many {cityName} historic homes, water damage has been silently spreading for years. By the time homeowners notice interior signs — stains on walls, musty odors, soft spots in floors — the siding has already failed and the sheathing behind it may be compromised. Addressing siding failure early is far less costly than waiting for structural damage.",
      ],
      suburban: [
        "Faded, chalky vinyl siding is one of the most common complaints we hear from {cityName} homeowners. After 15 to 20 years, the original color has washed out, panels have become brittle, and the house looks older than it is. Power washing helps temporarily, but it does not restore faded color or fix cracks that let moisture behind the cladding.",
        "Many {cityName} homes were built with siding that was installed quickly to meet production timelines, not to last. Corners were cut on flashing, housewrap was improperly lapped, and fasteners were driven too tight. These shortcuts may not cause problems immediately, but after years of Massachusetts freeze-thaw cycles, they result in moisture infiltration, buckled panels, and premature failure.",
        "If you have noticed your energy bills climbing in {cityName}, your siding could be part of the problem. Gaps between panels, cracked caulk around windows, and missing or compressed insulation behind old siding all allow conditioned air to escape. Many homeowners do not realize how much energy they are losing through their walls until they upgrade their siding.",
      ],
      rural: [
        "Siding on {cityName} homes takes a relentless beating from weather that would be less severe in more sheltered locations. High winds rip at panel edges, driving rain penetrates gaps that would stay dry in a suburban setting, and the temperature differential between sun-baked south walls and shaded north walls puts constant stress on materials. The result is siding that fails years earlier than expected.",
        "For {cityName} homeowners, finding a siding contractor willing to take on a rural project — and do it properly — is a persistent challenge. Many large companies focus on high-density markets, and local handymen may lack the training and equipment for a professional installation. The result is often subpar work that needs to be redone within a few years.",
        "Many {cityName} properties include detached structures — garages, workshops, barns — that also need siding attention. The cost of covering multiple buildings adds up quickly, and homeowners struggle to find a contractor who will provide a coordinated plan for the entire property rather than just the main house.",
      ],
      urban: [
        "In {cityName}, homes are often just a few feet apart, making siding inspection difficult without scaffolding and careful coordination with neighbors. This limited access means problems go unnoticed longer and the work is more complicated when they finally happen. Many {cityName} homeowners delay siding work because the logistics feel overwhelming.",
        "Road salt, vehicle emissions, and general urban grime take a measurable toll on siding in {cityName}. Vinyl discolors, wood absorbs contaminants, and even fiber cement can develop surface issues faster in a high-traffic area. The aesthetic decline is gradual, but over a decade it transforms a once-attractive facade into an eyesore.",
        "Multi-family property owners in {cityName} face an additional challenge: coordinating siding work across multiple units while managing tenant expectations, access requirements, and city permitting. The project management burden on top of the construction itself is enough to make many landlords postpone much-needed siding replacement indefinitely.",
      ],
    },
    citySolutions: {
      historic: [
        "Alfa Construction offers {cityName} homeowners fiber cement siding that replicates the look of original wood clapboard down to the grain texture and shadow lines — but never rots, never attracts insects, and never needs scraping. We match reveal widths and corner details to your home's era, delivering an exterior that looks authentically historic and performs like modern engineering.",
        "For {cityName} homes where maintaining original materials is a priority, we offer expert wood siding replacement and selective replacement. We source matching species and profiles, remove only what is truly beyond saving, and integrate new boards so seamlessly that the new boards are virtually invisible. We also address the moisture issues that caused the original failure.",
        "When {cityName} homeowners choose full siding replacement, we treat it as an opportunity to upgrade the entire building envelope. We install modern housewrap, add rigid insulation where possible, replace damaged flashing, and ensure proper ventilation — all before the new siding goes on. The result is a home that looks historically appropriate, feels warmer, and stays dry.",
      ],
      suburban: [
        "Alfa Construction helps {cityName} homeowners choose siding that matches their style, budget, and performance expectations. We bring physical samples to your home so you can compare colors against your roof, trim, and landscaping in natural light. There is no guesswork — you see exactly what your {cityName} home will look like before we begin.",
        "Our siding installation process for {cityName} homes includes complete removal of old material, thorough substrate inspection and replacement, new housewrap installation, and precision mounting of your chosen siding with proper gapping, nailing, and flashing at every penetration. We do not cut corners, and the result is a siding system that performs flawlessly for decades.",
        "For {cityName} homeowners who want maximum energy savings, we offer insulated siding systems that add a continuous layer of rigid insulation behind every panel. This eliminates thermal bridging through studs, reduces drafts, and can lower heating costs by 10 to 20 percent — savings you will appreciate every Massachusetts winter.",
      ],
      rural: [
        "Alfa Construction serves {cityName} with the same full-service approach we bring to every community: thorough preparation, premium materials, and expert installation. We understand the unique exposure of rural {cityName} properties and select siding products rated for high-wind and high-moisture environments. Your home gets the protection it needs, no compromises.",
        "For {cityName} properties with multiple structures, we design coordinated siding plans that create a unified exterior appearance across your entire homestead. We handle material ordering, color coordination, and phased installation so you can update everything on a timeline that works for your budget.",
        "We use enhanced fastening techniques for {cityName} homes in exposed locations — including ring-shank nails, additional clips, and extra sealant at every joint. These measures go beyond standard installation practices and provide the wind resistance and water tightness that rural properties demand.",
      ],
      urban: [
        "Alfa Construction manages the logistical challenges of urban siding work in {cityName} so you do not have to. We coordinate scaffolding placement, manage dumpster permits, communicate with adjacent property owners, and ensure our work complies with all city requirements. You get a professional siding installation without the stress of managing the process yourself.",
        "For {cityName} homes exposed to heavy traffic and salt spray, we recommend fiber cement or premium vinyl siding with ColorPlus or fade-resistant technology. These products maintain their appearance far longer in urban environments than standard coatings, keeping your {cityName} home looking fresh year after year without repainting.",
        "Our team is experienced with the multi-unit siding projects that are common in {cityName}. We phase work to minimize disruption, maintain clear access paths for residents, and keep the site clean and organized throughout the project. Property managers appreciate our communication, and tenants appreciate our professionalism.",
      ],
    },
    cityClosings: {
      historic: [
        "Protect your {cityName} historic home with siding that honors its past and secures its future. Alfa Construction combines historic sensitivity with modern performance to deliver results that look authentic and last for decades. Schedule your free exterior inspection today.",
        "Your {cityName} home has endured generations of New England weather — give it the siding it deserves. Alfa Construction provides expert installation using materials that replicate historic profiles while eliminating the rot and maintenance that burden original wood. Contact us today for your free estimate.",
        "Stop the cycle of scraping, painting, and patching. Alfa Construction offers {cityName} homeowners a permanent siding solution that preserves the look of your historic home while ending the maintenance treadmill. Call us today or request your free consultation online.",
      ],
      suburban: [
        "Transform your {cityName} home's curb appeal with professional siding from Alfa Construction. We handle everything from selection to installation to cleanup, delivering a result that protects your home and makes you proud every time you pull into the driveway. Get your free quote today.",
        "New siding is the single most impactful exterior upgrade you can make to your {cityName} home. Alfa Construction makes it easy with free consultations, transparent pricing, and installation quality that is backed by warranty. Contact us today and take the first step toward a home you love.",
        "Your {cityName} home deserves siding that performs as good as it looks. Alfa Construction delivers on both with premium materials and professional installation tailored to your home and your budget. Request your free estimate today.",
      ],
      rural: [
        "Give your {cityName} home the protection it needs against whatever New England throws at it. Alfa Construction installs siding that is built for rural exposure — durable, beautiful, and low maintenance. Contact us today for your free on-site inspection and estimate.",
        "Alfa Construction proudly serves {cityName} and surrounding rural communities with professional siding services. We travel to you, we bring everything we need, and we deliver results that last. Get in touch today and let us put together a siding plan for your property.",
        "Your {cityName} property is worth protecting with the best siding available. Alfa Construction helps you choose the right material, installs it to the highest standards, and backs it with our warranty. Schedule your free consultation today.",
      ],
      urban: [
        "In a {cityName} neighborhood where every facade tells a story, let yours say quality. Alfa Construction provides expert siding installation that transforms urban homes and protects them for decades. Contact us today for your free estimate.",
        "Alfa Construction makes urban siding work easy for {cityName} homeowners and property managers. We handle the logistics, the permits, and the installation — you just enjoy the results. Get in touch today to start your siding project.",
        "Your {cityName} property deserves a siding contractor who understands urban construction. Alfa Construction brings that expertise to every project, large or small. Request your free quote today and see the difference experience makes.",
      ],
    },
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

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

export default services;
