import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  cityName?: string;
}

export default function CTASection({ title, subtitle, cityName }: CTASectionProps) {
  const heading = title || (cityName
    ? `Ready to Start Your Project in ${cityName}?`
    : "Ready to Start Your Project?");
  const sub = subtitle || `Contact Alfa Construction Inc today for a free estimate. Licensed & insured with ${company.experience} years of experience serving Massachusetts homeowners.`;

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-alfa-gold rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-alfa-gold rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      </div>
      <div className="absolute inset-0 border-t border-white/5" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {heading}
            </h2>
            <div className="gold-line mb-6" />
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={company.phoneTel}
                className="inline-flex items-center justify-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-alfa-gold/20 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call {company.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-alfa-gold/30 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-white/10 text-lg"
              >
                Get Free Estimate
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Licensed & Insured
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {company.experience} Years Experience
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Free Estimates
              </span>
            </div>
          </div>

          {/* Right column — testimonial card (replaces the duplicate form to comply
              with A2P 10DLC: one phone-collecting form per page max) */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <Image
                src="/images/exterior-siding-cape-cod-home-bellingham-ma.jpg"
                alt="Alfa Construction siding installation in Massachusetts"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="flex gap-1 mb-3 text-alfa-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white text-lg md:text-xl font-medium leading-snug mb-3">
                  &ldquo;The painting was very well done in a high-end home. Highly recommend Fabio and his team.&rdquo;
                </p>
                <p className="text-alfa-gold font-semibold text-sm">— John S., MA</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-alfa-gold text-black px-4 py-2 rounded-full font-bold text-sm shadow-xl">
              ★ 5.0 · 22 Google Reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
