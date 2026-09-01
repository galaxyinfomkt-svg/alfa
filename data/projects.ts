export type ProjectImage = {
  src: string;
  alt: string;        // SEO + a11y: descriptive 60-120 chars
  caption?: string;   // optional short label ("Before", "Step 2 — HardieWrap")
};

export interface Project {
  slug: string;
  title: string;
  city: string;
  state: string;
  service: string;
  serviceSlug: string;
  description: string;
  image: string;
  images: (string | ProjectImage)[]; // legacy string[] still accepted
  beforeImage?: string;
  afterImage?: string;
  featured: boolean;
  /** Approximate latitude/longitude for JSON-LD geo schema (city centroid is fine — privacy). */
  geo?: { lat: number; lng: number };
  /** Human-readable area label ("Bellingham, MA 02019"). Used in schema + alt. */
  addressArea?: string;
}

/** Normalize images[] to always return ProjectImage objects with alt text. */
export function normalizeImages(images: (string | ProjectImage)[]): ProjectImage[] {
  return images.map((img) =>
    typeof img === "string" ? { src: img, alt: "" } : img
  );
}

export const projects: Project[] = [
  {
    slug: "cedar-shake-siding-warren-ri",
    title: "Cedar Shake Dormer Re-Side – Warren, RI",
    city: "Warren",
    state: "RI",
    service: "Siding Installation & Replacement",
    serviceSlug: "siding",
    description: "Full dormer re-side on a two-story New England home. Removed weathered cedar shake, installed HydroGap SA self-adhered drainable weather barrier for moisture protection, replaced windows with proper flashing-tape detailing, and finished with new cedar shake siding. The yellow clapboard on the lower walls was preserved — only the dormer / upper level was replaced, demonstrating Alfa's precision in partial-elevation siding work where blending old and new is critical.",
    image: "/images/cedar-shake-siding-warren-ri-after-front.jpg",
    images: [
      { src: "/images/cedar-shake-siding-warren-ri-hydrogap-weather-barrier.jpg", alt: "HydroGap SA self-adhered drainable weather barrier installed on dormer of Warren RI two-story home before new cedar shake install", caption: "Step 1 — HydroGap weather barrier" },
      { src: "/images/cedar-shake-siding-warren-ri-window-flashing-detail.jpg", alt: "Close-up of double-hung window with full perimeter flashing tape over HydroGap weather barrier on Warren RI dormer re-side", caption: "Window flashing detail" },
      { src: "/images/cedar-shake-siding-warren-ri-progress.jpg", alt: "Warren RI two-story home with new gray cedar shake siding nearly complete on dormer — small finish patch remaining at top center", caption: "Install progress" },
      { src: "/images/cedar-shake-siding-warren-ri-after-front.jpg", alt: "Finished Warren RI home dormer in matched gray cedar shake siding blending with existing yellow clapboard lower walls", caption: "Finished — front view" },
    ],
    beforeImage: "/images/cedar-shake-siding-warren-ri-hydrogap-weather-barrier.jpg",
    afterImage: "/images/cedar-shake-siding-warren-ri-after-front.jpg",
    featured: true,
    geo: { lat: 41.7373, lng: -71.2828 },
    addressArea: "Warren, RI 02885",
  },
  {
    slug: "james-hardie-whole-home-siding-carlisle-ma",
    title: "Whole-Home James Hardie Plank Installation – Carlisle, MA",
    city: "Carlisle",
    state: "MA",
    service: "Siding Installation & Replacement",
    serviceSlug: "siding",
    description: "Full-home re-side with James Hardie fiber cement plank in deep ColorPlus green and cream trim. The original wood siding was stripped to the sheathing, full HardieWrap weather barrier was installed across every elevation, then 5/16\" Hardie Plank was hung horizontally on a 7\" reveal with HardieTrim around every window, door, and corner board. The dark forest green color was selected to settle the home into Carlisle's wooded surroundings — a town where conservation-minded homeowners specifically choose fiber cement for its low-VOC factory finish and 30-year non-prorated warranty. A project of this scale (every elevation, multiple rooflines, attached garage, chimney details, brick chimney integration) is the kind of full-home Hardie installation Alfa Construction specializes in.",
    image: "/images/hardie-plank-siding-carlisle-ma-after-front.jpg",
    images: [
      // ─── DEMO PHASE ────────────────────────────────────────
      { src: "/images/hardie-plank-siding-carlisle-ma-demo-stripped.jpg", alt: "Original siding stripped to bare plywood sheathing on full elevation of Carlisle MA home before James Hardie install", caption: "Demo — siding removed to sheathing" },
      { src: "/images/hardie-plank-siding-carlisle-ma-demo-debris.jpg", alt: "Carlisle home with plywood exposed and demo debris on the ground after old siding removal", caption: "Demo — debris stage" },
      { src: "/images/hardie-plank-siding-carlisle-ma-chimney-raw-wood.jpg", alt: "Brick chimney corner with raw plywood adjacent during siding removal at Carlisle MA Hardie project", caption: "Chimney area — wood exposed" },
      { src: "/images/hardie-plank-siding-carlisle-ma-chimney-during.jpg", alt: "Carlisle Hardie install in progress — brick chimney with new white HardieWrap weather barrier going up", caption: "Chimney integration — wrap stage" },

      // ─── HARDIEWRAP / WEATHER BARRIER ───────────────────────
      { src: "/images/hardie-plank-siding-carlisle-ma-hardie-weather-barrier.jpg", alt: "JamesHardie Weather Barrier (HardieWrap) installed across full elevation before Hardie Plank siding install in Carlisle MA", caption: "HardieWrap installed" },
      { src: "/images/hardie-plank-siding-carlisle-ma-wrap-front.jpg", alt: "Front elevation of Carlisle home fully wrapped in JamesHardie Weather Barrier before plank install", caption: "Front elevation wrapped" },
      { src: "/images/hardie-plank-siding-carlisle-ma-wrap-front-2.jpg", alt: "Carlisle MA home with JamesHardie weather barrier visible on front facade during whole-home re-side", caption: "Front wrap detail" },
      { src: "/images/hardie-plank-siding-carlisle-ma-wrap-back.jpg", alt: "Back of Carlisle home wrapped in JamesHardie Weather Barrier with garage doors visible before Hardie Plank install", caption: "Garage side wrapped" },
      { src: "/images/hardie-plank-siding-carlisle-ma-wrap-scaffold-back.jpg", alt: "Scaffolding set up against HardieWrap-covered rear elevation of Carlisle MA home during siding install", caption: "Scaffolding stage — rear" },
      { src: "/images/hardie-plank-siding-carlisle-ma-wrap-scaffold-back-2.jpg", alt: "Rear of Carlisle home with full HardieWrap coverage and scaffolding ready for Hardie Plank installation", caption: "Rear elevation — pre-plank" },
      { src: "/images/hardie-plank-siding-carlisle-ma-wrap-transition.jpg", alt: "Transition between HardieWrap and existing siding on Carlisle MA home during whole-home re-side", caption: "Wrap-to-siding transition" },
      { src: "/images/hardie-plank-siding-carlisle-ma-wrap-night.jpg", alt: "Carlisle MA home at dusk fully wrapped in JamesHardie Weather Barrier ready for next-day plank install", caption: "Wrap stage — dusk" },

      // ─── INSTALL IN PROGRESS ───────────────────────────────
      { src: "/images/hardie-plank-siding-carlisle-ma-install-progress.jpg", alt: "Carlisle MA home mid-install — lower walls in James Hardie ColorPlus green plank, upper still in HardieWrap", caption: "Install progress — partial Hardie up" },
      { src: "/images/hardie-plank-siding-carlisle-ma-porch-hardiewrap.jpg", alt: "Covered porch area on Carlisle home with HardieWrap visible during James Hardie siding install", caption: "Porch — wrap detail" },
      { src: "/images/hardie-plank-siding-carlisle-ma-porch-detail-close.jpg", alt: "Close-up detail of Carlisle home porch area showing HardieWrap and trim work during install", caption: "Porch wrap close-up" },
      { src: "/images/hardie-plank-siding-carlisle-ma-action-workers.jpg", alt: "Alfa Construction crew on ladders installing James Hardie plank siding on Carlisle MA home with brick chimney visible", caption: "Crew at work" },

      // ─── COMPLETED / AFTER VIEWS ───────────────────────────
      { src: "/images/hardie-plank-siding-carlisle-ma-after-front.jpg", alt: "Completed Carlisle MA home with James Hardie ColorPlus deep green plank siding, cream trim, and dual garage at sunset", caption: "Finished — front view" },
      { src: "/images/hardie-plank-siding-carlisle-ma-front-day.jpg", alt: "Carlisle MA home with James Hardie green plank siding completed — daytime front elevation with workers visible", caption: "Finished — front (daytime)" },
      { src: "/images/hardie-plank-siding-carlisle-ma-after-garage.jpg", alt: "Completed Carlisle home garage side — James Hardie ColorPlus green siding with cream HardieTrim around orange garage doors", caption: "Finished — garage side" },
      { src: "/images/hardie-plank-siding-carlisle-ma-after-side.jpg", alt: "Side elevation of finished Carlisle MA home in James Hardie ColorPlus green plank with cream window trim", caption: "Finished — side elevation" },
      { src: "/images/hardie-plank-siding-carlisle-ma-side-detail.jpg", alt: "Side angle of completed Carlisle Hardie install showing window trim and corner board detail in green ColorPlus finish", caption: "Side detail" },
      { src: "/images/hardie-plank-siding-carlisle-ma-after-side-close.jpg", alt: "Close-up of finished James Hardie ColorPlus green siding on Carlisle MA home with cream window trim", caption: "Side close-up" },
      { src: "/images/hardie-plank-siding-carlisle-ma-porch-side.jpg", alt: "Side view of Carlisle home covered porch addition finished in James Hardie green with screen enclosure", caption: "Porch side view" },
      { src: "/images/hardie-plank-siding-carlisle-ma-after-back-cloud.jpg", alt: "Rear of completed Carlisle MA home in James Hardie green plank siding with cloudy sky backdrop", caption: "Rear elevation — finished" },
      { src: "/images/hardie-plank-siding-carlisle-ma-after-back-angle.jpg", alt: "Back angle of Carlisle home showing finished James Hardie ColorPlus deep green siding and trim", caption: "Rear angle — finished" },
      { src: "/images/hardie-plank-siding-carlisle-ma-after-rear-skylights.jpg", alt: "Rear of Carlisle MA home with James Hardie green siding, skylights, brick chimney, and deck surrounded by trees", caption: "Rear with skylights" },
    ],
    beforeImage: "/images/hardie-plank-siding-carlisle-ma-demo-stripped.jpg",
    afterImage: "/images/hardie-plank-siding-carlisle-ma-after-front.jpg",
    featured: true,
    geo: { lat: 42.5298, lng: -71.3543 },
    addressArea: "Carlisle, MA 01741",
  },
  {
    slug: "cedar-shake-siding-porch-addition-webster-ma",
    title: "Matched Cedar Shake Siding on Porch Addition – Webster, MA",
    city: "Webster",
    state: "MA",
    service: "Siding Installation & Replacement",
    serviceSlug: "siding",
    description: "Covered entry porch addition with matched cedar shake siding that blends seamlessly into the existing gray shake exterior. Alfa Construction handled the full envelope work — Vycor Ice & Water Shield where the new floor meets the existing wall, ZIP System roof sheathing with factory-taped seams, HardieWrap as the final drainage plane, and matched cedar shake siding hand-graded to blend with the existing weathered gray. The challenge on this Webster, MA project was matching the existing shake tone so the addition reads as original to the house. White trim, columns, and composite deck flooring finish off the curb-appeal upgrade.",
    image: "/images/cedar-shake-siding-porch-addition-webster-ma-after-side.jpg",
    images: [
      // ─── STARTING STATE ────────────────────────────────────
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-before-demo.jpg", alt: "Original exposed entry doorway on Webster MA home before covered porch addition — single step, no shelter", caption: "Before — exposed doorway" },

      // ─── FLOOR FRAMING + VYCOR ─────────────────────────────
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-floor-framing.jpg", alt: "New porch floor framing on pressure-treated joists with Vycor Ice & Water Shield self-adhered to existing siding in Webster MA", caption: "Step 1 — floor framing + Vycor" },
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-frame-close.jpg", alt: "Close-up of porch frame structure with vertical posts and Vycor flashing visible during Webster MA porch addition", caption: "Frame detail — posts and joists" },
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-frame-detail.jpg", alt: "Webster MA porch addition framing with Vycor water shield, vertical posts, and tools on site", caption: "Frame work in progress" },

      // ─── ROOF FRAMING (aerials) ────────────────────────────
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-roof-framing-aerial.jpg", alt: "Aerial view of roof framing for porch addition in Webster MA — rafters tied to existing roof, level across the run", caption: "Step 2 — roof rafters set" },
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-roof-aerial-2.jpg", alt: "Roof framing aerial showing rafter layout for new porch addition in Webster MA before sheathing", caption: "Rafter layout" },
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-roof-aerial-3.jpg", alt: "Overhead view of completed roof rafter structure on Webster MA porch addition ready for ZIP System sheathing", caption: "Rafters complete" },

      // ─── ZIP SYSTEM ROOF ───────────────────────────────────
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-zip-system-roof.jpg", alt: "ZIP System sheathing panels installed with factory-taped seams on new porch roof in Webster MA", caption: "Step 3 — ZIP roof deck taped" },
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-zip-roof-deck.jpg", alt: "Completed ZIP System roof deck on Webster MA porch addition with taped seams visible from above", caption: "ZIP deck complete" },
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-mid-build.jpg", alt: "Mid-build view of Webster MA porch addition with ZIP roof complete and Vycor water shield visible below", caption: "Mid-build — envelope stage" },

      // ─── COMPLETED ─────────────────────────────────────────
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-after-side.jpg", alt: "Finished covered porch with matched gray cedar shake siding, white columns, and composite deck floor in Webster MA", caption: "Finished — side view" },
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-after-front.jpg", alt: "Front view of completed Webster MA covered porch addition — new entry door, matched cedar shake siding, composite floor", caption: "Finished — front view" },
      { src: "/images/cedar-shake-siding-porch-addition-webster-ma-after-detail.jpg", alt: "Close detail of finished Webster MA porch interior showing composite deck flooring, white railing, and cedar shake walls", caption: "Finished — interior detail" },
    ],
    beforeImage: "/images/cedar-shake-siding-porch-addition-webster-ma-before-demo.jpg",
    afterImage: "/images/cedar-shake-siding-porch-addition-webster-ma-after-side.jpg",
    featured: true,
    geo: { lat: 42.0612, lng: -71.8617 },
    addressArea: "Webster, MA 01570",
  },
  {
    slug: "exterior-siding-bellingham",
    title: "Exterior Siding – Bellingham, MA",
    city: "Bellingham",
    state: "MA",
    service: "Siding Installation & Repair",
    serviceSlug: "siding",
    description: "Complete exterior siding installation on a Cape Cod style home in Bellingham. Our team installed gray clapboard siding with crisp white trim, transforming the home's curb appeal and weatherproofing for New England seasons.",
    image: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg",
    images: ["/images/exterior-siding-cape-cod-home-bellingham-ma.jpg"],
    featured: true,
  },
  {
    slug: "commercial-siding-massachusetts",
    title: "Commercial Siding – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Siding Installation & Repair",
    serviceSlug: "siding",
    description: "Professional commercial siding installation with furring strips and weather barrier preparation. This large-scale project showcases Alfa Construction's ability to handle commercial exterior projects with precision and efficiency.",
    image: "/images/commercial-siding-installation-massachusetts.jpg",
    images: ["/images/commercial-siding-installation-massachusetts.jpg"],
    featured: true,
  },
  {
    slug: "deck-staircase-carpentry-massachusetts",
    title: "Deck & Staircase Carpentry – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Carpentry & Trim Work",
    serviceSlug: "carpentry",
    description: "Custom deck construction with staircase and white vinyl railing. This carpentry project features precision-cut steps, sturdy framing, and an elegant white railing system that complements the blue siding beautifully.",
    image: "/images/deck-carpentry-staircase-railing-massachusetts.jpg",
    images: ["/images/deck-carpentry-staircase-railing-massachusetts.jpg"],
    featured: true,
  },
  {
    slug: "deck-siding-remodel-massachusetts",
    title: "Deck & Siding Remodel – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Home Remodeling & Renovation",
    serviceSlug: "remodeling",
    description: "Complete deck construction combined with blue siding installation on a multi-level home. This remodel project demonstrates our ability to coordinate multiple trades — carpentry and siding — for a seamless finished result.",
    image: "/images/deck-construction-siding-installation-ma.jpg",
    images: ["/images/deck-construction-siding-installation-ma.jpg"],
    featured: true,
  },
  {
    slug: "new-construction-framing-massachusetts",
    title: "New Construction Framing – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Home Remodeling & Renovation",
    serviceSlug: "remodeling",
    description: "New construction framing project using ZIP System sheathing for superior weather protection. Completed during a Massachusetts winter, this project showcases our team's ability to maintain quality and timeline even in challenging conditions.",
    image: "/images/new-construction-framing-zip-system-massachusetts.jpg",
    images: ["/images/new-construction-framing-zip-system-massachusetts.jpg"],
    featured: true,
  },
  {
    slug: "porch-soffit-siding-massachusetts",
    title: "Modern Porch Soffit & Siding – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Siding Installation & Repair",
    serviceSlug: "siding",
    description: "Beautiful porch soffit installation with beadboard ceiling and modern dark siding on a contemporary Massachusetts home. The combination of natural wood-look ceiling and sleek dark panels creates a striking modern aesthetic.",
    image: "/images/porch-soffit-beadboard-siding-modern-home-ma.jpg",
    images: ["/images/porch-soffit-beadboard-siding-modern-home-ma.jpg"],
    featured: false,
  },
  {
    slug: "siding-window-installation-massachusetts",
    title: "Siding & Window Installation – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Window & Door Installation",
    serviceSlug: "windows-doors",
    description: "Complete siding and window installation project on a multi-story Massachusetts home. This before-and-after project shows the transformation from house wrap and new window installation to a beautifully finished exterior with premium siding.",
    image: "/images/siding-window-installation-after-massachusetts.jpg",
    images: ["/images/siding-window-installation-after-massachusetts.jpg"],
    beforeImage: "/images/siding-window-installation-before-massachusetts.jpg",
    afterImage: "/images/siding-window-installation-after-massachusetts.jpg",
    featured: true,
  },
  {
    slug: "board-batten-siding-new-construction-ma",
    title: "Board & Batten Siding – New Construction, MA",
    city: "Massachusetts",
    state: "MA",
    service: "Siding Installation & Repair",
    serviceSlug: "siding",
    description: "New construction featuring a stunning mix of horizontal and board-and-batten siding with premium window installation. This project highlights Alfa Construction's expertise in modern siding design and installation techniques.",
    image: "/images/new-construction-siding-windows-board-batten-ma.jpg",
    images: ["/images/new-construction-siding-windows-board-batten-ma.jpg"],
    featured: false,
  },
  {
    slug: "commercial-siding-windows-massachusetts",
    title: "Commercial Siding & Windows – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Siding Installation & Repair",
    serviceSlug: "siding",
    description: "Large-scale commercial building siding and window installation in Massachusetts. Alfa Construction handled the complete exterior cladding of this commercial property, demonstrating our capacity for projects of any size.",
    image: "/images/commercial-siding-window-installation-massachusetts.jpg",
    images: ["/images/commercial-siding-window-installation-massachusetts.jpg"],
    featured: false,
  },
  {
    slug: "dark-shake-siding-renovation-ma",
    title: "Dark Shake Siding Renovation – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Siding Installation & Repair",
    serviceSlug: "siding",
    description: "Full exterior transformation with dark charcoal shake siding and crisp white trim. This Victorian-style home went from bare house wrap to a stunning finished look, featuring a bold red front door and detailed shingle work on all sides.",
    image: "/images/dark-shake-siding-renovation-after-ma.jpg",
    images: [
      "/images/dark-shake-siding-renovation-after-ma.jpg",
      "/images/dark-shake-siding-side-view-ma.jpg",
      "/images/dark-shake-siding-detail-ma.jpg",
    ],
    beforeImage: "/images/siding-renovation-before-housewrap-ma.jpg",
    afterImage: "/images/dark-shake-siding-renovation-after-ma.jpg",
    featured: true,
  },
  {
    slug: "green-siding-deck-massachusetts",
    title: "Green Siding & Deck Build – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Home Remodeling & Renovation",
    serviceSlug: "remodeling",
    description: "Complete home exterior remodel featuring sage green siding with white trim, a raised deck with staircase, and new windows throughout. This multi-phase project combined siding installation, carpentry, and deck construction for a cohesive finished result.",
    image: "/images/green-siding-exterior-completed-ma.jpg",
    images: [
      "/images/green-siding-exterior-completed-ma.jpg",
      "/images/green-siding-deck-rear-view-ma.jpg",
      "/images/green-siding-side-angle-ma.jpg",
      "/images/gray-siding-deck-staircase-ma.jpg",
    ],
    featured: true,
  },
  {
    slug: "window-insulation-installation-ma",
    title: "Window & Insulation Installation – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Window & Door Installation",
    serviceSlug: "windows-doors",
    description: "Professional window and insulation installation using EnergyShield continuous wall insulation and Andersen windows. This project showcases proper weather barrier preparation and energy-efficient window installation techniques for maximum home performance.",
    image: "/images/window-insulation-energyshield-ma.jpg",
    images: [
      "/images/window-insulation-energyshield-ma.jpg",
      "/images/andersen-window-installation-ma.jpg",
      "/images/window-installation-progress-ma.jpg",
    ],
    featured: true,
  },
  {
    slug: "blue-gray-siding-exterior-ma",
    title: "Blue-Gray Siding & Exterior – Massachusetts",
    city: "Massachusetts",
    state: "MA",
    service: "Siding Installation & Repair",
    serviceSlug: "siding",
    description: "Elegant blue-gray clapboard siding installation with white trim details and a vibrant red front door. This classic New England home received a complete exterior refresh that enhances curb appeal while maintaining its traditional character.",
    image: "/images/blue-gray-siding-red-door-ma.jpg",
    images: ["/images/blue-gray-siding-red-door-ma.jpg"],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByService(serviceSlug: string): Project[] {
  return projects.filter((project) => project.serviceSlug === serviceSlug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
