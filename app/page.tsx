import Link from "next/link";
import Image from "next/image";
import { company, breadcrumbSchema } from "@/data/company";
import { getFaqPage, getOrganizationRating } from "@/data/schema";
import { homeFaqs } from "@/data/faqData";
import ReviewsSSR from "@/components/ReviewsSSR";
import GoogleMap from "@/components/GoogleMap";
import CTASection from "@/components/CTASection";
import BeforeAfter from "@/components/BeforeAfter";
import { projects, projectLocation } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { cities } from "@/data/cities";
import { cityDistanceMiles } from "@/data/cityDistances";
import { getAllServices } from "@/data/services";

// Antes/depois em destaque: a obra de Carlisle e a mais documentada do site.
const heroProject = projects[0];
const gridProjects = projects.filter((p) => p.slug !== heroProject.slug).slice(0, 6);
const latestPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const nearbyTowns = [...cities]
  .sort((a, b) => (cityDistanceMiles[a.slug] ?? 99) - (cityDistanceMiles[b.slug] ?? 99))
  .slice(0, 18);
const fmtDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

// Materiais em destaque (com foto real de obra) e os demais como lista.
const allServices = getAllServices();
const featuredSlugs = ["hardie-plank-siding", "vinyl-siding", "cedar-shake-siding", "board-and-batten-siding"];
const featured = featuredSlugs.map((s) => allServices.find((x) => x.slug === s)!).filter(Boolean);
const otherServices = allServices.filter((s) => !featuredSlugs.includes(s.slug) && s.slug !== "siding");

const steps = [
  { title: "Walk-around estimate", body: `Call ${company.phone} or send the form. Fabio walks every side of the house, measures, and talks through materials in English or Portuguese.` },
  { title: "Itemized written quote", body: "Within 24 hours you get a written estimate line by line: materials, labor, permit, disposal and cleanup." },
  { title: "Tear-off and install", body: "Our own crew strips to the sheathing, replaces any rot, wraps and flashes, then installs to the manufacturer's spec." },
  { title: "Final walk-through", body: "We walk the house with you, finish the punch list and leave the yard clean. The workmanship warranty starts that day." },
];

const star = (
  <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function HomePage() {
  const rating = getOrganizationRating();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "https://alfapaintingcarpentry.com" }])) }} />
      {/* AggregateRating + reviews — SOMENTE na home (mesmo @id do #business). */}
      {rating ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rating) }} /> : null}
      {/* FAQ visivel abaixo usa o MESMO texto (data/faqData.ts). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqPage(homeFaqs)) }} />

      {/* ===== HERO ===== */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-ink-soft mb-5">Bellingham, MA · serving MetroWest, Worcester &amp; Norfolk County</p>
            <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-[4.4rem] text-ink mb-6">
              Full-home siding installation &amp; replacement in Massachusetts
            </h1>
            <p className="text-lg text-ink-soft leading-relaxed max-w-xl mb-8">
              Hardie Plank, vinyl, cedar and shake. Siding is all we do: complete tear-off and re-side by our own crew, not patch jobs or other trades.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={company.phoneTel} className="inline-flex items-center justify-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-ink font-bold px-7 py-4 rounded-lg text-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call {company.phone}
              </a>
              <a href="#estimate" className="inline-flex items-center justify-center gap-2 border-2 border-ink text-ink hover:bg-ink hover:text-white font-bold px-7 py-4 rounded-lg text-lg transition-colors">
                Get a free estimate
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
              <li className="flex items-center gap-1.5"><span className="flex">{star}{star}{star}{star}{star}</span><span className="font-semibold text-ink">5.0</span> on Google</li>
              <li>MA HIC {company.license}</li>
              <li>Since {company.foundedYear}</li>
              <li>English &amp; Português</li>
            </ul>
          </div>
          <figure className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-mist">
              <Image
                src="/images/hardie-plank-siding-carlisle-ma-after-back-cloud.jpg"
                alt="Completed full-home James Hardie fiber cement re-side by Alfa Construction in Carlisle, Massachusetts"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority
                fetchPriority="high"
                quality={72}
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-soft">
              Whole-home James Hardie re-side, Carlisle, MA. <Link href={`/projects/${heroProject.slug}`} className="font-semibold text-ink underline underline-offset-2">See the project</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ===== FAIXA DE PROVA ===== */}
      <section className="border-y border-line bg-paper">
        <dl className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-line md:divide-x">
          {[
            ["Licensed & insured", `MA HIC ${company.license}`],
            ["In business since", String(company.foundedYear)],
            ["Written estimate", "Itemized, within 24 hours"],
            ["Owner on every job", "Fabio walks each estimate"],
          ].map(([t, d]) => (
            <div key={t} className="py-6 md:px-6 first:md:pl-0">
              <dt className="text-sm text-ink-soft">{t}</dt>
              <dd className="font-semibold text-ink mt-0.5">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ===== ANTES / DEPOIS ===== */}
      <section className="py-16 md:py-24 bg-mist" id="work">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <BeforeAfter
              beforeSrc={heroProject.beforeImage!}
              afterSrc={heroProject.afterImage!}
              beforeAlt={`Before — ${heroProject.title}`}
              afterAlt={`After — ${heroProject.title}`}
            />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-5">Stripped to the sheathing, re-sided to spec</h2>
            <p className="text-sm font-semibold text-gold-ink mb-3">{projectLocation(heroProject)} · drag the handle to compare</p>
            <p className="text-ink-soft leading-relaxed mb-6 line-clamp-[8]">{heroProject.description}</p>
            <Link href={`/projects/${heroProject.slug}`} className="inline-flex items-center gap-2 font-bold text-ink underline underline-offset-4 decoration-alfa-gold decoration-2 hover:decoration-ink">
              See every step of this job
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MATERIAIS ===== */}
      <section className="py-16 md:py-24 bg-paper" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">You pick the siding. We do the whole house.</h2>
            <p className="text-ink-soft max-w-md">Every job is a complete re-side: tear-off, sheathing repair, weather barrier, flashing, trim and cleanup are included.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group block">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-mist">
                  <Image src={s.heroImage} alt={`${s.shortName} siding installed by Alfa Construction`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" quality={65} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-ink group-hover:text-gold-ink transition-colors">{s.shortName}</h3>
                <p className="mt-1 text-sm text-ink-soft leading-relaxed">{s.cardSummary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-line flex flex-col md:flex-row md:items-center gap-4">
            <p className="font-semibold text-ink shrink-0">Also installed:</p>
            <ul className="flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="inline-block rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:border-ink transition-colors">{s.shortName}</Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-gold-ink hover:text-ink">Compare all options →</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== PROCESSO (sequencia real de 4 passos) ===== */}
      <section className="py-16 md:py-24 bg-charcoal text-white" id="process">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl mb-12 max-w-2xl">From first call to a finished house</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-white/20 pt-5">
                <span className="text-sm font-semibold text-alfa-gold-light">Step {i + 1}</span>
                <h3 className="text-xl font-bold mt-2 mb-2">{s.title}</h3>
                <p className="text-white/75 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== REVIEWS (HTML real, indexavel) ===== */}
      <section className="py-16 md:py-24 bg-paper" id="reviews">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-ink">What homeowners wrote on Google</h2>
            <p className="flex items-center gap-2 text-ink-soft">
              <span className="flex">{star}{star}{star}{star}{star}</span>
              <span><span className="font-semibold text-ink">5.0</span> average rating</span>
            </p>
          </div>
          <ReviewsSSR />
        </div>
      </section>

      {/* ===== PROJETOS ===== */}
      <section className="py-16 md:py-24 bg-mist" id="portfolio">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-ink">Recent re-sides</h2>
            <Link href="/projects" className="font-semibold text-ink underline underline-offset-4 decoration-alfa-gold decoration-2 whitespace-nowrap">All projects</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-line">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" quality={60} />
                </div>
                <h3 className="mt-3 font-bold text-ink leading-snug group-hover:text-gold-ink transition-colors">{p.title}</h3>
                <p className="text-sm text-ink-soft">{projectLocation(p)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOBRE ===== */}
      <section className="py-16 md:py-24 bg-paper" id="about">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[6/5] rounded-2xl overflow-hidden bg-mist order-last lg:order-first">
            <Image src="/images/green-siding-exterior-completed-ma.jpg" alt="Sage green full-home re-side with white trim by Alfa Construction in Massachusetts" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" quality={65} />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">Owner-run since {company.foundedYear}</h2>
            <div className="space-y-4 text-ink-soft leading-relaxed max-w-prose">
              <p>Fabio founded Alfa Construction in {company.foundedYear} and still walks every estimate himself. The crew is based in Bellingham and works across MetroWest, Worcester County and Norfolk County.</p>
              <p>We do <strong className="text-ink">complete siding installation and full-home replacement</strong> only. Carpentry, sheathing and window or door work happen when they are part of a re-side, never as separate jobs.</p>
            </div>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-ink">
              {company.differentials.map((item) => (
                <li key={item} className="flex gap-2">
                  <svg className="w-5 h-5 text-gold-ink shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-soft">
              Materials we install:{" "}
              <a href="https://www.jameshardie.com/products/hardieplank-lap-siding" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">James Hardie</a>,{" "}
              <a href="https://lpcorp.com/products/exterior-siding" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">LP SmartSide</a>,{" "}
              <a href="https://www.vinylsiding.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">VSI-certified vinyl</a>,{" "}
              <a href="https://www.dupont.com/brands/tyvek.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">Tyvek</a> house wrap.
            </p>
            <Link href="/about" className="mt-8 inline-flex items-center font-bold text-ink underline underline-offset-4 decoration-alfa-gold decoration-2 hover:decoration-ink">
              More about the company
            </Link>
          </div>
        </div>
      </section>

      {/* ===== AREA DE ATENDIMENTO ===== */}
      <section className="py-16 md:py-24 bg-mist" id="service-area">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-5">Where we work</h2>
            <p className="text-ink-soft leading-relaxed mb-6 max-w-lg">From our base in Bellingham we re-side homes across MetroWest, Worcester County and Norfolk County. The towns closest to us:</p>
            <ul className="flex flex-wrap gap-2 mb-6">
              {nearbyTowns.map((c) => (
                <li key={c.slug}>
                  <Link href={`/massachusetts/${c.slug}`} className="inline-block rounded-full bg-paper border border-line px-4 py-2 text-sm font-medium text-ink hover:border-ink transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
            <Link href="/massachusetts" className="font-bold text-ink underline underline-offset-4 decoration-alfa-gold decoration-2">All {cities.length} towns we serve</Link>
          </div>
          <GoogleMap />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-24 bg-paper" id="faq">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-8">Questions about re-siding</h2>
          <div className="divide-y divide-line border-y border-line">
            {homeFaqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="py-5 font-semibold text-ink text-lg flex justify-between items-center gap-4">
                  {faq.q}
                  <svg className="w-5 h-5 text-ink-soft group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="pb-6 text-ink-soft leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GUIAS ===== */}
      <section className="py-16 md:py-20 bg-paper border-t border-line" id="blog">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-ink">Siding guides for Massachusetts homes</h2>
            <Link href="/blog" className="font-semibold text-ink underline underline-offset-4 decoration-alfa-gold decoration-2 whitespace-nowrap">All guides</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-mist">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" quality={60} />
                </div>
                <p className="mt-3 text-sm text-ink-soft"><time dateTime={post.date}>{fmtDate(post.date)}</time></p>
                <h3 className="mt-1 font-bold text-ink leading-snug group-hover:text-gold-ink transition-colors">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
