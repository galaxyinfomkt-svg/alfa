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

    // Load iframe on first user interaction — defers third-party JS
    const events = ["scroll", "click", "touchstart", "mousemove", "keydown"];
    events.forEach(e => window.addEventListener(e, load, { passive: true }));

    // Fallback: load after 3s even without interaction
    const timer = setTimeout(load, 3000);

    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, load));
      clearTimeout(timer);
    };

    return cleanup;
  }, []);

  // Load the GHL form_embed.js script once the form is visible
  useEffect(() => {
    if (!show) return;
    const scriptId = "ghl-form-embed";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [show]);

  return (
    <div className="w-full">
      {show ? (
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/PiFH0ELuOmHS9iZhGQ5F"
          style={{ width: "100%", height: 449, border: "none", borderRadius: "3px", background: "transparent" }}
          allowTransparency={true}
          id="inline-PiFH0ELuOmHS9iZhGQ5F"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="FORM SITE ALFA"
          data-height="449"
          data-layout-iframe-id="inline-PiFH0ELuOmHS9iZhGQ5F"
          data-form-id="PiFH0ELuOmHS9iZhGQ5F"
          title="FORM SITE ALFA"
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
