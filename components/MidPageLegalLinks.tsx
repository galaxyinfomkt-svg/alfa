import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/sms-terms", label: "SMS Terms" },
  { href: "/sms-opt-in", label: "SMS Opt-In" },
];

export default function MidPageLegalLinks() {
  return (
    <section className="bg-alfa-card border-y border-alfa-gold/30 py-10">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-alfa-gold uppercase tracking-wider text-sm font-semibold mb-4">
          Important Information
        </h2>
        <nav aria-label="Legal and policy links">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-x-7">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base md:text-lg font-semibold text-alfa-gold hover:text-white underline underline-offset-4 decoration-alfa-gold/60 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-5 text-xs md:text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed">
          By using this website, submitting a form, or sending us an SMS, you
          agree to our Privacy Policy, Terms &amp; Conditions, and Cookie
          Policy. Message frequency varies. Msg &amp; data rates may apply.
          Reply <strong className="text-white">STOP</strong> to opt out or{" "}
          <strong className="text-white">HELP</strong> for help.
        </p>
      </div>
    </section>
  );
}
