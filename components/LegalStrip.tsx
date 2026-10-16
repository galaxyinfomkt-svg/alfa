import Link from "next/link";

/**
 * Faixa legal acima do rodape em todas as paginas.
 * Exigida na revisao A2P 10DLC (TCR + Twilio): o revisor precisa achar
 * Privacy / Terms / Cookie Policy em qualquer pagina.
 */
export default function LegalStrip() {
  return (
    <div className="bg-mist border-t border-line">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-xs md:text-sm text-ink-soft leading-relaxed">
          By using this website, submitting a form, or sending us an SMS, you agree to our{" "}
          <Link href="/privacy" className="font-semibold text-ink underline underline-offset-2">Privacy Policy</Link>,{" "}
          <Link href="/terms" className="font-semibold text-ink underline underline-offset-2">Terms &amp; Conditions</Link>, and{" "}
          <Link href="/cookies" className="font-semibold text-ink underline underline-offset-2">Cookie Policy</Link>.
          Reply <strong className="text-ink">STOP</strong> to opt out of SMS at any time.
        </p>
      </div>
    </div>
  );
}
