"use client";

import { useState, useEffect, useRef } from "react";

export default function FormEmbed() {
  const [show, setShow] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    const load = () => {
      if (loaded.current) return;
      loaded.current = true;
      setShow(true);
      cleanup();
    };

    // Load iframe on first user interaction — defers ~5MB of third-party JS
    // (reCAPTCHA, LeadConnector, Facebook Pixel) from blocking main thread
    const events = ["scroll", "click", "touchstart", "mousemove", "keydown"];
    events.forEach(e => window.addEventListener(e, load, { passive: true }));

    // Fallback: load after 15s even without interaction
    const timer = setTimeout(load, 15000);

    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, load));
      clearTimeout(timer);
    };

    return cleanup;
  }, []);

  return (
    <div className="w-full" style={{ minHeight: 457 }}>
      {show ? (
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
      ) : (
        <div className="animate-pulse space-y-4 p-6" role="status" aria-label="Loading contact form">
          <div className="h-6 bg-white/10 rounded w-2/3" />
          <div className="space-y-3">
            <div className="h-11 bg-white/[0.06] rounded" />
            <div className="h-11 bg-white/[0.06] rounded" />
            <div className="h-11 bg-white/[0.06] rounded" />
            <div className="h-11 bg-white/[0.06] rounded" />
          </div>
          <div className="h-12 bg-alfa-gold/20 rounded" />
        </div>
      )}
    </div>
  );
}
