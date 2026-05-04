import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/data/company";
import FormEmbed from "@/components/FormEmbed";

export const metadata: Metadata = {
  title: "SMS Opt-In | Alfa Construction and Cleaning Service Inc",
  description:
    "Opt in to receive SMS updates from Alfa Construction and Cleaning Service Inc about estimates, scheduling, and project status. CTIA / TCPA / A2P 10DLC compliant consent.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/sms-opt-in" },
  robots: { index: true, follow: true },
};

export default function SmsOptInPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://alfapaintingcarpentry.com" },
              { name: "SMS Opt-In", url: "https://alfapaintingcarpentry.com/sms-opt-in" },
            ])
          ),
        }}
      />

      <article className="pt-40 pb-24 bg-black min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <header className="mb-10 text-center">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              A2P 10DLC · TCPA · CTIA Compliant
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
              SMS Opt-In
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Provide your phone number below to consent to SMS updates from{" "}
              <strong className="text-white">Alfa Construction and Cleaning Service Inc.</strong> about your
              estimate, project schedule, and service status.
            </p>
          </header>

          <div className="bg-alfa-card border border-alfa-border rounded-xl p-2 md:p-4">
            <FormEmbed />
          </div>

          <div className="mt-10 text-sm text-gray-400 leading-relaxed space-y-3">
            <p>
              By submitting this form, you agree to receive SMS messages from{" "}
              Alfa Construction and Cleaning Service Inc. at the phone number provided. Message frequency
              varies. Message and data rates may apply. Reply{" "}
              <strong className="text-alfa-gold">STOP</strong> to opt out or{" "}
              <strong className="text-alfa-gold">HELP</strong> for help.
            </p>
            <p>
              Alfa Construction and Cleaning Service Inc. does NOT sell, rent, or share your mobile phone
              number or SMS opt-in consent with any third party or affiliate
              for marketing or promotional purposes.
            </p>
            <p className="pt-2">
              See our{" "}
              <Link className="text-alfa-gold underline" href="/sms-terms">
                SMS Terms &amp; Opt-In Methods
              </Link>
              ,{" "}
              <Link className="text-alfa-gold underline" href="/privacy">
                Privacy Policy
              </Link>
              , and{" "}
              <Link className="text-alfa-gold underline" href="/terms">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
