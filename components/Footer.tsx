import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";
import { cities } from "@/data/cities";

const serviceLinks = [
  { href: "/services/painting", label: "Interior & Exterior Painting" },
  { href: "/services/carpentry", label: "Carpentry & Trim Work" },
  { href: "/services/siding", label: "Siding Installation & Repair" },
  { href: "/services/windows-doors", label: "Window & Door Installation" },
  { href: "/services/remodeling", label: "Home Remodeling & Renovation" },
];

const blogLinks = [
  { href: "/blog/signs-exterior-paint-needs-replacing-spring-massachusetts", label: "Signs Your Paint Needs Replacing" },
  { href: "/blog/hardie-plank-vs-vinyl-siding-new-england", label: "Hardie Plank vs Vinyl Siding" },
  { href: "/blog/why-licensed-contractor-massachusetts-matters", label: "Why Hire a Licensed Contractor" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/logo.png"
                alt="Alfa Construction Inc"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Professional painting, carpentry, siding, window &amp; door installation, and home remodeling services across Massachusetts. Licensed, insured, and trusted for over 18 years.
            </p>
            <div className="space-y-2.5 text-sm">
              <a href={company.phoneTel} className="flex items-center gap-2 text-alfa-gold hover:text-alfa-gold-light transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {company.phone}
              </a>
              <p className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {company.address.full}
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {company.hours}
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                MA License {company.license}
              </p>
            </div>
            {/* Social links */}
            <div className="flex gap-3 mt-5">
              <a href={company.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-alfa-gold hover:text-black hover:border-alfa-gold transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={company.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-alfa-gold hover:text-black hover:border-alfa-gold transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={company.googleReview} target="_blank" rel="noopener noreferrer" aria-label="Google Reviews" className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-alfa-gold hover:text-black hover:border-alfa-gold transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-alfa-gold mb-5">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-alfa-gold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">About Us</Link></li>
              <li><Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Projects</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Contact</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Blog</Link></li>
            </ul>
          </div>

          {/* Blog & Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-alfa-gold mb-5">Recent Posts</h3>
            <ul className="space-y-3 mb-6">
              {blogLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-block bg-alfa-gold hover:bg-alfa-gold-light text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-alfa-gold/20 text-sm"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>

      {/* Service Areas — All Cities (compact inline like RS Development) */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-2 text-alfa-gold font-semibold text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Service Areas – 109+ Cities Across Massachusetts
            </span>
          </div>
          <p className="text-center text-gray-400 text-sm leading-relaxed">
            {cities.map((city, i) => (
              <span key={city.slug}>
                <Link
                  href={`/massachusetts/${city.slug}`}
                  className="hover:text-alfa-gold transition-colors"
                >
                  {city.name}
                </Link>
                {i < cities.length - 1 && <span className="mx-1.5">•</span>}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Alfa Construction Inc. All rights reserved. MA License {company.license}</p>
          <p>
            Developed by{" "}
            <a
              href="https://galaxyinfo.us/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-alfa-gold hover:text-alfa-gold-light transition-colors font-medium"
            >
              Galaxy IT MKT
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-alfa-gold transition-colors">About</Link>
            <Link href="/contact" className="hover:text-alfa-gold transition-colors">Contact</Link>
            <Link href="/blog" className="hover:text-alfa-gold transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
