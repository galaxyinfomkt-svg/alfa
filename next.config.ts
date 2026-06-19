import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alfapaintingcarpentry.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security baseline
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
          // HSTS — force HTTPS, 1 year, applies to subdomains, eligible for browser preload list
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // COOP — origin-isolate the top-level window (Lighthouse Best Practices)
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          // Resource cache hint for static HTML
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
        ],
      },
    ];
  },
  async redirects() {
    // ────────────────────────────────────────────────────────────────────
    // PIVOT SIDING-ONLY — 301 das 109 cidades × 4 serviços descontinuados
    // + 4 service-pages globais. Tudo aponta pro hub da cidade (que vira
    // siding-focused) ou pro /services/siding.
    // ────────────────────────────────────────────────────────────────────
    const CITY_SLUGS = [
      "marlborough","hudson","framingham","westborough","northborough","southborough",
      "shrewsbury","natick","ashland","sudbury","hopkinton","milford","wayland","holliston",
      "grafton","clinton","maynard","stow","acton","concord","berlin","bolton","lincoln",
      "weston","wellesley","needham","dover","medfield","millis","sherborn","boxborough",
      "boylston","west-boylston","holden","sterling","lancaster","harvard","upton","mendon",
      "hopedale","littleton","westford","carlisle","chelmsford","groton","ayer","shirley",
      "lunenburg","leominster","fitchburg","princeton","paxton","rutland","leicester","spencer",
      "charlton","dudley","northbridge","uxbridge","douglas","blackstone","medway","norfolk",
      "wrentham","lexington","bedford","burlington","waltham","newton","brookline","dedham",
      "norwood","franklin","bellingham","cambridge","somerville","medford","malden","melrose",
      "wakefield","reading","stoneham","woburn","winchester","arlington","belmont","watertown",
      "quincy","braintree","weymouth","milton","canton","randolph","stoughton","sharon","walpole",
      "foxborough","lynn","saugus","peabody","salem","beverly","danvers","worcester","auburn",
      "millbury","oxford","sutton","webster",
    ];
    const DEPRECATED_CITY_SERVICES = ["painting", "carpentry", "remodeling", "windows-doors"];

    const cityServiceRedirects = CITY_SLUGS.flatMap((city) =>
      DEPRECATED_CITY_SERVICES.map((svc) => ({
        source: `/massachusetts/${city}/${svc}`,
        destination: `/massachusetts/${city}`,
        permanent: true,
      })),
    );

    const serviceRedirects = [
      { source: "/services/painting", destination: "/services/siding", permanent: true },
      { source: "/services/carpentry", destination: "/services/siding", permanent: true },
      { source: "/services/remodeling", destination: "/services/siding", permanent: true },
      { source: "/services/windows-doors", destination: "/services/siding", permanent: true },
      // Legacy /service/* (singular) — vinham de WordPress velho, ainda no GSC
      { source: "/service/:path*", destination: "/services/siding", permanent: true },
      // Painter/window/door specific URLs from old WP
      { source: "/painter-services/:path*", destination: "/services/siding", permanent: true },
      { source: "/windows-and-door/:path*", destination: "/services/siding", permanent: true },
      { source: "/deck-builder/:path*", destination: "/services/siding", permanent: true },
      { source: "/siding-contractor/:path*", destination: "/services/siding", permanent: true },
    ];

    const legacyRedirects = [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/cities/:path*", destination: "/massachusetts/:path*", permanent: true },
    ];

    // Off-positioning blog posts retired in the siding-only pivot (carpentry/
    // trim repair + full-home renovation). 301 to the siding service page so
    // their link equity flows to the core offer and no URL 404s.
    const blogRedirects = [
      { source: "/blog/warning-signs-trim-needs-carpentry-repair-winter", destination: "/services/siding", permanent: true },
      { source: "/blog/renovating-older-homes-in-milton-ma", destination: "/services/siding", permanent: true },
    ];

    return [...cityServiceRedirects, ...serviceRedirects, ...legacyRedirects, ...blogRedirects];
  },
};

export default nextConfig;
