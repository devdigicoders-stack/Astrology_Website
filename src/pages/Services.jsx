import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, MessageSquare, ShoppingBag, Send, Star, Moon, Eye, Hand, Hash, Home, Heart, TrendingUp } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      title: "Kundli Matching & Natal Charts",
      desc: "Receive comprehensive reports calculating natal chart overlays, houses, and planetary aspects to reveal absolute compatibility and destiny.",
      price: "$49",
      icon: <Compass className="w-8 h-8 text-[#c49b63] relative z-10" />
    },
    {
      title: "Live Chat & Call Consultations",
      desc: "Connect 24/7 with verified professional astrologers, palmists, and tarot guides for prompt, confidential answers to life questions.",
      price: "$2/min",
      icon: <MessageSquare className="w-8 h-8 text-[#c49b63] relative z-10" />
    },
    {
      title: "Tarot Card Reading",
      desc: "Unveil the hidden truths of your past, present, and future through an intuitive and deeply spiritual tarot card spread session.",
      price: "$35",
      icon: <Eye className="w-8 h-8 text-[#c49b63] relative z-10" />
    },
    {
      title: "Palmistry & Face Reading",
      desc: "Discover the secrets etched in your hands and facial features. Our experts decode your physical traits to predict life's trajectory.",
      price: "$60",
      icon: <Hand className="w-8 h-8 text-[#c49b63] relative z-10" />
    },
    {
      title: "Numerology Consultation",
      desc: "Learn how the numbers in your birth date and name influence your destiny, career choices, and personal relationships.",
      price: "$40",
      icon: <Hash className="w-8 h-8 text-[#c49b63] relative z-10" />
    },
    {
      title: "Vastu Shastra Guidance",
      desc: "Harmonize your home or workspace with cosmic energies. Get expert advice on structural alignments to invite prosperity and peace.",
      price: "$120",
      icon: <Home className="w-8 h-8 text-[#c49b63] relative z-10" />
    },
    {
      title: "Career & Financial Forecasting",
      desc: "Navigate professional crossroads with astrological insights. Find the most auspicious times for investments, career shifts, or business ventures.",
      price: "$55",
      icon: <TrendingUp className="w-8 h-8 text-[#c49b63] relative z-10" />
    },
    {
      title: "Love & Relationship Alignment",
      desc: "Resolve deep-seated relationship issues by understanding the synastry between your chart and your partner's planetary positions.",
      price: "$50",
      icon: <Heart className="w-8 h-8 text-[#c49b63] relative z-10" />
    },
    {
      title: "Online Poojas & Rituals",
      desc: "Book remote sacred sessions and energy balancing poojas performed on your behalf by expert vedic pandits to align your chakras.",
      price: "$99",
      icon: <Sparkles className="w-8 h-8 text-[#c49b63] relative z-10" />
    },
    {
      title: "Astromall Gemstones",
      desc: "Browse a verified collection of certified diamonds, rubies, amethysts, and energized yantras specifically tailored to your chart needs.",
      price: "Varies",
      icon: <ShoppingBag className="w-8 h-8 text-[#c49b63] relative z-10" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#EDE9E2] font-inter text-[#1c1c1c]">

      {/* ── HERO SECTION ── Full-width image background like screenshot */}
      <section className="relative w-full h-[calc(55vh+35px)] min-h-[415px] overflow-hidden">

        {/* Background Image */}
        <img
          src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg"
          alt="Our Services"
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
            <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#a68a56] font-semibold">Services</span>
          </div>

          {/* Main title — large serif like screenshot */}
          <h1
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-wide leading-none drop-shadow-sm"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            Services
          </h1>

          {/* Subtitle */}
          <p className="mt-5 font-serif italic text-sm sm:text-base text-gray-700 tracking-wide">
            Unlock the mysteries of your life through our sacred offerings
          </p>

          {/* Decorative line */}
          <div className="flex items-center gap-3 mt-5">
            <div className="w-12 h-[0.5px] bg-[#a68a56]/60"></div>
            <span className="text-[#c49b63] text-xs animate-pulse">✦</span>
            <div className="w-12 h-[0.5px] bg-[#a68a56]/60"></div>
          </div>
        </div>


      </section>

      {/* ── SERVICES GRID SECTION ── */}
      <section id="services-grid" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-5">
          <span className="font-cinzel text-xs font-bold text-[#c49b63] tracking-[0.2em] uppercase block">Discover Your Path</span>
          <h2 className="font-cinzel text-4xl md:text-5xl font-extrabold text-gray-900 tracking-wide">Explore Our Offerings</h2>
          <div className="flex justify-center items-center gap-3 pt-2">
            <div className="w-16 h-[1px] bg-[#a68a56]/40"></div>
            <span className="text-[#a68a56] animate-pulse">✦</span>
            <div className="w-16 h-[1px] bg-[#a68a56]/40"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-14">
          {servicesList.map((service, idx) => (
            <div
              key={idx}
              className="group bg-white border border-[#c49b63]/20 p-10 rounded-2xl shadow-xl hover:shadow-[0_0_40px_-10px_rgba(196,155,99,0.4)] transition-all duration-700 hover:-translate-y-3 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#c49b63]/5 to-[#c49b63]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 translate-x-10 -translate-y-10 pointer-events-none"></div>
              
              {/* Spinning astrology mandala on hover */}
              <div className="absolute -bottom-10 -right-10 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
                <svg className="w-48 h-48 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#c49b63" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#c49b63" strokeWidth="0.5" />
                  <polygon points="50,5 95,75 5,75" fill="none" stroke="#c49b63" strokeWidth="0.5" />
                  <polygon points="50,95 5,25 95,25" fill="none" stroke="#c49b63" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Decorative inner border */}
              <div className="absolute inset-[6px] border border-[#c49b63]/10 rounded-[10px] pointer-events-none group-hover:border-[#c49b63]/40 transition-colors duration-700"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-full bg-[#c49b63]/10 border border-[#c49b63]/30 flex items-center justify-center relative group-hover:rotate-12 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(196,155,99,0.4)] group-hover:bg-white transition-all duration-500 z-10">
                    <div className="absolute inset-0 rounded-full border border-[#c49b63] animate-ping opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                    {service.icon}
                  </div>
                  <span className="text-5xl text-[#c49b63]/10 group-hover:text-[#c49b63]/30 transition-colors duration-700 font-serif font-black italic relative z-10 drop-shadow-sm">
                    {`0${idx + 1}`.slice(-2)}
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl md:text-[28px] font-bold text-gray-900 tracking-wide leading-tight group-hover:text-[#c49b63] transition-colors duration-300 relative z-10">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600 leading-loose font-inter pr-4 relative z-10">
                  {service.desc}
                </p>
              </div>

              <div className="relative z-10 flex justify-between items-end pt-8 border-t border-black/5 mt-8">
                <div>
                  <span className="text-[10px] text-[#c49b63] block uppercase font-bold tracking-[0.15em] mb-1">Starting from</span>
                  <span className="text-2xl font-extrabold text-gray-900 font-cinzel tracking-wide">{service.price}</span>
                </div>
                <Link to="/download" className="px-7 py-3 bg-black text-white hover:bg-[#c49b63] transition-colors duration-300 text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow-md hover:shadow-lg">
                  Book Now <Send size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Services;
