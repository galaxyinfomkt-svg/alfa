import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs } from "@/data/blog";
import { company, breadcrumbSchema, articleSchema } from "@/data/company";
import { fitTitle, fitDescriptionWithTail, stripTrailingPhone } from "@/lib/serpWidth";
import CTASection from "@/components/CTASection";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const title = fitTitle(post.metaTitle, [""]);
  const description = fitDescriptionWithTail(
    stripTrailingPhone(post.metaDescription),
    `Free estimate: ${company.phone}.`,
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }],
    },
    alternates: { canonical: `https://alfapaintingcarpentry.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Blog", url: "https://alfapaintingcarpentry.com/blog" },
        { name: post.title, url: `https://alfapaintingcarpentry.com/blog/${slug}` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
        title: post.title,
        description: post.metaDescription,
        url: `https://alfapaintingcarpentry.com/blog/${slug}`,
        image: post.image,
        datePublished: post.date,
        author: post.author,
      })) }} />
      <article>
        {/* Hero */}
        <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <Link href="/blog" className="inline-flex items-center gap-1 text-alfa-gold hover:text-alfa-gold-light transition-colors text-sm mb-5">
              ← Back to Blog
            </Link>
            <div>
              <span className="inline-block bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight [text-wrap:balance]">
              {post.title}
            </h1>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-400 text-sm mb-6">
              <span className="whitespace-nowrap">{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date} className="whitespace-nowrap">{new Date(post.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">{post.readTime}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-6 py-3 rounded-lg transition-colors">
                Get a Free Siding Estimate
              </Link>
              <a href={company.phoneTel} className="inline-flex items-center justify-center whitespace-nowrap border border-white/30 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-lg transition-colors">
                Call {company.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-alfa-dark">
          <div className="max-w-3xl mx-auto px-4">
            <div
              className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-a:text-alfa-gold prose-strong:text-alfa-gold-light prose-li:marker:text-alfa-gold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {[...new Set(post.tags)].map((tag) => (
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

      <CTASection title="Thinking about new siding?" />
    </>
  );
}
