import Link from "next/link";
import Image from "next/image";
import { company, localBusinessSchema, breadcrumbSchema } from "@/data/company";
import ServiceCard from "@/components/ServiceCard";
import ReviewsWidget from "@/components/ReviewsWidget";
import GoogleMap from "@/components/GoogleMap";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import FormEmbed from "@/components/FormEmbed";

const services = [
  {
    slug: "carpentry",
    name: "Carpentry & Trim Work",
    description: "Fine carpentry, trim replacement, and door installation. Precision craftsmanship to restore and enhance your home's woodwork and details.",
    icon: "carpentry",
    cta: "Schedule Your Carpentry Consultation",
  },
  {
    slug: "siding",
    name: "Siding Installation & Repair",
    description: "Hardie Plank, vinyl siding, and full replacement services. Protect your home from New England weather while upgrading its appearance.",
    icon: "siding",
    cta: "Get a Free Siding Quote",
  },
  {
    slug: "windows-doors",
    name: "Window & Door Installation",
    description: "Energy-efficient window and door installation. Reduce drafts, lower energy bills, and enhance your home's comfort and security.",
    icon: "windows-doors",
    cta: "Get a Free Window & Door Estimate",
  },
  {
    slug: "remodeling",
    name: "Home Remodeling & Renovation",
    description: "Complete home renovation from kitchens to bathrooms. Increase your home's value and livability with our full-service remodeling team.",
    icon: "remodeling",
    cta: "Start Your Remodeling Project",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Schema.org LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
      ])) }} />

      {/* ===== HERO SECTION (RS Development split layout) ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/dark-shake-siding-renovation-after-ma.jpg"
            alt="Professional dark shake siding renovation by Alfa Construction Inc in Massachusetts"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-44 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Side — Badges + Heading */}
            <div>
              {/* Badges */}
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

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                #1{" "}
                <span className="text-alfa-gold">Siding Installation</span>{" "}
                Contractor in Massachusetts
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                Expert <strong className="text-white">siding installation</strong>, window &amp; door replacement, carpentry, and complete home remodeling across Massachusetts. Our {company.experience}-year legacy of craftsmanship delivers results that exceed expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={company.phoneTel}
                  className="inline-flex items-center justify-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl text-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call {company.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 border border-white/30 text-lg"
                >
                  Get Free Estimate
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>

            {/* Right Side — Contact Form */}
            <div>
              <FormEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="py-8 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-alfa-gold/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-alfa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <p className="font-bold text-white text-sm">Licensed &amp; Insured</p>
              <p className="text-xs text-gray-400">MA License {company.license}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-alfa-gold/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-alfa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="font-bold text-white text-sm">18+ Years Experience</p>
              <p className="text-xs text-gray-400">Trusted since 2006</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-alfa-gold/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <p className="font-bold text-white text-sm">5-Star Rated</p>
              <p className="text-xs text-gray-400">22+ Google Reviews</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-alfa-gold/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-alfa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="font-bold text-white text-sm">Free Estimates</p>
              <p className="text-xs text-gray-400">No obligation quotes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="py-20 bg-alfa-dark" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Our Professional Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From siding installation to complete home renovation, Alfa Construction Inc delivers quality craftsmanship backed by {company.experience} years of experience across Massachusetts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 100}>
                <ServiceCard {...service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-20 bg-black border-t border-white/5" id="about">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">About Alfa Construction</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
                {company.experience} Years of Construction Excellence in Massachusetts
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Founded by Fabio, Alfa Construction Inc has been serving Massachusetts homeowners for over 18 years. What started as a passion for quality craftsmanship has grown into one of the most trusted siding and construction companies in the state.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                We specialize in siding installation, window and door replacement, carpentry and trim work, and complete home remodeling. Our bilingual team (English &amp; Portuguese) brings attention to detail, professionalism, and respect to every project.
              </p>
              <ul className="space-y-3 mb-8">
                {company.differentials.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-alfa-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Learn More About Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                <Image
                  src="/images/green-siding-exterior-completed-ma.jpg"
                  alt="Alfa Construction Inc siding project - green siding and deck build in Massachusetts"
                  width={600}
                  height={500}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-alfa-gold text-black p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">18+</p>
                <p className="text-sm font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section className="py-20 bg-alfa-dark border-t border-white/5" id="portfolio">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Recent Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See the quality of our work across Massachusetts. Each project reflects our commitment to excellence and attention to detail.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Exterior Siding – Bellingham, MA", service: "Siding", img: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg" },
              { title: "Commercial Siding – Massachusetts", service: "Siding", img: "/images/commercial-siding-installation-massachusetts.png" },
              { title: "Deck Carpentry – Massachusetts", service: "Carpentry", img: "/images/deck-carpentry-staircase-railing-massachusetts.png" },
              { title: "Deck & Siding Remodel – Massachusetts", service: "Remodeling", img: "/images/deck-construction-siding-installation-ma.png" },
              { title: "Siding & Windows – Massachusetts", service: "Siding", img: "/images/siding-window-installation-after-massachusetts.jpg" },
              { title: "Board & Batten Siding – MA", service: "Siding", img: "/images/new-construction-siding-windows-board-batten-ma.jpg" },
            ].map((project, i) => (
              <Link key={i} href="/projects" className="group relative block rounded-xl overflow-hidden shadow-lg shadow-black/20 border border-white/5">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    quality={60}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {project.service}
                    </span>
                    <h3 className="text-white font-bold text-lg">{project.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl p-8">
                <p className="text-4xl md:text-5xl font-bold text-gold-gradient">18+</p>
                <p className="text-gray-400 mt-2 text-sm">Years Experience</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-8">
                <p className="text-4xl md:text-5xl font-bold text-gold-gradient">109+</p>
                <p className="text-gray-400 mt-2 text-sm">Cities Served</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="glass-card rounded-2xl p-8">
                <p className="text-4xl md:text-5xl font-bold text-gold-gradient">500+</p>
                <p className="text-gray-400 mt-2 text-sm">Projects Completed</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="glass-card rounded-2xl p-8">
                <p className="text-4xl md:text-5xl font-bold text-gold-gradient">5.0</p>
                <p className="text-gray-400 mt-2 text-sm">Google Rating</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS SECTION ===== */}
      <section className="py-20 bg-black border-t border-white/5" id="reviews">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real reviews from real Massachusetts homeowners. Our 5-star reputation is built on quality work and outstanding service.
            </p>
          </div>

          {/* Manual reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {company.reviews.map((review, i) => (
              <div key={i} className="bg-alfa-card rounded-2xl p-6 shadow-md shadow-black/10 border border-white/5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-alfa-gold rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{review.author}</p>
                    <p className="text-xs text-gray-400">{review.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reviews Widget */}
          <ReviewsWidget />

          <div className="text-center mt-8">
            <a
              href={company.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>

      {/* ===== GOOGLE MAPS SECTION ===== */}
      <section className="py-20 bg-alfa-dark border-t border-white/5" id="service-area">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Coverage Area</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Our Service Area
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Based in Bellingham, MA, we proudly serve 109 cities across Massachusetts and Southern New Hampshire.
            </p>
          </div>
          <GoogleMap />
        </div>
      </section>

      {/* ===== BLOG SECTION ===== */}
      <section className="py-20 bg-black border-t border-white/5" id="blog">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">From Our Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Homeowner Tips &amp; Insights
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                slug: "hardie-plank-vs-vinyl-siding-new-england",
                title: "Hardie Plank vs Vinyl Siding: Which is Better for New England?",
                excerpt: "A comprehensive comparison of the two most popular siding options for homes in Massachusetts and New England.",
                date: "February 10, 2025",
                category: "Siding",
                img: "/images/siding-window-installation-after-massachusetts.jpg",
              },
              {
                slug: "why-licensed-contractor-massachusetts-matters",
                title: "Why Hiring a Licensed Contractor in MA Matters",
                excerpt: "Understanding the importance of working with licensed and insured contractors for your Massachusetts home project.",
                date: "October 15, 2024",
                category: "General",
                img: "/images/porch-soffit-beadboard-siding-modern-home-ma.jpg",
              },
            ].map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="card-hover bg-alfa-card rounded-2xl overflow-hidden shadow-lg shadow-black/20 border border-white/5">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-alfa-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-alfa-gold transition-colors"
            >
              View All Blog Posts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION WITH FORM ===== */}
      <CTASection />
    </>
  );
}
