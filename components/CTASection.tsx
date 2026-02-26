import Link from "next/link";
import { company } from "@/data/company";
import FormEmbed from "./FormEmbed";

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
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
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
          <div>
            <FormEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
