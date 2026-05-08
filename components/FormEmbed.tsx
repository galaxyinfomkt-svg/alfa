"use client";

import { useEffect } from "react";

export default function FormEmbed() {
  useEffect(() => {
    const scriptId = "ghl-form-embed";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="alfa-form-card relative">
      {/* Soft gold glow behind the card */}
      <div
        aria-hidden
        className="absolute -inset-1 rounded-2xl opacity-40 blur-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(184,150,62,.35), transparent 55%), radial-gradient(circle at 80% 90%, rgba(212,170,80,.18), transparent 55%)",
        }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden border border-alfa-gold/25 shadow-2xl shadow-black/50"
        style={{
          background:
            "linear-gradient(160deg, rgba(20,20,20,0.92) 0%, rgba(11,11,11,0.95) 100%)",
        }}
      >
        {/* Gold accent bar at top */}
        <div className="h-1 w-full bg-gradient-to-r from-alfa-gold-dark via-alfa-gold to-alfa-gold-light" />

        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-alfa-gold/15 ring-1 ring-alfa-gold/30">
              <svg className="h-4 w-4 text-alfa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-alfa-gold">
                Free Estimate
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                Get your project quoted
              </h3>
            </div>
          </div>

          {/* Trust signals row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-gray-400 mt-3">
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
              No pressure
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
              Licensed &amp; Insured
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
              18+ Years
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.29z" />
              </svg>
              5.0 · 22 reviews
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="relative px-2 pb-2">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/PiFH0ELuOmHS9iZhGQ5F"
            style={{
              width: "calc(100% + 20px)",
              height: 700,
              border: "none",
              background: "transparent",
              colorScheme: "normal",
            }}
            allowTransparency
            scrolling="no"
            id="inline-PiFH0ELuOmHS9iZhGQ5F"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="FORM SITE ALFA"
            data-height="700"
            data-layout-iframe-id="inline-PiFH0ELuOmHS9iZhGQ5F"
            data-form-id="PiFH0ELuOmHS9iZhGQ5F"
            title="FORM SITE ALFA"
          />
        </div>

        {/* Footer disclaimer */}
        <div className="border-t border-white/5 px-6 py-3 text-[11px] text-gray-500 flex items-center justify-between gap-3">
          <span>By submitting, you agree to our <a className="text-alfa-gold hover:text-alfa-gold-light underline-offset-2 hover:underline" href="/terms">Terms</a> &amp; <a className="text-alfa-gold hover:text-alfa-gold-light underline-offset-2 hover:underline" href="/privacy">Privacy</a>.</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-gray-500">
            <svg className="w-3 h-3 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            SSL secured
          </span>
        </div>
      </div>
    </div>
  );
}

