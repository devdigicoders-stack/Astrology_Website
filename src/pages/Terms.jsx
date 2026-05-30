import React from 'react';
import { CheckCircle, AlertTriangle, MessageCircle, FileText, RefreshCw, Ban, ShieldAlert, Scale, Star, Sparkles } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#EDE9E2] font-inter text-[#1c1c1c]">
      {/* ── HERO SECTION ── Full-width image background like screenshot */}
      <section className="relative w-full h-[calc(55vh+35px)] min-h-[415px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg"
          alt="Terms & Conditions"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Warm white/beige overlay */}
        <div className="absolute inset-0 bg-[#EDE9E2]/65"></div>
        {/* Subtle spinning zodiac wheel */}
        <svg
          className="absolute -bottom-16 -left-16 w-[320px] h-[320px] text-gray-900/[0.04] pointer-events-none animate-spin-slower"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1,1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <line key={i} x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="0.15" transform={`rotate(${angle} 50 50)`} />
            );
          })}
          {['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTAR', 'CAPRICORN', 'AQUARIUS', 'PISCES'].map((name, i) => {
            const angle = i * 30 + 15;
            return (
              <text key={name} x="50" y="8" fill="currentColor" fontSize="2" fontWeight="bold" textAnchor="middle" transform={`rotate(${angle} 50 50)`} style={{ letterSpacing: '0.1em' }}>
                {name}
              </text>
            );
          })}
        </svg>
        {/* Center text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          {/* Breadcrumb label */}
          <div className="flex items-center gap-2 mb-4 opacity-70">
            <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#a68a56] font-semibold">Home</span>
            <span className="text-[#a68a56] text-xs">✦</span>
            <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#a68a56] font-semibold">Terms</span>
          </div>
          {/* Main title */}
          <h1
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-wide leading-none drop-shadow-sm"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            Terms & Conditions
          </h1>
          {/* Subtitle */}
          <p className="mt-5 font-serif italic text-sm sm:text-base text-gray-700 tracking-wide">
            Legal Bounds
          </p>
          {/* Decorative line */}
          <div className="flex items-center gap-3 mt-5">
            <div className="w-12 h-[0.5px] bg-[#a68a56]/60"></div>
            <span className="text-[#c49b63] text-xs animate-pulse">✦</span>
            <div className="w-12 h-[0.5px] bg-[#a68a56]/60"></div>
          </div>
        </div>

      </section>

      {/* ── PAGE CONTENT ── */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">

        {/* Animated Background Elements */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-[#c49b63]/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#a68a56]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

        {/* Spinning Zodiac Background Chakra */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px] md:w-[2000px] md:h-[2000px] text-[#c49b63]/[0.07] pointer-events-none animate-[spin_30s_linear_infinite]"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1,1" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <line key={i} x1="50" y1="50" x2="50" y2="2" stroke="currentColor" strokeWidth="0.15" transform={`rotate(${angle} 50 50)`} />
            );
          })}
          {['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS', 'PISCES'].map((name, i) => {
            const angle = i * 30 + 15;
            return (
              <text key={name} x="50" y="6" fill="currentColor" fontSize="2.5" fontWeight="bold" textAnchor="middle" transform={`rotate(${angle} 50 50)`} style={{ letterSpacing: '0.15em' }}>
                {name}
              </text>
            );
          })}
        </svg>

        <div className="text-center mb-16 space-y-4 relative z-10">
          <span className="flex items-center justify-center gap-2 font-cinzel text-xs font-bold text-[#c49b63] tracking-[0.2em] uppercase">
            <Scale size={14} /> Legal Bounds
          </span>
          <div className="flex justify-center items-center gap-3 pt-2">
            <div className="w-16 h-[1px] bg-[#a68a56]/40"></div>
            <span className="text-[#a68a56] animate-pulse">✦</span>
            <div className="w-16 h-[1px] bg-[#a68a56]/40"></div>
          </div>
          <p className="text-xs text-gray-500 mt-6 font-inter tracking-wider">LAST UPDATED: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

          {/* Terms Card 1 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
              <CheckCircle size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">1. Cosmic Acceptance</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              By accessing, browsing, or utilizing the Astrolargery website, applications, and spiritual services, you acknowledge that you have read, understood, and agreed to be bound by this legal agreement. If you do not agree to these celestial laws, please cease use immediately.
            </p>
          </div>

          {/* Terms Card 2 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">2. Astrological Disclaimer</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              Astrolargery provides astrological charts, tarot readings, daily horoscopes, and cosmic calculations. All insights and readings are strictly for spiritual guidance and entertainment purposes. They do not constitute certified medical, financial, or legal advice. Action taken is at your own risk.
            </p>
          </div>

          {/* Terms Card 3 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <MessageCircle size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">3. Consultation Etiquette</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              When connecting with our astrologers or consultants via chat, voice, or pooja booking: you agree to conduct all communication with respect and courtesy. Abuse, harassment, or threatening behavior will invoke negative karma and cause immediate account suspension without refund.
            </p>
          </div>

          {/* Terms Card 4 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
              <Ban size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">4. No Off-Platform Poaching</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              Attempting to gather personal or professional contact info of our astrologers for off-platform consultations violates our sacred bond. We strictly prohibit sharing private phone numbers or social links during paid chats to protect both users and guides.
            </p>
          </div>

          {/* Terms Card 5 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <ShieldAlert size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">5. Refund & Cancellation</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              Wallet recharges are non-refundable unless a technical system error occurs during the transaction. For booked live sessions, cancellations must be made at least 12 hours prior to the planetary transit (appointment time) to be eligible for a credit refund.
            </p>
          </div>

          {/* Terms Card 6 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
              <RefreshCw size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">6. Service Modifications</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              The universe is constantly expanding, and so is Astrolargery. We reserve the right to edit, suspend, or terminate services, prices, and features at our discretion. Any updates to these terms will be posted directly to this cosmic record.
            </p>
          </div>

        </div>

      </section>
    </div>
  );
};

export default Terms;
