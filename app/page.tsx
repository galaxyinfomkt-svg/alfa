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
const featuredSlugs = ["hardie-plank-siding", "vinyl-siding", "cedar-shake-siding"];
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

      {/* ===== HERO: a casa pronta em tela cheia ===== */}
      <section className="relative min-h-[100dvh] flex flex-col">
        <Image
          src="/images/hardie-plank-siding-carlisle-ma-after-back-cloud.jpg"
          alt="Completed full-home James Hardie fiber cement re-side by Alfa Construction in Carlisle, Massachusetts"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          fetchPriority="high"
          quality={72}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/45" aria-hidden="true" />
        <div className="relative mt-auto px-4 pb-24 md:pb-28 pt-36">
          <div className="max-w-7xl mx-auto">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm text-white/90">
              Full-home siding installation &amp; replacement in Massachusetts
            </p>
            <h1 className="font-display mt-5 text-white text-[2.7rem] sm:text-6xl lg:text-[4.6rem] max-w-4xl">
              Siding that makes your whole house look new.
            </h1>
            <p className="mt-5 text-white/85 text-lg md:text-xl max-w-xl leading-relaxed">
              Hardie Plank, vinyl, cedar and shake, installed by our own crew. One owner walks every estimate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#estimate" className="group inline-flex items-center justify-between sm:justify-center gap-4 rounded-full bg-alfa-gold hover:bg-alfa-gold-light text-ink font-bold pl-7 pr-2 py-2 text-lg transition-colors">
                Get a free estimate
                <span className="w-11 h-11 rounded-full bg-ink/10 grid place-items-center transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              <a href={company.phoneTel} className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 backdrop-blur hover:bg-white/25 text-white font-semibold px-7 py-4 text-lg transition-colors">
                Call {company.phone}
              </a>
            </div>
            <p className="mt-6 text-sm text-white/75">
              Whole-home James Hardie re-side in Carlisle, MA.{" "}
              <Link href={`/projects/${heroProject.slug}`} className="font-semibold text-white underline underline-offset-4">See the project</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROVA: cartoes que sobem sobre a foto ===== */}
      <section className="relative px-4 -mt-14 md:-mt-16 z-10">
        <dl className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            ["5.0 on Google", "Rated by Massachusetts homeowners"],
            [`MA HIC ${company.license}`, "Licensed & insured"],
            [`Since ${company.foundedYear}`, "Owner-run, Bellingham based"],
            ["24-hour estimate", "Itemized and in writing"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-[1.5rem] bg-card shadow-soft px-5 py-5 md:px-6">
              <dt className="font-bold text-ink text-lg">{t}</dt>
              <dd className="text-sm text-ink-soft mt-1">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ===== ANTES / DEPOIS ===== */}
      <section className="px-4 pt-20 md:pt-28" id="work">
        <div className="max-w-7xl mx-auto rounded-[2.25rem] bg-card shadow-soft p-3 md:p-4 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden">
            <BeforeAfter
              beforeSrc={heroProject.beforeImage!}
              afterSrc={heroProject.afterImage!}
              beforeAlt={`Before — ${heroProject.title}`}
              afterAlt={`After — ${heroProject.title}`}
            />
          </div>
          <div className="px-4 pb-6 lg:px-0 lg:pr-8 lg:pb-0">
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-5">Stripped to the sheathing, re-sided to spec</h2>
            <p className="text-sm font-semibold text-gold-ink mb-3">{projectLocation(heroProject)} · drag the handle to compare</p>
            <p className="text-ink-soft leading-relaxed mb-6 line-clamp-[8]">{heroProject.description}</p>
            <Link href={`/projects/${heroProject.slug}`} className="group inline-flex items-center gap-3 rounded-full bg-ink text-white font-semibold pl-6 pr-1.5 py-1.5 hover:bg-charcoal transition-colors">
              See every step of this job
              <span className="w-9 h-9 rounded-full bg-white/15 grid place-items-center transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MATERIAIS ===== */}
      <section className="py-20 md:py-28 px-4" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">You pick the siding. We do the whole house.</h2>
            <p className="text-ink-soft max-w-md">Every job is a complete re-side: tear-off, sheathing repair, weather barrier, flashing, trim and cleanup are included.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:auto-rows-[270px]">
            {featured.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`group relative block overflow-hidden rounded-[2rem] bg-mist min-h-[320px] md:min-h-0 ${i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}`}
              >
                <Image src={s.heroImage} alt={`${s.shortName.replace(/ siding$/i, "")} siding installed by Alfa Construction`} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]" quality={65} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{s.shortName}</h3>
                    <p className="mt-1 text-white/80 max-w-md">{s.cardSummary}</p>
                  </div>
                  <span className="shrink-0 w-11 h-11 rounded-full bg-white/20 backdrop-blur text-white grid place-items-center transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
            <p className="font-semibold text-ink shrink-0">Also installed:</p>
            <ul className="flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="inline-block rounded-full bg-card shadow-soft px-4 py-2.5 text-sm font-semibold text-ink hover:bg-mist transition-colors">{s.shortName}</Link>
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
      <section className="px-4" id="process">
        <div className="max-w-7xl mx-auto rounded-[2.25rem] bg-charcoal text-white px-6 py-12 md:px-12 md:py-16">
          <h2 className="font-display text-4xl md:text-5xl mb-10 max-w-2xl">From first call to a finished house</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-[1.5rem] bg-white/[0.06] ring-1 ring-white/10 p-6">
                <span className="inline-grid place-items-center w-9 h-9 rounded-full bg-alfa-gold text-ink text-sm font-bold">{i + 1}</span>
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
                <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-line">
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
          <div className="relative aspect-[6/5] rounded-[2rem] overflow-hidden bg-mist order-last lg:order-first">
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
                  <Link href={`/massachusetts/${c.slug}`} className="inline-block rounded-full bg-card shadow-soft px-4 py-2 text-sm font-medium text-ink hover:border-ink transition-colors">{c.name}</Link>
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
          <div className="space-y-3">
            {homeFaqs.map((faq) => (
              <details key={faq.q} className="group rounded-[1.5rem] bg-card shadow-soft px-6">
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
      <section className="py-16 md:py-20 bg-paper" id="blog">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-ink">Siding guides for Massachusetts homes</h2>
            <Link href="/blog" className="font-semibold text-ink underline underline-offset-4 decoration-alfa-gold decoration-2 whitespace-nowrap">All guides</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] rounded-[1.75rem] overflow-hidden bg-mist">
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
