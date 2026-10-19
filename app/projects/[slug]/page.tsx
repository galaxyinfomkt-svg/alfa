import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fitTitle, fitDescriptionWithTail, stripTrailingPhone } from "@/lib/serpWidth";
import { projects, getProjectBySlug, getAllProjectSlugs, normalizeImages, projectLocation } from "@/data/projects";
import { company } from "@/data/company";
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

  // As descriptions destas paginas vinham do texto longo da obra — a maior
  // tinha 4.863px contra um limite de snippet de ~920px. Corta em fronteira
  // de palavra e reanexa o CTA, que antes era o trecho perdido.
  const title = fitTitle(project.title, [" | Project Portfolio", ""]);
  const description = fitDescriptionWithTail(
    stripTrailingPhone(project.description),
    `Free estimate: ${company.phone}.`,
  );

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/projects/${slug}` },
    openGraph: {
      title: project.title,
      description,
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

  const location = project.addressArea || projectLocation(project);

  // Sempre 3 (ou nenhum) para a grade de 3 colunas nao ficar com buraco.
  const related = projects.filter((p) => p.slug !== slug && p.serviceSlug === project.serviceSlug);
  const relatedProjects = related.length >= 3 ? related.slice(0, 3) : [];

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
              name: location,
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
            name: location,
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
            name: location,
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

      <section className="pt-36 md:pt-44 pb-10 md:pb-12 bg-paper">
        <div className="max-w-7xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-soft mb-4">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-gold-ink">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/projects" className="hover:text-gold-ink">Projects</Link></li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl md:text-6xl text-ink mb-3">{project.title}</h1>
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="bg-alfa-gold text-ink text-xs font-semibold px-3 py-1 rounded-full">{project.service}</span>
            <span className="text-ink-soft text-sm">{location}</span>
            {images.length > 1 && (
              <a href="#gallery" className="text-ink-soft text-sm underline underline-offset-4 hover:text-gold-ink">{images.length} photos</a>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap bg-alfa-gold hover:bg-alfa-gold-light text-ink font-bold px-6 py-3 rounded-full transition-colors">
              Get a Free Estimate
            </Link>
            <a href={company.phoneTel} className="inline-flex items-center justify-center whitespace-nowrap bg-mist hover:bg-line text-ink font-bold px-6 py-3 rounded-full transition-colors border border-line">
              Call {company.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-mist">
        <div className="max-w-5xl mx-auto px-4">
          {/* Hero image */}
          <figure className="rounded-[2rem] overflow-hidden shadow-xl mb-8">
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
                <figcaption className="font-bold text-ink mb-2 text-center text-sm tracking-widest uppercase">Before</figcaption>
                <div className="aspect-[4/3] relative rounded-[1.75rem] overflow-hidden shadow-lg shadow-ink/10">
                  <Image
                    src={project.beforeImage}
                    alt={`Before — ${project.title}, ${location}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
              </figure>
              <figure>
                <figcaption className="font-bold text-ink mb-2 text-center text-sm tracking-widest uppercase">After</figcaption>
                <div className="aspect-[4/3] relative rounded-[1.75rem] overflow-hidden shadow-lg shadow-ink/10">
                  <Image
                    src={project.afterImage}
                    alt={`After — ${project.title}, ${location}`}
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
            <h2 className="text-2xl font-bold text-ink mb-4">About This Project</h2>
            <p className="text-ink-soft leading-relaxed text-lg">{project.description}</p>
          </div>
        </div>
      </section>

      {/* ─── FULL GALLERY ─── */}
      {galleryImages.length > 0 && (
        <section id="gallery" className="py-16 bg-paper">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <span className="text-gold-ink text-xs font-semibold tracking-widest uppercase">
                  Full Photo Documentation
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-ink mt-1">
                  Project gallery · <span className="text-ink-soft">{galleryImages.length} more {galleryImages.length === 1 ? "photo" : "photos"}</span>
                </h2>
              </div>
              <span className="text-ink-soft text-sm">{location}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <figure
                  key={img.src}
                  className="group relative rounded-[1.75rem] overflow-hidden bg-card shadow-soft hover:border-alfa-gold/40 transition-colors"
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
        <section className="py-16 bg-mist">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8 text-center">More siding projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((rp) => {
                const rpImages = normalizeImages(rp.images);
                const rpHeroAlt =
                  rpImages.find((i) => i.src === rp.image)?.alt || rp.title;
                return (
                  <Link key={rp.slug} href={`/projects/${rp.slug}`} className="group block">
                    <div className="card-hover bg-paper rounded-2xl border border-line overflow-hidden shadow-lg shadow-ink/10">
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
                        <h3 className="font-bold text-ink group-hover:text-gold-ink transition-colors">{rp.title}</h3>
                        <span className="text-ink-soft text-sm mt-1 inline-block">{projectLocation(rp)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection cityName={project.city === "Massachusetts" ? undefined : project.city} />
    </>
  );
}
