export const company = {
  name: "Alfa Construction Inc",
  tradeName: "Alfa Construction",
  phone: "(508) 590-9193",
  phoneRaw: "+15085909193",
  phoneTel: "tel:+15085909193",
  email: "info@alfapaintingcarpentry.com",
  website: "https://alfapaintingcarpentry.com",
  address: {
    street: "34 Pearl Street",
    locality: "Bellingham",
    region: "MA",
    postalCode: "02019",
    country: "US",
    full: "Bellingham, MA",
  },
  geo: {
    latitude: 42.0687,
    longitude: -71.4748,
  },
  license: "#192348",
  licenseExpiry: "04/2027",
  experience: "20+",
  foundedYear: 2006,
  owner: "Fabio",
  hours: "Mon–Sat 7:00 AM – 6:00 PM",
  hoursStructured: "Mo-Sa 07:00-18:00",
  serviceArea: "Massachusetts (MetroWest · Worcester County · Norfolk County)",
  instagram: "https://www.instagram.com/alfaconstructioninc/",
  facebook: "https://www.facebook.com/alfacarpentrypainting",
  googleReview: "https://g.page/r/CZ1rhJ3jJReMEAE/review",
  googleMapsUrl: "https://maps.google.com/?cid=10275746837959009437",
  logo: "/images/logo.png",
  differentials: [
    "20+ years of construction excellence",
    "Licensed & Insured in Massachusetts",
    "Free estimates on all projects",
    "Bilingual team (English & Portuguese)",
    "Attention to detail and quality craftsmanship",
    "Proven track record with real client reviews",
  ],
  reviews: [],
} as const;

const BASE_URL = "https://alfapaintingcarpentry.com";

// ─── Enhanced LocalBusiness + HomeAndConstructionBusiness Schema ───
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${BASE_URL}/#organization`,
  name: "Alfa Construction Inc",
  alternateName: ["Alfa Construction", "Alfa Siding"],
  description:
    "Massachusetts siding specialists — complete full-home siding installation and replacement in Hardie Plank fiber cement, vinyl, cedar, and shake. Licensed & insured contractor with 20+ years of experience.",
  telephone: "+15085909193",
  email: "info@alfapaintingcarpentry.com",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/images/logo.png`,
    width: 180,
    height: 50,
  },
  image: [
    `${BASE_URL}/images/new-construction-siding-windows-board-batten-ma.jpg`,
    `${BASE_URL}/images/exterior-siding-cape-cod-home-bellingham-ma.jpg`,
    `${BASE_URL}/images/deck-carpentry-staircase-railing-massachusetts.png`,
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "34 Pearl Street",
    addressLocality: "Bellingham",
    addressRegion: "MA",
    postalCode: "02019",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.0687,
    longitude: -71.4748,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Check, Credit Card",
  foundingDate: "2006",
  founder: {
    "@type": "Person",
    name: "Fabio",
    jobTitle: "Owner & Lead Contractor",
    worksFor: { "@id": `${BASE_URL}/#organization` },
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 5,
    maxValue: 15,
  },
  knowsLanguage: ["en", "pt"],
  slogan: "Expert Siding Installation Across Massachusetts",
  sameAs: [
    "https://www.instagram.com/alfaconstructioninc/",
    "https://www.facebook.com/alfacarpentrypainting",
    "https://g.page/r/CZ1rhJ3jJReMEAE",
  ],
  areaServed: [
    {
      "@type": "State",
      name: "Massachusetts",
      sameAs: "https://en.wikipedia.org/wiki/Massachusetts",
    },
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 42.0687,
        longitude: -71.4748,
      },
      geoRadius: "56327",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Siding Installation & Replacement",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Siding Installation & Replacement",
          url: `${BASE_URL}/services/siding`,
          description: "Complete full-home siding installation and replacement across Massachusetts.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hardie Plank Fiber Cement Siding",
          url: `${BASE_URL}/services/hardie-plank-siding`,
          description: "James Hardie fiber cement siding installation with 30-year manufacturer warranty.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vinyl Siding Installation",
          url: `${BASE_URL}/services/vinyl-siding`,
          description: "Premium full-home vinyl siding installation and replacement.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cedar Shake Siding",
          url: `${BASE_URL}/services/cedar-shake-siding`,
          description: "Authentic Western Red Cedar shake siding installation.",
        },
      },
    ],
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Massachusetts Construction License",
      identifier: "#192348",
      validUntil: "2027-04-30",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "22",
    reviewCount: "22",
  },
};

// ─── Contractor Schema (like RS Development) ───
export const contractorSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${BASE_URL}/#contractor`,
  name: "Alfa Construction Inc",
  alternateName: ["Alfa Construction", "Alfa Siding & Construction"],
  description:
    "Licensed Massachusetts siding contractor specializing in complete full-home siding installation and replacement — Hardie Plank fiber cement, vinyl, cedar, and shake. Expert craftsmanship with 20+ years of experience.",
  url: BASE_URL,
  telephone: "+15085909193",
  email: "info@alfapaintingcarpentry.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "34 Pearl Street",
    addressLocality: "Bellingham",
    addressRegion: "MA",
    postalCode: "02019",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.0687,
    longitude: -71.4748,
  },
  areaServed: {
    "@type": "State",
    name: "Massachusetts",
  },
  knowsAbout: [
    "Siding Installation",
    "Siding Replacement",
    "Hardie Plank Siding",
    "Vinyl Siding",
    "Fiber Cement Siding",
    "Commercial Siding Installation", // TODO(Luiz): remover se NÃO atenderem comercial
    "Clapboard Siding",
    "Shake Siding",
    "Cedar Siding",
    "Board and Batten Siding",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Massachusetts Construction License",
    recognizedBy: {
      "@type": "Organization",
      name: "Commonwealth of Massachusetts",
    },
  },
};

// ─── ImageGallery Schema with geo-tagged images ───
const geoMA = {
  "@type": "Place",
  name: "Massachusetts, United States",
  geo: { "@type": "GeoCoordinates", latitude: 42.0687, longitude: -71.4748 },
};

export const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Alfa Construction Inc — Siding Installation Project Gallery",
  description: "Portfolio of siding installation, window installation, carpentry, and remodeling projects completed by Alfa Construction Inc across Massachusetts.",
  url: `${BASE_URL}/projects`,
  about: { "@type": "Thing", name: "Siding Installation in Massachusetts" },
  image: [
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/dark-shake-siding-renovation-after-ma.jpg`,
      name: "Dark Shake Siding Renovation - Massachusetts",
      description: "Complete dark charcoal shake siding renovation with white trim and red door on Victorian home in Massachusetts.",
      contentLocation: geoMA,
      width: 1200, height: 1600,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/green-siding-exterior-completed-ma.jpg`,
      name: "Green Siding & Deck Build - Massachusetts",
      description: "Sage green siding installation with white trim and raised deck on residential home in Massachusetts.",
      contentLocation: geoMA,
      width: 1600, height: 1200,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/exterior-siding-cape-cod-home-bellingham-ma.jpg`,
      name: "Exterior Siding Installation - Bellingham, MA",
      description: "Complete exterior gray clapboard siding installation on a Cape Cod style home in Bellingham, Massachusetts.",
      contentLocation: { "@type": "Place", name: "Bellingham, Massachusetts", geo: { "@type": "GeoCoordinates", latitude: 42.0687, longitude: -71.4748 } },
      width: 1200, height: 900,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/commercial-siding-installation-massachusetts.png`,
      name: "Commercial Siding Installation - Massachusetts",
      description: "Professional commercial siding installation with furring strips and weather barrier in Massachusetts.",
      contentLocation: geoMA,
      width: 1080, height: 1350,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/window-insulation-energyshield-ma.jpg`,
      name: "Window & Insulation Installation - Massachusetts",
      description: "EnergyShield continuous wall insulation and Andersen window installation on residential home in Massachusetts.",
      contentLocation: geoMA,
      width: 1600, height: 1200,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/blue-gray-siding-red-door-ma.jpg`,
      name: "Blue-Gray Siding with Red Door - Massachusetts",
      description: "Elegant blue-gray clapboard siding installation with white trim and vibrant red front door in Massachusetts.",
      contentLocation: geoMA,
      width: 576, height: 1024,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/siding-window-installation-after-massachusetts.jpg`,
      name: "Siding & Window Installation After - Massachusetts",
      description: "Completed siding and window installation on multi-story home in Massachusetts showing final result.",
      contentLocation: geoMA,
      width: 1200, height: 800,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/siding-renovation-before-housewrap-ma.jpg`,
      name: "Siding Renovation Before - Massachusetts",
      description: "House wrap and scaffolding during siding renovation before installation in Massachusetts.",
      contentLocation: geoMA,
      width: 576, height: 1024,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/deck-carpentry-staircase-railing-massachusetts.png`,
      name: "Deck Carpentry & Staircase - Massachusetts",
      description: "Custom deck staircase with white vinyl railing and blue siding carpentry work in Massachusetts.",
      contentLocation: geoMA,
      width: 1080, height: 1350,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/new-construction-siding-windows-board-batten-ma.jpg`,
      name: "Board & Batten Siding New Construction - Massachusetts",
      description: "New construction with mixed horizontal and board-and-batten siding with premium windows in Massachusetts.",
      contentLocation: geoMA,
      width: 1200, height: 900,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/green-siding-deck-rear-view-ma.jpg`,
      name: "Green Siding with Deck Rear View - Massachusetts",
      description: "Rear view of green siding installation with raised deck and staircase in winter in Massachusetts.",
      contentLocation: geoMA,
      width: 1600, height: 1200,
    },
    {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/andersen-window-installation-ma.jpg`,
      name: "Andersen Window Installation - Massachusetts",
      description: "Close-up of Andersen window installation with EnergyShield insulation on residential home in Massachusetts.",
      contentLocation: geoMA,
      width: 1200, height: 1600,
    },
  ],
};

// ─── WebSite Schema (for sitelinks search box) ───
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Alfa Construction Inc",
  alternateName: "Alfa Construction",
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#organization` },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/services/{search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Helper: Generate BreadcrumbList schema ───
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Helper: Generate FAQ schema ───
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── Helper: Generate Service schema ───
export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: service.url,
    image: service.image,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: service.areaServed || {
      "@type": "State",
      name: "Massachusetts",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
      },
    },
    // aggregateRating removido: a nota agregada vive SÓ no #organization (home),
    // nunca replicada por Service nas ~440 páginas programáticas. Ver data/schema.ts.
  };
}

// ─── Helper: Generate Article schema ───
export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image.startsWith("http") ? article.image : `${BASE_URL}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Organization",
      name: "Alfa Construction Inc",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Alfa Construction Inc",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}
