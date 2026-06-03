// data/schema.ts — geradores de JSON-LD (schema.org) lendo do siteConfig.
// ─────────────────────────────────────────────────────────────────────────────
//   getLocalBusiness({ city, citySlug })  — GeneralContractor (siding)
//   getService({ city, citySlug })         — Service (siding) na MA ou na cidade
//   getFaqPage(faqs)                        — FAQPage (texto = FAQ visível)
//   getBreadcrumb(items)                    — BreadcrumbList
//   getWebSite()                            — WebSite
// ─────────────────────────────────────────────────────────────────────────────

import { siteConfig as s } from "./siteConfig";

const BUSINESS_ID = `${s.url}/#business`;
type Node = Record<string, unknown>;

function abs(path: string): string {
  return path.startsWith("http") ? path : `${s.url}${path}`;
}

// ── GeneralContractor (especialista em siding) ──────────────────────────────
export function getLocalBusiness(opts?: { city?: string; citySlug?: string }): Node {
  const city = opts?.city;
  const areaServed: Node[] = [{ "@type": "State", name: "Massachusetts" }];
  if (city) areaServed.unshift({ "@type": "City", name: `${city}, MA` });

  const node: Node = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": BUSINESS_ID,
    name: s.name,
    description:
      "Massachusetts siding specialists — complete full-home siding installation and replacement in Hardie Plank fiber cement, vinyl, cedar, and shake. Licensed (MA HIC #192348), insured, 18+ years.",
    serviceType: "Siding Installation & Replacement",
    url:
      city && opts?.citySlug
        ? `${s.url}/massachusetts/${opts.citySlug}`
        : s.url,
    telephone: s.phone,
    email: s.email,
    image: s.image,
    logo: s.logo,
    priceRange: s.priceRange,
    foundingDate: s.foundingDate,
    founder: { "@type": "Person", name: s.founder },
    knowsLanguage: [...s.languages],
    address: {
      "@type": "PostalAddress",
      addressLocality: s.address.addressLocality,
      addressRegion: s.address.addressRegion,
      postalCode: s.address.postalCode,
      addressCountry: s.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: s.geo.latitude,
      longitude: s.geo.longitude,
    },
    areaServed,
    openingHoursSpecification: s.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    identifier: {
      "@type": "PropertyValue",
      name: s.licenseLabel,
      value: s.licenseNumber,
    },
    sameAs: [...s.sameAs],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Siding Installation & Replacement",
      itemListElement: s.sidingMaterials.map((m) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${m} siding installation` },
      })),
    },
  };

  // Só emite a nota se houver contagem REAL (ver aviso no siteConfig).
  if (s.reviewCount) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: s.rating,
      reviewCount: s.reviewCount,
    };
  }
  return node;
}

// ── Service (siding) — home/serviço e variação por cidade ───────────────────
export function getService(opts?: { city?: string; citySlug?: string }): Node {
  const svc = s.services[0]; // siding
  const { city, citySlug } = opts ?? {};
  const url =
    city && citySlug
      ? `${s.url}/massachusetts/${citySlug}`
      : `${s.url}/services/${svc.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city
      ? `Siding Installation & Replacement in ${city}, MA`
      : "Siding Installation & Replacement in Massachusetts",
    serviceType: svc.name,
    url,
    description: svc.description,
    provider: { "@type": "GeneralContractor", "@id": BUSINESS_ID, name: s.name },
    areaServed: city
      ? { "@type": "City", name: `${city}, MA` }
      : { "@type": "State", name: "Massachusetts" },
  };
}

// ── FAQPage ── (texto PRECISA bater com a FAQ visível; ver faqData.ts)
export function getFaqPage(faqs: { q: string; a: string }[]): Node {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// ── BreadcrumbList ──────────────────────────────────────────────────────────
export function getBreadcrumb(items: { name: string; url: string }[]): Node {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

// ── WebSite ─────────────────────────────────────────────────────────────────
export function getWebSite(): Node {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: s.name,
    url: s.url,
    publisher: { "@type": "GeneralContractor", "@id": BUSINESS_ID },
  };
}
