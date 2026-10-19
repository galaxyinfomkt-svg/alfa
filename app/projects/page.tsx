import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects, projectLocation } from "@/data/projects";
import { cities } from "@/data/cities";
import { cityDistanceMiles } from "@/data/cityDistances";
import { breadcrumbSchema, company } from "@/data/company";
import CTASection from "@/components/CTASection";
import BeforeAfter from "@/components/BeforeAfter";

export const metadata: Metadata = {
  title: "MA Siding Projects · Before/After Gallery",
  description:
    "Before/after full-home siding projects across Massachusetts — Hardie Plank, vinyl, cedar shake. Free estimate: (508) 590-9193.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/projects" },
};

const nearbyTowns = [...cities]
  .sort((a, b) => (cityDistanceMiles[a.slug] ?? 99) - (cityDistanceMiles[b.slug] ?? 99))
  .slice(0, 12);

export default function ProjectsPage() {
  // Os 3 primeiros antes/depois em destaque; a grade abaixo mostra todos.
  const beforeAfter = projects.filter((p) => p.beforeImage && p.afterImage && p.featured).slice(0, 3);

  const projectCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Alfa Construction Siding Project Portfolio",
    description: "Before/after photos of full-home siding projects by Alfa Construction in Massachusetts.",
    url: "https://alfapaintingcarpentry.com/projects",
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      image: `https://alfapaintingcarpentry.com${p.image}`,
      locationCreated: { "@type": "Place", name: projectLocation(p) },
      creator: { "@type": "Organization", name: "Alfa Construction Inc", url: "https://alfapaintingcarpentry.com" },
      about: p.service,
      url: `https://alfapaintingcarpentry.com/projects/${p.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Projects", url: "https://alfapaintingcarpentry.com/projects" },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectCollectionSchema) }} />

      {/* ===== HERO ===== */}
      <section className="relative pt-36 md:pt-44 pb-12 md:pb-16 bg-paper overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-7xl text-ink mb-4 [text-wrap:balance]">
            Massachusetts Siding Projects
          </h1>
          <p className="text-ink-soft max-w-2xl mx-auto text-lg mb-8">
            Full-home re-sides by our own crew — every photo on this page is a real Alfa Construction job.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap bg-alfa-gold hover:bg-alfa-gold-light text-ink font-bold px-7 py-4 rounded-lg transition-colors text-lg">
              Get a Free Estimate
            </Link>
            <a href={company.phoneTel} className="inline-flex items-center justify-center whitespace-nowrap bg-mist hover:bg-line text-ink font-bold px-7 py-4 rounded-lg transition-colors border border-line text-lg">
              Call {company.phone}
            </a>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div><dt className="text-sm text-ink-soft mb-1">In business since</dt><dd className="text-2xl md:text-3xl font-bold text-ink">2006</dd></div>
            <div><dt className="text-sm text-ink-soft mb-1">Google rating</dt><dd className="text-2xl md:text-3xl font-bold text-ink">5.0</dd></div>
            <div><dt className="text-sm text-ink-soft mb-1">Google reviews</dt><dd className="text-2xl md:text-3xl font-bold text-ink">{company.reviewCount}</dd></div>
            <div><dt className="text-sm text-ink-soft mb-1">MA HIC</dt><dd className="text-2xl md:text-3xl font-bold text-ink">{company.license}</dd></div>
          </dl>
        </div>
      </section>

      {/* ===== BEFORE / AFTER ===== */}
      {beforeAfter.length > 0 && (
        <section className="py-16 md:py-20 bg-mist border-t border-line">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mt-2 mb-3">Drag to compare</h2>
            </div>
            <div className="space-y-10">
              {beforeAfter.map((project) => (
                <article key={project.slug} className="bg-paper border border-line rounded-2xl overflow-hidden">
                  <div className="grid lg:grid-cols-5">
                    <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[440px]">
                      <BeforeAfter beforeSrc={project.beforeImage!} afterSrc={project.afterImage!} beforeAlt={`Before — ${project.title}`} afterAlt={`After — ${project.title}`} />
                    </div>
                    <div className="lg:col-span-2 p-6 md:p-10 flex flex-col justify-center">
                      <p className="text-sm text-ink-soft mb-3">{projectLocation(project)}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-ink mb-4 leading-tight">{project.title}</h3>
                      <p className="text-ink-soft leading-relaxed mb-6 line-clamp-5">{project.description}</p>
                      <Link href={`/projects/${project.slug}`} className="text-gold-ink font-semibold hover:text-gold-ink">View the full project →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ALL PROJECTS ===== */}
      <section className="py-16 md:py-20 bg-paper border-t border-line" id="all">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3">All {projects.length} projects</h2>
            <p className="text-ink-soft max-w-2xl mx-auto">Hardie Plank, vinyl, cedar shake, clapboard and board &amp; batten — residential and commercial.</p>
          </div>
          {/* O primeiro ocupa a linha inteira; os outros 12 fecham linhas de 2 e de 3 sem card sozinho. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={`group block ${i === 0 ? "md:col-span-2 lg:col-span-3" : ""}`}>
                <article className="h-full bg-paper rounded-2xl border border-line overflow-hidden hover:border-alfa-gold/40 transition-colors">
                  <div className={`${i === 0 ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"} relative overflow-hidden`}>
                    <Image src={project.image} alt={project.title} fill sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    {project.beforeImage && project.afterImage && (
                      <span className="absolute top-4 right-4 bg-paper text-ink text-xs font-semibold px-3 py-1 rounded-full">Before &amp; after</span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-ink font-bold text-lg leading-snug group-hover:text-gold-ink transition-colors">{project.title}</h3>
                    <p className="text-sm text-ink-soft mt-1">{projectLocation(project)}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREA ===== */}
      <section className="py-16 md:py-20 bg-mist border-t border-line">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3">Where we work</h2>
          <p className="text-ink-soft max-w-2xl mx-auto mb-8">Based in Bellingham, we re-side homes across MetroWest, Worcester County and Norfolk County.</p>
          <ul className="flex flex-wrap justify-center gap-2 mb-8">
            {nearbyTowns.map((c) => (
              <li key={c.slug}>
                <Link href={`/massachusetts/${c.slug}`} className="inline-block bg-paper border border-line text-ink-soft hover:border-alfa-gold/40 hover:text-gold-ink text-sm px-4 py-2 rounded-full transition-colors">{c.name}</Link>
              </li>
            ))}
          </ul>
          <Link href="/massachusetts" className="text-gold-ink font-semibold hover:text-gold-ink">See the full service area →</Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
