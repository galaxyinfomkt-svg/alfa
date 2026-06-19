import type { Metadata } from "next";
import { breadcrumbSchema } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms and Conditions | Alfa Construction",
  description:
    "Terms and Conditions for Alfa Construction and Cleaning Service Inc. The legal terms governing your use of our Website and Services.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "April 27, 2026";

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://alfapaintingcarpentry.com" },
              { name: "Terms and Conditions", url: "https://alfapaintingcarpentry.com/terms" },
            ])
          ),
        }}
      />

      <article className="pt-40 pb-24 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <header className="mb-12 text-center">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </header>

          <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300 leading-relaxed">
            <p>
              Please read these Terms and Conditions carefully before using Our
              Service.
            </p>

            <Section title="Interpretation and Definitions">
              <h3 className="text-white font-semibold mt-4 mb-2">Interpretation</h3>
              <p>
                The words with capitalized initials have meanings defined under
                the following conditions. These definitions shall apply whether
                they appear in singular or plural.
              </p>

              <h3 className="text-white font-semibold mt-6 mb-2">Definitions</h3>
              <p>For the purposes of these Terms and Conditions:</p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-2">
                <li>
                  <strong>Affiliate</strong> means an entity that controls, is
                  controlled by, or is under common control with a party.
                </li>
                <li>
                  <strong>Country</strong> refers to: Massachusetts, United
                  States.
                </li>
                <li>
                  <strong>Company</strong> (referred to as either &quot;the
                  Company&quot;, &quot;We&quot;, &quot;Us&quot;, or
                  &quot;Our&quot; in this Agreement) refers to{" "}
                  <strong>Alfa Construction and Cleaning Service Inc</strong>,
                  located at 34 Pearl Street, Bellingham, MA 02019, United
                  States.
                </li>
                <li>
                  <strong>Device</strong> means any device that can access the
                  Service such as a computer, cellphone, or digital tablet.
                </li>
                <li>
                  <strong>Service</strong> refers to the Website
                  (alfapaintingcarpentry.com), the chat widget, SMS messaging,
                  email correspondence, and the construction, siding,
                  carpentry, painting, and cleaning services provided by the
                  Company.
                </li>
                <li>
                  <strong>Terms and Conditions</strong> (also referred to as
                  &quot;Terms&quot;) mean these Terms and Conditions that form
                  the entire agreement between You and the Company.
                </li>
                <li>
                  <strong>Third-party Social Media Service</strong> means any
                  third-party services or content linked or integrated with the
                  Service.
                </li>
                <li>
                  <strong>Website</strong> refers to{" "}
                  <em>alfapaintingcarpentry.com</em> and all subdomains.
                </li>
                <li>
                  <strong>You</strong> means the individual accessing or using
                  the Service, or the legal entity on behalf of which such
                  individual is acting.
                </li>
              </ul>
            </Section>

            <Section title="Acknowledgment">
              <p>
                These are the Terms and Conditions governing the use of this
                Service. By accessing or using the Service, You agree to be
                bound by these Terms. If You disagree with any part, You may
                not access the Service.
              </p>
              <p>
                You must be over 18 to use the Service. Your access is also
                subject to our{" "}
                <a
                  className="text-alfa-gold-light hover:text-alfa-gold underline"
                  href="/privacy"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </Section>

            <Section title="SMS / Text Messaging Terms">
              <p>
                If You provide your mobile phone number to Alfa Construction
                and Cleaning Service Inc and consent to receive SMS messages,
                You agree to the following:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-2">
                <li>
                  You may receive SMS related to your project (estimates,
                  scheduling, updates) from <strong>(508) 590-9193</strong>.
                </li>
                <li>
                  Message frequency varies. Typical volume is a few messages
                  per week during an active project.
                </li>
                <li>
                  Standard message and data rates from your carrier may apply.
                </li>
                <li>
                  Reply <strong>STOP</strong> to opt out at any time. Reply{" "}
                  <strong>HELP</strong> for assistance.
                </li>
                <li>
                  Your mobile information will not be shared with third parties
                  for marketing purposes.
                </li>
              </ul>
              <p className="mt-3">
                Full SMS terms are described in our{" "}
                <a
                  className="text-alfa-gold-light hover:text-alfa-gold underline"
                  href="/privacy#sms"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </Section>

            <Section title="Estimates and Project Work">
              <p>
                Free estimates provided by Alfa are non-binding until a written
                contract is signed by both parties. Final pricing, scope, and
                schedule are set by the signed contract for each project.
                Photographs and project descriptions on this Website represent
                completed work and do not constitute a guarantee that your
                project will produce identical results.
              </p>
            </Section>

            <Section title="Links to Other Websites">
              <p>
                Our Service may contain links to third-party websites. We are
                not responsible for the content, privacy policies, or practices
                of those websites. Please review their terms independently.
              </p>
            </Section>

            <Section title="Termination">
              <p>
                We may terminate or suspend Your access immediately without
                notice if You breach these Terms. Upon termination, Your right
                to use the Service ends immediately.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                Our liability is limited to the amount You paid through the
                Service, or $100 if no purchase was made. We are not liable for
                indirect, incidental, or consequential damages unless required
                by law.
              </p>
            </Section>

            <Section title='"AS IS" and "AS AVAILABLE" Disclaimer'>
              <p>
                Our Service is provided &quot;AS IS&quot; and &quot;AS
                AVAILABLE&quot; without warranties of any kind, whether
                express or implied. This disclaimer applies to the Website and
                its content, not to construction work performed under a signed
                contract, which is governed by the warranty terms of that
                contract.
              </p>
            </Section>

            <Section title="Governing Law">
              <p>
                These Terms are governed by the laws of the State of
                Massachusetts, United States, without regard to conflict of
                laws principles.
              </p>
            </Section>

            <Section title="Dispute Resolution">
              <p>
                Before pursuing formal legal action, You agree to attempt to
                resolve any disputes informally by contacting Us first at the
                contact information below. We will work in good faith to
                resolve issues quickly.
              </p>
            </Section>

            <Section title="United States Legal Compliance">
              <p>
                You warrant that You are not located in a country under a U.S.
                embargo or listed on any U.S. government list of prohibited
                parties.
              </p>
            </Section>

            <Section title="Severability and Waiver">
              <p>
                If any part of these Terms is held invalid, the rest remain
                enforceable. A failure to enforce any provision does not waive
                Our right to enforce it later.
              </p>
            </Section>

            <Section title="Changes to These Terms and Conditions">
              <p>
                We may update these Terms at any time. We will notify users of
                material changes at least 30 days in advance by posting the
                updated Terms on this page. Continued use of the Service after
                changes constitutes acceptance.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                If you have any questions about these Terms and Conditions, you
                can contact us:
              </p>
              <ul className="list-none mt-3 space-y-2">
                <li>
                  📧 <strong>Email:</strong>{" "}
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold"
                    href="mailto:info@alfapaintingcarpentry.com"
                  >
                    info@alfapaintingcarpentry.com
                  </a>
                </li>
                <li>
                  📞 <strong>Phone:</strong>{" "}
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold"
                    href="tel:+15085909193"
                  >
                    (508) 590-9193
                  </a>
                </li>
                <li>
                  📍 <strong>Address:</strong> Alfa Construction and Cleaning
                  Service Inc, 34 Pearl Street, Bellingham, MA 02019, United
                  States
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-alfa-border text-sm text-gray-400">
                <p>
                  Alfa Construction and Cleaning Service Inc<br />
                  34 Pearl Street, Bellingham, MA 02019<br />
                  Local Phone: (508) 590-9193<br />
                  Email: info@alfapaintingcarpentry.com<br />
                  Website: alfapaintingcarpentry.com
                </p>
                <p className="mt-3 flex gap-4 justify-center">
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline font-semibold"
                    href="/privacy"
                  >
                    PRIVACY POLICY
                  </a>
                  <span>·</span>
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline font-semibold"
                    href="/cookies"
                  >
                    COOKIE POLICY
                  </a>
                </p>
              </div>
            </Section>
          </div>
        </div>
      </article>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">
        {title}
      </h2>
      <div className="text-gray-300">{children}</div>
    </section>
  );
}
