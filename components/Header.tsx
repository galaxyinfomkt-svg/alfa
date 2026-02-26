"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceItems = [
  {
    slug: "painting",
    name: "Painting Services",
    desc: "Interior & exterior painting for homes...",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    top: true,
  },
  {
    slug: "carpentry",
    name: "Carpentry & Trim",
    desc: "Fine carpentry, trim work, and door install...",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    slug: "siding",
    name: "Siding Installation",
    desc: "Professional siding installation and rep...",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    slug: "windows-doors",
    name: "Windows & Doors",
    desc: "Energy-efficient window and door install...",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    slug: "remodeling",
    name: "Home Remodeling",
    desc: "Kitchen, bathroom, and whole house remod...",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm8 0v14M4 12h16" />
      </svg>
    ),
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close services dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      {/* ─── Dark Top Bar (RS Development style) ─── */}
      <div
        className={`transition-all duration-500 ${
          isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"
        } bg-[#0D0D0D] border-b border-white/5`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center">
          {/* Left — Location */}
          <div className="flex items-center gap-2 text-sm text-white">
            <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Serving {company.address.locality}, Massachusetts</span>
          </div>

          {/* Center — Email */}
          <a
            href={`mailto:${company.email}`}
            className="hidden md:flex items-center gap-2 text-sm text-white hover:text-alfa-gold transition-colors"
          >
            <svg className="w-4 h-4 text-alfa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {company.email}
          </a>

          {/* Right — Phone */}
          <a
            href={company.phoneTel}
            className="flex items-center gap-2 text-sm text-white font-semibold hover:text-alfa-gold transition-colors"
          >
            <svg className="w-4 h-4 text-alfa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {company.phone}
          </a>
        </div>
      </div>

      {/* ─── Main Nav Bar ─── */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-[#111111]/95 backdrop-blur-xl border-b border-white/5"
            : "bg-[#111111] border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo + City/License */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Alfa Construction Inc"
                width={180}
                height={50}
                className="h-10 md:h-12 w-auto"
                priority
              />
              <div className="hidden md:block border-l border-white/20 pl-3">
                <p className="text-white text-sm font-semibold leading-tight">{company.address.locality}, MA</p>
                <p className="text-gray-400 text-xs">Licensed Contractor</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="text-sm font-medium text-gray-300 hover:text-alfa-gold transition-colors px-3 py-2"
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div ref={servicesRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center gap-1 text-sm font-medium px-3 py-2 transition-colors ${
                    isServicesOpen ? "text-alfa-gold" : "text-gray-300 hover:text-alfa-gold"
                  }`}
                >
                  Services
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Panel */}
                <div
                  className={`absolute top-full left-0 mt-2 w-72 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden transition-all duration-200 ${
                    isServicesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {serviceItems.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-start gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-9 h-9 bg-alfa-gold/10 rounded-lg flex items-center justify-center text-alfa-gold shrink-0 group-hover:bg-alfa-gold/20 transition-colors">
                        {svc.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-alfa-gold transition-colors flex items-center gap-2">
                          {svc.name}
                          {svc.top && (
                            <span className="text-[10px] font-bold bg-alfa-gold text-black px-1.5 py-0.5 rounded">
                              TOP
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{svc.desc}</p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={() => setIsServicesOpen(false)}
                    className="flex items-center justify-center gap-1 px-4 py-3 bg-white/5 text-sm font-semibold text-alfa-gold hover:text-white transition-colors border-t border-white/5"
                  >
                    View All Services
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-alfa-gold transition-colors px-3 py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side — Phone CTA (outlined, RS style) */}
            <div className="hidden lg:flex items-center">
              <a
                href={company.phoneTel}
                className="flex items-center gap-2 border-2 border-alfa-gold text-white hover:bg-alfa-gold hover:text-black font-bold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {company.phone}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-alfa-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Menu ─── */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"
        } bg-[#111111] border-t border-white/5`}
      >
        <nav className="px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 text-gray-300 font-medium rounded-lg hover:bg-white/5 hover:text-alfa-gold transition-colors"
          >
            Home
          </Link>

          {/* Mobile Services Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-300 font-medium rounded-lg hover:bg-white/5 hover:text-alfa-gold transition-colors"
            >
              <span>Services</span>
              <svg
                className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ${
                isMobileServicesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {serviceItems.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}
                  className="flex items-center gap-3 px-6 py-2.5 text-gray-400 hover:text-alfa-gold transition-colors"
                >
                  <div className="w-7 h-7 bg-alfa-gold/10 rounded-md flex items-center justify-center text-alfa-gold shrink-0">
                    {svc.icon}
                  </div>
                  <span className="text-sm font-medium">{svc.name}</span>
                </Link>
              ))}
              <Link
                href="/services"
                onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}
                className="block px-6 py-2.5 text-sm font-semibold text-alfa-gold hover:text-white transition-colors"
              >
                View All Services →
              </Link>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 font-medium rounded-lg hover:bg-white/5 hover:text-alfa-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3">
            <a
              href={company.phoneTel}
              className="flex items-center justify-center gap-2 w-full border-2 border-alfa-gold text-white hover:bg-alfa-gold hover:text-black font-bold px-5 py-3 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {company.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
