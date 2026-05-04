"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Defers loading of heavy third-party scripts (chat widget, reviews widget)
 * until first user interaction. Prevents ~4s of main thread blocking from
 * reCAPTCHA, LeadConnector, and Facebook Pixel during initial page load.
 *
 * A2P 10DLC compliance — checkbox #6 of the GHL Business Website Compliance
 * Checklist requires: "no forms collecting phone numbers or SMS opt-in
 * consent exist on any page where the chat widget is embedded".
 *
 * The SMS opt-in form (FormEmbed / SiteWideOptInForm) is now mounted
 * site-wide via app/layout.tsx, so the chat widget is suppressed on every
 * page to satisfy the carrier's one-opt-in-per-page rule. The widget
 * remains the registered carrier SMS source but only via internal
 * (LeadConnector dashboard) channels — not the public website.
 */

function pageHasForm(_pathname: string): boolean {
  return true;
}

export default function DeferredScripts() {
  const loaded = useRef(false);
  const pathname = usePathname();
  const skipChat = pageHasForm(pathname);

  // Hide the existing chat widget mount-point div immediately on form pages
  useEffect(() => {
    const mount = document.querySelector<HTMLElement>("[data-chat-widget]");
    if (!mount) return;
    mount.style.display = skipChat ? "none" : "";
  }, [skipChat]);

  useEffect(() => {
    if (loaded.current) return;

    const load = () => {
      if (loaded.current) return;
      loaded.current = true;

      // Chat widget loader — only on pages without phone-collecting forms.
      // Carrier rule: one opt-in mechanism per page.
      if (!skipChat) {
        const chat = document.createElement("script");
        chat.src = "https://widgets.leadconnectorhq.com/loader.js";
        chat.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
        chat.setAttribute("data-widget-id", "69f8e9cad86c7d56cea2f255");
        chat.setAttribute("data-source", "WEB_USER");
        document.body.appendChild(chat);
      }

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
  }, [skipChat]);

  return null;
}
