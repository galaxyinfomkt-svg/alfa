export interface Project {
  slug: string;
  title: string;
  city: string;
  state: string;
  service: string;
  serviceSlug: string;
  description: string;
  image: string;
  images: string[];
  beforeImage?: string;
  afterImage?: string;
  featured: boolean;
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
      "/images/cedar-shake-siding-warren-ri-after-front.jpg",
      "/images/cedar-shake-siding-warren-ri-progress.jpg",
      "/images/cedar-shake-siding-warren-ri-hydrogap-weather-barrier.jpg",
      "/images/cedar-shake-siding-warren-ri-window-flashing-detail.jpg",
    ],
    beforeImage: "/images/cedar-shake-siding-warren-ri-hydrogap-weather-barrier.jpg",
    afterImage: "/images/cedar-shake-siding-warren-ri-after-front.jpg",
    featured: true,
  },
  {
    slug: "james-hardie-whole-home-siding-carlisle-ma",
    title: "Whole-Home James Hardie Plank Installation – Carlisle, MA",
    city: "Carlisle",
    state: "MA",
    service: "Siding Installation & Replacement",
    serviceSlug: "siding",
    description: "Full-home re-side with James Hardie fiber cement plank in deep ColorPlus green and cream trim. The original wood siding was stripped to the sheathing, full HardieWrap weather barrier was installed across every elevation, then 5/16\" Hardie Plank was hung horizontally on a 6\" reveal with HardieTrim around every window, door, and corner board. The dark forest green color was selected to settle the home into Carlisle's wooded surroundings — a town where conservation-minded homeowners specifically choose fiber cement for its low-VOC factory finish and 50-year warranty. A project of this scale (every elevation, multiple rooflines, attached garage, chimney details) is the kind of full-home Hardie installation Alfa Construction specializes in.",
    image: "/images/hardie-plank-siding-carlisle-ma-after-front.jpg",
    images: [
      "/images/hardie-plank-siding-carlisle-ma-after-front.jpg",
      "/images/hardie-plank-siding-carlisle-ma-after-rear-skylights.jpg",
      "/images/hardie-plank-siding-carlisle-ma-after-garage.jpg",
      "/images/hardie-plank-siding-carlisle-ma-after-side.jpg",
      "/images/hardie-plank-siding-carlisle-ma-install-progress.jpg",
      "/images/hardie-plank-siding-carlisle-ma-hardie-weather-barrier.jpg",
    ],
    beforeImage: "/images/hardie-plank-siding-carlisle-ma-demo-stripped.jpg",
    afterImage: "/images/hardie-plank-siding-carlisle-ma-after-front.jpg",
    featured: true,
  },
  {
    slug: "cedar-shake-siding-porch-addition-webster-ma",
    title: "Matched Cedar Shake Siding on Porch Addition – Webster, MA",
    city: "Webster",
    state: "MA",
    service: "Siding Installation & Replacement",
    serviceSlug: "siding",
    description: "Covered entry porch addition with matched cedar shake siding that blends seamlessly into the existing gray shake exterior. Alfa Construction handled the full envelope work — Vycor Ice & Water Shield around the new opening, ZIP System roof sheathing, and full siding integration where the new addition meets the existing wall. The challenge on this Webster, MA project was matching the weathered tone of the existing shake siding so the addition reads as original to the house. White trim, columns, and railing finish off the curb-appeal upgrade.",
    image: "/images/cedar-shake-siding-porch-addition-webster-ma-after-side.jpg",
    images: [
      "/images/cedar-shake-siding-porch-addition-webster-ma-after-side.jpg",
      "/images/cedar-shake-siding-porch-addition-webster-ma-after-front.jpg",
      "/images/cedar-shake-siding-porch-addition-webster-ma-after-detail.jpg",
      "/images/cedar-shake-siding-porch-addition-webster-ma-zip-system-roof.jpg",
      "/images/cedar-shake-siding-porch-addition-webster-ma-roof-framing-aerial.jpg",
      "/images/cedar-shake-siding-porch-addition-webster-ma-floor-framing.jpg",
    ],
    beforeImage: "/images/cedar-shake-siding-porch-addition-webster-ma-before-demo.jpg",
    afterImage: "/images/cedar-shake-siding-porch-addition-webster-ma-after-side.jpg",
    featured: true,
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
    image: "/images/commercial-siding-installation-massachusetts.png",
    images: ["/images/commercial-siding-installation-massachusetts.png"],
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
    image: "/images/deck-carpentry-staircase-railing-massachusetts.png",
    images: ["/images/deck-carpentry-staircase-railing-massachusetts.png"],
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
    image: "/images/deck-construction-siding-installation-ma.png",
    images: ["/images/deck-construction-siding-installation-ma.png"],
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
