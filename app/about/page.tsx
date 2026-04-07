import type { Metadata } from "next";
import Image from "next/image";
import { company, breadcrumbSchema } from "@/data/company";
import ReviewsWidget from "@/components/ReviewsWidget";
import GoogleMap from "@/components/GoogleMap";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us | 18+ Years of Construction Excellence in Massachusetts",
  description:
    "Learn about Alfa Construction Inc. Founded by Fabio, we bring 18+ years of siding installation, carpentry, and remodeling expertise to Massachusetts homeowners. Licensed & insured.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "About Us", url: "https://alfapaintingcarpentry.com/about" },
      ])) }} />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            {company.experience} Years of Construction Excellence
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Alfa Construction Inc has been transforming homes across Massachusetts since 2006. Quality craftsmanship, honest service, and results that speak for themselves.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/deck-carpentry-staircase-railing-massachusetts.png"
                  alt="Alfa Construction Inc carpentry work - custom deck staircase and railing in Massachusetts"
                  width={1080}
                  height={1350}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-alfa-gold text-black p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">18+</p>
                <p className="text-sm font-medium">Years Serving MA</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Alfa Construction Inc was founded by Fabio with a simple vision: deliver exceptional quality construction services with integrity and respect. Starting with residential construction projects in the MetroWest area, the company quickly earned a reputation for meticulous attention to detail and outstanding results.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Over 18 years later, Alfa Construction has grown into a full-service home improvement company offering siding installation, carpentry, window and door installation, and complete home remodeling. We now serve over 100 cities across Massachusetts and Southern New Hampshire.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                What hasn&apos;t changed is our commitment to treating every home as if it were our own. Our bilingual team (English &amp; Portuguese) brings professionalism, craftsmanship, and a personal touch to every project — from a single siding repair to a full home renovation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-alfa-card rounded-xl p-4 text-center border border-white/5">
                  <p className="text-2xl font-bold text-alfa-gold">500+</p>
                  <p className="text-sm text-gray-400">Projects Completed</p>
                </div>
                <div className="bg-alfa-card rounded-xl p-4 text-center border border-white/5">
                  <p className="text-2xl font-bold text-alfa-gold">100+</p>
                  <p className="text-sm text-gray-400">Cities Served</p>
                </div>
                <div className="bg-alfa-card rounded-xl p-4 text-center border border-white/5">
                  <p className="text-2xl font-bold text-alfa-gold">5.0</p>
                  <p className="text-sm text-gray-400">Google Rating</p>
                </div>
                <div className="bg-alfa-card rounded-xl p-4 text-center border border-white/5">
                  <p className="text-2xl font-bold text-alfa-gold">18+</p>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Homeowners Choose Alfa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Licensed & Insured",
                description: `Massachusetts License ${company.license} valid through ${company.licenseExpiry}. Fully insured for your complete peace of mind on every project.`,
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                ),
              },
              {
                title: "Quality Craftsmanship",
                description: "Every project receives the same meticulous attention to detail — from careful surface preparation to flawless final finishes. We never cut corners.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                ),
              },
              {
                title: "Honest Communication",
                description: "Clear estimates, realistic timelines, and regular updates throughout your project. No surprises, no hidden fees, no unanswered calls.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                ),
              },
            ].map((value, i) => (
              <div key={i} className="bg-alfa-card rounded-2xl p-8 text-center border border-white/5">
                <div className="w-16 h-16 bg-alfa-gold/10 rounded-xl flex items-center justify-center text-alfa-gold mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {company.reviews.map((review, i) => (
              <div key={i} className="bg-alfa-card rounded-2xl p-6 border border-white/5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">&quot;{review.text}&quot;</p>
                <p className="font-semibold text-white text-sm">— {review.author}</p>
              </div>
            ))}
          </div>
          <ReviewsWidget />
          <div className="text-center mt-8">
            <a href={company.googleReview} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-semibold px-6 py-3 rounded-lg transition-all">
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Our Location</h2>
          <GoogleMap />
        </div>
      </section>

      <CTASection />
    </>
  );
}
