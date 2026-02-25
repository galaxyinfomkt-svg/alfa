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
