import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { company, breadcrumbSchema, faqSchema, serviceSchema } from "@/data/company";
import ReviewsWidget from "@/components/ReviewsWidget";
import GoogleMap from "@/components/GoogleMap";
import CTASection from "@/components/CTASection";
import SiteVideo from "@/components/SiteVideo";
import FormEmbed from "@/components/FormEmbed";
import { getAllCitySlugs, getCityBySlug } from "@/data/cities";
import { fitTitle, fitDescriptionWithTail, stripTrailingPhone } from "@/lib/serpWidth";

import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import type { Service } from "@/data/serviceType";

// Adapt the canonical Service (data/services.ts) to this page's view shape.
// Single source of truth — the city x service matrix and the statewide
// service pages now read the SAME content. No duplicated servicesData.
function toView(s: Service) {
  return {
    name: s.name,
    shortName: s.shortName,
    heroImage: s.heroImage,
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription,
    headline: `${s.name} in Massachusetts`,
    subheadline: s.description,
    description: [s.longDescription],
    painPoints: s.painPoints.map((text) => ({ title: "", text })),
    process: s.process,
    benefits: s.benefits,
    cta: s.cta,
    faqs: s.faqs,
    keywords: s.keywords,
  };
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = getServiceBySlug(slug);
  if (!found) return {};
  const service = toView(found);

  const title = fitTitle(service.metaTitle, [""]);
  const description = fitDescriptionWithTail(
    stripTrailingPhone(service.metaDescription),
    `Free estimate: ${company.phone}.`,
  );

  return {
    title,
    description,
    alternates: {
      canonical: `https://alfapaintingcarpentry.com/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://alfapaintingcarpentry.com/services/${slug}`,
      images: [{ url: service.heroImage, width: 1200, height: 630, alt: service.name }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getServiceBySlug(slug);
  if (!found) notFound();
  const service = toView(found);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Services", url: "https://alfapaintingcarpentry.com/services" },
        { name: service.name, url: `https://alfapaintingcarpentry.com/services/${slug}` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({
        name: service.name,
        description: service.metaDescription,
        url: `https://alfapaintingcarpentry.com/services/${slug}`,
        image: `https://alfapaintingcarpentry.com${service.heroImage}`,
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }} />

      {/* Hero (split layout with form) */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Side */}
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-gray-600">/</span>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <span className="text-gray-600">/</span>
                <span className="text-alfa-gold">{service.name}</span>
              </nav>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-alfa-gold text-black text-sm font-bold px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Serving 109+ MA Cities
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

              <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Our Services</span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mt-2 mb-5 leading-tight">{service.headline}</h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{service.subheadline}</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg text-lg">
                  {service.cta}
                </Link>
                <a href={company.phoneTel} className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 border border-white/30 text-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call {company.phone}
                </a>
              </div>
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
              </div>
            </div>

            {/* Right Side — Form */}
            <div>
              <FormEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-4xl mx-auto px-4">
          {service.description.map((para, i) => (
            <p key={i} className="text-gray-300 text-lg leading-relaxed mb-6">{para}</p>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Common Problems We Solve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.painPoints.map((point, i) => (
              <div key={i} className="bg-alfa-card rounded-xl p-6 border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  </div>
                  <div>
                    {point.title ? <h3 className="font-bold text-white mb-1">{point.title}</h3> : null}
                    <p className="text-gray-400 text-sm leading-relaxed">{point.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our {service.shortName} Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {service.process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 bg-alfa-gold text-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-alfa-dark border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Why Choose Alfa Construction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-lg p-4">
                <svg className="w-5 h-5 text-alfa-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span className="text-white text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Standards & Materials (GEO — external citations + technical terms) */}
      <section className="py-20 bg-alfa-dark border-t border-white/5" aria-labelledby="standards-heading">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Verified Standards</span>
            <h2 id="standards-heading" className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Industry Standards &amp; Materials We Use
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every Alfa install meets manufacturer specs, ENERGY STAR efficiency standards, and Massachusetts building code. Verify each independently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-alfa-card border border-white/5 rounded-xl p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">Siding Materials</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                We install <a href="https://www.jameshardie.com/products/hardieplank-lap-siding" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">James Hardie</a> fiber cement (ASTM C1186 Type A Grade II rated, Class A fire rated), premium vinyl siding (ASTM D3679 certified), and authentic cedar shake on a properly fastened <a href="https://www.dupont.com/brands/tyvek.html" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">DuPont Tyvek HouseWrap</a> weather-resistant barrier with Z-flashing at every penetration.
              </p>
            </div>
            <div className="bg-alfa-card border border-white/5 rounded-xl p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">Windows &amp; Energy</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                <a href="https://www.andersenwindows.com/products/windows/" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">Andersen 400 Series</a> windows with low-E glass (U-factor under 0.30, NFRC certified), <a href="https://www.energystar.gov/products/windows_doors_skylights" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">ENERGY STAR</a> qualified for the Northern climate zone. Continuous-wall EnergyShield insulation pairs with windows to deliver R-13 effective wall R-value.
              </p>
            </div>
            <div className="bg-alfa-card border border-white/5 rounded-xl p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">License &amp; Insurance</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Massachusetts Home Improvement Contractor (HIC) license{" "}
                <a href="https://elicensing.hps.state.ma.us/CitizenAccess/GeneralProperty/PropertyLookUp.aspx" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">{company.license}</a>, valid through {company.licenseExpiry}. Verifiable through the MA Division of Professional Licensure. Full general liability and workers&apos; compensation insurance — Certificate of Insurance issued per project.
              </p>
            </div>
            <div className="bg-alfa-card border border-white/5 rounded-xl p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">Code Compliance</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Every project pulled to the local{" "}
                <a href="https://www.mass.gov/info-details/massachusetts-state-building-code-780-cmr" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">MA State Building Code (780 CMR)</a>{" "}
                with proper permits, inspections, and final sign-off. Hardie installs follow manufacturer best practices to maintain the 30-year limited transferable product warranty.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details key={i} className="bg-alfa-card rounded-xl border border-white/5 group">
                <summary className="p-6 cursor-pointer font-semibold text-white flex justify-between items-center">
                  {faq.question}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Customer Reviews</h2>
          <ReviewsWidget />
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">{service.shortName} Service Area</h2>
          <GoogleMap />
        </div>
      </section>

      {/* Cities We Serve - Hub & Spoke Internal Linking */}
      <section className="py-20 bg-alfa-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Service Area</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              {service.shortName} Services Across Massachusetts
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide professional {service.shortName.toLowerCase()} services in 109 cities across Massachusetts. Click your city for local details and a free estimate.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {getAllCitySlugs().map((citySlug) => {
              const city = getCityBySlug(citySlug);
              if (!city) return null;
              return (
                <Link
                  key={citySlug}
                  href={`/massachusetts/${citySlug}/${slug}`}
                  className="inline-block bg-alfa-card hover:bg-alfa-gold hover:text-black text-gray-300 text-sm font-medium px-4 py-2 rounded-full border border-white/10 hover:border-alfa-gold transition-all duration-200"
                >
                  {city.name}, MA
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SiteVideo serviceSlug={slug} placeName="Massachusetts" />

      <CTASection title={`Get Your Free ${service.shortName} Estimate`} />

    </>
  );
}
