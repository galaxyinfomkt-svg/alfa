export const company = {
  name: "Alfa Construction Inc",
  tradeName: "Alfa Painting & Carpentry",
  phone: "(508) 596-3750",
  phoneRaw: "+15085963750",
  phoneTel: "tel:+15085963750",
  email: "info@alfapaintingcarpentry.com",
  website: "https://alfapaintingcarpentry.com",
  address: {
    street: "50 Mechanic St",
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
  experience: "18+",
  foundedYear: 2006,
  owner: "Fabio",
  hours: "Mon–Sat 7:00 AM – 6:00 PM",
  hoursStructured: "Mo-Sa 07:00-18:00",
  serviceArea: "Massachusetts & Southern New Hampshire",
  instagram: "https://www.instagram.com/alfaconstructioninc/",
  facebook: "https://www.facebook.com/alfacarpentrypainting",
  googleReview: "https://g.page/r/CZ1rhJ3jJReMEAE/review",
  googleMapsUrl: "https://maps.google.com/?cid=10275746837959009437",
  logo: "/images/logo.png",
  differentials: [
    "18+ years of construction excellence",
    "Licensed & Insured in Massachusetts",
    "Free estimates on all projects",
    "Bilingual team (English & Portuguese)",
    "Attention to detail and quality craftsmanship",
    "Proven track record with real client reviews",
  ],
  reviews: [
    {
      text: "Alfa Painting & Carpentry did a great job assisting us with our remodeling. They painted and installed a wide variety of doors. The painting was very well done in a high-end home. Would highly recommend Fabio and his team.",
      author: "John S.",
      rating: 5,
      service: "Remodeling & Painting",
    },
    {
      text: "Real good results always come from really good professionals. They did a very good job replacing rotten trims inside and out of my property.",
      author: "Mark Conti",
      rating: 5,
      service: "Carpentry & Trim Work",
    },
    {
      text: "I give them a 5 star rating. Fabio was very thorough and cordial. All members of his team were pleasant and respectful. The price was very reasonable.",
      author: "Joann Polakoff",
      rating: 5,
      service: "General Construction",
    },
  ],
} as const;

const BASE_URL = "https://alfapaintingcarpentry.com";

// ─── Enhanced LocalBusiness + HomeAndConstructionBusiness Schema ───
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${BASE_URL}/#organization`,
  name: "Alfa Construction Inc",
  alternateName: ["Alfa Construction", "Alfa Siding", "Alfa Painting & Carpentry", "Alfa Construction Inc"],
  description:
    "Expert siding installation, window & door installation, carpentry and home remodeling services in Massachusetts. Licensed & insured contractor with 18+ years of experience serving 100+ cities.",
  telephone: "+15085963750",
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
    streetAddress: "50 Mechanic St",
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
  priceRange: "$$",
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
      geoRadius: "80467",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Improvement Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Siding Installation & Repair",
          url: `${BASE_URL}/services/siding`,
          description: "Professional Hardie Plank, vinyl siding, and full replacement services across Massachusetts.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Window & Door Installation",
          url: `${BASE_URL}/services/windows-doors`,
          description: "Energy-efficient window and door installation services.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Carpentry & Trim Work",
          url: `${BASE_URL}/services/carpentry`,
          description: "Fine carpentry, trim replacement, and door installation services.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Home Remodeling & Renovation",
          url: `${BASE_URL}/services/remodeling`,
          description: "Complete home renovation from kitchens to bathrooms.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior & Exterior Painting",
          url: `${BASE_URL}/services/painting`,
          description: "Professional interior and exterior painting services across Massachusetts.",
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
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "John S." },
      datePublished: "2024-06-15",
      reviewBody:
        "Alfa Painting & Carpentry did a great job assisting us with our remodeling. They painted and installed a wide variety of doors. The painting was very well done in a high-end home. Would highly recommend Fabio and his team.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mark Conti" },
      datePublished: "2024-04-20",
      reviewBody:
        "Real good results always come from really good professionals. They did a very good job replacing rotten trims inside and out of my property.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Joann Polakoff" },
      datePublished: "2024-02-10",
      reviewBody:
        "I give them a 5 star rating. Fabio was very thorough and cordial. All members of his team were pleasant and respectful. The price was very reasonable.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
  ],
};

// ─── Contractor Schema (like RS Development) ───
export const contractorSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${BASE_URL}/#contractor`,
  name: "Alfa Construction Inc",
  alternateName: ["Alfa Construction", "Alfa Siding & Construction"],
  description:
    "Licensed siding installation, window & door installation, carpentry and home remodeling contractor serving Massachusetts. Expert craftsmanship with 18+ years of experience.",
  url: BASE_URL,
  telephone: "+15085963750",
  email: "info@alfapaintingcarpentry.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "50 Mechanic St",
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
    "Hardie Plank Siding",
    "Vinyl Siding",
    "Fiber Cement Siding",
    "Commercial Siding Installation",
    "Clapboard Siding",
    "Shake Siding",
    "Window Installation",
    "Door Installation",
    "Door Replacement",
    "Carpentry",
    "Trim Work",
    "Home Remodeling",
    "Kitchen Remodeling",
    "Bathroom Remodeling",
    "Deck Construction",
    "Exterior Painting",
    "Interior Painting",
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
