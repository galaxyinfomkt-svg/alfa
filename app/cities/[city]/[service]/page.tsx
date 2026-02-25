import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityBySlug, cities } from "@/data/cities";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import { company } from "@/data/company";
import ReviewsWidget from "@/components/ReviewsWidget";
import GoogleMap from "@/components/GoogleMap";
import CTASection from "@/components/CTASection";

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

  const title = `${service.name} in ${city.name}, MA | Alfa Construction Inc`;
  const description = `Professional ${service.name.toLowerCase()} services in ${city.name}, Massachusetts. Licensed & insured contractor with ${company.experience} years experience. Free estimates. Call ${company.phone}.`;

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

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ===== HERO ===== */}
      <section className="pt-32 pb-16 bg-alfa-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-alfa-gold rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-alfa-gold rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <svg
              className="w-3 h-3"
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
            <Link
              href={`/cities/${city.slug}`}
              className="hover:text-white transition-colors"
            >
              {city.name}
            </Link>
            <svg
              className="w-3 h-3"
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
            <span className="text-alfa-gold">{service.shortName}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {service.name}
            <br />
            <span className="text-alfa-gold">in {city.name}, MA</span>
          </h1>
          <p className="text-gray-200 max-w-3xl mx-auto text-lg leading-relaxed">
            {service.description.replace(/\{cityName\}/g, city.name)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-alfa-gold hover:bg-alfa-gold-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg"
            >
              Get a Free {service.shortName} Estimate
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <a
              href={company.phoneTel}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 border border-white/30 text-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call {company.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-alfa-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Licensed &amp; Insured
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-alfa-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {company.experience} Years Experience
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-alfa-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Free Estimates
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-alfa-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Serving {city.name}, MA
            </span>
          </div>
        </div>
      </section>

      {/* ===== UNIQUE CITY + SERVICE INTRO ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              {service.name} in {city.name}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-alfa-blue mt-2 mb-6">
              Professional {service.shortName} for {city.name} Homeowners
            </h2>

            {/* Category-based unique intro paragraph */}
            <p className="text-gray-600 leading-relaxed mb-4">{intro}</p>

            {/* Category-based pain point paragraph */}
            <p className="text-gray-600 leading-relaxed mb-4">{painPoint}</p>

            {/* Category-based solution paragraph */}
            <p className="text-gray-600 leading-relaxed mb-4">{solution}</p>

            {/* City-specific service note */}
            {cityNote && (
              <div className="bg-alfa-blue/5 border-l-4 border-alfa-gold rounded-r-xl p-6 my-8">
                <h3 className="text-lg font-bold text-alfa-blue mb-2">
                  {service.shortName} Note for {city.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">{cityNote}</p>
              </div>
            )}

            {/* Category-based closing paragraph */}
            <p className="text-gray-600 leading-relaxed">{closing}</p>
          </div>
        </div>
      </section>

      {/* ===== PAIN POINTS & SOLUTIONS ===== */}
      <section className="py-20 bg-alfa-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Common Challenges
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-alfa-blue mt-2 mb-4">
              {service.shortName} Challenges We Solve in {city.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pain Points */}
            <div>
              <h3 className="text-xl font-bold text-alfa-blue mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-red-500"
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
                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">
                      {point.replace(/\{cityName\}/g, city.name)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-xl font-bold text-alfa-blue mb-6 flex items-center gap-2">
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
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-alfa-blue mt-2 mb-4">
              Our {service.shortName} Process in {city.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
                  <div className="w-20 h-20 bg-alfa-blue rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 relative z-10 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-alfa-blue mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description.replace(/\{cityName\}/g, city.name)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-20 bg-alfa-blue-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Benefits of Our {service.shortName} in {city.name}
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
                    className="w-5 h-5 text-white"
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
                <p className="text-gray-200 leading-relaxed">
                  {benefit.replace(/\{cityName\}/g, city.name)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQs ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-alfa-blue mt-2 mb-4">
              {service.shortName} Questions from {city.name} Homeowners
            </h2>
          </div>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-alfa-gray rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-alfa-blue hover:text-alfa-gold transition-colors">
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
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer.replace(/\{cityName\}/g, city.name)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OTHER SERVICES IN THIS CITY ===== */}
      <section className="py-20 bg-alfa-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              More Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-alfa-blue mt-2 mb-4">
              Other Services in {city.name}, MA
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              In addition to {service.name.toLowerCase()}, we provide a complete
              range of home improvement services to {city.name} homeowners.
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
                  className="inline-flex items-center gap-2 bg-white hover:bg-alfa-blue hover:text-white text-alfa-blue font-medium px-5 py-3 rounded-lg border border-gray-200 hover:border-alfa-blue transition-all duration-200 shadow-sm"
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
              className="inline-flex items-center gap-1 text-alfa-gold font-semibold hover:text-alfa-blue transition-colors"
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
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-alfa-blue mt-2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
              className="inline-flex items-center gap-2 bg-alfa-blue hover:bg-alfa-blue-light text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>

      {/* ===== GOOGLE MAP ===== */}
      <section className="py-20 bg-alfa-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Service Area
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-alfa-blue mt-2 mb-4">
              {service.shortName} Services Near {city.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
