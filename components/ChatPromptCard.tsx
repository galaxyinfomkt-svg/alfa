import { company } from "@/data/company";

export default function ChatPromptCard() {
  return (
    <div className="bg-alfa-card border border-alfa-border rounded-xl p-8 md:p-10 h-full flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-alfa-gold/15 rounded-xl flex items-center justify-center text-alfa-gold">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
          Talk to us
        </span>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
        Need a free estimate?
      </h3>
      <p className="text-gray-400 mb-6 leading-relaxed">
        Use the live chat at the bottom-right corner of this page to message us
        instantly, or call us directly. We answer fast — Mon–Sat 7AM–6PM.
      </p>

      <div className="flex flex-col gap-3">
        <a
          href={company.phoneTel}
          className="inline-flex items-center justify-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-6 py-4 rounded-lg transition-all duration-300 text-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call {company.phone}
        </a>
        <a
          href={`mailto:${company.email}`}
          className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email {company.email}
        </a>
      </div>
    </div>
  );
}
