import React from 'react';
import { Download, Star, Sparkles, ShieldCheck, MessageSquare, Compass } from 'lucide-react';

const DownloadApp = () => {
  return (
    <div className="min-h-screen bg-[#EDE9E2] font-inter text-[#1c1c1c]">
      {/* ── HERO SECTION ── Full-width image background like screenshot */}
      <section className="relative w-full h-[calc(55vh+35px)] min-h-[415px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg"
          alt="Download App"
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
            <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#a68a56] font-semibold">App</span>
          </div>
          {/* Main title */}
          <h1
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-wide leading-none drop-shadow-sm"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            Download App
          </h1>
          {/* Subtitle */}
          <p className="mt-5 font-serif italic text-sm sm:text-base text-gray-700 tracking-wide">
            Take the celestial wheel wherever you journey
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
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-center relative overflow-hidden">

        {/* Decorative Floating Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#c49b63]/20 rounded-full blur-[60px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#a68a56]/20 rounded-full blur-[80px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

        <div className="w-full bg-white/70 backdrop-blur-xl border border-black/5 p-8 md:p-16 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(196,155,99,0.2)] relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left: Mystical Phone Mockup with floating animations */}
          <div className="relative flex justify-center items-center group">

            {/* Spinning Golden Mandala Behind Phone */}
            <svg className="absolute w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] animate-[spin_25s_linear_infinite] opacity-30 text-[#c49b63] pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
              <polygon points="50,5 95,75 5,75" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <polygon points="50,95 5,25 95,25" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            {/* Glowing Orb */}
            <div className="absolute w-[260px] h-[260px] bg-gradient-to-r from-[#c49b63] to-[#a68a56] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full"></div>

            {/* Floating Phone Casing */}
            <div className="w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] bg-[#0c0d12] border-4 border-[#1f2330] rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between p-5 hover:-translate-y-4 hover:scale-[1.02] transition-all duration-700 z-10">

              {/* Speaker Bar */}
              <div className="w-24 h-4 bg-[#1f2330] mx-auto rounded-full mb-5 shrink-0 shadow-inner"></div>

              {/* Dynamic Screen Content */}
              <div className="flex-grow bg-[#090b10] border border-white/5 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden text-left shadow-inner">
                {/* Screen Glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#c49b63]/20 blur-2xl pointer-events-none animate-pulse"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#a68a56]/20 blur-2xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center pb-3 border-b border-[#c49b63]/20">
                    <span className="font-cinzel text-xs text-white font-bold tracking-[0.2em] uppercase">Astrolargery</span>
                    <span className="text-[#c49b63] text-[9px] flex items-center gap-1 animate-pulse"><div className="w-2.5 h-1.5 bg-[#c49b63] rounded-full"></div> Live</span>
                  </div>

                  {/* Daily Horoscope Widget */}
                  <div className="bg-[#161a26] p-3 rounded-lg border border-[#c49b63]/30 hover:border-[#c49b63]/60 transition-colors cursor-pointer group/widget relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c49b63]/10 to-transparent -translate-x-full group-hover/widget:animate-[shimmer_1.5s_infinite]"></div>
                    <span className="text-[#c49b63] font-bold text-[12px] block font-cinzel">Daily Horoscope</span>
                    <p className="text-[10px] mt-1.5 leading-relaxed text-gray-400 font-inter">
                      "Jupiter enters your 5th house today. A sudden wave of creative energy..."
                    </p>
                  </div>

                  {/* Tarot Widget */}
                  <div className="bg-[#161a26] p-3 rounded-lg border border-[#c49b63]/30 hover:border-[#c49b63]/60 transition-colors cursor-pointer text-center relative overflow-hidden group/tarot">
                    <div className="absolute inset-0 bg-[#c49b63]/5 group-hover/tarot:bg-[#c49b63]/20 transition-colors duration-500"></div>
                    <Star size={16} className="text-[#c49b63] mx-auto mb-1 animate-[spin_10s_linear_infinite]" />
                    <span className="text-[#c49b63] font-bold text-[11px] uppercase tracking-wider font-cinzel">Draw A Card</span>
                  </div>
                </div>

                {/* Bottom App Bar */}
                <div className="flex justify-around items-center pt-3 border-t border-white/5 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#c49b63]/20 border border-[#c49b63]/50 flex items-center justify-center cursor-pointer hover:bg-[#c49b63] transition-colors"><Compass size={12} className="text-white" /></div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"><MessageSquare size={12} className="text-gray-500" /></div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"><Star size={12} className="text-gray-500" /></div>
                </div>
              </div>
            </div>

            {/* Floating little stars */}
            <Star size={20} className="absolute top-10 left-0 text-[#c49b63] animate-pulse" />
            <Sparkles size={25} className="absolute bottom-20 right-0 text-[#a68a56] animate-bounce" />
          </div>

          {/* Right: Download Content & CTAs */}
          <div className="space-y-8 relative z-10 text-center md:text-left">
            <div>
              <span className="font-cinzel text-xs font-bold text-[#c49b63] tracking-[0.2em] uppercase block">Universe In Your Pocket</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 leading-tight">
                Cosmic Guidance,<br />Anytime, Anywhere.
              </h2>
              <div className="w-16 h-[2px] bg-[#c49b63] mt-5 mx-auto md:mx-0"></div>
            </div>

            <p className="text-sm text-gray-600 leading-loose font-inter max-w-md mx-auto md:mx-0">
              Take the celestial wheel wherever you journey. Access instant chart calculators, connect with gurus on live video calls, and get daily push notifications for planetary transits.
            </p>

            <ul className="space-y-4 text-sm text-gray-800 font-semibold max-w-md mx-auto md:mx-0 text-left">
              <li className="flex items-center gap-3 bg-white/50 p-3 rounded-lg border border-black/5 hover:border-[#c49b63]/30 hover:bg-white transition-all shadow-sm group">
                <div className="w-8 h-8 rounded-full bg-[#c49b63]/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Sparkles size={14} className="text-[#c49b63]" /></div>
                <span>Real-time Transit Warnings</span>
              </li>
              <li className="flex items-center gap-3 bg-white/50 p-3 rounded-lg border border-black/5 hover:border-[#c49b63]/30 hover:bg-white transition-all shadow-sm group">
                <div className="w-8 h-8 rounded-full bg-[#c49b63]/10 flex items-center justify-center group-hover:scale-110 transition-transform"><MessageSquare size={14} className="text-[#c49b63]" /></div>
                <span>24/7 Guru Video & Voice Calls</span>
              </li>
              <li className="flex items-center gap-3 bg-white/50 p-3 rounded-lg border border-black/5 hover:border-[#c49b63]/30 hover:bg-white transition-all shadow-sm group">
                <div className="w-8 h-8 rounded-full bg-[#c49b63]/10 flex items-center justify-center group-hover:scale-110 transition-transform"><ShieldCheck size={14} className="text-[#c49b63]" /></div>
                <span>Secure Anonymous Profiles</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[#1c1c1c] hover:bg-[#c49b63] text-white font-bold text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(196,155,99,0.5)] transform hover:-translate-y-1">
                <Download size={14} /> Play Store
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-black/10 hover:border-[#c49b63] hover:text-[#c49b63] text-[#1c1c1c] font-bold text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(196,155,99,0.2)] transform hover:-translate-y-1">
                <Download size={14} /> App Store
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadApp;
