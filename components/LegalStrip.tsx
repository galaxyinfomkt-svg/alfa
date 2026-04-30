import Link from "next/link";

/**
 * Slim legal strip rendered above the Footer on every page.
 * Required by A2P 10DLC carrier review (TCR + Twilio) so reviewers can find
 * Privacy / Terms / Cookie Policy in one scroll, on any page of the site.
 */
export default function LegalStrip() {
  return (
    <div className="bg-alfa-card border-y border-alfa-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
            By using this website, submitting a form, or sending us an SMS, you agree to our{" "}
            <Link
              href="/privacy"
              className="text-alfa-gold font-semibold hover:text-alfa-gold-light underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            ,{" "}
            <Link
              href="/terms"
              className="text-alfa-gold font-semibold hover:text-alfa-gold-light underline underline-offset-2"
            >
              Terms &amp; Conditions
            </Link>
            , and{" "}
            <Link
              href="/cookies"
              className="text-alfa-gold font-semibold hover:text-alfa-gold-light underline underline-offset-2"
            >
              Cookie Policy
            </Link>
            . Reply <strong className="text-white">STOP</strong> to opt out of SMS at any time.
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/privacy"
              className="text-xs font-semibold text-alfa-gold hover:text-alfa-gold-light transition-colors whitespace-nowrap underline underline-offset-2"
            >
              Privacy
            </Link>
            <span className="text-gray-700">·</span>
            <Link
              href="/terms"
              className="text-xs font-semibold text-alfa-gold hover:text-alfa-gold-light transition-colors whitespace-nowrap underline underline-offset-2"
            >
              Terms
            </Link>
            <span className="text-gray-700">·</span>
            <Link
              href="/cookies"
              className="text-xs font-semibold text-alfa-gold hover:text-alfa-gold-light transition-colors whitespace-nowrap underline underline-offset-2"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
