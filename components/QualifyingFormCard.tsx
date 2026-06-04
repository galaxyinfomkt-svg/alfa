import QualifyingForm from "./QualifyingForm";

/**
 * QualifyingForm wrapped in the gold-border / gradient card.
 * Use this everywhere instead of bare <QualifyingForm /> so the
 * visual treatment stays consistent across home, contact, city, and
 * service pages.
 */
export default function QualifyingFormCard() {
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
      <div
        className="relative rounded-2xl overflow-hidden border border-alfa-gold/25 shadow-2xl shadow-black/50 p-6 md:p-8"
        style={{
          background:
            "linear-gradient(160deg, rgba(20,20,20,0.92) 0%, rgba(11,11,11,0.95) 100%)",
        }}
      >
        <QualifyingForm />
      </div>
    </div>
  );
}
