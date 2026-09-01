import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAllProjectSlugs, normalizeImages } from "@/data/projects";
import CTASection from "@/components/CTASection";

const SITE_URL = "https://alfapaintingcarpentry.com";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const heroAbs = `${SITE_URL}${project.image}`;
  return {
    title: `${project.title} | Project Portfolio`,
    description: project.description,
    alternates: { canonical: `${SITE_URL}/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${SITE_URL}/projects/${slug}`,
      images: [{ url: heroAbs, alt: project.title }],
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const images = normalizeImages(project.images);
  const galleryImages = images.filter((img) => img.src !== project.image);

  const relatedProjects = projects
    .filter((p) => p.slug !== slug && p.serviceSlug === project.serviceSlug)
    .slice(0, 3);

  // ─── JSON-LD: CreativeWork (Project) + Place (geo) + ImageGallery ──
  const projectSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // The project itself as a CreativeWork
      {
        "@type": ["CreativeWork", "Article"],
        "@id": `${SITE_URL}/projects/${slug}#project`,
        name: project.title,
        headline: project.title,
        description: project.description,
        url: `${SITE_URL}/projects/${slug}`,
        image: images.map((img) => ({
          "@type": "ImageObject",
          url: `${SITE_URL}${img.src}`,
          caption: img.alt,
          ...(project.geo && {
            contentLocation: {
              "@type": "Place",
              name: project.addressArea || `${project.city}, ${project.state}`,
              geo: { "@type": "GeoCoordinates", latitude: project.geo.lat, longitude: project.geo.lng },
            },
          }),
        })),
        about: {
          "@type": "Service",
          name: project.service,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
        ...(project.geo && {
          contentLocation: {
            "@type": "Place",
            name: project.addressArea || `${project.city}, ${project.state}`,
            address: {
              "@type": "PostalAddress",
              addressLocality: project.city,
              addressRegion: project.state,
              addressCountry: "US",
            },
            geo: { "@type": "GeoCoordinates", latitude: project.geo.lat, longitude: project.geo.lng },
          },
        }),
        author: { "@id": `${SITE_URL}/#organization` },
        creator: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      // Breadcrumb
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projects/${slug}` },
        ],
      },
      // ImageGallery
      {
        "@type": "ImageGallery",
        "@id": `${SITE_URL}/projects/${slug}#gallery`,
        name: `${project.title} — photo gallery`,
        url: `${SITE_URL}/projects/${slug}#gallery`,
        numberOfItems: images.length,
        ...(project.geo && {
          spatialCoverage: {
            "@type": "Place",
            name: project.addressArea || `${project.city}, ${project.state}`,
            geo: { "@type": "GeoCoordinates", latitude: project.geo.lat, longitude: project.geo.lng },
          },
        }),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <section className="pt-40 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/projects" className="inline-flex items-center gap-1 text-alfa-gold hover:text-alfa-gold-light transition-colors text-sm mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Projects
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full">{project.service}</span>
            <span className="text-gray-400 text-sm">
              {project.addressArea ? (
                <>📍 {project.addressArea}</>
              ) : (
                <>{project.city}, {project.state}</>
              )}
            </span>
            {project.geo && (
              <span className="text-gray-400 text-xs font-mono">
                {project.geo.lat.toFixed(4)}°N · {Math.abs(project.geo.lng).toFixed(4)}°W
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-alfa-dark">
        <div className="max-w-5xl mx-auto px-4">
          {/* Hero image */}
          <figure className="rounded-2xl overflow-hidden shadow-xl mb-8">
            <div className="aspect-[16/9] relative">
              <Image
                src={project.image}
                alt={
                  images.find((i) => i.src === project.image)?.alt ||
                  `${project.title} — main project photo`
                }
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1280px"
              />
            </div>
          </figure>

          {/* Before/After */}
          {project.beforeImage && project.afterImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <figure>
                <figcaption className="font-bold text-white mb-2 text-center text-sm tracking-widest uppercase">Before</figcaption>
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg shadow-black/20">
                  <Image
                    src={project.beforeImage}
                    alt={`BEFORE — ${project.title}, ${project.addressArea || `${project.city}, ${project.state}`}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
              </figure>
              <figure>
                <figcaption className="font-bold text-white mb-2 text-center text-sm tracking-widest uppercase">After</figcaption>
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg shadow-black/20">
                  <Image
                    src={project.afterImage}
                    alt={`AFTER — ${project.title}, ${project.addressArea || `${project.city}, ${project.state}`}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
              </figure>
            </div>
          )}

          {/* Description */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{project.description}</p>
          </div>
        </div>
      </section>

      {/* ─── FULL GALLERY ─── */}
      {galleryImages.length > 0 && (
        <section id="gallery" className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <span className="text-alfa-gold text-xs font-semibold tracking-widest uppercase">
                  Full Photo Documentation
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                  Project gallery · <span className="text-gray-400">{images.length} photos</span>
                </h2>
              </div>
              {project.addressArea && (
                <span className="text-gray-400 text-sm">📍 {project.addressArea}</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <figure
                  key={img.src}
                  className="group relative rounded-xl overflow-hidden bg-alfa-card border border-white/5 hover:border-alfa-gold/40 transition-colors"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={img.src}
                      alt={img.alt || `${project.title} — photo ${idx + 1}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                      <span className="text-white text-xs font-semibold tracking-wide">
                        {img.caption}
                      </span>
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-alfa-dark">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((rp) => {
                const rpImages = normalizeImages(rp.images);
                const rpHeroAlt =
                  rpImages.find((i) => i.src === rp.image)?.alt || rp.title;
                return (
                  <Link key={rp.slug} href={`/projects/${rp.slug}`} className="group block">
                    <div className="card-hover bg-alfa-card rounded-2xl border border-white/5 overflow-hidden shadow-lg shadow-black/20">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={rp.image}
                          alt={rpHeroAlt}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-white group-hover:text-alfa-gold transition-colors">{rp.title}</h3>
                        {rp.addressArea && (
                          <span className="text-gray-400 text-xs mt-1 inline-block">📍 {rp.addressArea}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection cityName={project.city} />
    </>
  );
}
