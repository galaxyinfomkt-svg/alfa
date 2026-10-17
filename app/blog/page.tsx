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

const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
const featured = sorted[0];
const rest = sorted.slice(1);
const fmt = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Blog", url: "https://alfapaintingcarpentry.com/blog" },
      ])) }} />

      <section className="pt-36 md:pt-44 pb-12 bg-paper">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-7xl text-ink mb-4 [text-wrap:balance]">
            Siding Guides for Massachusetts Homeowners
          </h1>
          <p className="text-ink-soft max-w-2xl mx-auto text-lg">
            Plain-English guides on choosing, pricing out and replacing siding in New England, from the team at Alfa Construction.
          </p>

          {/* CTA no hero — antes o primeiro CTA de peso desta pagina caia a
              5,4 telas de scroll (4.528px), bem depois de qualquer scroll razoavel. */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-alfa-gold hover:bg-alfa-gold-light text-ink font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg text-lg"
            >
              Get a Free Siding Estimate
            </Link>
            <a
              href={company.phoneTel}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-mist backdrop-blur-sm hover:bg-line text-ink font-bold px-8 py-4 rounded-lg transition-all duration-300 border border-line text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {company.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-mist">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mais recente em destaque; os outros 6 fecham duas linhas de 3. */}
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-paper rounded-2xl overflow-hidden border border-line hover:border-alfa-gold/40 transition-colors mb-8">
            <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[320px] relative overflow-hidden">
              <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3 group-hover:text-gold-ink transition-colors">{featured.title}</h2>
              <p className="text-sm text-ink-soft mb-4"><time dateTime={featured.date}>{fmt(featured.date)}</time> · {featured.readTime}</p>
              <p className="text-ink-soft leading-relaxed">{featured.excerpt}</p>
            </div>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="card-hover bg-paper rounded-2xl overflow-hidden shadow-lg shadow-ink/10 border border-line h-full">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-alfa-gold text-ink text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-ink-soft mb-2"><time dateTime={post.date}>{fmt(post.date)}</time> · {post.readTime}</p>
                    <h2 className="text-lg font-bold text-ink mb-2 group-hover:text-gold-ink transition-colors">{post.title}</h2>
                    <p className="text-ink-soft text-sm leading-relaxed">{post.excerpt}</p>
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
