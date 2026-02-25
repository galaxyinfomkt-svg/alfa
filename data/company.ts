export const company = {
  name: "Alfa Construction Inc",
  tradeName: "Alfa Painting & Carpentry",
  phone: "(508) 596-3750",
  phoneRaw: "+15085963750",
  phoneTel: "tel:+15085963750",
  email: "info@alfapaintingcarpentry.com",
  website: "https://alfapaintingcarpentry.com",
  address: {
    locality: "Bellingham",
    region: "MA",
    country: "US",
    full: "Bellingham, MA",
  },
  license: "#192348",
  licenseExpiry: "04/2027",
  experience: "18+",
  owner: "Fabio",
  hours: "Mon–Sat 7:00 AM – 6:00 PM",
  hoursStructured: "Mo-Sa 07:00-18:00",
  serviceArea: "Massachusetts & Southern New Hampshire",
  instagram: "https://www.instagram.com/alfaconstructioninc/",
  facebook: "https://www.facebook.com/alfacarpentrypainting",
  googleReview: "https://g.page/r/CZ1rhJ3jJReMEAE/review",
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

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Alfa Construction Inc",
  alternateName: "Alfa Painting & Carpentry",
  description:
    "Expert painting, carpentry, siding, window & door installation and home remodeling services in Massachusetts. Licensed & insured. 18+ years experience.",
  telephone: "+15085963750",
  url: "https://alfapaintingcarpentry.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bellingham",
    addressRegion: "MA",
    addressCountry: "US",
  },
  openingHours: ["Mo-Sa 07:00-18:00"],
  sameAs: [
    "https://www.instagram.com/alfaconstructioninc/",
    "https://www.facebook.com/alfacarpentrypainting",
  ],
  areaServed: "Massachusetts",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Alfa Construction Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior & Exterior Painting",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Carpentry & Trim Work" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Siding Installation & Repair",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Window & Door Installation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Home Remodeling & Renovation",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "22",
  },
};
