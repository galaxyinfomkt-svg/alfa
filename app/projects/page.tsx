import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { breadcrumbSchema } from "@/data/company";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Our Projects | Portfolio of Painting, Carpentry & Remodeling Work",
  description:
    "View Alfa Construction Inc's portfolio of completed projects across Massachusetts. Painting, carpentry, siding, window installation, and home remodeling.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Projects", url: "https://alfapaintingcarpentry.com/projects" },
      ])) }} />

      <section className="pt-32 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Our Work</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Project Portfolio
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Browse our completed projects across Massachusetts. Each project showcases our commitment to quality craftsmanship and attention to detail.
          </p>
        </div>
      </section>

      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="card-hover bg-alfa-card rounded-2xl border border-white/5 overflow-hidden shadow-lg shadow-black/20">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-alfa-gold text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {project.service}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-lg">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-alfa-gold font-semibold text-sm mt-3 group-hover:gap-2 transition-all">
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
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
