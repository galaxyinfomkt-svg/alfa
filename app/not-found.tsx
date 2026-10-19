import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-40 pb-20 min-h-screen flex items-center bg-paper">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="font-display text-5xl md:text-7xl text-gold-ink mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">Page Not Found</h2>
        <p className="text-ink-soft mb-8 text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-ink font-semibold px-6 py-3 rounded-full transition-all"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-mist border border-line text-ink hover:bg-mist font-semibold px-6 py-3 rounded-full transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
