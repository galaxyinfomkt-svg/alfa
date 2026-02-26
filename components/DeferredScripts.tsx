"use client";

import { useEffect, useRef } from "react";

/**
 * Defers loading of heavy third-party scripts (chat widget, reviews widget)
 * until first user interaction. This prevents ~4s of main thread blocking
 * from reCAPTCHA, LeadConnector, and Facebook Pixel during initial page load.
 */
export default function DeferredScripts() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    const load = () => {
      if (loaded.current) return;
      loaded.current = true;

      // Chat widget loader
      const chat = document.createElement("script");
      chat.src = "https://beta.leadconnectorhq.com/loader.js";
      chat.setAttribute("data-resources-url", "https://beta.leadconnectorhq.com/chat-widget/loader.js");
      chat.setAttribute("data-widget-id", "6763359a5436802950cda164");
      document.body.appendChild(chat);

      // Reviews widget script (handles iframe auto-resize)
      const reviews = document.createElement("script");
      reviews.src = "https://reputationhub.site/reputation/assets/review-widget.js";
      document.body.appendChild(reviews);

      cleanup();
    };

    const events = ["scroll", "click", "touchstart", "mousemove", "keydown"];
    events.forEach(e => window.addEventListener(e, load, { passive: true }));
    const timer = setTimeout(load, 15000);

    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, load));
      clearTimeout(timer);
    };

    return cleanup;
  }, []);

  return null;
}
