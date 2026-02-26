"use client";

import { useRef, useState, useEffect } from "react";

export default function FormEmbed() {
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
      { rootMargin: "300px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full" style={{ minHeight: 457 }}>
      {show && (
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/1wwHwfROj84YUZqwCqpV"
          style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
          id="inline-1wwHwfROj84YUZqwCqpV"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Form 0"
          data-height="457"
          data-layout-iframe-id="inline-1wwHwfROj84YUZqwCqpV"
          data-form-id="1wwHwfROj84YUZqwCqpV"
          title="Contact Form"
          loading="lazy"
        />
      )}
    </div>
  );
}
