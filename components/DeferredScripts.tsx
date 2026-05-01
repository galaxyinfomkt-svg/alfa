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
 * The chat widget is registered with the carrier as the SMS opt-in source.
 * Pages with the GHL FormEmbed (which collects phone + SMS consent) hide the
 * widget so the two opt-in methods never coexist on the same page. Both
 * methods remain active on the site, just on different page sets.
 */

const PAGES_WITH_FORM: string[] = ["/", "/contact"];
const PREFIXES_WITH_FORM: string[] = ["/services", "/massachusetts"];

function pageHasForm(pathname: string): boolean {
  if (PAGES_WITH_FORM.includes(pathname)) return true;
  return PREFIXES_WITH_FORM.some((p) => pathname === p || pathname.startsWith(`${p}/`));
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
        chat.setAttribute("data-widget-id", "69f3d1374a590d6534115bf3");
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
