import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import CTASection from "@/components/CTASection";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Project Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const relatedProjects = projects
    .filter((p) => p.slug !== slug && p.serviceSlug === project.serviceSlug)
    .slice(0, 3);

  return (
    <>
      <section className="pt-40 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/projects" className="inline-flex items-center gap-1 text-alfa-gold hover:text-alfa-gold-light transition-colors text-sm mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Projects
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
          <div className="flex items-center gap-3">
            <span className="bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full">{project.service}</span>
            <span className="text-gray-400 text-sm">{project.city}, {project.state}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-alfa-dark">
        <div className="max-w-5xl mx-auto px-4">
          {/* Main image */}
          <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
            <div className="aspect-[16/9] relative">
              <Image src={project.image} alt={project.title} fill className="object-cover" priority />
            </div>
          </div>

          {/* Before/After if available */}
          {project.beforeImage && project.afterImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold text-white mb-2 text-center">Before</h3>
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg shadow-black/20">
                  <Image src={project.beforeImage} alt={`Before - ${project.title}`} fill className="object-cover" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2 text-center">After</h3>
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg shadow-black/20">
                  <Image src={project.afterImage} alt={`After - ${project.title}`} fill className="object-cover" />
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((rp) => (
                <Link key={rp.slug} href={`/projects/${rp.slug}`} className="group block">
                  <div className="card-hover bg-alfa-card rounded-2xl border border-white/5 overflow-hidden shadow-lg shadow-black/20">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white group-hover:text-alfa-gold transition-colors">{rp.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection cityName={project.city} />
    </>
  );
}
