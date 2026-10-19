import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { company, breadcrumbSchema, faqSchema, serviceSchema } from "@/data/company";
import ReviewsSSR from "@/components/ReviewsSSR";
import CTASection from "@/components/CTASection";
import SiteVideo from "@/components/SiteVideo";
import { cities } from "@/data/cities";
import { cityDistanceMiles } from "@/data/cityDistances";
import { fitTitle, fitDescriptionWithTail, stripTrailingPhone } from "@/lib/serpWidth";
import { getServiceBySlug, getAllServiceSlugs, getAllServices } from "@/data/services";

/* Normas e materiais POR material. Antes havia um bloco unico em todas as 9
   paginas, que falava de Hardie e de janelas Andersen ate na pagina de vinyl
   ou de cedar. */
const standards: Record<string, { title: string; body: React.ReactNode }> = {
  siding: {
    title: "Materials we install",
    body: <>James Hardie fiber cement (ASTM C1186), premium vinyl (ASTM D3679), insulated vinyl (ASTM D7793), LP SmartSide engineered wood and Western Red Cedar — always over a continuous weather-resistant barrier with flashing at every opening.</>,
  },
  "hardie-plank-siding": {
    title: "James Hardie fiber cement",
    body: <>HardiePlank meets ASTM C1186 (Type A, Grade II) and is non-combustible. We install it over <a href="https://www.jameshardie.com/" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold underline underline-offset-2">HardieWrap or an equivalent WRB</a> following James Hardie&apos;s installation instructions, which is what keeps the 30-year non-prorated limited product warranty valid.</>,
  },
  "vinyl-siding": {
    title: "Premium vinyl",
    body: <>We install vinyl that meets ASTM D3679 for impact, wind load and weathering, with center-slot nailing and expansion clearance at every course and trim piece so panels stay flat through New England temperature swings.</>,
  },
  "cedar-shake-siding": {
    title: "Western Red Cedar",
    body: <>Shakes and shingles go over a drainable or ventilated layer so the back of each course can dry, and every piece is fastened with stainless steel so the wood never stains around the nails.</>,
  },
  "clapboard-siding": {
    title: "Clapboard profiles",
    body: <>Lap siding in fiber cement (ASTM C1186), engineered wood, cedar or vinyl (ASTM D3679), laid out with a consistent reveal and flashed at every butt joint, window head and transition.</>,
  },
  "board-and-batten-siding": {
    title: "Vertical board & batten",
    body: <>Vertical panels need horizontal blocking or furring for fastening and a flashing detail at every window head and horizontal break, because water runs straight down the seams. We build both in before the battens go on.</>,
  },
  "insulated-siding": {
    title: "Insulated vinyl",
    body: <>Insulated vinyl siding is covered by its own standard, ASTM D7793, which requires a minimum R-value for the fused foam backing. We install it over a continuous weather barrier with the same expansion rules as standard vinyl.</>,
  },
  "engineered-wood-siding": {
    title: "LP SmartSide engineered wood",
    body: <>LP SmartSide strands are treated with LP&apos;s SmartGuard process (zinc borate) against rot and termites. We seal every cut end and keep the clearances LP specifies above roofs, decks and grade, which the 5/50-year limited warranty depends on.</>,
  },
  "commercial-siding": {
    title: "Commercial and multi-family",
    body: <>Fiber cement and commercial-grade vinyl installed under a building permit per the MA State Building Code (780 CMR), phased by elevation so tenants and businesses keep operating.</>,
  },
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = fitTitle(service.metaTitle, [""]);
  const description = fitDescriptionWithTail(
    stripTrailingPhone(service.metaDescription),
    `Free estimate: ${company.phone}.`,
  );

  return {
    title,
    description,
    alternates: { canonical: `https://alfapaintingcarpentry.com/services/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://alfapaintingcarpentry.com/services/${slug}`,
      images: [{ url: service.heroImage, width: 1200, height: 630, alt: service.name }],
    },
  };
}

const check = (
  <svg className="w-5 h-5 text-gold-ink shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const summary = getAllServices().find((s) => s.slug === slug)?.cardSummary ?? service.description;
  const std = standards[slug] ?? standards.siding;
  const nearest = [...cities]
    .sort((a, b) => (cityDistanceMiles[a.slug] ?? 99) - (cityDistanceMiles[b.slug] ?? 99))
    .slice(0, 18);
  const others = getAllServices().filter((s) => s.slug !== slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Services", url: "https://alfapaintingcarpentry.com/services" },
        { name: service.name, url: `https://alfapaintingcarpentry.com/services/${slug}` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({
        name: service.name,
        description: service.metaDescription,
        url: `https://alfapaintingcarpentry.com/services/${slug}`,
        image: `https://alfapaintingcarpentry.com${service.heroImage}`,
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }} />

      {/* ===== HERO: foto em tela cheia ===== */}
      <section className="relative min-h-[82dvh] flex flex-col">
        <Image src={service.heroImage} alt={`${service.name} completed by Alfa Construction in Massachusetts`} fill sizes="100vw" className="object-cover" priority quality={70} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/45" aria-hidden="true" />
        <div className="relative mt-auto px-4 pb-16 md:pb-20 pt-36">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="text-sm text-white/75 mb-5">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white underline underline-offset-2">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/services" className="hover:text-white underline underline-offset-2">Siding Services</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">{service.shortName}</li>
              </ol>
            </nav>
            <h1 className="font-display text-white text-5xl sm:text-6xl lg:text-7xl max-w-4xl">{service.name} in Massachusetts</h1>
            <p className="mt-5 text-white/85 text-lg md:text-xl max-w-2xl leading-relaxed">{summary} Full exterior re-sides only. Licensed MA HIC {company.license}, insured, in business since {company.foundedYear}.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#estimate" className="group inline-flex items-center justify-between sm:justify-center gap-4 rounded-full bg-alfa-gold hover:bg-alfa-gold-light text-ink font-bold pl-7 pr-2 py-2 text-lg transition-colors">
                Get a free estimate
                <span className="w-11 h-11 rounded-full bg-ink/10 grid place-items-center transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              <a href={company.phoneTel} className="inline-flex items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25 text-white font-semibold px-7 py-4 text-lg transition-colors">
                Call {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VISAO GERAL ===== */}
      <section className="py-16 md:py-24 bg-mist">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">About {service.name.toLowerCase()}</h2>
            <p className="text-ink-soft text-lg leading-relaxed max-w-prose">{service.longDescription}</p>
          </div>
          <aside className="space-y-5 self-start">
            <div className="bg-card shadow-soft rounded-[2rem] p-6">
              <h3 className="font-bold text-ink mb-2">{std.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{std.body}</p>
            </div>
            <div className="bg-card shadow-soft rounded-[2rem] p-6">
              <h3 className="font-bold text-ink mb-2">License, insurance &amp; permits</h3>
              <p className="text-ink-soft text-sm leading-relaxed">
                Massachusetts Home Improvement Contractor{" "}
                <a href="https://elicensing.hps.state.ma.us/CitizenAccess/GeneralProperty/PropertyLookUp.aspx" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold underline underline-offset-2">HIC {company.license}</a>, valid through {company.licenseExpiry}. General liability and workers&apos; compensation insurance. Every job is permitted under the{" "}
                <a href="https://www.mass.gov/info-details/massachusetts-state-building-code-780-cmr" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold underline underline-offset-2">MA State Building Code (780 CMR)</a>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== PROBLEMAS / SOLUCOES ===== */}
      <section className="py-16 md:py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">Problems we see on Massachusetts homes</h2>
            <ul className="space-y-3">
              {service.painPoints.map((p) => (
                <li key={p} className="rounded-2xl bg-card shadow-soft px-5 py-4 text-ink-soft leading-relaxed">{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">How a full re-side fixes them</h2>
            <ul className="space-y-3">
              {service.solutions.map((s) => (
                <li key={s} className="rounded-2xl bg-card shadow-soft px-5 py-4 flex gap-3 text-ink leading-relaxed">{check}{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== PROCESSO ===== */}
      <section className="px-4 py-6 md:py-10">
        <div className="max-w-7xl mx-auto rounded-[2.25rem] bg-charcoal text-white px-6 py-12 md:px-12 md:py-16">
          <h2 className="font-display text-4xl md:text-5xl mb-12">Our {service.shortName.toLowerCase()} process</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-x-8 gap-y-10">
            {service.process.map((step) => (
              <li key={step.step} className="rounded-[1.5rem] bg-white/[0.06] ring-1 ring-white/10 p-6">
                <span className="text-sm font-semibold text-alfa-gold-light">Step {step.step}</span>
                <h3 className="text-lg font-bold mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section className="py-16 md:py-24 bg-paper">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-8">What you get</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {service.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-ink leading-relaxed">{check}{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-16 md:py-24 bg-mist">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-10">What homeowners wrote on Google</h2>
          <ReviewsSSR limit={3} />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-24 bg-paper">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-8">{service.shortName} questions</h2>
          <div className="space-y-3">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-[1.5rem] bg-card shadow-soft px-6">
                <summary className="py-5 font-semibold text-ink text-lg flex justify-between items-center gap-4">
                  {faq.question}
                  <svg className="w-5 h-5 text-ink-soft group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="pb-6 text-ink-soft leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AREA + OUTROS MATERIAIS ===== */}
      <section className="py-16 md:py-24 bg-mist">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">Towns near our Bellingham base</h2>
            <p className="text-ink-soft mb-5">We install {service.shortName.toLowerCase()} across MetroWest, Worcester County and Norfolk County.</p>
            <ul className="flex flex-wrap gap-2 mb-5">
              {nearest.map((c) => (
                <li key={c.slug}>
                  <Link href={`/massachusetts/${c.slug}`} className="inline-block rounded-full bg-card shadow-soft px-4 py-2 text-sm font-medium text-ink hover:border-ink transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
            <Link href="/massachusetts" className="font-bold text-ink underline underline-offset-4 decoration-alfa-gold decoration-2">See the full service area</Link>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-5">Other siding we install</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="flex items-center justify-between bg-card shadow-soft hover:bg-mist rounded-full px-4 py-3 text-ink font-semibold transition-colors">
                    {o.shortName}<span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteVideo serviceSlug={slug} placeName="Massachusetts" />

      <CTASection title={`Get your free ${service.shortName} estimate`} />
    </>
  );
}
