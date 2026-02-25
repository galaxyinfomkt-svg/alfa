// Centralized image mapping with SEO alt text and geo-tags
// All images from Alfa Construction Inc real projects in Massachusetts

export const images = {
  logo: {
    src: "/images/logo.png",
    alt: "Alfa Construction Inc Logo - Painting & Carpentry Services Massachusetts",
    width: 1702,
    height: 1128,
  },

  // Hero & general
  hero: {
    src: "/images/siding-window-installation-after-massachusetts.jpg",
    alt: "Professional siding and window installation by Alfa Construction Inc in Massachusetts",
    width: 1200,
    height: 800,
  },
  aboutTeam: {
    src: "/images/deck-carpentry-staircase-railing-massachusetts.png",
    alt: "Alfa Construction Inc carpentry work - custom deck staircase and railing in Massachusetts",
    width: 1080,
    height: 1350,
  },
  ogImage: {
    src: "/images/new-construction-siding-windows-board-batten-ma.jpg",
    alt: "Alfa Construction Inc - New construction with board and batten siding in Massachusetts",
    width: 1200,
    height: 630,
  },

  // Service heroes
  paintingHero: {
    src: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg",
    alt: "Exterior painting and siding on Cape Cod style home in Bellingham, MA by Alfa Construction",
    width: 1200,
    height: 800,
  },
  carpentryHero: {
    src: "/images/deck-carpentry-staircase-railing-massachusetts.png",
    alt: "Custom deck carpentry with staircase and white railing by Alfa Construction in Massachusetts",
    width: 1080,
    height: 1350,
  },
  sidingHero: {
    src: "/images/commercial-siding-installation-massachusetts.png",
    alt: "Commercial siding installation in progress by Alfa Construction Inc in Massachusetts",
    width: 1080,
    height: 1350,
  },
  windowsDoorsHero: {
    src: "/images/siding-window-installation-before-massachusetts.jpg",
    alt: "Window and siding installation project in Massachusetts by Alfa Construction Inc",
    width: 1200,
    height: 800,
  },
  remodelingHero: {
    src: "/images/new-construction-framing-zip-system-massachusetts.jpg",
    alt: "New construction framing with ZIP System sheathing in Massachusetts winter by Alfa Construction",
    width: 1200,
    height: 800,
  },

  // Projects
  projects: [
    {
      src: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg",
      alt: "Exterior siding on Cape Cod home in Bellingham, MA - Alfa Construction project",
      service: "Siding Installation & Repair",
      title: "Exterior Siding – Bellingham, MA",
    },
    {
      src: "/images/commercial-siding-installation-massachusetts.png",
      alt: "Commercial siding installation with furring strips in Massachusetts by Alfa Construction",
      service: "Siding Installation & Repair",
      title: "Commercial Siding Installation – Massachusetts",
    },
    {
      src: "/images/deck-carpentry-staircase-railing-massachusetts.png",
      alt: "Custom deck with staircase and white vinyl railing in Massachusetts - Alfa Construction carpentry",
      service: "Carpentry & Trim Work",
      title: "Deck & Staircase Carpentry – Massachusetts",
    },
    {
      src: "/images/deck-construction-siding-installation-ma.png",
      alt: "Deck construction with blue siding installation in Massachusetts by Alfa Construction",
      service: "Home Remodeling & Renovation",
      title: "Deck & Siding Remodel – Massachusetts",
    },
    {
      src: "/images/new-construction-framing-zip-system-massachusetts.jpg",
      alt: "New construction framing with ZIP System weather barrier during Massachusetts winter",
      service: "Home Remodeling & Renovation",
      title: "New Construction Framing – Massachusetts",
    },
    {
      src: "/images/porch-soffit-beadboard-siding-modern-home-ma.jpg",
      alt: "Porch soffit with beadboard ceiling and modern dark siding on home in Massachusetts",
      service: "Siding Installation & Repair",
      title: "Modern Porch Soffit & Siding – Massachusetts",
    },
    {
      src: "/images/siding-window-installation-before-massachusetts.jpg",
      alt: "Before: house wrap and new windows installed before siding in Massachusetts - Alfa Construction",
      service: "Window & Door Installation",
      title: "Window Installation (Before Siding) – Massachusetts",
      isBefore: true,
    },
    {
      src: "/images/siding-window-installation-after-massachusetts.jpg",
      alt: "After: completed siding and window installation on multi-story home in Massachusetts",
      service: "Siding Installation & Repair",
      title: "Siding & Window Installation (After) – Massachusetts",
      isAfter: true,
    },
    {
      src: "/images/new-construction-siding-windows-board-batten-ma.jpg",
      alt: "New construction with mixed horizontal and board-and-batten siding with windows in Massachusetts",
      service: "Siding Installation & Repair",
      title: "Board & Batten Siding – New Construction, MA",
    },
    {
      src: "/images/commercial-siding-window-installation-massachusetts.jpg",
      alt: "Commercial building siding and window installation in Massachusetts by Alfa Construction Inc",
      service: "Siding Installation & Repair",
      title: "Commercial Siding & Windows – Massachusetts",
    },
  ],

  // Blog images - reuse project photos strategically
  blog: [
    {
      src: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg",
      alt: "Cape Cod home exterior in Massachusetts showing paint and siding condition",
    },
    {
      src: "/images/siding-window-installation-after-massachusetts.jpg",
      alt: "Completed siding installation comparing Hardie Plank style in Massachusetts",
    },
    {
      src: "/images/porch-soffit-beadboard-siding-modern-home-ma.jpg",
      alt: "Modern home interior and exterior showing color coordination in Massachusetts",
    },
    {
      src: "/images/deck-carpentry-staircase-railing-massachusetts.png",
      alt: "Carpentry trim work and railing detail showing signs of quality craftsmanship",
    },
    {
      src: "/images/commercial-siding-installation-massachusetts.png",
      alt: "Licensed contractor performing professional siding installation in Massachusetts",
    },
    {
      src: "/images/siding-window-installation-before-massachusetts.jpg",
      alt: "Before and after exterior transformation of MetroWest Massachusetts home",
    },
  ],
} as const;
