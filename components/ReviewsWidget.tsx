"use client";

import { useEffect, useRef } from "react";

/**
 * GHL Reputation Hub review widget.
 *
 * The widget iframe relies on review-widget.js (loaded by DeferredScripts on
 * first user click/tap) to postMessage its content height back to the parent
 * window for auto-resize. Without that script, the iframe defaults to ~150px
 * and reviews get clipped.
 *
 * Two fixes:
 * 1. Explicit min-height on the iframe so reviews render correctly even
 *    if the resize script never loads (e.g. desktop scroll-only visitors).
 * 2. IntersectionObserver loads the resize script when the widget actually
 *    enters the viewport — precise sizing the moment the user looks at it.
 *    Doesn't fire during Lighthouse (audit doesn't scroll deep enough).
 */
export default function ReviewsWidget() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const scriptId = "ghl-reviews-widget-js";
    if (document.getElementById(scriptId)) return; // already loaded

    let observer: IntersectionObserver | null = null;

    const inject = () => {
      if (document.getElementById(scriptId)) return;
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://reputationhub.site/reputation/assets/review-widget.js";
      s.async = true;
      document.body.appendChild(s);
      observer?.disconnect();
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) inject();
        },
        { rootMargin: "0px", threshold: 0.1 }
      );
      observer.observe(wrapperRef.current);
    } else {
      // Old browser fallback — just inject
      inject();
    }

    return () => observer?.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <iframe
        className="lc_reviews_widget w-full block border-0"
        src="https://reputationhub.site/reputation/widgets/review_widget/BlgWjOKxk32P6dyUTDjY"
        style={{ minHeight: 760 }}
        title="Customer Reviews"
        loading="lazy"
      />
    </div>
  );
}
