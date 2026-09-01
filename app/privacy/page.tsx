import type { Metadata } from "next";
import { breadcrumbSchema } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Alfa Construction and Cleaning Service Inc. How we collect, use, and protect your personal information, including SMS messaging consent and opt-out.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "April 27, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://alfapaintingcarpentry.com" },
              { name: "Privacy Policy", url: "https://alfapaintingcarpentry.com/privacy" },
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
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </header>

          <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300 leading-relaxed">
            <p>
              This Privacy Policy describes our policies and procedures on the
              collection, use, and disclosure of your information when you use the
              Services and tells you about your privacy rights and how the law
              protects them.
            </p>
            <p>
              We use your personal data to provide and improve the Services. By using
              the Services, you consent to the collection and use of information in
              accordance with this Privacy Policy.
            </p>

            <Section title="1. Overview">
              <p>
                <strong>Alfa Construction and Cleaning Service Inc</strong> (
                doing business as <em>Alfa Construction</em>, &quot;Alfa,&quot;
                &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;) respects your
                privacy and is committed to protecting it through compliance with
                this Privacy Policy. This Privacy Policy describes how we collect
                and use your Personal Information when you visit our Website
                (alfapaintingcarpentry.com), submit a form, request a free
                estimate, communicate with us via our chat widget, send us a
                text message, or use any of our services.
              </p>
              <p>
                Please read this Privacy Policy to understand our policies and
                practices regarding your Personal Information and how we treat
                it. If you do not agree with our policies and practices, do not
                use the Services. By accessing or using the Services, you agree
                and consent to this Privacy Policy.
              </p>
              <p>
                Alfa may change this Privacy Policy at any time, at its
                discretion. Your continued use of the Services after we make
                changes will be considered acceptance and consent to those
                changes, so please check the Privacy Policy periodically for
                updates.
              </p>
              <p>
                This Privacy Policy is subject to our{" "}
                <a
                  className="text-alfa-gold-light hover:text-alfa-gold underline"
                  href="/terms"
                >
                  Terms and Conditions
                </a>
                . For information on cookies and tracking technologies, see our{" "}
                <a
                  className="text-alfa-gold-light hover:text-alfa-gold underline"
                  href="/cookies"
                >
                  Cookie Policy
                </a>
                .
              </p>
            </Section>

            <Section title="2. Interpretation and Definitions">
              <h3 className="text-white font-semibold mt-4 mb-2">Interpretation</h3>
              <p>
                Words with the first letter capitalized have meanings defined
                under the following conditions. The following definitions will
                have the same meaning regardless of whether they appear in the
                singular or plural.
              </p>

              <h3 className="text-white font-semibold mt-6 mb-2">Definitions</h3>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>
                  <strong>Account:</strong> a unique account created for you to
                  access our Services or parts of our Services.
                </li>
                <li>
                  <strong>Affiliate:</strong> an entity that controls, is
                  controlled by, or is under common control with a party.
                </li>
                <li>
                  <strong>Company:</strong> means Alfa Construction and Cleaning
                  Service Inc, with registered office at 34 Pearl Street,
                  Bellingham, MA 02019, United States.
                </li>
                <li>
                  <strong>Cookies:</strong> small files placed on your device by
                  a website, used for various purposes.
                </li>
                <li>
                  <strong>Country:</strong> means Massachusetts, United States.
                </li>
                <li>
                  <strong>Device:</strong> any device that can access the
                  Services, such as a computer or mobile phone.
                </li>
                <li>
                  <strong>Personal Data:</strong> any information relating to an
                  identified or identifiable individual, including your name,
                  phone number, email, address, and project details you share
                  with us.
                </li>
                <li>
                  <strong>Service:</strong> means the Website, the chat widget,
                  SMS messaging, email correspondence, and any other channel
                  through which Alfa interacts with you.
                </li>
                <li>
                  <strong>Service Provider:</strong> any third party who
                  processes data on behalf of the Company (for example, our CRM
                  and SMS provider).
                </li>
                <li>
                  <strong>Usage Data:</strong> data collected automatically from
                  the use of the Services.
                </li>
                <li>
                  <strong>Website:</strong> refers to alfapaintingcarpentry.com.
                </li>
                <li>
                  <strong>You:</strong> the user of the Services, either as an
                  individual or representing a legal entity.
                </li>
              </ul>
            </Section>

            <Section title="3. Information We Collect">
              <p>We collect the following categories of information:</p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-2">
                <li>
                  <strong>Contact information</strong> you provide voluntarily —
                  name, phone number, email, project address, and details about
                  the work you want done.
                </li>
                <li>
                  <strong>Communications</strong> sent through our website
                  forms, chat widget, SMS, email, or phone calls.
                </li>
                <li>
                  <strong>Photos and project notes</strong> you share with us
                  for the purpose of preparing an estimate or executing the
                  work.
                </li>
                <li>
                  <strong>Usage data</strong> collected automatically — IP
                  address, browser type, device, referring page, and analytics
                  events used to improve the Website.
                </li>
              </ul>
            </Section>

            <Section title="4. Tracking Technologies and Cookies">
              <p>
                We use Cookies and similar tracking technologies (beacons, tags,
                and analytics scripts) to track activity on our Services and
                store certain information. We use both Persistent Cookies and
                Session Cookies for the following purposes:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-2">
                <li>
                  <strong>Essential Cookies:</strong> necessary to provide
                  Services and enable Website features.
                </li>
                <li>
                  <strong>Cookies for Acceptance of the Cookie Policy:</strong>{" "}
                  identify whether users have accepted the use of cookies.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> remember your choices to
                  offer a more personalized experience.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> measure how the Website is
                  used so we can improve it.
                </li>
              </ul>
              <p>
                We do <strong>NOT</strong> retain Personal Information to
                develop, improve, or train generalized AI or machine learning
                models, including user data provided via third-party APIs.
              </p>
              <p>
                For more details on the cookies we use, see our{" "}
                <a
                  className="text-alfa-gold-light hover:text-alfa-gold underline"
                  href="/cookies"
                >
                  Cookie Policy
                </a>
                .
              </p>
            </Section>

            <Section title="5. SMS / Text Messaging Consent (A2P 10DLC)">
              <p className="text-alfa-gold-light font-semibold mb-3">
                Important — Telephone Consumer Protection Act (TCPA) compliance.
              </p>
              <p>
                When you provide your mobile phone number to Alfa Construction
                and Cleaning Service Inc — through our website form, chat
                widget, by phone, or in person — and you check a consent box or
                otherwise agree to receive SMS, you authorize us to send you SMS
                text messages related to your project, estimates, scheduling,
                follow-up, and occasional service updates.
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-3">
                <li>
                  <strong>Message frequency varies</strong> based on your
                  project stage. You typically receive a few messages per week
                  during an active project and only occasional updates outside
                  active work.
                </li>
                <li>
                  <strong>Message and data rates may apply.</strong> Your
                  carrier&apos;s standard rates apply to all SMS communications.
                  Alfa does not charge a fee to send or receive SMS.
                </li>
                <li>
                  <strong>Reply STOP</strong> at any time to any SMS we send to
                  unsubscribe. You will be removed from our SMS list and will
                  not receive further messages.
                </li>
                <li>
                  <strong>Reply HELP</strong> for assistance, or contact us
                  directly at (508) 590-9193 or info@alfapaintingcarpentry.com.
                </li>
                <li>
                  <strong>Mobile information will not be shared</strong> with
                  third parties or affiliates for marketing or promotional
                  purposes. All categories of information described in this
                  policy exclude mobile opt-in consent and phone numbers from
                  being sold or transferred to third parties.
                </li>
                <li>
                  <strong>How we obtain consent:</strong> you opt in by
                  submitting our website form with the SMS consent checkbox
                  checked, by initiating a conversation through our website
                  chat widget, or by verbally agreeing during a phone call.
                </li>
              </ul>
              <p className="mt-3">
                By providing your phone number and giving consent, you confirm
                that the number provided is yours, that you are authorized to
                receive SMS at that number, and that you agree to the SMS terms
                described above.
              </p>
            </Section>

            <Section title="6. Use of Your Personal Data">
              <p>Alfa may use your Personal Data for the following purposes:</p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-2">
                <li>
                  To provide and maintain our Services, including monitoring the
                  use of the Services.
                </li>
                <li>
                  To prepare estimates, schedule appointments, communicate
                  project status, and deliver the work you hired us for.
                </li>
                <li>
                  To contact you by email, telephone, SMS, or other electronic
                  means of communication for updates or information related to
                  the Services.
                </li>
                <li>
                  To provide information about products, special offers, and
                  events that we offer (only if you opted in to such marketing
                  communications).
                </li>
                <li>To comply with legal obligations.</li>
              </ul>
            </Section>

            <Section title="7. Sharing of Your Personal Data">
              <p>Alfa may share your personal data in the following situations:</p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-2">
                <li>
                  <strong>With Service Providers:</strong> CRM, scheduling, and
                  SMS providers that process data on our behalf to operate the
                  Services. We never sell your information.
                </li>
                <li>
                  <strong>With Affiliates:</strong> with controlling companies or
                  subsidiaries under common control.
                </li>
                <li>
                  <strong>With Business Partners:</strong> only when necessary to
                  deliver a specific service you requested.
                </li>
                <li>
                  <strong>With Your Consent:</strong> for any other purpose
                  with your explicit permission.
                </li>
                <li>
                  <strong>For Legal Reasons:</strong> if required by law,
                  subpoena, or court order.
                </li>
              </ul>
              <p className="mt-3 text-alfa-gold-light">
                We do not sell, rent, or share your phone number with third
                parties for their marketing purposes.
              </p>
            </Section>

            <Section title="8. Retention of Your Personal Data">
              <p>
                Alfa will retain your Personal Data only for as long as necessary
                to fulfill the purposes outlined in this Privacy Policy. We will
                also retain Usage Data for internal analysis, usually for shorter
                periods.
              </p>
            </Section>

            <Section title="9. Transfer of Your Personal Data">
              <p>
                Your information may be transferred to, and maintained on,
                computers located outside of your state, province, or country
                where the data protection laws may differ from those where you
                live. Servers used by our service providers may be located in the
                United States.
              </p>
            </Section>

            <Section title="10. Deletion of Your Personal Data">
              <p>
                You have the right to delete or request assistance in deleting
                the Personal Data we have collected about you. You may update,
                correct, or delete your information at any time by contacting us
                using the information at the bottom of this page.
              </p>
            </Section>

            <Section title="11. Lawful Disclosures of Your Personal Data">
              <p>
                We may be required to disclose your Personal Data to comply with
                legal requirements or by order of governmental authorities, such
                as courts or government agencies.
              </p>
            </Section>

            <Section title="12. Security of Your Personal Data">
              <p>
                The security of your Personal Data is important to us, but
                remember that no method of transmission over the Internet, or
                electronic storage, is 100% secure. We use commercially
                reasonable measures to protect your Personal Data, but cannot
                guarantee absolute security.
              </p>
            </Section>

            <Section title="13. Children's Privacy">
              <p>
                We do not knowingly collect, use, or disclose Information from
                children under 16. If we learn that we have collected the
                Personal Information of a child under 16 — or the equivalent
                minimum age depending on the jurisdiction, such as 13 in the
                United States per the Children&apos;s Online Privacy Protection
                Act — we will take steps to delete the information as soon as
                possible.
              </p>
              <p>
                If you are under 16, do not provide any Information about
                yourself to Alfa, including your name, address, telephone number,
                or email address. If you become aware that Information of a
                child under 16 years of age has been provided, please contact us
                using the methods in the &quot;Contact Us&quot; section below.
              </p>
            </Section>

            <Section title="14. Links to Other Sites">
              <p>
                Our Service may contain links to third-party websites. We have
                no control over, and are not responsible for, the privacy
                practices of third-party websites.
              </p>
            </Section>

            <Section title="15. Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy at any time. We will notify
                you of any changes by posting the new Privacy Policy on this
                page and updating the &quot;Last updated&quot; date at the top.
              </p>
            </Section>

            <Section title="16. Contact Us">
              <p>
                If you have any questions about this Privacy Policy, including
                your SMS consent or opt-out preferences, please contact us:
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
                  📍 <strong>Address:</strong> 34 Pearl Street, Bellingham,
                  Massachusetts 02019, United States
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
                    href="/terms"
                  >
                    TERMS AND CONDITIONS
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
