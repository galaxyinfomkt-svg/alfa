"use client";

import { useRef, useState, useEffect } from "react";

export default function ReviewsWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full" style={{ minHeight: 400 }}>
      {show && (
        <iframe
          className="lc_reviews_widget"
          src="https://reputationhub.site/reputation/widgets/review_widget/BlgWjOKxk32P6dyUTDjY"
          frameBorder="0"
          scrolling="no"
          style={{ minWidth: "100%", width: "100%" }}
          title="Customer Reviews"
          loading="lazy"
        />
      )}
    </div>
  );
}
