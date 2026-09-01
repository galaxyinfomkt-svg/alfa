import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { breadcrumbSchema, company } from "@/data/company";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "MA Siding Guides · Hardie vs Vinyl",
  description:
    "Honest siding guides from Fabio's 20 years across MA — Hardie vs vinyl, contractor red flags. Free estimate: (508) 590-9193.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/blog" },
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Blog", url: "https://alfapaintingcarpentry.com/blog" },
      ])) }} />

      <section className="pt-40 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Our Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Homeowner Tips &amp; Insights
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Expert advice on siding installation, window &amp; door installation, carpentry, and home remodeling from Alfa Construction Inc. Helping Massachusetts homeowners make informed decisions.
          </p>

          {/* CTA no hero — antes o primeiro CTA de peso desta pagina caia a
              5,4 telas de scroll (4.528px), bem depois de qualquer scroll razoavel. */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg text-lg"
            >
              Get a Free Siding Estimate
            </Link>
            <a
              href={company.phoneTel}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 border border-white/30 text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {company.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="card-hover bg-alfa-card rounded-2xl overflow-hidden shadow-lg shadow-black/20 border border-white/5 h-full">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                      <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2 group-hover:text-alfa-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
