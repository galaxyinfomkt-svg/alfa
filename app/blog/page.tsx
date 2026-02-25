import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Blog | Home Improvement Tips for Massachusetts Homeowners",
  description:
    "Expert advice on painting, carpentry, siding, and home remodeling for Massachusetts homeowners. Tips from Alfa Construction Inc's 18+ years of experience.",
};

export default function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-alfa-blue">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Our Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Homeowner Tips &amp; Insights
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Expert advice on painting, carpentry, siding, and home remodeling from Alfa Construction Inc. Helping Massachusetts homeowners make informed decisions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-alfa-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 h-full">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-alfa-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold text-alfa-blue mb-2 group-hover:text-alfa-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
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
