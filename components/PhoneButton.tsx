import { company } from "@/data/company";

export default function PhoneButton() {
  return (
    <a
      href={company.phoneTel}
      className="fixed bottom-6 left-6 z-50 bg-alfa-gold hover:bg-alfa-gold-light text-black w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-alfa-gold/20 phone-pulse transition-all duration-300 hover:scale-110"
      aria-label={`Call Alfa Construction at ${company.phone}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </a>
  );
}
