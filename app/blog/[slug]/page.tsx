import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs } from "@/data/blog";
import CTASection from "@/components/CTASection";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <Link href="/blog" className="inline-flex items-center gap-1 text-alfa-gold hover:text-alfa-gold-light transition-colors text-sm mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Blog
            </Link>
            <span className="inline-block bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span>{post.author}</span>
              <span>·</span>
              <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-alfa-dark">
          <div className="max-w-3xl mx-auto px-4">
            <div
              className="prose prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-a:text-alfa-gold prose-strong:text-alfa-gold prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-white/5 text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                  <div className="card-hover bg-alfa-card rounded-2xl overflow-hidden shadow-lg shadow-black/20 border border-white/5">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white group-hover:text-alfa-gold transition-colors text-sm">{rp.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Alfa Construction Inc" },
            publisher: {
              "@type": "Organization",
              name: "Alfa Construction Inc",
              logo: { "@type": "ImageObject", url: "/images/logo.png" },
            },
          }),
        }}
      />
    </>
  );
}
