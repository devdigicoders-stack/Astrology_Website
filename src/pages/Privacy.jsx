import React from 'react';
import { Shield, Lock, Eye, Database, UserX, Star, Sparkles, Fingerprint, CreditCard, Scale, Bell } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#EDE9E2] font-inter text-[#1c1c1c]">
      {/* ── HERO SECTION ── Full-width image background like screenshot */}
      <section className="relative w-full h-[calc(55vh+35px)] min-h-[415px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg"
          alt="Privacy Policy"
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
            <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#a68a56] font-semibold">Privacy</span>
          </div>
          {/* Main title */}
          <h1
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-wide leading-none drop-shadow-sm"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            Privacy Policy
          </h1>
          {/* Subtitle */}
          <p className="mt-5 font-serif italic text-sm sm:text-base text-gray-700 tracking-wide">
            Safe Keeping
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
        <div className="absolute top-20 left-0 w-64 h-64 bg-[#c49b63]/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#a68a56]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

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
            <Shield size={14} /> Safe Keeping
          </span>
          <div className="flex justify-center items-center gap-3 pt-2">
            <div className="w-16 h-[1px] bg-[#a68a56]/40"></div>
            <span className="text-[#a68a56] animate-pulse">✦</span>
            <div className="w-16 h-[1px] bg-[#a68a56]/40"></div>
          </div>
          <p className="text-xs text-gray-500 mt-6 font-inter tracking-wider">LAST UPDATED: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

          {/* Policy Card 1 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Database size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">1. Cosmic Data Collection</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              To perform accurate astrological calculations (including Kundli and Natal Chart mapping), we collect specific parameters: birth name, exact date of birth, precise time of birth, and birth location coordinates. This sacred data is used solely to map your celestial blueprint.
            </p>
          </div>

          {/* Policy Card 2 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Lock size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">2. Safe-Guarding Birth Information</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              Your birth chart data is calculated securely on our backend using strict cryptographic methods. We do not sell, rent, or lease your birth details, chart maps, or live consultation chat transcripts to marketing aggregators. Everything remains strictly confidential.
            </p>
          </div>

          {/* Policy Card 3 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
              <Eye size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">3. Astrologer Confidentiality</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              All our Verified Astrologers, Tarot Readers, and Spiritual Guides are bound by strict Non-Disclosure Agreements (NDAs). Your live sessions, personal questions, and life challenges discussed during calls remain completely private between you and your guide.
            </p>
          </div>

          {/* Policy Card 4 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <UserX size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">4. Profile Deletion Requests</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              You hold the absolute right to delete your astrological profile and wipe all birth parameters from our active database. Please send a message to support@astrology.com or use the 'Delete Account' button in your profile settings to trigger an instant cosmic cleanse.
            </p>
          </div>

          {/* Policy Card 5 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
              <Fingerprint size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">5. Device & Analytics Tracking</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              We use minimal non-intrusive cookies to remember your astrological preferences (e.g., daily horoscope sun sign, preferred language). We do not track you across other applications. Our analytics are strictly for improving app stability and providing accurate cosmic readings.
            </p>
          </div>

          {/* Policy Card 6 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <CreditCard size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">6. Secure Financial Transactions</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              We utilize certified third-party payment gateways (Visa, Mastercard, Stripe, PayPal) to process wallet credits and pooja bookings. Astrolargery does not store or process raw credit card numbers on our internal databases at any time.
            </p>
          </div>

          {/* Policy Card 7 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
              <Scale size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">7. Legal Compliance</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              In rare celestial alignments, if compelled by governing law or legal subpoenas, we may be obligated to share basic account details with law enforcement. We will always notify you (if legally permitted) before any data is surrendered.
            </p>
          </div>

          {/* Policy Card 8 */}
          <div className="group bg-white/70 backdrop-blur-md border border-[#c49b63]/20 p-8 md:p-10 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(196,155,99,0.3)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-10 -translate-y-10"></div>
            <div className="w-14 h-14 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Bell size={24} />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-[#c49b63] transition-colors">8. Policy Updates</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-inter relative z-10">
              As the stars shift, so might our privacy practices. If significant changes occur to how we handle your cosmic data, we will send a notification to your registered email and display an alert upon your next login.
            </p>
          </div>

        </div>

      </section>
    </div>
  );
};

export default Privacy;
