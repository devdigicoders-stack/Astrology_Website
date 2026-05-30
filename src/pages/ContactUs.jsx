import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Star, Sparkles, X, CheckCircle } from 'lucide-react';

const ContactUs = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setSent(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#EDE9E2] font-inter text-[#1c1c1c]">
      {/* ── HERO SECTION ── Full-width image background like screenshot */}
      <section className="relative w-full h-[calc(55vh+35px)] min-h-[415px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Warm white/beige overlay — same as screenshot style */}
        <div className="absolute inset-0 bg-[#EDE9E2]/65"></div>
        {/* Subtle spinning zodiac wheel — bottom left */}
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
            <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#a68a56] font-semibold">Contact</span>
          </div>
          {/* Main title — large serif like screenshot */}
          <h1
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-wide leading-none drop-shadow-sm"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            Contact
          </h1>
          {/* Subtitle */}
          <p className="mt-5 font-serif italic text-sm sm:text-base text-gray-700 tracking-wide">
            Send a cosmic message to our dedicated guides
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
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-center ">

        {/* Spinning Zodiac Background Chakra (Normal Size) */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-[#c49b63]/[0.08] pointer-events-none animate-[spin_60s_linear_infinite]"
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

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">

          {/* Left pane: Contact details (6/12 cols) */}
          <div className="lg:col-span-6 relative group perspective-1000">
            {/* Animated Background Aura */}
            {/* <div className="absolute -inset-4 bg-gradient-to-br from-[#c49b63]/20 via-transparent to-[#a68a56]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse"></div> */}

            <div className="bg-[#141824]/90 backdrop-blur-2xl border border-[#c49b63]/30 p-10 md:p-12 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden text-[#EDE9E2] transform group-hover:scale-[1.02] transition-transform duration-700">
              {/* Background constellation */}
              <Star size={100} className="absolute -top-10 -right-10 text-white/5 rotate-45" />



              <div className="space-y-6 relative z-10">
                <div>
                  <span className="font-cinzel text-xs font-bold text-[#c49b63] tracking-[0.2em] uppercase">Reach Out</span>
                  <h2 className="font-cinzel text-4xl font-extrabold text-white mt-2 drop-shadow-md">Connect With Us</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-[#c49b63] to-transparent mt-4"></div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed font-inter">
                  Have questions regarding birth charts, order details, or booking live sessions? Reach out and our stellar coordinators will reply within one planetary cycle.
                </p>

                <ul className="space-y-6 text-sm text-gray-300 pt-4">
                  <li className="flex items-start gap-4 group/item">
                    <span className="w-10 h-10 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] shrink-0 group-hover/item:bg-[#c49b63] group-hover/item:text-white transition-all duration-300 shadow-[0_0_15px_rgba(196,155,99,0.2)]">
                      <Mail size={16} />
                    </span>
                    <div>
                      <span className="text-[10px] text-[#c49b63] block uppercase font-bold tracking-widest mb-1">Email</span>
                      <a href="mailto:support@astrology.com" className="hover:text-white transition-colors font-semibold">support@astrology.com</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="w-10 h-10 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] shrink-0 group-hover/item:bg-[#c49b63] group-hover/item:text-white transition-all duration-300 shadow-[0_0_15px_rgba(196,155,99,0.2)]">
                      <Phone size={16} />
                    </span>
                    <div>
                      <span className="text-[10px] text-[#c49b63] block uppercase font-bold tracking-widest mb-1">Phone</span>
                      <span className="font-semibold">+1 385 386 309</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="w-10 h-10 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center text-[#c49b63] shrink-0 group-hover/item:bg-[#c49b63] group-hover/item:text-white transition-all duration-300 shadow-[0_0_15px_rgba(196,155,99,0.2)]">
                      <MapPin size={16} />
                    </span>
                    <div>
                      <span className="text-[10px] text-[#c49b63] block uppercase font-bold tracking-widest mb-1">Address</span>
                      <span className="font-semibold leading-relaxed">1080 Brickell Ave,<br />Miami, FL, US</span>
                    </div>
                  </li>
                </ul>

                <div className="pt-8 mt-8 border-t border-[#c49b63]/20 relative z-10">
                  <span className="font-cinzel text-xs font-bold text-[#c49b63] tracking-[0.2em] uppercase mb-4 block">Follow Our Journey</span>
                  <div className="flex items-center gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#c49b63] hover:border-[#c49b63] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#c49b63] hover:border-[#c49b63] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#c49b63] hover:border-[#c49b63] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#c49b63] hover:border-[#c49b63] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c49b63] to-transparent opacity-50"></div>
            </div>
          </div>

          {/* Right pane: Contact form (6/12 cols) */}
          <div className="lg:col-span-6 bg-white/70 backdrop-blur-xl border border-black/5 p-10 md:p-14 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10 text-[#1c1c1c] overflow-hidden">

            {/* Subtle spinning background element */}
            <div className="absolute -top-32 -right-32 w-64 h-64 border-[1px] border-[#c49b63]/20 rounded-full animate-[spin_30s_linear_infinite] pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 border-[1px] border-[#c49b63]/20 rounded-full animate-[spin_20s_linear_infinite_reverse] pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="text-center md:text-left border-b border-[#c49b63]/20 pb-6 mb-8">
                <h3 className="font-cinzel text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide inline-flex items-center gap-3">
                  Send a Cosmic Message
                  <Sparkles className="text-[#c49b63] animate-pulse" size={24} />
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#c49b63] block flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#c49b63] rounded-full group-focus-within:animate-ping"></div>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#EDE9E2]/30 border-b-2 border-black/10 py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-[#c49b63] focus:bg-white transition-all rounded-t-md shadow-inner placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-3 group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#c49b63] block flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#c49b63] rounded-full group-focus-within:animate-ping"></div>
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#EDE9E2]/30 border-b-2 border-black/10 py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-[#c49b63] focus:bg-white transition-all rounded-t-md shadow-inner placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3 group">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#c49b63] block flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#c49b63] rounded-full group-focus-within:animate-ping"></div>
                  Message Details
                </label>
                <textarea
                  rows="5"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#EDE9E2]/30 border-b-2 border-black/10 py-4 px-4 text-sm text-gray-900 focus:outline-none focus:border-[#c49b63] focus:bg-white transition-all resize-none rounded-t-md shadow-inner placeholder-gray-400"
                  placeholder="Write your cosmic inquiries..."
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-10 py-4 bg-[#1c1c1c] hover:bg-[#c49b63] text-white font-bold text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-500 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(196,155,99,0.5)] flex items-center justify-center gap-3 group overflow-hidden relative"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>

                {sent ? (
                  <span className="relative z-10 flex items-center gap-2">Message Transmitted <Star size={14} className="animate-spin" /></span>
                ) : (
                  <span className="relative z-10 flex items-center gap-2">Send Message <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ── SUCCESS MODAL POPUP ── */}
      {sent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-[#c49b63]/30 relative text-center transform scale-100 transition-transform animate-[pulse_0.5s_ease-out_once]">
            {/* Close button */}
            <button
              onClick={() => { setSent(false); setFormState({ name: '', email: '', message: '' }); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-500 animate-pulse" />
            </div>

            <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 font-inter">
              Thank you for connecting with Astrolargery. Our cosmic guides have received your message and will reply within one planetary cycle.
            </p>

            <button
              onClick={() => { setSent(false); setFormState({ name: '', email: '', message: '' }); }}
              className="w-full py-4 bg-[#1c1c1c] hover:bg-[#c49b63] text-white font-bold tracking-wider uppercase rounded-full transition-colors text-xs shadow-lg"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ContactUs;
