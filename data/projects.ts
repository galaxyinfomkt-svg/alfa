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
    slug: "exterior-painting-framingham",
    title: "Exterior Painting – Framingham, MA",
    city: "Framingham",
    state: "MA",
    service: "Interior & Exterior Painting",
    serviceSlug: "painting",
    description: "Complete exterior painting transformation of a colonial home in Framingham. Our team stripped old peeling paint, repaired damaged surfaces, primed, and applied two coats of premium exterior paint. The result brought this classic New England home back to life.",
    image: "/images/project-1.jpg",
    images: ["/images/project-1.jpg", "/images/project-1b.jpg"],
    beforeImage: "/images/project-1-before.jpg",
    afterImage: "/images/project-1.jpg",
    featured: true,
  },
  {
    slug: "interior-painting-newton",
    title: "Interior Painting – Newton, MA",
    city: "Newton",
    state: "MA",
    service: "Interior & Exterior Painting",
    serviceSlug: "painting",
    description: "High-end interior painting project in a luxury Newton home. We painted the entire first floor including living room, dining room, and kitchen with careful preparation and premium Benjamin Moore paints. Clean lines, smooth finish, zero mess.",
    image: "/images/project-2.jpg",
    images: ["/images/project-2.jpg", "/images/project-2b.jpg"],
    featured: true,
  },
  {
    slug: "trim-carpentry-wellesley",
    title: "Trim & Carpentry – Wellesley, MA",
    city: "Wellesley",
    state: "MA",
    service: "Carpentry & Trim Work",
    serviceSlug: "carpentry",
    description: "Extensive trim replacement and door installation in a Wellesley home. We replaced all rotten exterior trim with PVC composite, installed 12 new interior doors with premium hardware, and finished with precision paint work. The transformation was dramatic.",
    image: "/images/project-3.jpg",
    images: ["/images/project-3.jpg", "/images/project-3b.jpg"],
    beforeImage: "/images/project-3-before.jpg",
    afterImage: "/images/project-3.jpg",
    featured: true,
  },
  {
    slug: "siding-installation-natick",
    title: "Siding Installation – Natick, MA",
    city: "Natick",
    state: "MA",
    service: "Siding Installation & Repair",
    serviceSlug: "siding",
    description: "Full Hardie Plank siding installation on a ranch-style home in Natick. We removed the old vinyl siding, installed proper weather barrier, and clad the entire home in James Hardie fiber cement siding. A complete exterior transformation built to last decades.",
    image: "/images/project-4.jpg",
    images: ["/images/project-4.jpg", "/images/project-4b.jpg"],
    featured: true,
  },
  {
    slug: "window-installation-brookline",
    title: "Window Installation – Brookline, MA",
    city: "Brookline",
    state: "MA",
    service: "Window & Door Installation",
    serviceSlug: "windows-doors",
    description: "Replaced 18 old single-pane windows with energy-efficient double-pane units in a historic Brookline property. Custom sizing to match the original window openings while dramatically improving energy efficiency and comfort throughout the home.",
    image: "/images/project-5.jpg",
    images: ["/images/project-5.jpg", "/images/project-5b.jpg"],
    featured: false,
  },
  {
    slug: "home-remodeling-shrewsbury",
    title: "Home Remodeling – Shrewsbury, MA",
    city: "Shrewsbury",
    state: "MA",
    service: "Home Remodeling & Renovation",
    serviceSlug: "remodeling",
    description: "Complete kitchen and bathroom remodel in Shrewsbury. We handled everything from demolition to finish: new drywall, custom cabinetry trim, painting, door replacement, and fixture installation. A full-service renovation that increased the home's value significantly.",
    image: "/images/project-6.jpg",
    images: ["/images/project-6.jpg", "/images/project-6b.jpg"],
    featured: true,
  },
  {
    slug: "exterior-painting-concord",
    title: "Exterior Painting – Concord, MA",
    city: "Concord",
    state: "MA",
    service: "Interior & Exterior Painting",
    serviceSlug: "painting",
    description: "Period-appropriate exterior painting of a historic colonial in Concord. Careful color selection to honor the home's heritage, meticulous prep work on century-old clapboard, and premium paint application. A restoration that preserved the character of this landmark property.",
    image: "/images/project-7.jpg",
    images: ["/images/project-7.jpg"],
    featured: false,
  },
  {
    slug: "siding-repair-marlborough",
    title: "Siding Repair – Marlborough, MA",
    city: "Marlborough",
    state: "MA",
    service: "Siding Installation & Repair",
    serviceSlug: "siding",
    description: "Emergency siding repair after winter storm damage in Marlborough. We replaced damaged vinyl siding sections, repaired underlying sheathing, and color-matched new panels to the existing installation. Fast response, quality repair, weather-tight results.",
    image: "/images/project-8.jpg",
    images: ["/images/project-8.jpg"],
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
