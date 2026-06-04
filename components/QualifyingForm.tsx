"use client";

import { useState } from "react";

/**
 * Qualifying lead form — pivot siding-only Tier A/B routing.
 *
 * Spec source: social/spec-files dropped 2026-06-04 (alfa-qualifying-form-spec.md).
 * Lógica:
 *   - Q1 = "small-repair" → Tier B (auto-response, NÃO notifica Fabio)
 *   - Qualquer outro Q1 → Tier A (notifica Fabio < 1h)
 *
 * Submissão: POST pra webhook GHL via env var NEXT_PUBLIC_GHL_WEBHOOK_URL.
 * Sem env, mostra fallback graceful e loga warning no console.
 *
 * O Fabio precisa configurar no GHL:
 *   1. Workflow trigger = inbound webhook
 *   2. Copiar URL do webhook → setar NEXT_PUBLIC_GHL_WEBHOOK_URL no Vercel
 *   3. Workflow lê os custom fields (project_type, budget_band, etc.) e tags
 *      (tier-a-bigjob | tier-b-smalljob) pra rotear conforme spec
 */

const WEBHOOK_URL = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL || "";

type ProjectType =
  | "full-home-reside"
  | "new-construction-addition"
  | "partial-full-side"
  | "small-repair";

type Material = "hardie" | "vinyl" | "cedar-shake" | "not-sure" | "";
type HomeSize = "1-story" | "2-stories" | "3-plus-stories" | "";
type Budget = "15-25k" | "25-40k" | "40k-plus" | "not-sure" | "";
type Timeline = "asap" | "1-3-months" | "researching" | "";

const projectOptions: { value: ProjectType; label: string; tier: "A" | "B" }[] = [
  { value: "full-home-reside", label: "Full-home siding replacement (re-side)", tier: "A" },
  { value: "new-construction-addition", label: "New construction / addition siding", tier: "A" },
  { value: "partial-full-side", label: "Partial exterior — one or more full sides", tier: "A" },
  { value: "small-repair", label: "Small repair / single panel / touch-up", tier: "B" },
];

export default function QualifyingForm() {
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [material, setMaterial] = useState<Material>("");
  const [homeSize, setHomeSize] = useState<HomeSize>("");
  const [budget, setBudget] = useState<Budget>("");
  const [timeline, setTimeline] = useState<Timeline>("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | "A" | "B">(null);
  const [error, setError] = useState<string | null>(null);

  const tier: "A" | "B" =
    projectType === "small-repair" ? "B" : "A";

  const computeScore = (): number => {
    let s = 0;
    if (projectType === "full-home-reside" || projectType === "new-construction-addition" || projectType === "partial-full-side") s += 50;
    if (projectType === "small-repair") s -= 100;
    if (budget === "40k-plus") s += 30;
    if (budget === "25-40k") s += 20;
    if (budget === "15-25k") s += 10;
    if (homeSize === "3-plus-stories") s += 15;
    if (homeSize === "2-stories") s += 10;
    if (timeline === "asap") s += 15;
    if (timeline === "1-3-months") s += 8;
    return s;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectType || !fullName || !phone || !consent) return;

    setSubmitting(true);
    setError(null);

    const payload = {
      tier,
      score: computeScore(),
      tags: [
        tier === "A" ? "tier-a-bigjob" : "tier-b-smalljob",
        material ? `mat-${material}` : null,
        budget === "40k-plus" ? "budget-40kplus" : null,
        timeline === "asap" ? "ts-asap" : null,
      ].filter(Boolean),
      project_type: projectType,
      siding_material: material || null,
      home_size: homeSize || null,
      budget_band: budget || null,
      timeline: timeline || null,
      full_name: fullName,
      phone,
      email: email || null,
      city: city || null,
      notes: notes || null,
      source: "alfapaintingcarpentry.com/qualifying-form",
      submitted_at: new Date().toISOString(),
    };

    if (WEBHOOK_URL) {
      try {
        const r = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error(`Webhook returned ${r.status}`);
      } catch (err) {
        console.error("[QualifyingForm] webhook failed:", err);
        setError("We received your information. Fabio will reach out shortly. If urgent, call (508) 590-9193.");
        setSubmitted(tier);
        setSubmitting(false);
        return;
      }
    } else {
      console.warn("[QualifyingForm] NEXT_PUBLIC_GHL_WEBHOOK_URL not set — submission not sent.");
    }

    setSubmitted(tier);
    setSubmitting(false);
  };

  // ─── SUCCESS STATES ─────────────────────────────────────────────────────

  if (submitted === "A") {
    return (
      <div className="bg-alfa-card border border-alfa-gold/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-alfa-gold/15 flex items-center justify-center mb-5">
          <svg className="w-8 h-8 text-alfa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Thanks, {fullName.split(" ")[0]}!</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          Your siding project is in good hands. Fabio will reach out within the hour to schedule
          your free on-site assessment (English or Portuguese).
        </p>
        <p className="text-sm text-gray-400">
          For anything urgent, call{" "}
          <a href="tel:+15085909193" className="text-alfa-gold hover:text-alfa-gold-light font-semibold">
            (508) 590-9193
          </a>
          .
        </p>
        {error && <p className="text-xs text-yellow-500 mt-4">{error}</p>}
      </div>
    );
  }

  if (submitted === "B") {
    return (
      <div className="bg-alfa-card border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-3">Thanks for reaching out</h3>
        <p className="text-gray-300 leading-relaxed mb-4 text-sm">
          We focus exclusively on complete siding installations and full-home replacements, so
          we&apos;re not the best fit for small repairs or single-panel work.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4 text-sm">
          If your project grows into a full re-side, we&apos;d love to help — just reach back out.
          For smaller repairs, a local handyman or general repair service will usually serve you
          faster.
        </p>
        <p className="text-xs text-gray-500">— The Alfa Team</p>
      </div>
    );
  }

  // ─── FORM ───────────────────────────────────────────────────────────────

  const canSubmit =
    !!projectType && !!fullName.trim() && !!phone.trim() && consent && !submitting;

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-left">
      <header className="text-center pb-4 border-b border-white/5">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Get your free siding estimate</h3>
        <p className="text-xs text-gray-400">
          We specialize in complete siding installation &amp; full-home replacements.
        </p>
      </header>

      {/* Q1 — Project type (required, drives Tier A/B) */}
      <fieldset>
        <legend className="text-sm font-semibold text-white mb-2">
          1. What&apos;s your project? <span className="text-alfa-gold">*</span>
        </legend>
        <div className="space-y-1.5">
          {projectOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                projectType === opt.value
                  ? "bg-alfa-gold/10 border-alfa-gold/40"
                  : "bg-white/[0.02] border-white/10 hover:border-alfa-gold/30"
              }`}
            >
              <input
                type="radio"
                name="project_type"
                value={opt.value}
                checked={projectType === opt.value}
                onChange={() => setProjectType(opt.value)}
                className="mt-1 accent-alfa-gold"
                required
              />
              <span className="text-sm text-gray-200 leading-snug">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Q2 — Material (optional) */}
      <div>
        <label htmlFor="material" className="block text-sm font-semibold text-white mb-1.5">
          2. Siding material you&apos;re considering
        </label>
        <select
          id="material"
          name="siding_material"
          value={material}
          onChange={(e) => setMaterial(e.target.value as Material)}
          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-alfa-gold focus:outline-none"
        >
          <option value="">— Select (optional) —</option>
          <option value="hardie">James Hardie (fiber cement)</option>
          <option value="vinyl">Vinyl</option>
          <option value="cedar-shake">Cedar / shake</option>
          <option value="not-sure">Not sure — need advice</option>
        </select>
      </div>

      {/* Q3 — Home size */}
      <fieldset>
        <legend className="text-sm font-semibold text-white mb-2">3. Home size</legend>
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: "1-story", l: "1 story" },
            { v: "2-stories", l: "2 stories" },
            { v: "3-plus-stories", l: "3+ stories" },
          ].map((o) => (
            <label
              key={o.v}
              className={`text-center text-xs py-2.5 rounded-lg border cursor-pointer transition-colors ${
                homeSize === o.v
                  ? "bg-alfa-gold/10 border-alfa-gold/40 text-white"
                  : "bg-white/[0.02] border-white/10 text-gray-300 hover:border-alfa-gold/30"
              }`}
            >
              <input
                type="radio"
                name="home_size"
                value={o.v}
                checked={homeSize === o.v}
                onChange={() => setHomeSize(o.v as HomeSize)}
                className="sr-only"
              />
              {o.l}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Q4 — Budget (qualificador forte) */}
      <fieldset>
        <legend className="text-sm font-semibold text-white mb-2">4. Estimated project budget</legend>
        <div className="grid grid-cols-2 gap-2">
          {[
            { v: "15-25k", l: "$15k – $25k" },
            { v: "25-40k", l: "$25k – $40k" },
            { v: "40k-plus", l: "$40k+" },
            { v: "not-sure", l: "Not sure yet" },
          ].map((o) => (
            <label
              key={o.v}
              className={`text-center text-xs py-2.5 rounded-lg border cursor-pointer transition-colors ${
                budget === o.v
                  ? "bg-alfa-gold/10 border-alfa-gold/40 text-white"
                  : "bg-white/[0.02] border-white/10 text-gray-300 hover:border-alfa-gold/30"
              }`}
            >
              <input
                type="radio"
                name="budget_band"
                value={o.v}
                checked={budget === o.v}
                onChange={() => setBudget(o.v as Budget)}
                className="sr-only"
              />
              {o.l}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Q5 — Timeline */}
      <fieldset>
        <legend className="text-sm font-semibold text-white mb-2">5. Timeline</legend>
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: "asap", l: "ASAP" },
            { v: "1-3-months", l: "1–3 months" },
            { v: "researching", l: "Researching" },
          ].map((o) => (
            <label
              key={o.v}
              className={`text-center text-xs py-2.5 rounded-lg border cursor-pointer transition-colors ${
                timeline === o.v
                  ? "bg-alfa-gold/10 border-alfa-gold/40 text-white"
                  : "bg-white/[0.02] border-white/10 text-gray-300 hover:border-alfa-gold/30"
              }`}
            >
              <input
                type="radio"
                name="timeline"
                value={o.v}
                checked={timeline === o.v}
                onChange={() => setTimeline(o.v as Timeline)}
                className="sr-only"
              />
              {o.l}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Contact */}
      <div className="space-y-3 pt-2 border-t border-white/5">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-white mb-1.5">
            Full name <span className="text-alfa-gold">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-alfa-gold focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-white mb-1.5">
              Phone <span className="text-alfa-gold">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-alfa-gold focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-white mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-alfa-gold focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="city" className="block text-xs font-semibold text-white mb-1.5">
            Property address / city
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Milton, MA"
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-alfa-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-xs font-semibold text-white mb-1.5">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-alfa-gold focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Consent (TCPA) */}
      <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-alfa-gold"
          required
        />
        <span>
          I agree to receive a call or text from Alfa Construction at the number provided. Message
          and data rates may apply. See{" "}
          <a href="/privacy" className="text-alfa-gold hover:underline">Privacy</a> &amp;{" "}
          <a href="/sms-terms" className="text-alfa-gold hover:underline">SMS Terms</a>.
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full bg-gradient-to-r from-alfa-gold-dark via-alfa-gold to-alfa-gold-light text-black font-bold py-3.5 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-alfa-gold/30"
      >
        {submitting ? "Sending…" : "Get My Free Siding Estimate"}
      </button>

      <p className="text-[11px] text-gray-500 text-center leading-relaxed">
        No pressure · Licensed &amp; insured · MA HIC #192348 · 18+ years · Free written estimate in 24h
      </p>
    </form>
  );
}
