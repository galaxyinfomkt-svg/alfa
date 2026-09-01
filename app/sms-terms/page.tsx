import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/data/company";

export const metadata: Metadata = {
  title: "SMS Terms & Opt-In Methods",
  description:
    "How Alfa Construction collects SMS opt-in consent — chat widget, web form and verbal. CTIA-compliant disclosure of message types and opt-out.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/sms-terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 1, 2026";

export default function SmsTermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://alfapaintingcarpentry.com" },
              { name: "SMS Terms & Opt-In", url: "https://alfapaintingcarpentry.com/sms-terms" },
            ])
          ),
        }}
      />

      <article className="pt-40 pb-24 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <header className="mb-12 text-center">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
              A2P 10DLC · TCPA · CTIA Compliance
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
              SMS Terms &amp; Opt-In Methods
            </h1>
            <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </header>

          <div className="space-y-10 text-gray-300 leading-relaxed">
            {/* TOP CALLOUT — the carrier-reviewer-critical statement */}
            <div className="bg-alfa-card border-l-4 border-alfa-gold p-6 rounded-r-lg">
              <p className="text-lg font-semibold text-white mb-2">
                Alfa Construction and Cleaning Service Inc does NOT sell, rent,
                share, or transfer your mobile phone number, SMS opt-in
                consent, or any phone-related data to third parties or
                affiliates for marketing or promotional purposes.
              </p>
              <p className="text-sm text-gray-400">
                Your mobile information stays with Alfa. Period.
              </p>
            </div>

            {/* Section 1 — Brand identification */}
            <Section title="1. Who is sending the messages">
              <ul className="list-disc list-outside ml-6 space-y-1">
                <li><strong>Brand:</strong> Alfa Construction and Cleaning Service Inc</li>
                <li><strong>DBA:</strong> Alfa Construction</li>
                <li><strong>Sending phone number:</strong> (508) 590-9193</li>
                <li><strong>Office address:</strong> 34 Pearl Street, Bellingham, MA 02019</li>
                <li><strong>Customer service email:</strong> info@alfapaintingcarpentry.com</li>
                <li><strong>Website:</strong> <a className="text-alfa-gold underline" href="https://alfapaintingcarpentry.com">alfapaintingcarpentry.com</a></li>
                <li><strong>License:</strong> Massachusetts Construction License #192348</li>
              </ul>
            </Section>

            {/* Section 2 — Opt-in methods (THE KEY SECTION FOR A2P REVIEW) */}
            <Section title="2. How customers opt in to receive SMS">
              <p>
                Alfa collects SMS opt-in consent through{" "}
                <strong className="text-white">three (3) methods</strong>, each
                listed in detail below. Every method requires explicit, active
                consent — we never auto-enroll a customer based on a phone
                call alone or a purchase.
              </p>

              <div className="mt-6 space-y-6">
                <Method
                  num="A"
                  title="Website Chat Widget"
                  url="https://alfapaintingcarpentry.com"
                  description={`The chat widget is embedded on every page of alfapaintingcarpentry.com. When a visitor clicks the widget and starts a conversation, the customer is providing express consent to receive SMS replies from Alfa Construction at the phone number they enter. The first SMS sent automatically includes the TCPA disclosure (frequency, rates, STOP/HELP, privacy link).`}
                  language={`"Alfa Construction: Hi {first_name}, thanks for reaching out! Reply STOP to opt out, HELP for help. Msg frequency varies, msg & data rates may apply. https://alfapaintingcarpentry.com/privacy"`}
                />

                <Method
                  num="B"
                  title="Website Lead Form (Free Estimate Request)"
                  url="https://alfapaintingcarpentry.com/contact"
                  description={`Our online estimate-request form on the Contact page collects name, email, and project details. The form does NOT collect phone numbers as a default consent mechanism — phone collection happens only via the chat widget (method A) or verbal opt-in (method C). This isolation ensures one opt-in source per page on the public website.`}
                  language={`"By submitting this form, you agree to our Terms & Conditions and Privacy Policy."`}
                />

                <Method
                  num="C"
                  title="Verbal Opt-In via Phone"
                  url=""
                  description={`When a customer calls (508) 590-9193 to discuss a project, our team verbally asks: "Would you like text-message updates about your estimate and project status from Alfa Construction? Reply STOP at any time to opt out." If the customer says yes, we record the verbal consent (timestamp + agent name) and add their number to the SMS list. The first follow-up SMS includes the TCPA disclosure.`}
                  language={`Verbal disclosure read by Alfa team: "Alfa Construction would like to send you text-message updates about your estimate and project. Message frequency varies. Standard message and data rates may apply. Reply STOP at any time to opt out, or HELP for help. Do you consent?"`}
                />
              </div>
            </Section>

            {/* Section 3 — Message types */}
            <Section title="3. What kind of messages we send">
              <p>SMS messages from Alfa fall into these categories only:</p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-3">
                <li><strong>Estimate confirmation</strong> — confirm walkthrough date and time</li>
                <li><strong>Project scheduling</strong> — crew arrival times, schedule changes</li>
                <li><strong>Service updates</strong> — status of an active project</li>
                <li><strong>Lead-response</strong> — replies to inbound questions sent by the customer</li>
                <li><strong>Occasional service reminders</strong> — seasonal availability (only if customer opted in to marketing)</li>
              </ul>
              <p className="mt-3 text-alfa-gold-light">
                We do NOT send promotional/marketing SMS without explicit
                second-step opt-in (separate from the project-related opt-in).
              </p>
            </Section>

            {/* Section 4 — Frequency */}
            <Section title="4. Message frequency">
              <p>
                Frequency varies based on your project stage. A typical
                customer receives:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-1 mt-2">
                <li>3–6 messages per week during an active project</li>
                <li>1–2 messages during an open lead/estimate phase</li>
                <li>0 messages once the project is complete (unless you opted in to seasonal updates)</li>
              </ul>
            </Section>

            {/* Section 5 — Cost */}
            <Section title="5. Cost">
              <p>
                Alfa does not charge to send or receive SMS. However,{" "}
                <strong>standard message and data rates from your carrier may apply</strong>.
                Contact your wireless provider for details.
              </p>
            </Section>

            {/* Section 6 — Opt-out */}
            <Section title="6. How to opt out">
              <p>You can opt out at any time by:</p>
              <ul className="list-disc list-outside ml-6 space-y-1 mt-2">
                <li>Replying <strong className="text-alfa-gold">STOP</strong> to any SMS we send</li>
                <li>Replying UNSUBSCRIBE, CANCEL, QUIT, END, or OPT OUT (also accepted)</li>
                <li>Calling (508) 590-9193 and asking to be removed</li>
                <li>Emailing info@alfapaintingcarpentry.com with subject line &ldquo;UNSUBSCRIBE&rdquo;</li>
              </ul>
              <p className="mt-3">
                You will receive one final confirmation SMS confirming the
                opt-out, then no further messages until you re-opt-in by
                replying <strong className="text-alfa-gold">START</strong> or
                going through one of the opt-in methods above.
              </p>
            </Section>

            {/* Section 7 — Help */}
            <Section title="7. How to get help">
              <p>Reply <strong className="text-alfa-gold">HELP</strong> to any SMS, or:</p>
              <ul className="list-disc list-outside ml-6 space-y-1 mt-2">
                <li>📞 Call <a className="text-alfa-gold underline" href="tel:+15085909193">(508) 590-9193</a></li>
                <li>📧 Email <a className="text-alfa-gold underline" href="mailto:info@alfapaintingcarpentry.com">info@alfapaintingcarpentry.com</a></li>
                <li>🕐 Hours: Monday–Saturday, 7:00 AM – 6:00 PM EST</li>
              </ul>
            </Section>

            {/* Section 8 — Third-party sharing (CRITICAL FOR A2P) */}
            <Section title="8. Mobile information & third-party data sharing">
              <div className="bg-alfa-card border border-alfa-gold/30 p-5 rounded-lg">
                <p className="text-white font-semibold mb-2">
                  Alfa Construction does NOT share, sell, rent, transfer, or
                  otherwise disclose your mobile phone number, SMS opt-in
                  consent record, or any phone-related Personal Information
                  with third parties or affiliates for their marketing or
                  promotional purposes — under any circumstances.
                </p>
              </div>
              <p className="mt-4">
                Specifically:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-1 mt-2">
                <li>We do NOT sell your phone number to data brokers, lead-generation companies, or list aggregators.</li>
                <li>We do NOT share your SMS opt-in with affiliates or sister companies for their own marketing.</li>
                <li>We do NOT use your phone number to retarget you in third-party advertising platforms.</li>
                <li>We DO use a CRM / SMS service provider (currently HighLevel / LeadConnector) acting under a Data Processing Agreement strictly to deliver our own messages on our behalf — this is operational use, not a sale or share.</li>
              </ul>
              <p className="mt-3">
                Full data-handling disclosure is in our{" "}
                <Link className="text-alfa-gold underline" href="/privacy">
                  Privacy Policy §5 (SMS Messaging Consent)
                </Link>{" "}
                and{" "}
                <Link className="text-alfa-gold underline" href="/privacy">
                  Privacy Policy §7 (Sharing of Personal Data)
                </Link>
                .
              </p>
            </Section>

            {/* Section 9 — Sample messages */}
            <Section title="9. Example messages we send">
              <p>For carrier review and customer transparency:</p>
              <div className="space-y-3 mt-4">
                <SampleMessage>
                  Alfa Construction: Hi Mike, thanks for reaching out! Reply
                  STOP to opt out, HELP for help. Msg frequency varies, msg
                  &amp; data rates may apply.
                  https://alfapaintingcarpentry.com/privacy
                </SampleMessage>
                <SampleMessage>
                  Alfa Construction: Hi Mike, confirming your free siding
                  estimate at 12 Maple St on Tue 3pm. Reply C to confirm, R
                  to reschedule, STOP to opt out. Help? Reply HELP.
                </SampleMessage>
                <SampleMessage>
                  Alfa Construction: Mike, your siding project is on
                  schedule for Mon 5/12. Crew arrives at 7am. Questions?
                  Reply here or call (508) 590-9193. STOP to opt out.
                </SampleMessage>
              </div>
            </Section>

            {/* Section 10 — Legal */}
            <Section title="10. Legal references">
              <p>
                These SMS Terms operate alongside our other legal documents:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-1 mt-2">
                <li>
                  <Link className="text-alfa-gold underline" href="/privacy">
                    Privacy Policy
                  </Link>{" "}
                  — full data-handling disclosure
                </li>
                <li>
                  <Link className="text-alfa-gold underline" href="/terms">
                    Terms &amp; Conditions
                  </Link>{" "}
                  — service agreement
                </li>
                <li>
                  <Link className="text-alfa-gold underline" href="/cookies">
                    Cookie Policy
                  </Link>{" "}
                  — website tracking technologies
                </li>
              </ul>
              <p className="mt-3 text-sm text-gray-400">
                Compliance frameworks observed: Telephone Consumer Protection
                Act (TCPA), CAN-SPAM Act, CTIA Short Code Monitoring Handbook,
                A2P 10DLC carrier guidelines (Verizon, AT&amp;T, T-Mobile).
              </p>
            </Section>

            {/* Section 11 — Contact */}
            <Section title="11. Questions about SMS or this policy">
              <ul className="list-none space-y-2">
                <li>📧 <strong>Email:</strong>{" "}
                  <a className="text-alfa-gold underline" href="mailto:info@alfapaintingcarpentry.com">
                    info@alfapaintingcarpentry.com
                  </a>
                </li>
                <li>📞 <strong>Phone:</strong>{" "}
                  <a className="text-alfa-gold underline" href="tel:+15085909193">
                    (508) 590-9193
                  </a>
                </li>
                <li>📍 <strong>Address:</strong> Alfa Construction and Cleaning Service Inc, 34 Pearl Street, Bellingham, MA 02019</li>
              </ul>

              <div className="mt-8 pt-6 border-t border-alfa-border text-sm text-gray-400">
                <p>
                  Alfa Construction and Cleaning Service Inc<br />
                  34 Pearl Street, Bellingham, MA 02019<br />
                  Phone: (508) 590-9193<br />
                  Website: alfapaintingcarpentry.com<br />
                  MA License #192348
                </p>
                <p className="mt-3 flex gap-4 justify-center flex-wrap">
                  <Link className="text-alfa-gold underline font-semibold" href="/privacy">
                    PRIVACY POLICY
                  </Link>
                  <span>·</span>
                  <Link className="text-alfa-gold underline font-semibold" href="/terms">
                    TERMS &amp; CONDITIONS
                  </Link>
                  <span>·</span>
                  <Link className="text-alfa-gold underline font-semibold" href="/cookies">
                    COOKIE POLICY
                  </Link>
                </p>
              </div>
            </Section>
          </div>
        </div>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
      <div className="text-gray-300">{children}</div>
    </section>
  );
}

function Method({
  num,
  title,
  url,
  description,
  language,
}: {
  num: string;
  title: string;
  url?: string;
  description: string;
  language: string;
}) {
  return (
    <div className="bg-alfa-card border border-alfa-border rounded-lg p-5">
      <h3 className="text-xl font-bold text-alfa-gold mb-2">
        Method {num}: {title}
      </h3>
      {url && (
        <p className="text-sm text-gray-400 mb-3">
          Verifiable URL:{" "}
          <a className="text-alfa-gold-light underline" href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </p>
      )}
      <p className="text-gray-300 mb-3">{description}</p>
      <div className="bg-black/40 border-l-2 border-alfa-gold pl-3 py-2 text-sm font-mono text-gray-300">
        {language}
      </div>
    </div>
  );
}

function SampleMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-alfa-card border border-alfa-border rounded-lg px-4 py-3 font-mono text-sm text-gray-300 whitespace-pre-line">
      {children}
    </div>
  );
}
