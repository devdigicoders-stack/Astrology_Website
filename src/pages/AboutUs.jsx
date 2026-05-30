import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Star, ArrowRight, Target, Eye, Flag } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen font-inter text-[#1c1c1c]">

      {/* ── HERO SECTION ── Full-width image background like screenshot */}
      <section className="relative w-full h-[calc(55vh+35px)] min-h-[415px] overflow-hidden">

        {/* Background Image */}
        <img
          src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg"
          alt="About Astrolargery"
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
              <line
                key={i}
                x1="50" y1="50" x2="50" y2="5"
                stroke="currentColor" strokeWidth="0.15"
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
          {['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTAR', 'CAPRICORN', 'AQUARIUS', 'PISCES'].map((name, i) => {
            const angle = i * 30 + 15;
            return (
              <text
                key={name}
                x="50" y="8"
                fill="currentColor"
                fontSize="2"
                fontWeight="bold"
                textAnchor="middle"
                transform={`rotate(${angle} 50 50)`}
                style={{ letterSpacing: '0.1em' }}
              >
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
            <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#a68a56] font-semibold">About</span>
          </div>

          {/* Main title — large serif like screenshot */}
          <h1
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-wide leading-none drop-shadow-sm"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            About
          </h1>

          {/* Subtitle */}
          <p className="mt-5 font-serif italic text-sm sm:text-base text-gray-700 tracking-wide">
            Astrology &amp; Horoscope — Guiding Your Cosmic Path
          </p>

          {/* Decorative line */}
          <div className="flex items-center gap-3 mt-5">
            <div className="w-12 h-[0.5px] bg-[#a68a56]/60"></div>
            <span className="text-[#c49b63] text-xs animate-pulse">✦</span>
            <div className="w-12 h-[0.5px] bg-[#a68a56]/60"></div>
          </div>
        </div>

      </section>

      {/* ── MYSTERIES OF THE STARS SECTION ── matching screenshot */}
      <section className="relative bg-white overflow-hidden py-20 px-4 md:px-8">

        {/* Large rotating Zodiac Wheel — left background */}
        <svg
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-[580px] h-[580px] text-gray-900/[0.04] pointer-events-none animate-spin-slower"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.12" strokeDasharray="0.8,0.8" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <line
                key={i}
                x1="50" y1="50" x2="50" y2="3"
                stroke="currentColor" strokeWidth="0.12"
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
          {['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS', 'PISCES'].map((name, i) => {
            const angle = i * 30 + 15;
            return (
              <text
                key={name}
                x="50" y="7"
                fill="currentColor"
                fontSize="1.6"
                fontWeight="bold"
                textAnchor="middle"
                transform={`rotate(${angle} 50 50)`}
                style={{ letterSpacing: '0.08em' }}
              >
                {name}
              </text>
            );
          })}
          {/* Constellation dots */}
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i * 360) / 18;
            const r = 43;
            const x = 50 + r * Math.sin((angle * Math.PI) / 180);
            const y = 50 - r * Math.cos((angle * Math.PI) / 180);
            return <circle key={i} cx={x} cy={y} r="0.4" fill="currentColor" />;
          })}
        </svg>

        {/* Crescent Moon — far right */}
        <div className="absolute right-0 bottom-0 w-[200px] h-[200px] text-gray-900/[0.04] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <path
              d="M 70 20 Q 20 50 70 80 Q 30 70 30 50 Q 30 30 70 20 Z"
              stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.06"
            />
            {/* Small star dots near moon */}
            <circle cx="80" cy="15" r="0.8" fill="currentColor" />
            <circle cx="88" cy="30" r="0.5" fill="currentColor" />
            <circle cx="75" cy="40" r="0.4" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

          {/* LEFT — Overlapping images: Tarot card on plate + arched portrait */}
          <div className="relative flex items-center justify-center h-[460px] sm:h-[520px]">

            {/* Background tarot card on white plate — bottom-left */}
            <div className="absolute left-0 bottom-0 w-[250px] sm:w-[290px] h-[350px] sm:h-[420px] rounded-t-full overflow-hidden border border-[#c49b63]/20 shadow-xl z-10 bg-white">
              <img
                src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/sq-03.jpg"
                alt="Tarot card on plate"
                className="w-full h-full object-cover"
              />
              {/* White plate overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/70 to-transparent" />
            </div>

            {/* Foreground arched portrait — top-right, slightly overlapping */}
            <div className="absolute right-0 top-0 w-[230px] sm:w-[270px] h-[340px] sm:h-[400px] rounded-t-full overflow-hidden border border-[#c49b63]/25 shadow-2xl z-20 group">
              <img
                src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/side-view-of-gypsy-fortune-teller-holding-tarot-ca-2023-11-27-05-32-33-utc.jpg"
                alt="Fortune Teller"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Small constellation constellation lines (decorative star cross behind images) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 z-5">
              <svg className="w-32 h-32 text-[#c49b63]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6">
                <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="3,3" />
                <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="3,3" />
                <line x1="22" y1="22" x2="78" y2="78" strokeDasharray="3,3" />
                <line x1="78" y1="22" x2="22" y2="78" strokeDasharray="3,3" />
                <circle cx="50" cy="10" r="2" fill="currentColor" />
                <circle cx="50" cy="90" r="1.5" fill="currentColor" />
                <circle cx="10" cy="50" r="1.5" fill="currentColor" />
                <circle cx="90" cy="50" r="2" fill="currentColor" />
                <circle cx="22" cy="22" r="1.5" fill="currentColor" />
                <circle cx="78" cy="78" r="1" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* RIGHT — Text content */}
          <div className="space-y-6">

            {/* Italic label */}
            <span className="text-[#c49b63] italic text-sm font-serif tracking-wider block">
              Reflections from the Astral Realms
            </span>

            {/* Main heading */}
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-[42px] font-extrabold text-gray-900 leading-tight tracking-wide">
              Mysteries of the Stars
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              My journey into the mystical arts began at a young age, sparked by a fascination with the movements of the stars and the timeless wisdom of ancient divination practices. Through deep study and intuitive exploration, I have honed my skills in interpreting celestial alignments, tarot spreads, and runic symbols.
            </p>

            {/* Accordion-style services list */}
            <div className="space-y-0 pt-2">
              {[
                { name: 'Astrology Readings', active: false },
                { name: 'Tarot Card Readings', active: true },
                { name: 'Rune Readings', active: false },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`py-4 border-b transition-colors duration-200 cursor-pointer group ${item.active
                    ? 'border-b-2 border-[#1c1c1c]'
                    : 'border-b border-black/10 hover:border-[#c49b63]/40'
                    }`}
                >
                  <span className={`font-cinzel text-sm font-semibold tracking-wide transition-colors ${item.active ? 'text-[#c49b63]' : 'text-gray-800 group-hover:text-[#c49b63]'
                    }`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons row */}
            <div className="flex items-center gap-4 pt-4 flex-wrap">
              <Link
                to="/services"
                className="inline-block px-7 py-3 border border-dotted border-[#c49b63] text-[#2c2c2c] hover:text-white hover:bg-[#c49b63] font-semibold text-xs tracking-widest uppercase transition-all duration-300 text-center"
              >
                Read More
              </Link>
              <Link
                to="/services"
                className="inline-block px-7 py-3 bg-black text-white hover:bg-[#c49b63] font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg text-center"
              >
                Purchase Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── MAIN ABOUT CONTENT ── */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Top intro grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Left: Arch image */}
          <div className="flex justify-center lg:justify-start relative">
            {/* Background sunburst */}
            <svg
              className="absolute w-[520px] h-[520px] text-[#c49b63]/15 animate-spin-slower pointer-events-none"
              viewBox="0 0 200 200"
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 360) / 24;
                const isLong = i % 3 === 0;
                return (
                  <line
                    key={i}
                    x1="100" y1="100" x2="100" y2={isLong ? 15 : 28}
                    stroke="currentColor"
                    strokeWidth={isLong ? 1 : 0.5}
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}
              <circle cx="100" cy="100" r="120" fill="none" stroke="currentColor" strokeWidth="0.4" />
            </svg>

            {/* Arch image frame */}
            <div className="relative w-[340px] h-[480px] sm:w-[420px] sm:h-[580px] rounded-t-full overflow-hidden border border-[#c49b63]/30 shadow-2xl z-10 group">
              <img
                src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/side-view-of-gypsy-fortune-teller-holding-tarot-ca-2023-11-27-05-32-33-utc.jpg"
                alt="Our Astrologer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Signature overlay */}
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <span
                  className="font-serif italic text-white text-2xl font-light opacity-90 block tracking-wider drop-shadow-md select-none"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Mary Sunniboll
                </span>
                <span className="text-[10px] text-white/70 tracking-widest uppercase font-semibold">Lead Astrologer</span>
              </div>
            </div>

            {/* Floating badge */}

          </div>

          {/* Right: Text content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#c49b63]/40 rounded-full">
              <span className="text-[#c49b63] text-xs">✦</span>
              <span className="font-cinzel text-[10px] font-bold text-[#a68a56] uppercase tracking-widest">The Cosmic Team</span>
            </div>

            <h2 className="font-cinzel text-3xl md:text-4xl lg:text-[35px] font-bold text-gray-900 leading-tight tracking-wide">
              Bridging Ancient Wisdom <br />
              <span className="font-serif italic text-[#c49b63]">with Modern Guidance</span>
            </h2>

            <div className="flex items-center gap-3">
              <div className="w-10 h-[0.5px] bg-[#a68a56]/40"></div>
              <span className="text-[#c49b63] text-xs">✦</span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Welcome to Astrolargery, your trusted platform for cosmic guidance and spiritual awakening. We bring the ancient wisdom of astrology into the modern world, delivering personalized readings that illuminate your path forward.
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              Our mission is to help you align with the universe's natural flow, giving you the self-awareness and foresight needed to navigate life's challenges with absolute confidence. Our expert astrologers possess decades of experience in Vedic astrology, Tarot readings, and planetary alignments.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: '🔮', label: 'Tarot Readings' },
                { icon: '🌙', label: 'Vedic Astrology' },
                { icon: '⭐', label: 'Birth Charts' },
                { icon: '💎', label: 'Crystal Healing' },
              ].map((tag) => (
                <div key={tag.label} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/8 rounded-full shadow-sm">
                  <span className="text-sm">{tag.icon}</span>
                  <span className="font-cinzel text-[9px] font-semibold text-gray-700 tracking-wider uppercase">{tag.label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white hover:bg-[#c49b63] font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl rounded-none mt-2"
            >
              Explore Our Services <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ── 3 Values Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <Compass size={28} className="text-[#a68a56]" />,
              title: 'Alignment',
              desc: 'Discovering your chart values and cosmic placement to reveal your true life purpose and trajectory.',
            },
            {
              icon: <Sparkles size={28} className="text-[#a68a56]" />,
              title: 'Clarity',
              desc: 'Revealing future transits and planetary warning signs to help you make informed, confident decisions.',
            },
            {
              icon: <Star size={28} className="text-[#a68a56]" />,
              title: 'Empowerment',
              desc: 'Activating your latent strengths through crystal therapy, meditation, and personalized cosmic rituals.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-black/5 hover:border-[#c49b63]/30 p-8 rounded-md shadow-md hover:shadow-xl transition-all group text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#c49b63]/8 border border-[#c49b63]/20 flex items-center justify-center mx-auto group-hover:bg-[#c49b63]/15 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-cinzel text-lg font-bold text-gray-900 uppercase tracking-wider">{item.title}</h3>
              <div className="w-8 h-[0.5px] bg-[#a68a56]/40 mx-auto"></div>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Closing quote ── */}
        <div className="text-center py-8 border-t border-black/5 space-y-4">
          <span className="text-[#c49b63] text-2xl animate-pulse">✦</span>
          <p className="font-serif italic text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            "Astrolargery: Navigating lifetimes, one star coordinate at a time."
          </p>
          <span className="font-cinzel text-xs text-[#a68a56] uppercase tracking-widest font-semibold block">— The Cosmic Team</span>
        </div>

      </section>

      {/* ── MISSION, VISION & GOAL SECTION ── */}
      <section className="bg-white py-28 px-4 md:px-8 relative overflow-hidden">

        {/* Background Mandala / Astrology Wheel (Very subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none animate-spin-slower">
          <svg viewBox="0 0 100 100" className="w-full h-full text-black">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="0.5,1" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.2" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={i} x1="50" y1="50" x2="50" y2="2" stroke="currentColor" strokeWidth="0.2" transform={`rotate(${i * 15} 50 50)`} />
            ))}
          </svg>
        </div>

        {/* Floating Stars */}
        <div className="absolute top-20 left-[10%] animate-pulse text-[#c49b63]/60"><Star size={24} className="fill-[#c49b63]/20" /></div>
        <div className="absolute bottom-20 right-[10%] animate-pulse delay-75 text-[#c49b63]/60"><Sparkles size={32} /></div>
        <div className="absolute top-40 right-[15%] animate-pulse delay-150 text-[#c49b63]/60"><Star size={16} className="fill-[#c49b63]/20" /></div>
        <div className="absolute bottom-40 left-[15%] animate-pulse delay-300 text-[#c49b63]/60"><Sparkles size={20} /></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section Heading */}
          <div className="text-center mb-20 space-y-4">
            <span className="font-cinzel text-sm text-[#c49b63] font-bold tracking-[0.2em] uppercase">Our Guiding Light</span>
            <h2 className="font-cinzel text-4xl md:text-5xl font-extrabold text-gray-900">Path of the Universe</h2>
            <div className="flex justify-center items-center gap-3 mt-4">
              <div className="w-20 h-[1px] bg-[#c49b63]/50"></div>
              <span className="text-[#c49b63] animate-spin-slower text-xl">✦</span>
              <div className="w-20 h-[1px] bg-[#c49b63]/50"></div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {[
              {
                icon: <Target size={36} className="text-[#c49b63]" />,
                title: "Our Mission",
                desc: "To empower individuals by decoding the cosmic blueprint of their lives, offering deep astrological insights that foster self-awareness, spiritual growth, and clarity in a fast-paced world."
              },
              {
                icon: <Eye size={36} className="text-[#c49b63]" />,
                title: "Our Vision",
                desc: "To be the guiding light for millions seeking harmony with the universe, creating a global community where ancient wisdom and modern understanding unite to elevate human consciousness."
              },
              {
                icon: <Flag size={36} className="text-[#c49b63]" />,
                title: "My Goal",
                desc: "My personal goal is to make astrology accessible and practical, helping you navigate life's challenges with confidence and providing you with the tools to manifest your highest potential."
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-white border border-[#c49b63]/30 p-10 pt-16 rounded-t-full rounded-b-2xl shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(196,155,99,0.3)] transition-all duration-700 hover:-translate-y-6 text-center overflow-hidden flex flex-col items-center">

                {/* Arch outline decoration */}
                <div className="absolute inset-[6px] border border-[#c49b63]/20 rounded-t-full rounded-b-xl pointer-events-none group-hover:border-[#c49b63]/50 transition-colors duration-700"></div>

                {/* Icon Container with glowing effect */}
                <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#c49b63]/20 rounded-full animate-ping opacity-30 group-hover:opacity-60 transition-opacity duration-700" style={{ animationDuration: '3s' }}></div>
                  <div className="relative z-10 w-20 h-20 bg-white border border-[#c49b63]/40 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-[360deg] transition-transform duration-1000">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-cinzel text-2xl font-extrabold text-gray-900 uppercase tracking-widest mb-5 group-hover:text-[#c49b63] transition-colors duration-500">{item.title}</h3>

                <div className="w-12 h-[1px] bg-[#c49b63]/50 mb-6 group-hover:w-24 group-hover:bg-[#c49b63] transition-all duration-700"></div>

                <p className="text-sm text-gray-600 leading-loose relative z-10">
                  {item.desc}
                </p>

                {/* Bottom decorative star */}
                <div className="mt-8 text-[#c49b63]/30 group-hover:text-[#c49b63]/70 group-hover:scale-125 transition-all duration-500">
                  ✦
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="space-y-8 order-2 lg:order-1 relative group">

            {/* Subtle background glow behind text */}
            <div className="absolute -left-10 top-0 w-32 h-32 bg-[#c49b63]/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>

            <div className="inline-flex items-center gap-3 px-5 py-2 border border-[#c49b63]/30 rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[#c49b63] text-sm animate-spin-slower">✦</span>
              <span className="font-cinzel text-[10px] font-bold text-[#a68a56] uppercase tracking-[0.2em]">The Visionary</span>
            </div>

            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-[48px] font-extrabold text-gray-900 leading-tight tracking-wide">
              Meet Our Founder <br />
              <span className="font-serif italic text-[#c49b63] font-light">Mary Sunniboll</span>
            </h2>

            <div className="flex items-center gap-4">
              <div className="w-16 h-[1px] bg-[#a68a56]/40"></div>
              <span className="text-[#c49b63] text-sm">✧</span>
              <div className="w-16 h-[1px] bg-[#a68a56]/40"></div>
            </div>

            <p className="text-base text-gray-700 leading-loose">
              With over two decades of dedicated study in astrology and esoteric arts, Mary Sunniboll founded Astrolargery with a profound purpose: to bridge the gap between ancient celestial wisdom and contemporary life challenges.
            </p>

            <div className="p-6 bg-white border-l-4 border-[#c49b63] shadow-lg rounded-r-xl relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute -right-4 -top-4 text-[#c49b63]/10">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.714 4.103-9.609 9.983-11.609l-1.928 2.031c-3.14 1.139-4.809 3.518-5.013 6.969h7.941v10h-10.983zm-14.017 0v-7.391c0-5.714 4.103-9.609 9.983-11.609l-1.928 2.031c-3.14 1.139-4.809 3.518-5.013 6.969h7.941v10h-10.983z" /></svg>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic relative z-10 font-serif">
                "I believe that the stars do not dictate our fate, but rather illuminate our choices. By understanding our cosmic design, we can navigate the journey of life not just with foresight, but with empowerment and grace."
              </p>
            </div>

            {/* Signature */}
            <div className="pt-2 flex items-center gap-6">
              <span className="font-serif italic text-4xl text-gray-800 tracking-wider hover:text-[#c49b63] transition-colors duration-500" style={{ fontFamily: 'Georgia, serif' }}>
                Mary Sunniboll
              </span>
              <div className="h-10 w-[1px] bg-gray-300"></div>
              <span className="block font-cinzel text-xs text-gray-500 tracking-[0.2em] uppercase font-bold">Founder &<br />Lead Astrologer</span>
            </div>
          </div>

          {/* Right: Image & Animation */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-center h-full min-h-[500px]">

            {/* Spinning background circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] border border-[#c49b63]/30 rounded-full animate-[spin_40s_linear_infinite]"></div>
              <div className="absolute w-[460px] h-[460px] sm:w-[580px] sm:h-[580px] border border-dashed border-[#c49b63]/40 rounded-full animate-[spin_60s_linear_infinite_reverse]"></div>
            </div>

            {/* Image container with floating animation */}
            <div className="relative z-10 w-[340px] h-[480px] sm:w-[420px] sm:h-[580px] rounded-t-[1000px] rounded-b-3xl overflow-hidden border-8 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group cursor-pointer hover:-translate-y-2 transition-transform duration-700">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-20 pointer-events-none"></div>
              <img
                src="/astrologer_founder.png"
                alt="Mary Sunniboll - Founder"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
            </div>

            {/* Floating glowing star details */}
            <div className="absolute top-10 right-10 sm:right-20 animate-pulse delay-1000 text-[#c49b63] drop-shadow-[0_0_10px_rgba(196,155,99,0.8)]"><Star size={24} className="fill-[#c49b63]" /></div>
            <div className="absolute bottom-20 left-4 sm:left-10 animate-pulse delay-500 text-[#c49b63] drop-shadow-[0_0_10px_rgba(196,155,99,0.8)]"><Sparkles size={32} /></div>

            {/* Experience Card */}


          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutUs;
