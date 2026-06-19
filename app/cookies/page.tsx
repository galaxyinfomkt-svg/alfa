import type { Metadata } from "next";
import { breadcrumbSchema } from "@/data/company";

export const metadata: Metadata = {
  title: "Cookie Policy | Alfa Construction",
  description:
    "Cookie Policy for Alfa Construction and Cleaning Service Inc. How we use cookies and similar tracking technologies on alfapaintingcarpentry.com.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/cookies" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "April 27, 2026";

export default function CookiePolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://alfapaintingcarpentry.com" },
              { name: "Cookie Policy", url: "https://alfapaintingcarpentry.com/cookies" },
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
              Cookie Policy
            </h1>
            <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </header>

          <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300 leading-relaxed">
            <p>
              This Cookie Policy explains how{" "}
              <strong>Alfa Construction and Cleaning Service Inc</strong>{" "}
              (&quot;Alfa,&quot; &quot;we,&quot; &quot;us,&quot; and
              &quot;our&quot;) uses cookies and similar technologies to recognize
              you when you visit our website at{" "}
              <a
                className="text-alfa-gold-light hover:text-alfa-gold underline"
                href="https://alfapaintingcarpentry.com"
              >
                https://alfapaintingcarpentry.com
              </a>{" "}
              (the &quot;Website&quot;). It explains what these technologies
              are and why we use them, as well as your rights to control our
              use of them. In some cases, we may use cookies to collect
              Personal Information (as defined in our{" "}
              <a
                className="text-alfa-gold-light hover:text-alfa-gold underline"
                href="/privacy"
              >
                Privacy Policy
              </a>
              ) or information that becomes Personal Information if we combine
              it with other information.
            </p>

            <Section title="What are Cookies?">
              <p>
                Cookies are small data files that are placed on your computer
                or mobile device when you visit a website. Cookies are widely
                used by website owners to make their websites work or work more
                efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Alfa
                Construction and Cleaning Service Inc) are called{" "}
                <strong>&quot;first-party cookies&quot;</strong>. Cookies set
                by parties other than the website owner are called{" "}
                <strong>&quot;third-party cookies&quot;</strong>. These cookies
                enable third-party features or functionalities (like
                advertising, analytics, and interactive content) to be provided
                through the website. These third parties can recognize your
                computer when it visits our Website and also when it visits
                other websites.
              </p>
            </Section>

            <Section title="Why do we use Cookies?">
              <p>We use first- and third-party cookies for several reasons:</p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-2">
                <li>
                  Some cookies are required for technical reasons for our
                  Website to operate (&quot;essential&quot; or &quot;strictly
                  necessary&quot; cookies).
                </li>
                <li>
                  Other cookies help us enhance user experience, personalize
                  content, analyze performance, and deliver targeted ads.
                </li>
                <li>
                  Specific reasons are outlined under &quot;Types of Cookies We
                  May Use&quot; below.
                </li>
              </ul>
            </Section>

            <Section title="How can I control cookies?">
              <p>
                You have the right to accept or reject cookies. You can manage
                your preferences through our cookie consent settings on the
                Website, which allows you to select categories of cookies to
                accept or reject. Essential cookies cannot be disabled as they
                are necessary for site functionality.
              </p>
              <p>
                You can also set or change cookie preferences in your browser
                settings. Please note that disabling cookies may impact the
                functionality of our Website.
              </p>
            </Section>

            <Section title="Types of Cookies We May Use">
              <ul className="list-disc list-outside ml-6 space-y-2 mt-2">
                <li>
                  <strong>Essential Cookies</strong> – Required for basic
                  website functionality (forms, navigation, chat widget,
                  security).
                </li>
                <li>
                  <strong>Performance / Functionality Cookies</strong> – Improve
                  site performance and remember your preferences.
                </li>
                <li>
                  <strong>Analytics and Customization Cookies</strong> – Help
                  us understand how users interact with our Website and
                  personalize your experience (e.g., Google Analytics, Vercel
                  Analytics).
                </li>
                <li>
                  <strong>Advertising Cookies</strong> – Deliver relevant ads
                  and limit how many times you see the same ad. We may use
                  Facebook Pixel and Google Ads tags.
                </li>
                <li>
                  <strong>Social Networking Cookies</strong> – Enable sharing
                  through social media (Instagram, Facebook) and may also
                  track activity for ad targeting on those platforms.
                </li>
              </ul>
            </Section>

            <Section title="Managing Cookies in Your Browser">
              <p>You can manage or disable cookies via your browser settings:</p>
              <ul className="list-disc list-outside ml-6 space-y-1 mt-2">
                <li>
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline"
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chrome
                  </a>
                </li>
                <li>
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline"
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Firefox
                  </a>
                </li>
                <li>
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline"
                    href="https://support.apple.com/en-us/HT201265"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline"
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Edge
                  </a>
                </li>
                <li>
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline"
                    href="https://help.opera.com/en/latest/web-preferences/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Opera
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                You may also opt out of targeted advertising through:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-1 mt-2">
                <li>
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline"
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital Advertising Alliance
                  </a>
                </li>
                <li>
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline"
                    href="https://youradchoices.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital Advertising Alliance of Canada
                  </a>
                </li>
                <li>
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold underline"
                    href="https://www.youronlinechoices.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    European Interactive Digital Advertising Alliance
                  </a>
                </li>
              </ul>
            </Section>

            <Section title="Other Tracking Technologies">
              <p>
                In addition to cookies, we may use tracking technologies like{" "}
                <strong>web beacons</strong> or <strong>pixels</strong>. These
                help us understand usage patterns, track campaign performance,
                and improve services.
              </p>
            </Section>

            <Section title="Flash Cookies / Local Shared Objects">
              <p>
                Our Website may use Flash Cookies for site features and fraud
                prevention. You can manage Flash settings at the{" "}
                <a
                  className="text-alfa-gold-light hover:text-alfa-gold underline"
                  href="https://www.adobe.com/support/documentation/en/flashplayer/help/settings_manager.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Adobe Settings Panel
                </a>
                .
              </p>
            </Section>

            <Section title="Targeted Advertising">
              <p>
                Third parties may use cookies and similar technologies to
                display targeted ads based on your online activity. We do not
                control these cookies. Refer to their policies for more
                information.
              </p>
            </Section>

            <Section title="Updates to This Policy">
              <p>
                We may update this Cookie Policy periodically to reflect
                changes in practices or legal requirements. Please revisit this
                page regularly. The date at the top indicates the last update.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                If you have questions about this Cookie Policy, please contact
                us:
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
                  🌐 <strong>Website:</strong>{" "}
                  <a
                    className="text-alfa-gold-light hover:text-alfa-gold"
                    href="https://alfapaintingcarpentry.com"
                  >
                    https://alfapaintingcarpentry.com
                  </a>
                </li>
                <li>
                  🏢 <strong>Address:</strong> Alfa Construction and Cleaning
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
                    href="/terms"
                  >
                    TERMS AND CONDITIONS
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
