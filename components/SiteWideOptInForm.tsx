"use client";

import { usePathname } from "next/navigation";
import FormEmbed from "./FormEmbed";

const HIDE_EXACT = ["/", "/contact", "/sms-opt-in"];
const HIDE_PREFIXES = ["/contact", "/sms-opt-in", "/services", "/massachusetts"];

export default function SiteWideOptInForm() {
  const pathname = usePathname();
  if (pathname) {
    if (HIDE_EXACT.includes(pathname)) return null;
    if (HIDE_PREFIXES.some((p) => pathname.startsWith(p + "/"))) return null;
  }

  return (
    <section className="bg-alfa-dark border-t border-white/5 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <header className="text-center mb-8">
          <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
            SMS Opt-In · A2P 10DLC Compliant
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
            Get SMS Updates from Alfa
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Sign up to receive estimate confirmations, project updates, and
            service reminders from Alfa Construction and Cleaning Service Inc.
          </p>
        </header>
        <div className="bg-alfa-card border border-alfa-border rounded-xl p-2 md:p-4">
          <FormEmbed />
        </div>
      </div>
    </section>
  );
}
