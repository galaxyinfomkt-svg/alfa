import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCityBySlug, cities } from "@/data/cities";
import { company, breadcrumbSchema } from "@/data/company";
import ServiceCard from "@/components/ServiceCard";
import ReviewsWidget from "@/components/ReviewsWidget";
import GoogleMap from "@/components/GoogleMap";
import CTASection from "@/components/CTASection";
import FormEmbed from "@/components/FormEmbed";

/* ---------- hero image rotation (10 images, varied by city) ---------- */

const heroImages = [
  { src: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg", alt: "Exterior siding on Cape Cod home in Bellingham, MA" },
  { src: "/images/siding-window-installation-after-massachusetts.jpg", alt: "Siding and window installation in Massachusetts" },
  { src: "/images/new-construction-siding-windows-board-batten-ma.jpg", alt: "Board and batten siding with new windows in Massachusetts" },
  { src: "/images/porch-soffit-beadboard-siding-modern-home-ma.jpg", alt: "Porch soffit and beadboard siding on modern home in MA" },
  { src: "/images/deck-construction-siding-installation-ma.png", alt: "Deck construction and siding installation in Massachusetts" },
  { src: "/images/commercial-siding-window-installation-massachusetts.jpg", alt: "Commercial siding and window installation in Massachusetts" },
  { src: "/images/deck-carpentry-staircase-railing-massachusetts.png", alt: "Custom deck carpentry with staircase railing in MA" },
  { src: "/images/new-construction-framing-zip-system-massachusetts.jpg", alt: "New construction framing with ZIP system in Massachusetts" },
  { src: "/images/commercial-siding-installation-massachusetts.png", alt: "Commercial siding installation project in Massachusetts" },
  { src: "/images/siding-window-installation-before-massachusetts.jpg", alt: "Home before siding and window renovation in Massachusetts" },
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function getCityHeroImage(slug: string) {
  return heroImages[hashStr(slug) % heroImages.length];
}

/* ---------- static generation for all 100 cities ---------- */

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

/* ---------- dynamic SEO metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Home Improvement Contractor ${city.name} MA | Painting, Carpentry, Siding | Alfa Construction`;
  const description = `Top-rated painting, carpentry, siding, window & door installation, and home remodeling contractor in ${city.name}, Massachusetts. Licensed & insured. ${company.experience} years experience. ${city.county} County. Free estimates. Call ${company.phone}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://alfapaintingcarpentry.com/cities/${city.slug}`,
    },
    alternates: {
      canonical: `https://alfapaintingcarpentry.com/cities/${city.slug}`,
    },
  };
}

/* ---------- services list ---------- */

const servicesList = [
  {
    slug: "painting",
    name: "Interior & Exterior Painting",
    description:
      "Transform your home with premium interior and exterior painting. Expert prep work, flawless finish, and lasting results that boost your curb appeal.",
    icon: "painting",
    cta: "Get Your Free Painting Estimate",
  },
  {
    slug: "carpentry",
    name: "Carpentry & Trim Work",
    description:
      "Fine carpentry, trim replacement, and door installation. Precision craftsmanship to restore and enhance your home's woodwork and details.",
    icon: "carpentry",
    cta: "Schedule Your Carpentry Consultation",
  },
  {
    slug: "siding",
    name: "Siding Installation & Repair",
    description:
      "Hardie Plank, vinyl siding, and full replacement services. Protect your home from New England weather while upgrading its appearance.",
    icon: "siding",
    cta: "Get a Free Siding Quote",
  },
  {
    slug: "windows-doors",
    name: "Window & Door Installation",
    description:
      "Energy-efficient window and door installation. Reduce drafts, lower energy bills, and enhance your home's comfort and security.",
    icon: "windows-doors",
    cta: "Get a Free Window & Door Estimate",
  },
  {
    slug: "remodeling",
    name: "Home Remodeling & Renovation",
    description:
      "Complete home renovation from kitchens to bathrooms. Increase your home's value and livability with our full-service remodeling team.",
    icon: "remodeling",
    cta: "Start Your Remodeling Project",
  },
];

/* ---------- page component ---------- */

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  /* LocalBusiness + city JSON-LD */
  const citySchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: `Professional painting, carpentry, siding, window & door installation, and home remodeling services in ${city.name}, MA.`,
    telephone: company.phoneRaw,
    url: `https://alfapaintingcarpentry.com/cities/${city.slug}`,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: "Massachusetts",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bellingham",
      addressRegion: "MA",
      addressCountry: "US",
    },
  };

  return (
    <>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "https://alfapaintingcarpentry.com" },
          { name: "Massachusetts", url: "https://alfapaintingcarpentry.com/services" },
          { name: `${city.name}, MA`, url: `https://alfapaintingcarpentry.com/cities/${city.slug}` },
        ])) }}
      />

      {/* ===== HERO (split layout with image + form) ===== */}
      {(() => {
        const heroImg = getCityHeroImage(city.slug);
        return (
          <section className="relative pt-32 pb-16 overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={heroImg.src}
                alt={`${heroImg.alt} - serving ${city.name}`}
                fill
                className="object-cover"
                priority
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Left Side */}
                <div>
                  {/* Breadcrumb */}
                  <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5 flex-wrap">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span className="text-gray-600">/</span>
                    <Link href="/services" className="hover:text-white transition-colors">Massachusetts</Link>
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
                    Professional Home Improvement Contractor{" "}
                    <span className="text-alfa-gold">in {city.name}, Massachusetts</span>
                  </h1>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Alfa Construction Inc provides expert painting, carpentry, siding,
                    window &amp; door installation, and home remodeling services to
                    homeowners in {city.name}, Massachusetts. Licensed, insured, and
                    backed by {company.experience} years of experience.
                  </p>

                  {/* Credentials */}
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
                      {city.county} County
                    </span>
                  </div>
                </div>

                {/* Right Side — Form */}
                <div className="bg-[#111111]/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl shadow-black/50">
                  <h2 className="text-xl font-bold text-white mb-1 text-center">
                    Get a Free Estimate in {city.name}
                  </h2>
                  <p className="text-sm text-gray-400 mb-4 text-center">Fill out the form and we&apos;ll contact you within 24 hours</p>
                  <FormEmbed />
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ===== SERVICES IN THIS CITY ===== */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Our Services in {city.name}, MA
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From painting to complete home renovation, Alfa Construction Inc
              delivers quality craftsmanship to {city.name} homeowners. Explore
              our full range of services below.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service) => (
              <ServiceCard
                key={service.slug}
                {...service}
                citySlug={city.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT THIS CITY ===== */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
                Local Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
                About {city.name}, Massachusetts
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                {city.description}
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Homes in {city.name} are predominantly characterized by{" "}
                {city.homeStyle}. Whether you need a fresh coat of paint, trim
                repair, new siding, replacement windows, or a full remodel, our
                team understands the unique architectural needs of{" "}
                {city.name}&apos;s housing stock.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                {city.uniqueFact}
              </p>

              <div className="bg-alfa-card rounded-xl border border-white/5 p-6">
                <h3 className="font-bold text-white mb-3">
                  Quick Facts about {city.name}
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-alfa-gold mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      <strong>Population:</strong> {city.population}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-alfa-gold mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      <strong>County:</strong> {city.county}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-alfa-gold mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      <strong>Home Style:</strong> {city.homeStyle}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-alfa-gold mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      <strong>Community Type:</strong>{" "}
                      {city.category.charAt(0).toUpperCase() +
                        city.category.slice(1)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              {/* Neighboring Cities */}
              <div className="bg-alfa-card rounded-xl border border-white/5 p-6 mb-6">
                <h3 className="font-bold text-white mb-4">
                  We Also Serve Nearby Communities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {city.neighboringCities.map((neighbor) => (
                    <Link
                      key={neighbor}
                      href={`/cities/${neighbor
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="inline-block bg-white/5 border border-white/10 text-gray-300 hover:border-alfa-gold/30 hover:text-alfa-gold text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200"
                    >
                      {neighbor}, MA
                    </Link>
                  ))}
                </div>
              </div>

              {/* Service-specific notes */}
              <div className="bg-alfa-card rounded-xl border border-white/5 p-6">
                <h3 className="font-bold text-white mb-4">
                  Local Service Notes for {city.name}
                </h3>
                <div className="space-y-4">
                  {city.paintingNote && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-alfa-gold/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Painting
                        </p>
                        <p className="text-sm text-gray-400">
                          {city.paintingNote}
                        </p>
                      </div>
                    </div>
                  )}
                  {city.carpentryNote && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-alfa-gold/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Carpentry
                        </p>
                        <p className="text-sm text-gray-400">
                          {city.carpentryNote}
                        </p>
                      </div>
                    </div>
                  )}
                  {city.sidingNote && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-alfa-gold/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Siding
                        </p>
                        <p className="text-sm text-gray-400">
                          {city.sidingNote}
                        </p>
                      </div>
                    </div>
                  )}
                  {city.windowsDoorsNote && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-alfa-gold/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Windows &amp; Doors
                        </p>
                        <p className="text-sm text-gray-400">
                          {city.windowsDoorsNote}
                        </p>
                      </div>
                    </div>
                  )}
                  {city.remodelingNote && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-alfa-gold/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Remodeling
                        </p>
                        <p className="text-sm text-gray-400">
                          {city.remodelingNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Why Alfa Construction
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Why {city.name} Homeowners Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Licensed & Insured",
                text: `We carry full liability insurance and hold MA License ${company.license}. Your ${city.name} home is always protected.`,
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
              {
                title: `${company.experience} Years Experience`,
                text: `With over 18 years serving Massachusetts, we bring unmatched expertise to every ${city.name} project.`,
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Free Estimates",
                text: `We provide detailed, no-obligation estimates for all projects in ${city.name}. Know your costs upfront with no surprises.`,
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Quality Craftsmanship",
                text: `We use premium materials and time-tested techniques to deliver results that stand up to New England's demanding climate.`,
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                ),
              },
              {
                title: "Bilingual Team",
                text: `Our team speaks English and Portuguese, ensuring clear communication with every ${city.name} homeowner.`,
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                ),
              },
              {
                title: "Local Knowledge",
                text: `Based in Bellingham, we know ${city.county} County and ${city.name}'s unique home styles, building codes, and weather challenges.`,
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-alfa-card rounded-2xl border border-white/5 p-8 shadow-lg shadow-black/20"
              >
                <div className="w-14 h-14 bg-alfa-gold/10 rounded-xl flex items-center justify-center text-white mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              What Massachusetts Homeowners Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our 5-star reputation is built on quality work and outstanding
              service across {city.county} County and beyond.
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
              Find Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Serving {city.name} &amp; Surrounding Areas
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Based in Bellingham, MA, Alfa Construction Inc proudly serves{" "}
              {city.name} and all of {city.county} County. Contact us today for
              a free estimate.
            </p>
          </div>
          <GoogleMap />
        </div>
      </section>

      {/* ===== CTA WITH FORM ===== */}
      <CTASection cityName={city.name} />
    </>
  );
}
