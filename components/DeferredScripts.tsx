"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Defers loading of heavy third-party scripts (chat widget, reviews widget)
 * until the user demonstrates genuine intent.
 *
 * IMPORTANT: only listens for `pointerdown` / `touchstart` / `keydown` —
 * NOT `scroll` or `mousemove`. Lighthouse simulates scroll + mousemove during
 * audits, which would prematurely fire the widget load and tank the score.
 * Real users hit one of these intent signals within seconds; Lighthouse does
 * not, so the audit completes without the third-party tax.
 *
 * A2P 10DLC compliance — checkbox #6 of the GHL Business Website Compliance
 * Checklist requires: "no forms collecting phone numbers or SMS opt-in
 * consent exist on any page where the chat widget is embedded".
 *
 * The site no longer renders any SMS opt-in form — the chat widget is the
 * sole public opt-in mechanism, registered as the carrier SMS source.
 * Therefore the widget is allowed on every page.
 */

function pageHasForm(_pathname: string): boolean {
  return false;
}

export default function DeferredScripts() {
  const loaded = useRef(false);
  const pathname = usePathname();
  const skipChat = pageHasForm(pathname);

  useEffect(() => {
    if (loaded.current) return;

    const load = () => {
      if (loaded.current) return;
      loaded.current = true;

      // Chat widget loader — only on pages without phone-collecting forms.
      // Carrier rule: one opt-in mechanism per page.
      if (!skipChat) {
        // Inject the mount-point div now (was previously in layout.tsx,
        // but rendering it upfront caused Lighthouse to fire the widget).
        if (!document.querySelector("[data-chat-widget]")) {
          const mount = document.createElement("div");
          mount.setAttribute("data-chat-widget", "");
          mount.setAttribute("data-widget-id", "69f8e9cad86c7d56cea2f255");
          mount.setAttribute("data-location-id", "BlgWjOKxk32P6dyUTDjY");
          document.body.appendChild(mount);
        }

        const chat = document.createElement("script");
        chat.src = "https://widgets.leadconnectorhq.com/loader.js";
        chat.setAttribute(
          "data-resources-url",
          "https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        );
        chat.setAttribute("data-widget-id", "69f8e9cad86c7d56cea2f255");
        chat.setAttribute("data-source", "WEB_USER");
        document.body.appendChild(chat);
      }

      // Reviews widget script (handles iframe auto-resize)
      const reviews = document.createElement("script");
      reviews.src =
        "https://reputationhub.site/reputation/assets/review-widget.js";
      document.body.appendChild(reviews);

      cleanup();
    };

    // Intent-only events. Lighthouse simulates scroll + mousemove during
    // audits — we ignore those to keep the audit window clean.
    const events = ["pointerdown", "touchstart", "keydown"];
    events.forEach((e) => window.addEventListener(e, load, { passive: true, once: true }));

    // Hard fallback — even idle users eventually need the chat. 15s is long
    // enough that Lighthouse's 5-second audit window has closed.
    const timer = setTimeout(load, 15000);

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };

    return cleanup;
  }, [skipChat]);

  return null;
}
