import Link from "next/link";
import Logo from "./Logo";
import { company } from "@/data/company";
import { getCoreCities } from "@/data/cities";
import { blogPosts } from "@/data/blog";

// Só cidades "core" (dentro do raio real ~35 mi). Ver data/cities.ts.
const footerCities = getCoreCities();

const serviceLinks = [
  { href: "/services/siding", label: "Siding Installation & Replacement" },
  { href: "/services/hardie-plank-siding", label: "Hardie Plank Fiber Cement" },
  { href: "/services/vinyl-siding", label: "Vinyl Siding" },
  { href: "/services/cedar-shake-siding", label: "Cedar Shake Siding" },
  { href: "/services/clapboard-siding", label: "Clapboard Siding" },
  { href: "/services/board-and-batten-siding", label: "Board & Batten Siding" },
  { href: "/services/insulated-siding", label: "Insulated Siding" },
  { href: "/services/engineered-wood-siding", label: "Engineered Wood Siding" },
  { href: "/services/commercial-siding", label: "Commercial Siding" },
];

// Os tres posts mais recentes, pela data real de publicacao.
const blogLinks = [...blogPosts]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3)
  .map((p) => ({ href: `/blog/${p.slug}`, label: p.title.split(":")[0].replace(/ \(.*\)$/, "") }));

const linkCls = "inline-block py-1 text-sm text-white/70 hover:text-white transition-colors";
const headCls = "text-sm font-semibold text-white mb-4";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/75">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1fr] gap-10">
          <div>
            <Link href="/" className="inline-block mb-5" aria-label="Alfa Construction — home">
              <Logo size="lg" tone="dark" />
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Full-home siding installation and replacement in Massachusetts since {company.foundedYear}. Hardie Plank, vinyl, cedar and shake, installed by our own crew.
            </p>
            <address className="not-italic text-sm space-y-1.5">
              <a href={company.phoneTel} className="block font-semibold text-white hover:text-alfa-gold-light py-0.5">{company.phone}</a>
              <a href={`mailto:${company.email}`} className="block hover:text-white py-0.5">{company.email}</a>
              <p>{company.address.full} · {company.hours}</p>
              <p>MA HIC {company.license} · Licensed &amp; insured</p>
            </address>
            <div className="flex gap-2 mt-5">
              <a href={company.instagram} target="_blank" rel="noopener noreferrer" aria-label="Alfa Construction on Instagram" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={company.facebook} target="_blank" rel="noopener noreferrer" aria-label="Alfa Construction on Facebook" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={company.googleReview} target="_blank" rel="noopener noreferrer" aria-label="Alfa Construction reviews on Google" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </a>
            </div>
          </div>

          <nav aria-label="Siding services">
            <p className={headCls}>Siding services</p>
            <ul>
              {serviceLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className={linkCls}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className={headCls}>Company</p>
            <ul>
              <li><Link href="/" className={linkCls}>Home</Link></li>
              <li><Link href="/about" className={linkCls}>About Us</Link></li>
              <li><Link href="/projects" className={linkCls}>Projects</Link></li>
              <li><Link href="/blog" className={linkCls}>Siding Guides</Link></li>
              <li><Link href="/contact" className={linkCls}>Contact</Link></li>
              <li><Link href="/massachusetts" className={linkCls}>Service Area</Link></li>
            </ul>
          </nav>

          <div>
            <p className={headCls}>Recent guides</p>
            <ul className="mb-6">
              {blogLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className={linkCls}>{link.label}</Link></li>
              ))}
            </ul>
            <Link href="/contact" className="inline-flex items-center bg-alfa-gold hover:bg-alfa-gold-light text-ink font-bold px-5 py-3 rounded-full text-sm transition-colors">
              Get a free estimate
            </Link>
          </div>
        </div>
      </div>

      {/* NAO CORTAR ESTA LISTA. Em 01/09/2026 (f0d4860) ela foi reduzida a 12
          cidades e as outras 97 paginas de cidade perderam links internos e
          posicao. O rodape completo distribui autoridade para as 109 cidades.
          scripts/audit-links.mjs roda no postbuild e bloqueia o deploy se isso
          se repetir. Cada cidade e um item proprio (flex-wrap) para quebrar
          linha; nada fica escondido fora da tela. */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <p className="text-sm font-semibold text-white mb-4">Towns we serve from our Bellingham base</p>
          <ul className="flex flex-wrap gap-x-1 gap-y-0 text-sm">
            {footerCities.map((city) => (
              <li key={city.slug}>
                <Link href={`/massachusetts/${city.slug}`} className="inline-block px-1.5 py-1.5 text-white/65 hover:text-white transition-colors">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link href="/massachusetts" className="text-sm font-semibold text-alfa-gold-light hover:text-white">
              See the full service area →
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/60">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Alfa Construction Inc. · MA HIC {company.license}</p>
          <ul className="flex gap-x-4 flex-wrap justify-center">
            <li><Link href="/privacy" className="inline-block py-2 underline underline-offset-2 hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="inline-block py-2 underline underline-offset-2 hover:text-white">Terms &amp; Conditions</Link></li>
            <li><Link href="/cookies" className="inline-block py-2 underline underline-offset-2 hover:text-white">Cookie Policy</Link></li>
            <li><Link href="/sms-terms" className="inline-block py-2 underline underline-offset-2 hover:text-white">SMS Terms &amp; Opt-In</Link></li>
          </ul>
          <p>
            Developed by{" "}
            <a href="https://galaxyinfo.us/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              Galaxy IT MKT
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
