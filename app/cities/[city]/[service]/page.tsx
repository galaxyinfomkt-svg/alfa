import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCityBySlug, cities, getExtendedNearbyCities } from "@/data/cities";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import { company, breadcrumbSchema } from "@/data/company";
import ReviewsWidget from "@/components/ReviewsWidget";
import GoogleMap from "@/components/GoogleMap";
import CTASection from "@/components/CTASection";
import FormEmbed from "@/components/FormEmbed";

/* ---------- hero image rotation by service + city ---------- */

const serviceHeroImages: Record<string, { src: string; alt: string }[]> = {
  painting: [
    { src: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg", alt: "Exterior painting and siding on Cape Cod home" },
    { src: "/images/porch-soffit-beadboard-siding-modern-home-ma.jpg", alt: "Porch soffit and beadboard painting on modern home" },
    { src: "/images/siding-window-installation-before-massachusetts.jpg", alt: "Home exterior before professional painting" },
  ],
  carpentry: [
    { src: "/images/deck-carpentry-staircase-railing-massachusetts.png", alt: "Custom deck carpentry with staircase and railing" },
    { src: "/images/deck-construction-siding-installation-ma.png", alt: "Deck construction and carpentry project" },
    { src: "/images/new-construction-framing-zip-system-massachusetts.jpg", alt: "New construction framing and carpentry work" },
  ],
  siding: [
    { src: "/images/new-construction-siding-windows-board-batten-ma.jpg", alt: "Board and batten siding installation" },
    { src: "/images/commercial-siding-installation-massachusetts.png", alt: "Commercial siding installation project" },
    { src: "/images/commercial-siding-window-installation-massachusetts.jpg", alt: "Siding and window installation project" },
    { src: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg", alt: "Cape Cod home siding replacement" },
  ],
  "windows-doors": [
    { src: "/images/siding-window-installation-after-massachusetts.jpg", alt: "Window installation completed project" },
    { src: "/images/new-construction-siding-windows-board-batten-ma.jpg", alt: "New windows with board and batten siding" },
    { src: "/images/commercial-siding-window-installation-massachusetts.jpg", alt: "Window and siding installation" },
  ],
  remodeling: [
    { src: "/images/deck-construction-siding-installation-ma.png", alt: "Home remodeling with deck and siding" },
    { src: "/images/porch-soffit-beadboard-siding-modern-home-ma.jpg", alt: "Modern home remodel with porch update" },
    { src: "/images/new-construction-framing-zip-system-massachusetts.jpg", alt: "Home renovation framing stage" },
    { src: "/images/siding-window-installation-after-massachusetts.jpg", alt: "Complete home renovation result" },
  ],
};

/* ---------- helpers for unique content rotation ---------- */

/**
 * Simple deterministic hash from a string, used to pick different content
 * variants for cities that share the same category.  This ensures that
 * e.g. two "suburban" cities do NOT get identical paragraph text.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // convert to 32-bit int
  }
  return Math.abs(hash);
}

/** Pick a variant from an array using the city slug as seed */
function pickVariant<T>(arr: T[], citySlug: string, offset = 0): T {
  const idx = (hashString(citySlug) + offset) % arr.length;
  return arr[idx];
}

/** Replace {cityName} placeholder with the real city name */
function fillCity(text: string, cityName: string): string {
  return text.replace(/\{cityName\}/g, cityName);
}

/* ---------- service note key map ---------- */

type CityNoteKey = "paintingNote" | "carpentryNote" | "sidingNote" | "windowsDoorsNote" | "remodelingNote";

const serviceNoteMap: Record<string, CityNoteKey> = {
  painting: "paintingNote",
  carpentry: "carpentryNote",
  siding: "sidingNote",
  "windows-doors": "windowsDoorsNote",
  remodeling: "remodelingNote",
};

/* ---------- static params: 100 cities x 5 services = 500 pages ---------- */

export async function generateStaticParams() {
  const serviceSlugs = getAllServiceSlugs();
  return cities.flatMap((city) =>
    serviceSlugs.map((serviceSlug) => ({
      city: city.slug,
      service: serviceSlug,
    }))
  );
}

/* ---------- dynamic SEO metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) return {};

  const title = `${service.name} ${city.name} MA | Licensed ${service.shortName} Contractor | Alfa Construction`;
  const description = `Professional ${service.name.toLowerCase()} services in ${city.name}, Massachusetts. Licensed & insured contractor with ${company.experience} years experience. ${city.county} County expert. Free estimates. Call ${company.phone}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://alfapaintingcarpentry.com/cities/${city.slug}/${service.slug}`,
    },
    alternates: {
      canonical: `https://alfapaintingcarpentry.com/cities/${city.slug}/${service.slug}`,
    },
  };
}

/* ---------- page component ---------- */

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  /* ---- category-based unique content ---- */
  const cat = city.category;

  const intro = fillCity(
    pickVariant(service.cityIntros[cat], city.slug, 0),
    city.name
  );
  const painPoint = fillCity(
    pickVariant(service.cityPainPoints[cat], city.slug, 1),
    city.name
  );
  const solution = fillCity(
    pickVariant(service.citySolutions[cat], city.slug, 2),
    city.name
  );
  const closing = fillCity(
    pickVariant(service.cityClosings[cat], city.slug, 3),
    city.name
  );

  /* ---- city-specific service note ---- */
  const noteKey = serviceNoteMap[service.slug];
  const cityNote = noteKey ? city[noteKey] : null;

  /* ---- hero image (varied by service + city) ---- */
  const heroImgs = serviceHeroImages[service.slug] || serviceHeroImages.painting;
  const heroImg = heroImgs[hashString(city.slug) % heroImgs.length];

  /* ---- JSON-LD schemas ---- */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}, MA`,
    description: `Professional ${service.name.toLowerCase()} services in ${city.name}, Massachusetts by Alfa Construction Inc.`,
    provider: {
      "@type": "LocalBusiness",
      name: company.name,
      telephone: company.phoneRaw,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bellingham",
        addressRegion: "MA",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: "Massachusetts",
      },
    },
    url: `https://alfapaintingcarpentry.com/cities/${city.slug}/${service.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question.replace(/\{cityName\}/g, city.name),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/\{cityName\}/g, city.name),
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Get ${service.name} in ${city.name}, Massachusetts`,
    description: `Step-by-step process for getting professional ${service.name.toLowerCase()} services in ${city.name}, MA from Alfa Construction Inc.`,
    step: service.process.map((step) => ({
      "@type": "HowToStep",
      position: step.step,
      name: step.title,
      text: step.description.replace(/\{cityName\}/g, city.name),
    })),
    totalTime: "P7D",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "Free Estimate",
    },
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "https://alfapaintingcarpentry.com" },
          { name: "Massachusetts", url: "https://alfapaintingcarpentry.com/services" },
          { name: service.name, url: `https://alfapaintingcarpentry.com/services/${service.slug}` },
          { name: `${city.name}, MA`, url: `https://alfapaintingcarpentry.com/cities/${city.slug}/${service.slug}` },
        ])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ===== HERO (split layout with background image + form) ===== */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImg.src}
            alt={`${heroImg.alt} in ${city.name}, MA`}
            fill
            className="object-cover"
            priority
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Side — Breadcrumb + Badges + Heading */}
            <div>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-gray-600">/</span>
                <Link href="/services" className="hover:text-white transition-colors">Massachusetts</Link>
                <span className="text-gray-600">/</span>
                <Link href={`/services/${service.slug}`} className="hover:text-white transition-colors">{service.name}</Link>
                <span className="text-gray-600">/</span>
                <span className="text-alfa-gold">{city.name}, MA</span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-alfa-gold text-black text-sm font-bold px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Serving {city.name}, MA
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20">
                  <span className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </span>
                  5 (22+ reviews)
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mb-5 leading-tight">
                Professional{" "}
                <span className="text-alfa-gold">{service.shortName}</span>{" "}
                Contractor in {city.name}, MA
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {service.description.replace(/\{cityName\}/g, city.name)}
              </p>

              {/* E-E-A-T Credentials inline */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Licensed {company.license}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {company.experience} Years
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Free Estimates
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Fully Insured
                </span>
              </div>
            </div>

            {/* Right Side — Contact Form */}
            <div className="bg-[#111111]/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl shadow-black/50">
              <h2 className="text-xl font-bold text-white mb-1 text-center">
                Get a Free {service.shortName} Estimate
              </h2>
              <p className="text-sm text-gray-400 mb-4 text-center">in {city.name}, MA</p>
              <FormEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* ===== UNIQUE CITY + SERVICE INTRO ===== */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              {service.name} in {city.name}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
              Why Choose Professional {service.shortName} in {city.name}, Massachusetts?
            </h2>

            {/* Category-based unique intro paragraph */}
            <p className="text-gray-400 leading-relaxed mb-4">{intro}</p>

            {/* Category-based pain point paragraph */}
            <p className="text-gray-400 leading-relaxed mb-4">{painPoint}</p>

            {/* Category-based solution paragraph */}
            <p className="text-gray-400 leading-relaxed mb-4">{solution}</p>

            {/* City-specific service note */}
            {cityNote && (
              <div className="bg-white/5 border-l-4 border-alfa-gold rounded-r-xl p-6 my-8">
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.shortName} Note for {city.name}
                </h3>
                <p className="text-gray-300 leading-relaxed">{cityNote}</p>
              </div>
            )}

            {/* Category-based closing paragraph */}
            <p className="text-gray-400 leading-relaxed">{closing}</p>
          </div>
        </div>
      </section>

      {/* ===== PAIN POINTS & SOLUTIONS ===== */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Common Challenges
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              What Are Common {service.shortName} Problems in {city.name}, MA?
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pain Points */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                Common Problems
              </h3>
              <ul className="space-y-4">
                {service.painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 leading-relaxed">
                      {point.replace(/\{cityName\}/g, city.name)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Our Solutions
              </h3>
              <ul className="space-y-4">
                {service.solutions.map((sol, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 leading-relaxed">
                      {sol.replace(/\{cityName\}/g, city.name)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS STEPS ===== */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              How Does {service.shortName} Work in {city.name}, MA?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We follow a proven step-by-step process to deliver outstanding{" "}
              {service.name.toLowerCase()} results for every {city.name}{" "}
              homeowner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {step.step < service.process.length && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-0.5 bg-alfa-gold/20" />
                )}
                <div className="text-center">
                  <div className="w-20 h-20 bg-alfa-gold rounded-2xl flex items-center justify-center text-black text-2xl font-bold mx-auto mb-4 relative z-10 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description.replace(/\{cityName\}/g, city.name)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              What Are the Benefits of Professional {service.shortName} in {city.name}?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white/5 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="w-10 h-10 bg-alfa-gold rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.replace(/\{cityName\}/g, city.name)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQs ===== */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Frequently Asked Questions About {service.shortName} in {city.name}, MA
            </h2>
          </div>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-alfa-card border border-white/5 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-white hover:text-alfa-gold transition-colors">
                  <span className="pr-4">
                    {faq.question.replace(/\{cityName\}/g, city.name)}
                  </span>
                  <svg
                    className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                  {faq.answer.replace(/\{cityName\}/g, city.name)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OTHER SERVICES IN THIS CITY ===== */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              More Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Other Services in {city.name}, MA
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Many {city.name} homeowners who invest in {service.name.toLowerCase()} also benefit
              from our other professional home improvement services. Bundle services for the best value.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { slug: "painting", name: "Interior & Exterior Painting" },
              { slug: "carpentry", name: "Carpentry & Trim Work" },
              { slug: "siding", name: "Siding Installation & Repair" },
              { slug: "windows-doors", name: "Window & Door Installation" },
              { slug: "remodeling", name: "Home Remodeling & Renovation" },
            ]
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/cities/${city.slug}/${s.slug}`}
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 hover:border-alfa-gold/30 hover:text-alfa-gold font-medium px-5 py-3 rounded-lg transition-all duration-200 shadow-md shadow-black/10"
                >
                  {s.name}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href={`/cities/${city.slug}`}
              className="inline-flex items-center gap-1 text-alfa-gold font-semibold hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to all services in {city.name}
            </Link>
            <span className="mx-3 text-gray-600">|</span>
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-1 text-alfa-gold font-semibold hover:text-white transition-colors"
            >
              Learn more about our {service.shortName} services statewide
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEIGHBORING CITIES ===== */}
      {(() => {
        const nearbyCities = getExtendedNearbyCities(city.slug, 8);
        return nearbyCities.length > 0 ? (
          <section className="py-16 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {service.shortName} Services Near {city.name}, Massachusetts
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  We also provide professional {service.name.toLowerCase()} in cities near {city.name}, MA. Serving all of {city.county} County and surrounding areas.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/cities/${nearbyCity.slug}/${service.slug}`}
                    className="inline-block bg-alfa-card hover:bg-alfa-gold hover:text-black text-gray-300 text-sm font-medium px-4 py-2 rounded-full border border-white/10 hover:border-alfa-gold transition-all duration-200"
                  >
                    {service.shortName} in {nearbyCity.name}, MA
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null;
      })()}

      {/* ===== REVIEWS ===== */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real reviews from Massachusetts homeowners who trust Alfa
              Construction Inc for their {service.name.toLowerCase()} projects.
            </p>
          </div>
          <ReviewsWidget />
          <div className="text-center mt-8">
            <a
              href={company.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>

      {/* ===== GOOGLE MAP ===== */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Service Area
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Service Area: {city.name}, Massachusetts
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Based in Bellingham, MA, Alfa Construction Inc provides{" "}
              {service.name.toLowerCase()} services to {city.name} and all
              surrounding {city.county} County communities.
            </p>
          </div>
          <GoogleMap />
        </div>
      </section>

      {/* ===== CTA WITH FORM ===== */}
      <CTASection
        cityName={city.name}
        title={`Get a Free ${service.shortName} Estimate in ${city.name}`}
        subtitle={`Ready for professional ${service.name.toLowerCase()} in ${city.name}, MA? Contact Alfa Construction Inc today. Licensed (${company.license}), insured, and backed by ${company.experience} years of experience.`}
      />
    </>
  );
}
