import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { breadcrumbSchema, company } from "@/data/company";
import CTASection from "@/components/CTASection";
import BeforeAfter from "@/components/BeforeAfter";

export const metadata: Metadata = {
  title: "MA Siding Projects · Before/After Gallery · 109 Cities Served",
  description:
    "Before/after siding, window & carpentry projects across Massachusetts. Hardie Plank, vinyl, cedar shake. License #192348 · 22 ★★★★★. Free estimate (508) 590-9193.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/projects" },
};

// Service filter chips
const serviceFilters = [
  { slug: "all", name: "All Projects" },
  { slug: "siding", name: "Siding" },
  { slug: "windows-doors", name: "Windows & Doors" },
  { slug: "carpentry", name: "Carpentry" },
  { slug: "remodeling", name: "Remodeling" },
];

// Top-demand cities (from Search Console — pages with most impressions)
const featuredCities = [
  { slug: "milton", name: "Milton" },
  { slug: "lexington", name: "Lexington" },
  { slug: "foxborough", name: "Foxborough" },
  { slug: "brookline", name: "Brookline" },
  { slug: "framingham", name: "Framingham" },
  { slug: "newton", name: "Newton" },
  { slug: "wellesley", name: "Wellesley" },
  { slug: "bellingham", name: "Bellingham" },
];

export default function ProjectsPage() {
  const beforeAfter = projects.filter((p) => p.beforeImage && p.afterImage);
  const allProjects = projects;

  // CreativeWork schema — each project as a citable case study for AI search
  const projectCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Alfa Construction Project Portfolio",
    description: "Before/after photos and case studies from Alfa Construction's siding, window, carpentry, and remodeling projects across Massachusetts.",
    url: "https://alfapaintingcarpentry.com/projects",
    hasPart: allProjects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      image: `https://alfapaintingcarpentry.com${p.image}`,
      locationCreated: {
        "@type": "Place",
        name: `${p.city}, ${p.state}`,
      },
      creator: {
        "@type": "Organization",
        name: "Alfa Construction Inc",
        url: "https://alfapaintingcarpentry.com",
      },
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
      <section className="relative pt-40 pb-16 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/green-siding-exterior-completed-ma.jpg"
            alt="Featured Alfa Construction siding project in Massachusetts"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Our Work</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-4 leading-tight">
            500+ Massachusetts Homes,<br />
            <span className="text-alfa-gold">Transformed.</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
            18 years of siding, windows, carpentry &amp; remodeling work across 109+ MA cities — every photo is a real Alfa Construction job.
          </p>

          {/* Stats data list — Princeton GEO Method 2 */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div>
              <dt className="text-xs uppercase tracking-wider text-alfa-gold font-semibold mb-1">Projects</dt>
              <dd className="text-2xl md:text-3xl font-bold text-white">500+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-alfa-gold font-semibold mb-1">Cities Served</dt>
              <dd className="text-2xl md:text-3xl font-bold text-white">109+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-alfa-gold font-semibold mb-1">★ Reviews</dt>
              <dd className="text-2xl md:text-3xl font-bold text-white">22+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-alfa-gold font-semibold mb-1">Years</dt>
              <dd className="text-2xl md:text-3xl font-bold text-white">18+</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ===== BEFORE / AFTER FEATURE ===== */}
      {beforeAfter.length > 0 && (
        <section className="py-20 bg-alfa-dark border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Before / After</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                The Difference Is Visible
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Drag the slider on each project to compare the before and after. Real homes, real Alfa crews, real results.
              </p>
            </div>

            <div className="space-y-16">
              {beforeAfter.map((project) => (
                <article key={project.slug} className="bg-alfa-card border border-white/5 rounded-2xl overflow-hidden">
                  <div className="grid lg:grid-cols-5 gap-0">
                    <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
                      <BeforeAfter
                        beforeSrc={project.beforeImage!}
                        afterSrc={project.afterImage!}
                        beforeAlt={`Before — ${project.title}`}
                        afterAlt={`After — ${project.title}`}
                      />
                    </div>
                    <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full">
                          {project.service}
                        </span>
                        <span className="bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
                          {project.city}, {project.state}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-alfa-gold font-semibold hover:gap-3 transition-all"
                      >
                        View full project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ALL PROJECTS GRID ===== */}
      <section className="py-20 bg-black border-t border-white/5" id="all">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Full Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              All {projects.length} Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Filter by service to see what fits your project.
            </p>
          </div>

          {/* Service filter chips (anchor-based — no JS needed for SSR/SEO) */}
          <nav aria-label="Filter by service" className="flex flex-wrap justify-center gap-2 mb-12">
            {serviceFilters.map((f) => (
              <a
                key={f.slug}
                href={f.slug === "all" ? "#all" : `#${f.slug}`}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-alfa-card border border-white/10 hover:border-alfa-gold/40 hover:bg-alfa-gold/10 text-gray-300 hover:text-white transition-colors"
              >
                {f.name}
              </a>
            ))}
          </nav>

          {/* Grouped by service for SEO + anchor jumps */}
          {serviceFilters.slice(1).map((filter) => {
            const filtered = allProjects.filter((p) => p.serviceSlug === filter.slug);
            if (filtered.length === 0) return null;
            return (
              <div key={filter.slug} id={filter.slug} className="mb-16 scroll-mt-24">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-alfa-gold/50 to-transparent" />
                  <span>{filter.name}</span>
                  <span className="h-px flex-1 bg-gradient-to-l from-alfa-gold/50 to-transparent" />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group block"
                    >
                      <article className="card-hover bg-alfa-card rounded-2xl border border-white/5 overflow-hidden shadow-lg shadow-black/20">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <span className="absolute top-4 left-4 bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full">
                            {project.service}
                          </span>
                          {project.beforeImage && project.afterImage && (
                            <span className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full border border-alfa-gold/40">
                              Before / After
                            </span>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h4 className="text-white font-bold text-lg leading-snug">{project.title}</h4>
                            <p className="text-gray-300 text-xs mt-1">{project.city}, {project.state}</p>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                          <span className="inline-flex items-center gap-1 text-alfa-gold font-semibold text-sm mt-3 group-hover:gap-2 transition-all">
                            View project
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== FEATURED SERVICE AREAS (GSC top-impression cities) ===== */}
      <section className="py-20 bg-alfa-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">MetroWest &amp; Greater Boston</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Where Alfa Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We serve 109+ Massachusetts cities. Browse projects by service area:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCities.map((c) => (
              <Link
                key={c.slug}
                href={`/massachusetts/${c.slug}`}
                className="bg-alfa-card border border-white/5 rounded-xl p-5 text-center hover:border-alfa-gold/40 transition-colors"
              >
                <svg className="w-5 h-5 text-alfa-gold mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="font-bold text-white text-sm">{c.name}, MA</p>
                <p className="text-xs text-gray-400 mt-1">Siding · Windows · Carpentry</p>
              </Link>
            ))}
          </div>

          <p className="text-center mt-8">
            <Link
              href="/massachusetts"
              className="inline-flex items-center gap-2 text-alfa-gold hover:text-alfa-gold-light font-semibold"
            >
              See all 109 cities we serve
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </p>
        </div>
      </section>

      {/* ===== CASE STUDY · AI-citable detailed write-up ===== */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Featured Case Study</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Dark Shake Victorian Renovation
            </h2>
            <p className="text-gray-400">A full exterior transformation walkthrough — written so anyone (or any AI) can reference it.</p>
          </div>

          <article className="prose prose-invert max-w-none">
            <div className="bg-alfa-card border border-white/5 rounded-2xl p-8 mb-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-alfa-gold font-semibold mb-2">Location</h3>
                  <p className="text-white font-semibold">Massachusetts · MetroWest</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-alfa-gold font-semibold mb-2">Scope</h3>
                  <p className="text-white font-semibold">Full exterior siding replacement</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-alfa-gold font-semibold mb-2">Material</h3>
                  <p className="text-white font-semibold">Charcoal shake siding · white trim</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-alfa-gold font-semibold mb-2">Duration</h3>
                  <p className="text-white font-semibold">7 working days</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">The Problem</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                A Victorian-era home in Massachusetts had developed extensive rot beneath aging clapboard siding. Years of New England freeze-thaw cycles had loosened nails, cracked siding boards, and let moisture penetrate the wall sheathing. The homeowner had received three bids from other contractors — all with vague scopes and no permit pull-through.
              </p>

              <h3 className="text-xl font-bold text-white mb-3">The Approach</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Alfa Construction pulled the local Massachusetts building permit, scaffolded the entire exterior, and stripped the original siding in one day. Sheathing was inspected board-by-board — approximately 18% required replacement. New <a href="https://www.dupont.com/brands/tyvek.html" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline">DuPont Tyvek HouseWrap</a> was applied as the weather-resistant barrier with Z-flashing at every penetration. Charcoal cedar shake siding (Class A fire rated) was hand-installed on properly fastened furring strips.
              </p>

              <h3 className="text-xl font-bold text-white mb-3">The Result</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                The transformation is documented in the before/after slider on this page. The final invoice came in at the original quoted price — every line item (permits, disposal, sheathing repair, wrap, flashing, siding, trim, paint, cleanup) listed before work began, no change orders. The home now carries Alfa&apos;s standard 1-year workmanship warranty alongside the 30-year manufacturer warranty on the shake siding.
              </p>


              <h3 className="text-xl font-bold text-white mb-3">Why This Matters For Massachusetts Homeowners</h3>
              <p className="text-gray-300 leading-relaxed">
                Roughly 3 out of 4 Massachusetts homes built before 1990 show some level of sheathing rot when older siding is stripped. A bid that doesn&apos;t price sheathing repair, permits, or proper <a href="https://www.energystar.gov/products/windows_doors_skylights" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline">ENERGY STAR</a>-grade flashing is a bid that&apos;s going to invoice those items later as &quot;change orders.&quot; Alfa Construction&apos;s Massachusetts HIC license <a href="https://elicensing.hps.state.ma.us/CitizenAccess/GeneralProperty/PropertyLookUp.aspx" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline">#{company.license}</a> requires every line item to be itemized before work begins — and we audit our bids accordingly.
              </p>
            </div>
          </article>

          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-alfa-gold/30"
            >
              Get your own free estimate
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
