"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { company } from "@/data/company";

const navLinks = [
  { href: "/massachusetts", label: "Service Area" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// PIVOT SIDING-ONLY — Alfa vende exclusivamente siding installation/replacement.
const serviceItems = [
  { slug: "siding", name: "Siding Installation & Replacement", desc: "Full-home re-sides across MA" },
  { slug: "hardie-plank-siding", name: "Hardie Plank Fiber Cement", desc: "30-year fiber cement warranty" },
  { slug: "vinyl-siding", name: "Vinyl Siding", desc: "Premium 25-year vinyl, 40+ colors" },
  { slug: "cedar-shake-siding", name: "Cedar Shake Siding", desc: "Authentic New England look" },
  { slug: "clapboard-siding", name: "Clapboard Siding", desc: "Classic colonial lap profile" },
  { slug: "board-and-batten-siding", name: "Board & Batten Siding", desc: "Vertical farmhouse look" },
  { slug: "insulated-siding", name: "Insulated Siding", desc: "Added R-value, lower energy bills" },
  { slug: "engineered-wood-siding", name: "Engineered Wood Siding", desc: "LP SmartSide durability" },
  { slug: "commercial-siding", name: "Commercial Siding", desc: "Multi-family & commercial" },
];

const phoneIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setIsServicesOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 md:pt-4">
      {/* Barra principal: pilula flutuante, sombra so depois de rolar */}
      <div className={`max-w-7xl mx-auto rounded-full bg-card/90 backdrop-blur-xl transition-shadow duration-500 ease-premium ${isScrolled ? "shadow-[0_12px_40px_rgba(27,26,23,0.14)]" : "shadow-[0_8px_30px_rgba(27,26,23,0.08)]"}`}>
        <div className="pl-5 pr-2">
          <div className="flex items-center justify-between h-16 gap-6">
            <Link href="/" className="shrink-0" aria-label="Alfa Construction — home">
              <Logo />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              <div ref={servicesRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  aria-expanded={isServicesOpen}
                  aria-controls="services-menu"
                  className={`flex items-center gap-1 px-3 py-2 rounded-full text-[15px] font-medium transition-colors ${isActive("/services") ? "text-gold-ink" : "text-ink hover:text-gold-ink"}`}
                >
                  Siding Services
                  <svg className={`w-3.5 h-3.5 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id="services-menu"
                  className={`absolute top-full left-0 mt-2 w-[34rem] transition-[opacity,transform] duration-150 ${isServicesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none invisible"}`}
                >
                  <div className="bg-card rounded-[1.5rem] shadow-[0_24px_60px_rgba(27,26,23,0.16)] p-2 grid grid-cols-2 gap-1">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/services/${item.slug}`}
                        onClick={() => setIsServicesOpen(false)}
                        className="flex flex-col gap-0.5 px-3 py-2.5 rounded-2xl hover:bg-mist transition-colors"
                      >
                        <span className="text-sm font-semibold text-ink">{item.name}</span>
                        <span className="text-xs text-ink-soft">{item.desc}</span>
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-center px-3 py-2.5 rounded-2xl hover:bg-mist text-sm font-semibold text-gold-ink"
                    >
                      Compare all siding options →
                    </Link>
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`px-3 py-2 rounded-full text-[15px] font-medium transition-colors ${isActive(link.href) ? "text-gold-ink" : "text-ink hover:text-gold-ink"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/contact"
                className="px-4 py-2.5 rounded-full text-sm font-semibold text-ink hover:bg-mist transition-colors"
              >
                Free Estimate
              </Link>
              <a
                href={company.phoneTel}
                className="inline-flex items-center gap-2 whitespace-nowrap bg-ink hover:bg-charcoal text-white font-semibold pl-4 pr-1.5 py-1.5 rounded-full transition-colors text-sm"
              >
                {company.phone}
                <span className="w-9 h-9 rounded-full bg-alfa-gold text-ink grid place-items-center">{phoneIcon}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-ink hover:bg-mist"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu do celular */}
      <div
        id="mobile-menu"
        className={`lg:hidden max-w-7xl mx-auto mt-2 rounded-[1.75rem] bg-card shadow-[0_24px_60px_rgba(27,26,23,0.16)] ${isMobileMenuOpen ? "max-h-[calc(100dvh-6rem)] overflow-y-auto" : "max-h-0 overflow-hidden invisible"}`}
      >
        <nav className="px-4 py-3" aria-label="Mobile">
          <button
            type="button"
            onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
            aria-expanded={isMobileServicesOpen}
            className="flex items-center justify-between w-full px-3 py-3 text-ink font-semibold rounded-2xl hover:bg-mist"
          >
            Siding Services
            <svg className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={isMobileServicesOpen ? "block pb-2" : "hidden"}>
            {serviceItems.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block pl-6 pr-3 py-2.5 text-[15px] text-ink-soft rounded-2xl hover:bg-mist hover:text-ink"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="block pl-6 pr-3 py-2.5 text-[15px] font-semibold text-gold-ink">
              Compare all siding options
            </Link>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-ink font-semibold rounded-2xl hover:bg-mist"
            >
              {link.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-3">
            <a href={company.phoneTel} className="inline-flex items-center justify-center gap-2 bg-alfa-gold text-ink font-bold px-4 py-3 rounded-full">
              {phoneIcon}
              Call
            </a>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center border border-ink text-ink font-semibold px-4 py-3 rounded-full">
              Free Estimate
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 pt-4 pb-2 text-sm text-ink-soft">
            <Link href="/privacy" onClick={() => setIsMobileMenuOpen(false)} className="py-2 underline underline-offset-2">Privacy Policy</Link>
            <Link href="/terms" onClick={() => setIsMobileMenuOpen(false)} className="py-2 underline underline-offset-2">Terms &amp; Conditions</Link>
            <Link href="/cookies" onClick={() => setIsMobileMenuOpen(false)} className="py-2 underline underline-offset-2">Cookie Policy</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
