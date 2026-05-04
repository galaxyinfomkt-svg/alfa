"use client";

import { useEffect } from "react";

export default function FormEmbed() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/BJIoAvMzAwM89UYA4woP"
        style={{ width: "100%", height: 972, border: "none", borderRadius: 8 }}
        id="inline-BJIoAvMzAwM89UYA4woP"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="A2P "
        data-height="972"
        data-layout-iframe-id="inline-BJIoAvMzAwM89UYA4woP"
        data-form-id="BJIoAvMzAwM89UYA4woP"
        title="A2P SMS Opt-In Consent Form"
      />
    </div>
  );
}
