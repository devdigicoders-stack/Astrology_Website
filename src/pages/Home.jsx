import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Moon, Sun, Star, ArrowRight, Clock } from 'lucide-react';

// Elegant rolling text stats counter
const Counter = ({ to, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [to, duration]);

  return (
    <span className="font-cinzel text-5xl md:text-6xl font-extrabold text-[#a68a56] tracking-tight">
      {count}{suffix}
    </span>
  );
};

const Home = () => {
  // Zodiac Wheel State
  const [selectedZodiac, setSelectedZodiac] = useState(0);

  // Tarot State
  const [selectedTarotCard, setSelectedTarotCard] = useState(null);
  const [tarotFlipped, setTarotFlipped] = useState(false);
  const [drawnFortune, setDrawnFortune] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Responsive State
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  // Gallery Modal State
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hero Slider Auto-play State
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const zodiacSigns = [
    { name: "Aries", dates: "Mar 21 - Apr 19", symbol: "♈", element: "Fire", planet: "Mars", crystal: "Red Jasper", horoscope: "Today the alignments bolster your inner resolve. Take action on your boldest ideas, as the planetary movement gives you an energetic edge in negotiation." },
    { name: "Taurus", dates: "Apr 20 - May 20", symbol: "♉", element: "Earth", planet: "Venus", crystal: "Emerald", horoscope: "A grounding energy envelopes your financial decisions. Reflect on current commitments; a solid plan created today brings long-term abundance." },
    { name: "Gemini", dates: "May 21 - Jun 20", symbol: "♊", element: "Air", planet: "Mercury", crystal: "Tiger's Eye", horoscope: "Mercury sharpens your communications. Your social charm attracts opportunities today. Share your ideas widely; you will find willing ears and active partners." },
    { name: "Cancer", dates: "Jun 21 - Jul 22", symbol: "♋", element: "Water", planet: "Moon", crystal: "Moonstone", horoscope: "The moon influences your emotional sphere. Dedicate time to self-nourishment. Inner alignment will unlock cosmic intuition regarding your career path." },
    { name: "Leo", dates: "Jul 23 - Aug 22", symbol: "♌", element: "Fire", planet: "Sun", crystal: "Carnelian", horoscope: "Your ruling sun boosts your magnetism. A natural leader, your guidance is welcomed by peers. Express your passion without reservation." },
    { name: "Virgo", dates: "Aug 23 - Sep 22", symbol: "♍", element: "Earth", planet: "Mercury", crystal: "Sapphire", horoscope: "A day of sharp organization. You are set to resolve puzzles that have lingered. The celestial patterns support healing of physical wellness." },
    { name: "Libra", dates: "Sep 23 - Oct 22", symbol: "♎", element: "Air", planet: "Venus", crystal: "Lapis Lazuli", horoscope: "Venus shines on relationships. Take steps toward reconciliation or deep bonding. Art, beauty, and creative projects are highly favored today." },
    { name: "Scorpio", dates: "Oct 23 - Nov 21", symbol: "♏", element: "Water", planet: "Pluto", crystal: "Obsidian", horoscope: "Intense transformations are in progress. Dive deep beneath the surface of current problems; you will find a hidden truth that frees your direction." },
    { name: "Sagittarius", dates: "Nov 22 - Dec 21", symbol: "♐", element: "Fire", planet: "Jupiter", crystal: "Turquoise", horoscope: "Jupiter sparks travel wishes or deep study calls. Broaden your mental horizons. An optimistic outlook acts as a literal beacon for prosperity." },
    { name: "Capricorn", dates: "Dec 22 - Jan 19", symbol: "♑", element: "Earth", planet: "Saturn", crystal: "Garnet", horoscope: "Your discipline is supported by solid configurations. Step-by-step actions yield powerful career progress. Stay committed to high principles." },
    { name: "Aquarius", dates: "Jan 20 - Feb 18", symbol: "♒", element: "Air", planet: "Uranus", crystal: "Amethyst", horoscope: "Innovative thoughts spark. Do not hesitate to challenge conventional ways. You are receiving advanced downloads from the future matrix." },
    { name: "Pisces", dates: "Feb 19 - Mar 20", symbol: "♓", element: "Water", planet: "Neptune", crystal: "Aquamarine", horoscope: "Neptune increases your dream recall. A spiritual window opens to your heart. Pay attention to warnings or whispers of guidance during quiet moments." }
  ];

  const tarotCards = [
    { title: "The Fool", meaning: "New Beginnings", description: "Stepping off a ledge of doubt into faith. The universe supports leap of faith. Fresh starts, innocence, and infinite potential await you." },
    { title: "The Magician", meaning: "Manifestation", description: "You possess all tools necessary to create your reality. Direct your focus, exercise your willpower, and bring your desires into physical matter." },
    { title: "The Empress", meaning: "Abundance & Growth", description: "A time of great creativity, birth of projects, and absolute nurturing. Connect with nature and allow yourself to receive comfort." },
    { title: "The Wheel of Fortune", meaning: "Good Karma", description: "A change of luck is arriving. The cosmic wheel turns in your favor. Be ready to seize the moments, for destiny steps in." },
    { title: "The Star", meaning: "Cosmic Hope", description: "A beacon of renewal and healing. Faith and peace are returning to your life. The sky is clearing, showing you your path clearly." },
    { title: "The Chariot", meaning: "Victory & Control", description: "Determination, willpower, and moving forward with absolute focus. You have the reins; drive your destiny towards victory." },
    { title: "The Lovers", meaning: "Harmony & Choice", description: "Deep relationships, values alignment, and choosing paths with your heart. Seek alignment and trust your close emotional bonds." }
  ];

  const handleTarotDraw = (index) => {
    if (selectedTarotCard !== null) return; // Drawn already
    setSelectedTarotCard(index);
    setTarotFlipped(true);

    const fortunes = [
      "The universe warns you to shed old habits to let this card's light in.",
      "An unexpected guide will bring this energy directly to you within three days.",
      "Your current struggles are preparing you for the great news this card represents.",
      "Look closely at a relationship in your life; this tarot holds the mirror to it.",
      "Financial or creative abundance is unlocked when you embrace this archetype."
    ];
    setDrawnFortune(fortunes[index % fortunes.length]);
  };

  const resetTarot = () => {
    setSelectedTarotCard(null);
    setTarotFlipped(false);
    setDrawnFortune("");
  };

  return (
    <div className="flex-grow bg-[#EDE9E2] overflow-hidden font-inter text-[#1c1c1c]">

      {/* 1. HERO SECTION: PREMIUM SPLIT EDITORIAL DESIGN */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-20 px-4 md:px-8 bg-[#EDE9E2] overflow-hidden border-b border-black/5">
        {/* Soft Golden Nebula Glow */}
        <div className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[#c49b63]/5 fill-current blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-[#c49b63]/5 fill-current blur-[100px] pointer-events-none animate-pulse-slow"></div>

        {/* Elegant Spinning Sun/Moon Vector Badge (Top Right) */}
        <svg className="absolute top-12 right-12 w-28 h-28 text-[#c49b63]/8 pointer-events-none animate-spin-slower" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1,2" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <line
                key={i}
                x1="50"
                y1="32"
                x2="50"
                y2="20"
                stroke="currentColor"
                strokeWidth="0.3"
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
        </svg>

        {/* Dynamic Rotating Zodiac Wheel Background (Left Side) */}
        <svg className="absolute -left-28 -top-10 w-[550px] h-[550px] text-gray-900/[0.04] pointer-events-none animate-spin-slower" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1,1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2="50"
                y2="5"
                stroke="currentColor"
                strokeWidth="0.15"
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
          {['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTAR', 'CAPRICORN', 'AQUARIUS', 'PISCES'].map((name, i) => {
            const angle = i * 30 + 15;
            return (
              <text
                key={name}
                x="50"
                y="8"
                fill="currentColor"
                fontSize="1.8"
                fontWeight="bold"
                textAnchor="middle"
                transform={`rotate(${angle} 50 50)`}
                style={{ letterSpacing: '0.12em' }}
              >
                {name}
              </text>
            );
          })}
        </svg>

        {/* Elegant Celestial Goddess Scale Line Drawing Background (Right Side) */}
        <div className="absolute right-0 bottom-0 w-[350px] h-[500px] text-gray-900/[0.04] pointer-events-none -z-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {/* Crown & Face */}
            <circle cx="50" cy="15" r="5" strokeWidth="0.25" />
            <path d="M 47 18 L 53 18" strokeWidth="0.8" />
            <path d="M 45 12 L 50 8 L 55 12 Z" strokeWidth="0.2" fill="currentColor" fillOpacity="0.1" />
            {/* Halo */}
            <circle cx="50" cy="15" r="9" strokeWidth="0.15" strokeDasharray="1,1" />
            {/* Torso & Dress */}
            <path d="M 50 20 L 45 35 L 42 65 L 48 90 L 52 90 L 58 65 L 55 35 Z" strokeWidth="0.25" />
            <path d="M 45 35 Q 50 38 55 35" strokeWidth="0.15" />
            {/* Outstretched Arms */}
            <path d="M 45 35 C 32 30, 22 34, 15 45" strokeWidth="0.25" />
            <path d="M 55 35 C 68 30, 78 34, 85 45" strokeWidth="0.25" />
            {/* Left Scales */}
            <line x1="15" y1="45" x2="15" y2="60" strokeWidth="0.2" />
            <path d="M 7 60 L 23 60 L 15 65 Z" strokeWidth="0.2" />
            {/* Right Scales */}
            <line x1="85" y1="45" x2="85" y2="60" strokeWidth="0.2" />
            <path d="M 77 60 L 93 60 L 85 65 Z" strokeWidth="0.2" />
            {/* Cosmic Rays */}
            <line x1="50" y1="90" x2="25" y2="100" strokeWidth="0.15" strokeDasharray="2,2" />
            <line x1="50" y1="90" x2="75" y2="100" strokeWidth="0.15" strokeDasharray="2,2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center w-full z-10 relative">

          {/* Left Column: Headline part 1 & Glassmorphic Card */}
          <div className="text-left space-y-8 flex flex-col justify-between h-full">
            <div className="space-y-3">
              {/* Luxury Editorial Label */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#c49b63] text-xs animate-pulse">✦</span>
                <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-[#a68a56] font-bold">Celestial Readings</span>
              </div>
              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-gray-900 leading-[1.1] tracking-wide">
                The Secrets of
              </h1>
              <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-[52px] text-[#c49b63] leading-none mt-1">
                the Cosmos
              </h2>
            </div>

            {/* Glassmorphic card with gold corners */}
            <div className="bg-white/50 backdrop-blur-md border border-white/50 rounded-lg p-6 max-w-sm shadow-xl space-y-4 relative overflow-hidden group hover:border-[#c49b63]/40 transition-all duration-300">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c49b63]/60"></div>
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c49b63]/60"></div>
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c49b63]/60"></div>
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c49b63]/60"></div>

              <span className="text-[#c49b63] italic text-xs font-serif tracking-wider block">
                Tarot Readings
              </span>
              <h3 className="font-cinzel text-lg text-gray-900 font-bold tracking-wide">
                Unveil Your Future with Cards
              </h3>
              <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
                Step into the mystical world of tarot and uncover the secrets that the future holds. Let our experienced fortune teller guide you through the cards, revealing insights and wisdom tailored just for you.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-block px-6 py-2.5 border border-dashed border-[#c49b63] text-[#2c2c2c] hover:text-white hover:bg-[#c49b63] font-semibold text-xs tracking-wider uppercase transition-all duration-300 text-center"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Center Column: Sliding Arched Frame with gold borders (Enlarged) */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Double bordered arched container */}
            <div className="relative p-3.5 border border-[#c49b63]/25 rounded-t-full shadow-[0_0_35px_rgba(196,155,99,0.08)] bg-[#EDE9E2]/45 backdrop-blur-sm">
              <div className="absolute top-1 left-1 bottom-1 right-1 border border-dashed border-[#c49b63]/20 rounded-t-full pointer-events-none"></div>

              {/* Arched image frame - Enlarged */}
              <div className="w-[310px] h-[430px] sm:w-[360px] sm:h-[500px] lg:w-[390px] lg:h-[540px] rounded-t-full overflow-hidden border border-[#c49b63]/25 shadow-2xl relative bg-white z-20">
                {/* Slide 1 */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${heroSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                  <img
                    src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg"
                    alt="Tarot reader with crystal ball"
                    className="w-full h-full object-cover scale-[1.03] hover:scale-[1.08] transition-transform duration-700"
                  />
                </div>

                {/* Slide 2 */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${heroSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                  <img
                    src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/side-view-of-gypsy-fortune-teller-holding-tarot-ca-2023-11-27-05-32-33-utc.jpg"
                    alt="Mystical tarot hands selection"
                    className="w-full h-full object-cover scale-[1.03] hover:scale-[1.08] transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Slider Dots indicators */}
            <div className="flex justify-center items-center space-x-2.5 mt-6 z-20">
              <button
                onClick={() => setHeroSlide(0)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${heroSlide === 0 ? 'bg-[#c49b63] scale-125 shadow-[0_0_8px_#c49b63]' : 'bg-gray-400/50 hover:bg-[#c49b63]'}`}
                aria-label="Slide 1"
              ></button>
              <button
                onClick={() => setHeroSlide(1)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${heroSlide === 1 ? 'bg-[#c49b63] scale-125 shadow-[0_0_8px_#c49b63]' : 'bg-gray-400/50 hover:bg-[#c49b63]'}`}
                aria-label="Slide 2"
              ></button>
            </div>

            {/* Floating Celestial Planet Orb (Jupiter - Scaled Up) */}
            <img
              src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/06/jupiter-planet-gas-giant-2023-11-27-05-09-14-utc-min.png"
              alt="Floating Jupiter"
              className="absolute -top-8 -right-12 w-28 h-28 sm:w-32 sm:h-32 object-contain animate-float-delayed z-30 pointer-events-none filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.18)]"
            />

            {/* Floating Black Garnet Crystal Orb (Scaled Up) */}
            <img
              src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/06/rough-black-andradite-garnet-mineral-isolated-2024-03-25-19-23-37-utc-min.png"
              alt="Floating Black Crystal"
              className="absolute bottom-12 -left-16 w-28 h-28 sm:w-32 sm:h-32 object-contain animate-float z-30 pointer-events-none filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.22)]"
            />
          </div>

          {/* Right Column: Headline part 2 */}
          <div className="text-left lg:text-right space-y-8">
            <div className="space-y-3">
              {/* Luxury Editorial Label */}
              <div className="flex items-center gap-2 lg:justify-end mb-1">
                <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-[#a68a56] font-bold">Star Guidance</span>
                <span className="text-[#c49b63] text-xs animate-pulse">✦</span>
              </div>
              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-gray-900 leading-[1.1] tracking-wide">
                Discover Your
              </h1>
              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-gray-900 leading-[1.1] tracking-wide mt-1">
                Destiny
              </h1>
              <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-[52px] text-[#c49b63] leading-none mt-1">
                with Stars
              </h2>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS & TAROT INSIGHTS SECTION: PREMIUM PARCHMENT CURVE DESIGN */}
      <section className="relative bg-white rounded-t-[60px] md:rounded-t-[100px] pt-24 pb-20 px-4 md:px-8 border-t border-black/[0.03] overflow-hidden">

        {/* Sacred Geometry wireframe octahedron in the background */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 opacity-70">
          <svg className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] text-[#c49b63]/15" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3">
            <polygon points="50,10 80,50 50,90 20,50" />
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="20" y1="50" x2="80" y2="50" />
            <line x1="50" y1="10" x2="50" y2="50" />
            <polygon points="50,50 80,50 50,90 20,50" strokeDasharray="1,1" />
            <line x1="20" y1="50" x2="50" y2="50" strokeDasharray="1,1" />
            <line x1="50" y1="50" x2="80" y2="50" strokeDasharray="1,1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 items-center w-full z-10 relative">

          {/* Left Column: Tarot Card arch image & Stats */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="relative">
              {/* Floating Clear Crystal Quartz */}
              <div className="absolute -top-8 -left-6 z-30 pointer-events-none">
                <svg className="w-16 h-16 text-[#c49b63]/90 filter drop-shadow-md animate-float" viewBox="0 0 100 100">
                  <path d="M 50 10 L 80 40 L 50 90 L 20 40 Z" fill="#ffffff" fillOpacity="0.85" stroke="#c49b63" strokeWidth="0.8" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="#c49b63" strokeWidth="0.6" />
                  <line x1="20" y1="40" x2="80" y2="40" stroke="#c49b63" strokeWidth="0.6" />
                  <path d="M 50 10 L 50 40 L 20 40 Z" fill="#e5dfd5" fillOpacity="0.4" />
                  <path d="M 50 10 L 50 40 L 80 40 Z" fill="#ffffff" fillOpacity="0.25" />
                </svg>
              </div>

              {/* Arch image */}
              <div className="w-[280px] h-[400px] sm:w-[320px] sm:h-[440px] rounded-t-full overflow-hidden border border-[#c49b63]/25 shadow-lg relative bg-[#EDE9E2] z-20">
                <img
                  src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/side-view-of-gypsy-fortune-teller-holding-tarot-ca-2023-11-27-05-32-33-utc.jpg"
                  alt="Tarot consultation layout"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Stat Item 1 */}
            <div className="space-y-1.5 pt-4">
              <Counter to={346} suffix=" +" />
              <h4 className="font-cinzel text-xs text-gray-500 uppercase tracking-[0.2em] font-semibold">Tarot Readings</h4>
            </div>
          </div>

          {/* Center Column: Core Content & Stats */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-md mx-auto">
            <span className="text-[#c49b63] italic text-xs font-serif tracking-wider block">
              Tarot Insights
            </span>

            <h3 className="font-cinzel text-3xl sm:text-4xl text-gray-900 font-extrabold leading-tight tracking-wide">
              Mysteries of Life with a Star Guide
            </h3>

            <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
              Whether you seek guidance on love, career, or personal growth, each card drawn will bring clarity and wisdom. Connect with the ancient art of tarot and let the answers you seek come to light.
            </p>

            <div className="pt-2">
              <a
                href="#tarot"
                className="inline-block px-8 py-3 border border-dotted border-[#c49b63] text-[#2c2c2c] hover:text-white hover:bg-[#c49b63] font-semibold text-xs tracking-widest uppercase transition-all duration-300 text-center rounded-none"
              >
                Start Now
              </a>
            </div>

            {/* Stat Item 2 */}
            <div className="space-y-1.5 pt-10">
              <Counter to={750} suffix=" +" />
              <h4 className="font-cinzel text-xs text-gray-500 uppercase tracking-[0.2em] font-semibold">Reading the Future</h4>
            </div>
          </div>

          {/* Right Column: Crystal ball arch image & CTA */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 relative">
            <div className="relative">
              {/* Floating Spherical Moon */}
              <div className="absolute -top-10 -right-6 z-30 pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=300&q=80"
                  className="w-20 h-20 rounded-full object-cover border border-[#c49b63]/25 shadow-xl animate-float-delayed"
                  alt="Realistic Moon Sphere"
                />
              </div>

              {/* Arch image with signature */}
              <div className="w-[360px] h-[520px] sm:w-[400px] sm:h-[580px] rounded-t-full overflow-hidden border border-[#c49b63]/25 shadow-xl relative bg-[#EDE9E2] z-20 group">
                <img
                  src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg"
                  alt="Crystal ball consulting"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-750"
                />

                {/* Script overlay signature */}
                <div className="absolute bottom-6 left-6 right-6 text-left pointer-events-none">
                  <span className="font-serif italic text-white text-3xl font-light opacity-95 block tracking-wider drop-shadow-md select-none" style={{ fontFamily: 'Georgia, serif' }}>
                    Mary Sunniboll
                  </span>
                </div>
              </div>
            </div>


          </div>

        </div>
      </section>





      {/* 3. INTERACTIVE TAROT CARD DRAWER SECTION */}
      <section id="tarot" className="py-24 bg-[#e5dfd5]/30 border-b border-black/5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="font-cinzel text-xs font-semibold text-[#a68a56] tracking-widest uppercase">Card Readings</span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-gray-900">Draw a Tarot Card</h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Focus your energy on a specific issue in your mind. Take a deep breath, clear your thoughts, and draw a card to reveal the hidden universe dynamics.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* The Cards Row (Premium Fanned-out Deck - Massive Size) */}
            <div className="relative lg:w-[60%] w-full h-[380px] sm:h-[480px] md:h-[550px] flex items-center justify-center select-none overflow-visible py-16">
              {tarotCards.map((card, idx) => {
                const isSelected = selectedTarotCard === idx;
                const isDrawn = selectedTarotCard !== null;
                const isHovered = hoveredCard === idx;
                const isHoveredOrSelected = isHovered || isSelected;

                // Spacing and Rotation calculations to form a perfect circular arc
                const angleSpacing = isMobile ? 5 : 7.5;
                const angle = (idx - 3) * angleSpacing; // slighter angle for bigger cards
                const yOffset = Math.abs(idx - 3) * (isMobile ? 12 : 8); // curved arc shape
                const xOffset = (idx - 3) * (isMobile ? 22 : 46); // compact spacing for mobile
                const lift = isHoveredOrSelected ? (isMobile ? -30 : -60) : 0;
                const scale = isHoveredOrSelected ? 1.08 : 1;
                const zIndex = isHoveredOrSelected ? 50 : (10 + idx);

                const transformStyle = `rotate(${angle}deg) translate(${xOffset}px, ${yOffset + lift}px) scale(${scale})`;

                return (
                  <div
                    key={idx}
                    onClick={() => handleTarotDraw(idx)}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      transform: transformStyle,
                      transformOrigin: 'bottom center',
                      zIndex: zIndex,
                    }}
                    className={`absolute w-[130px] h-[220px] xs:w-[150px] xs:h-[260px] sm:w-[220px] sm:h-[380px] cursor-pointer transition-all duration-300 ease-out select-none ${isDrawn && !isSelected ? "opacity-20 pointer-events-none scale-90" : "opacity-100"
                      }`}
                  >
                    <div className="w-full h-full relative rounded-lg overflow-hidden border border-[#c49b63]/30 shadow-xl transition-all duration-300">

                      {/* 1. LIGHT FACE (Default Card Back/Cover - off-white with gold mandala) */}
                      <div className={`absolute inset-0 bg-[#FAF8F5] p-4 flex flex-col justify-between items-center text-center transition-opacity duration-300 ${isHoveredOrSelected ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}>
                        {/* Elegant corners */}
                        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#c49b63]/50"></div>
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#c49b63]/50"></div>
                        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#c49b63]/50"></div>
                        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#c49b63]/50"></div>

                        {/* Top Accent */}
                        <span className="text-[#c49b63] text-[11px] sm:text-[12px] font-cinzel tracking-widest pt-2">✦ ASTROLARGERY ✦</span>

                        {/* Mandala Central Illustration */}
                        <div className="my-auto">
                          <svg className="w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 text-[#c49b63]/60 animate-spin-slower" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                            <circle cx="50" cy="50" r="40" strokeDasharray="1,2" />
                            <circle cx="50" cy="50" r="30" />
                            <circle cx="50" cy="50" r="10" />
                            {Array.from({ length: 16 }).map((_, i) => {
                              const a = (i * 360) / 16;
                              return (
                                <line
                                  key={i}
                                  x1="50"
                                  y1="50"
                                  x2="50"
                                  y2="14"
                                  transform={`rotate(${a} 50 50)`}
                                />
                              );
                            })}
                          </svg>
                        </div>

                        {/* Bottom Text */}
                        <div className="pb-3">
                          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#c49b63]/85 font-cinzel">Tarot Deck</span>
                        </div>
                      </div>

                      {/* 2. DARK FACE (Hovered/Selected Card Back - Black & Gold Editorial theme) */}
                      <div className={`absolute inset-0 bg-[#13151b] border border-[#c49b63] p-5 flex flex-col justify-between items-center text-center transition-opacity duration-300 ${isHoveredOrSelected ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}>
                        {/* Elegant gold corners */}
                        <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t border-l border-[#c49b63]"></div>
                        <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t border-r border-[#c49b63]"></div>
                        <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b border-l border-[#c49b63]"></div>
                        <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b border-r border-[#c49b63]"></div>

                        {/* Card Title Header */}
                        <div className="pt-2">
                          <span className="text-[8px] sm:text-[9px] text-[#c49b63]/85 uppercase tracking-[0.25em] font-semibold font-cinzel block">Astrological</span>
                          <h4 className="text-[14px] sm:text-[16px] font-bold text-white tracking-[0.15em] font-cinzel mt-1 uppercase">{card.title}</h4>
                        </div>

                        {/* Vector Illustration based on index */}
                        <div className="my-auto w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 flex items-center justify-center relative">
                          <svg className="w-full h-full text-[#c49b63]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                            {idx === 0 && (
                              <>
                                <path d="M 50 15 L 50 85 M 15 50 L 85 50" strokeWidth="0.5" strokeDasharray="2,2" />
                                <circle cx="50" cy="50" r="25" />
                                <polygon points="50,25 65,50 50,75 35,50" />
                                <circle cx="50" cy="50" r="4" fill="currentColor" />
                              </>
                            )}
                            {idx === 1 && (
                              <>
                                <path d="M 35 50 C 35 40, 45 40, 50 50 C 55 60, 65 60, 65 50 C 65 40, 55 40, 50 50 C 45 60, 35 60, 35 50 Z" strokeWidth="1.2" />
                                <circle cx="50" cy="25" r="3" fill="currentColor" />
                                <line x1="50" y1="35" x2="50" y2="65" />
                                <path d="M 25 25 L 30 35 M 75 75 L 70 65" />
                              </>
                            )}
                            {idx === 2 && (
                              <>
                                <path d="M 40 25 A 25 25 0 1 0 75 60 A 20 20 0 1 1 40 25 Z" fill="currentColor" fillOpacity="0.2" />
                                <circle cx="50" cy="50" r="32" strokeDasharray="1,1" />
                                <polygon points="65,25 68,31 75,31 70,36 72,43 65,39 58,43 60,36 55,31 62,31" fill="currentColor" />
                              </>
                            )}
                            {idx === 3 && (
                              <>
                                <circle cx="50" cy="50" r="30" />
                                <circle cx="50" cy="50" r="22" strokeDasharray="2,1" />
                                <circle cx="50" cy="50" r="6" fill="currentColor" />
                                <line x1="50" y1="10" x2="50" y2="90" />
                                <line x1="10" y1="50" x2="90" y2="50" />
                                <line x1="22" y1="22" x2="78" y2="78" />
                                <line x1="22" y1="78" x2="78" y2="22" />
                              </>
                            )}
                            {idx === 4 && (
                              <>
                                <polygon points="50,15 54,38 77,38 58,52 65,75 50,60 35,75 42,52 23,38 46,38" fill="currentColor" fillOpacity="0.3" />
                                <circle cx="50" cy="50" r="30" strokeDasharray="1,2" />
                                <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.5" />
                                <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.5" />
                              </>
                            )}
                            {idx === 5 && (
                              <>
                                <polygon points="50,15 80,40 68,80 32,80 20,40" />
                                <circle cx="50" cy="48" r="12" />
                                <line x1="50" y1="25" x2="50" y2="70" />
                                <path d="M 35 60 Q 50 65 65 60" />
                              </>
                            )}
                            {idx === 6 && (
                              <>
                                <circle cx="50" cy="50" r="18" fill="currentColor" fillOpacity="0.2" />
                                <circle cx="50" cy="50" r="28" />
                                <path d="M 40 40 Q 50 45 60 40" />
                                {Array.from({ length: 8 }).map((_, i) => {
                                  const an = (i * 360) / 8;
                                  return <line key={i} x1="50" y1="18" x2="50" y2="10" transform={`rotate(${an} 50 50)`} />;
                                })}
                              </>
                            )}
                          </svg>
                        </div>

                        {/* Footer Information */}
                        <div className="pb-1.5 w-full">
                          <span className="text-[7px] text-[#c49b63] uppercase tracking-[0.2em] font-medium block">{card.meaning}</span>
                          <div className="w-8 h-[0.5px] bg-[#c49b63]/40 mx-auto my-1"></div>
                          <span className="text-[7px] text-gray-400 block tracking-[0.1em]">{idx % 2 === 0 ? "MARS ✦ FIRE" : "VENUS ✦ EARTH"}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reading Details Display Panel */}
            <div className="lg:w-[35%] w-full bg-white border border-black/5 rounded-md p-8 space-y-6 shadow-xl text-left min-h-[350px] flex flex-col justify-between">
              {selectedTarotCard === null ? (
                <div className="my-auto text-center space-y-4 py-8">
                  <div className="w-16 h-16 border border-dashed border-black/10 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <Star size={24} className="animate-spin-slow" />
                  </div>
                  <h3 className="font-cinzel text-lg text-gray-900 font-semibold">Select a card to draw</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Hover over the spread of tarot decks to sense their energy. Once your intuition settles on a deck, click it to flip and read your fortune forecast.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 animate-fadeIn transition-all">
                  <div className="flex justify-between items-center pb-4 border-b border-black/5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#a68a56] font-semibold block">Drawn Card archetype</span>
                      <h3 className="font-cinzel text-2xl font-bold text-gray-900">
                        {tarotCards[selectedTarotCard].title}
                      </h3>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">#0{selectedTarotCard + 1}</span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-cinzel text-xs text-gray-900 font-bold uppercase tracking-wider">Symbolic Power</h4>
                    <p className="text-sm font-semibold text-[#a68a56]">
                      {tarotCards[selectedTarotCard].meaning}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-cinzel text-xs text-gray-900 font-bold uppercase tracking-wider">Universal Influence</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {tarotCards[selectedTarotCard].description}
                    </p>
                  </div>

                  <div className="space-y-3 bg-[#a68a56]/5 border border-[#a68a56]/15 p-4 rounded text-xs text-gray-600 leading-relaxed">
                    <span className="font-bold text-[#a68a56] block mb-1">Personal Message:</span>
                    {drawnFortune}
                  </div>

                  <button
                    onClick={resetTarot}
                    className="w-full py-3 bg-[#a68a56] hover:bg-[#bda069] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
                  >
                    Draw Another Card
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
      {/* 4. INTERACTIVE ZODIAC HOROSCOPE SECTION */}
      <section id="horoscope" className="py-24 px-4 bg-white border-b border-black/5 relative">
        {/* Subtle Section background star */}
        <div className="absolute top-[5%] right-[5%] text-black/5 animate-pulse text-5xl pointer-events-none">✦</div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[#c49b63] text-xs animate-pulse">✦</span>
              <span className="font-cinzel text-xs font-semibold text-[#a68a56] tracking-widest uppercase">Zodiac Calendar</span>
              <span className="text-[#c49b63] text-xs animate-pulse">✦</span>
            </div>
            <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-gray-900 tracking-wide">Daily Horoscopes</h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="w-10 h-[0.5px] bg-[#a68a56]/40"></div>
              <span className="text-xs text-[#a68a56]">✦</span>
              <div className="w-10 h-[0.5px] bg-[#a68a56]/40"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
            {/* Zodiac Glyph Grid Selector */}
            <div className="lg:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {zodiacSigns.map((z, idx) => {
                const isSelected = selectedZodiac === idx;
                return (
                  <button
                    key={z.name}
                    onClick={() => setSelectedZodiac(idx)}
                    className={`relative flex flex-col items-center justify-center p-5 rounded-lg border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md select-none group ${isSelected
                      ? "bg-[#13151b] border-[#c49b63] text-white shadow-xl scale-105 z-10"
                      : "bg-white/60 border-black/5 hover:border-[#c49b63]/40 text-[#2c2c2c] hover:bg-white backdrop-blur-sm"
                      }`}
                  >
                    {/* Gold corner ornaments for selected sign */}
                    {isSelected && (
                      <>
                        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#c49b63]"></div>
                        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#c49b63]"></div>
                        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#c49b63]"></div>
                        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#c49b63]"></div>
                      </>
                    )}

                    {/* Rounded icon ring */}
                    <span className={`w-12 h-12 rounded-full border flex items-center justify-center text-2xl transition-colors duration-300 ${isSelected ? "border-[#c49b63] text-[#c49b63] bg-[#c49b63]/10" : "border-[#c49b63]/20 text-[#a68a56] bg-[#FAF8F5] group-hover:bg-[#c49b63]/5"
                      }`}>
                      {z.symbol}
                    </span>

                    <span className="font-cinzel text-[11px] font-bold tracking-wider mt-3 block">{z.name}</span>
                    <span className={`text-[9px] mt-1 transition-colors duration-300 ${isSelected ? "text-[#c49b63]/80" : "text-gray-500"
                      }`}>{z.dates.split(" - ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Horoscope Detail Panel (Premium Dark Slate Theme) */}
            <div className="bg-[#13151b] border border-[#c49b63]/40 rounded-lg p-8 space-y-6 shadow-2xl relative overflow-hidden text-white flex flex-col justify-between min-h-[380px]">

              {/* Background spinning constellation overlay */}
              <svg className="absolute -right-16 -top-16 w-64 h-64 text-[#c49b63]/5 pointer-events-none animate-spin-slower" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.3" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1,1" fill="none" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 360) / 12;
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2="50"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="0.15"
                      transform={`rotate(${angle} 50 50)`}
                    />
                  );
                })}
              </svg>

              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#c49b63]/70"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#c49b63]/70"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#c49b63]/70"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#c49b63]/70"></div>

              <div className="space-y-6 relative z-10">
                {/* Header section */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-cinzel text-3xl font-extrabold text-[#c49b63] tracking-wide mb-1 uppercase">
                      {zodiacSigns[selectedZodiac].name}
                    </h3>
                    <span className="text-gray-400 text-xs font-medium tracking-wider">
                      {zodiacSigns[selectedZodiac].dates}
                    </span>
                  </div>
                  <span className="text-3xl text-[#c49b63] border border-[#c49b63]/30 w-14 h-14 rounded-full flex items-center justify-center bg-[#c49b63]/5">
                    {zodiacSigns[selectedZodiac].symbol}
                  </span>
                </div>

                {/* Elements grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-b border-[#c49b63]/25 py-4 text-center">
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase block tracking-widest mb-1.5">Element</span>
                    <span className="text-xs font-semibold text-gray-200 px-2.5 py-1 rounded bg-white/5 border border-white/5 block">{zodiacSigns[selectedZodiac].element}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase block tracking-widest mb-1.5">Ruling Planet</span>
                    <span className="text-xs font-semibold text-gray-200 px-2.5 py-1 rounded bg-white/5 border border-white/5 block">{zodiacSigns[selectedZodiac].planet}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase block tracking-widest mb-1.5">Crystal</span>
                    <span className="text-xs font-semibold text-[#c49b63] px-2.5 py-1 rounded bg-[#c49b63]/10 border border-[#c49b63]/20 block truncate">{zodiacSigns[selectedZodiac].crystal}</span>
                  </div>
                </div>

                {/* Forecast section */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-cinzel text-xs text-[#c49b63] font-semibold tracking-widest uppercase flex items-center gap-1.5">
                    <Sun size={12} className="animate-spin-slow text-[#c49b63]" /> Today's Forecast
                  </h4>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-gray-300">
                    {zodiacSigns[selectedZodiac].horoscope}
                  </p>
                </div>
              </div>

              {/* Button CTA */}
              <button className="relative z-10 w-full py-3.5 mt-4 bg-[#c49b63] hover:bg-[#b59055] text-black hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-none border border-[#c49b63]">
                Request Full Natal Chart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW PREMIUM MYSTIC GUIDANCE SECTION */}
      <section className="relative py-24 px-4 md:px-8 bg-[#EDE8E1] border-b border-black/5 overflow-hidden">

        {/* Subtle background zodiac wheel */}
        <svg className="absolute -right-28 top-1/2 -translate-y-1/2 w-[500px] h-[500px] text-gray-900/[0.03] pointer-events-none animate-spin-slower" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1,1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return <line key={i} x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="0.15" transform={`rotate(${angle} 50 50)`} />;
          })}
        </svg>

        {/* Subtle glow */}
        <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-[#c49b63]/5 blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* LEFT: Sunburst Circular Image */}
          <div className="flex items-center justify-center relative">

            {/* Sunburst rays SVG behind the circle */}
            <svg className="absolute w-[480px] h-[480px] text-[#c49b63]/20 animate-spin-slower pointer-events-none" viewBox="0 0 200 200">
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = (i * 360) / 36;
                const isLong = i % 3 === 0;
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2="100"
                    y2={isLong ? 12 : 22}
                    stroke="currentColor"
                    strokeWidth={isLong ? 1.2 : 0.6}
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}
              <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.4" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2,2" />
            </svg>

            {/* Circular image frame */}
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full overflow-hidden border-2 border-[#c49b63]/30 shadow-2xl z-10 group">
              <img
                src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg"
                alt="Mystic Guide Portrait"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
              />
              {/* Gold ring overlay */}
              <div className="absolute inset-0 rounded-full border-4 border-[#c49b63]/15 pointer-events-none"></div>
            </div>

            {/* Floating crystal badge bottom-right */}
            <div className="absolute bottom-4 right-4 sm:right-8 bg-white/90 backdrop-blur-md border border-[#c49b63]/30 rounded-lg px-4 py-3 shadow-xl z-20 flex items-center gap-3">
              <span className="text-2xl">🔮</span>
              <div>
                <span className="font-cinzel text-[10px] font-bold text-[#a68a56] uppercase tracking-widest block">Accuracy</span>
                <span className="font-cinzel text-lg font-extrabold text-gray-900 leading-none">98%</span>
              </div>
            </div>

            {/* Floating star badge top-left */}
            <div className="absolute top-4 left-4 sm:left-8 bg-[#13151b] border border-[#c49b63]/40 rounded-lg px-4 py-3 shadow-xl z-20 flex items-center gap-2">
              <Star size={14} className="text-[#c49b63] fill-[#c49b63]" />
              <span className="font-cinzel text-[10px] font-bold text-white uppercase tracking-widest">5.0 Rating</span>
            </div>

          </div>

          {/* RIGHT: Editorial content */}
          <div className="space-y-7 text-left">

            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#c49b63]/40 bg-[#c49b63]/8 rounded-full">
              <span className="text-[#c49b63] text-xs">✦</span>
              <span className="font-cinzel text-[10px] font-bold text-[#a68a56] uppercase tracking-widest">Cosmic Alignment</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h2 className="font-cinzel text-3xl md:text-4xl lg:text-[42px] font-extrabold text-gray-900 leading-[1.15] tracking-wide">
                Revealing the Hidden <br />
                <span className="font-serif italic text-[#c49b63]">Patterns of Your Soul</span>
              </h2>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-cinzel text-4xl font-extrabold text-gray-900">$ 85</span>
              <span className="text-xs text-gray-500 font-medium">/ per session</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              Embark on a transformative journey through the celestial map of your life. Our master astrologers decode the ancient language of stars to reveal your karmic patterns, soul purpose, and the divine timing of your most important life events.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "🌙", label: "Moon Cycles" },
                { icon: "⭐", label: "Star Mapping" },
                { icon: "🌿", label: "Spiritual Growth" },
              ].map((tag) => (
                <div key={tag.label} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/8 rounded-full shadow-sm hover:border-[#c49b63]/40 transition-colors group">
                  <span className="text-sm">{tag.icon}</span>
                  <span className="font-cinzel text-[10px] font-semibold text-gray-700 tracking-wider uppercase group-hover:text-[#a68a56] transition-colors">{tag.label}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[0.5px] bg-black/10"></div>
              <span className="text-[#c49b63] text-xs">✦</span>
              <div className="flex-1 h-[0.5px] bg-black/10"></div>
            </div>

            {/* Consultant info + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Consultant avatar */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#c49b63]/30 shadow-md flex-shrink-0">
                  <img
                    src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/side-view-of-gypsy-fortune-teller-holding-tarot-ca-2023-11-27-05-32-33-utc.jpg"
                    alt="Consultant"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  <span className="font-cinzel text-sm font-bold text-gray-900 block">Astra Moonwhisper</span>
                  <span className="text-[10px] text-gray-500 font-medium">Every soul carries a cosmic blueprint waiting to be read.</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to="/services"
                className="flex-shrink-0 px-8 py-3.5 bg-black text-white hover:bg-[#c49b63] font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl inline-block text-center rounded-none"
              >
                Book Session
              </Link>
            </div>

          </div>
        </div>
      </section>
      {/* 5. SERVICES MATRIX */}
      <section className="py-24 px-4 bg-white border-b border-black/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <span className="font-cinzel text-xs font-semibold text-[#a68a56] tracking-widest uppercase">Ancient Offerings</span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-gray-900">Mystical Reading Services</h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Discover our diverse range of services designed to provide clarity, comfort, and direct alignment with key paths.
            </p>
            <div className="w-16 h-0.5 bg-[#a68a56] mx-auto mt-2"></div>
          </div>

          {/* Services Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Service 1 */}
            <div className="bg-white/80 border border-black/5 hover:border-[#a68a56]/30 p-8 rounded-md hover:bg-white transition-all flex flex-col justify-between group shadow-md hover:shadow-xl">
              <div className="space-y-6">
                <img
                  src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/icon-01.png"
                  alt="Mediumship icon"
                  className="w-12 h-16 object-contain group-hover:scale-105 transition-transform"
                />
                <h3 className="font-cinzel text-xl font-bold text-gray-900">Mediumship</h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  Experience the healing and comfort of connecting with departed loved ones through the art of Mediumship. Our skilled medium acts as a bridge.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center gap-1 text-xs text-[#a68a56] font-semibold tracking-wider uppercase pt-6 hover:text-gray-900 transition-colors">
                Discover More <ArrowRight size={12} />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white/80 border border-black/5 hover:border-[#a68a56]/30 p-8 rounded-md hover:bg-white transition-all flex flex-col justify-between group shadow-md hover:shadow-xl">
              <div className="space-y-6">
                <img
                  src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/icon-02.png"
                  alt="Numerology icon"
                  className="w-12 h-16 object-contain group-hover:scale-105 transition-transform"
                />
                <h3 className="font-cinzel text-xl font-bold text-gray-900">Numerology</h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  Delve into the mystical world of Numerology and discover the secrets encoded within your name and birthdate with our expert numerologist.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center gap-1 text-xs text-[#a68a56] font-semibold tracking-wider uppercase pt-6 hover:text-gray-900 transition-colors">
                Discover More <ArrowRight size={12} />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white/80 border border-black/5 hover:border-[#a68a56]/30 p-8 rounded-md hover:bg-white transition-all flex flex-col justify-between group shadow-md hover:shadow-xl">
              <div className="space-y-6">
                <div className="w-12 h-16 flex items-center justify-center">
                  <Sun size={40} className="text-[#a68a56] group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-gray-900">Palmistry Analysis</h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  Explore the intricate mappings of your palms. Unveil lifetime curves, health signs, potential blocks, and career lines with our experts.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center gap-1 text-xs text-[#a68a56] font-semibold tracking-wider uppercase pt-6 hover:text-gray-900 transition-colors">
                Discover More <ArrowRight size={12} />
              </Link>
            </div>

          </div>
        </div>
      </section>



      {/* 7. MASONRY PORTFOLIO GRID */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="font-cinzel text-xs font-semibold text-[#a68a56] tracking-widest uppercase">Sacred Spaces</span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-gray-900">Consultation Gallery</h2>
          <div className="w-16 h-0.5 bg-[#a68a56] mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: "https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/sq-05.jpg", title: "Future Prediction" },
            { img: "https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/astrology-astrologer-calculates-natal-chart-and-m-2023-11-27-04-52-09-utc.jpg", title: "Tarot Reading" },
            { img: "https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/sq-04.jpg", title: "Pendulum" },
            { img: "https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/sq-03.jpg", title: "Chakra Alignment" },
            { img: "https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/side-view-of-gypsy-fortune-teller-holding-tarot-ca-2023-11-27-05-32-33-utc.jpg", title: "Mediumship" },
            { img: "https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/stones-and-minerals-set-up-for-healing-therapy-2023-11-27-04-49-44-utc.jpg", title: "Crystal Therapy" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-md overflow-hidden group border border-black/5 aspect-[4/3] shadow-md hover:shadow-xl cursor-pointer"
              onClick={() => setModalImage(item.img)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold mb-1">Session</span>
                <h4 className="font-cinzel text-lg font-bold text-white tracking-wide">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. COSMIC EVENTS & BLOG GRID */}
      <section className="py-24 bg-[#e5dfd5]/20 border-t border-black/5 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="font-cinzel text-xs font-semibold text-[#a68a56] tracking-widest uppercase">Mystical Insights</span>
              <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-gray-900">Stay Updated on Cosmic Events</h2>
              <p className="text-gray-600 text-sm max-w-xl">
                Stay tuned for enlightening articles, practical advice, and cosmic inspiration! From full moon rituals to Mercury retrograde survival tips, we've got you covered.
              </p>
            </div>
            <Link to="/services" className="px-6 py-3 border border-[#a68a56] text-[#a68a56] font-bold text-xs uppercase tracking-widest hover:bg-[#a68a56] hover:text-white transition-all">
              View All Articles
            </Link>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Post 1 */}
            <article className="bg-white/80 border border-black/5 rounded-md overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:border-[#a68a56]/20 transition-all">
              <div>
                <img
                  src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/post-07.jpg"
                  alt="Crystal Magic thumbnail"
                  className="w-full h-48 object-cover grayscale"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Clock size={10} /> 5 min read</span>
                    <span>•</span>
                    <span>May 31, 2024</span>
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-gray-900 hover:text-[#a68a56] transition-colors">Crystal Magic</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Discover the magical properties of crystals and how they can enhance your life. Learn which gemstones resonate with your energy and how to use them for healing and protection.
                  </p>
                </div>
              </div>
              <Link to="/services" className="px-6 pb-6 pt-2 text-xs font-bold text-[#a68a56] hover:text-gray-900 transition-colors inline-flex items-center gap-1">
                Read Article <ArrowRight size={10} />
              </Link>
            </article>

            {/* Post 2 */}
            <article className="bg-white/80 border border-black/5 rounded-md overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:border-[#a68a56]/20 transition-all">
              <div>
                <img
                  src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/post-05.jpg"
                  alt="Lucky Charms thumbnail"
                  className="w-full h-48 object-cover grayscale"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Clock size={10} /> 4 min read</span>
                    <span>•</span>
                    <span>May 31, 2024</span>
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-gray-900 hover:text-[#a68a56] transition-colors">Lucky Charms</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Explore the world of lucky charms and talismans. Learn how these powerful objects can attract good fortune, ward off negativity, and bring positive energy into your life.
                  </p>
                </div>
              </div>
              <Link to="/services" className="px-6 pb-6 pt-2 text-xs font-bold text-[#a68a56] hover:text-gray-900 transition-colors inline-flex items-center gap-1">
                Read Article <ArrowRight size={10} />
              </Link>
            </article>

            {/* Post 3 */}
            <article className="bg-white/80 border border-black/5 rounded-md overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:border-[#a68a56]/20 transition-all">
              <div>
                <img
                  src="https://astrology.nicdark.com/astrology-wordpress-theme/wp-content/uploads/sites/2/2024/05/post-09.jpg"
                  alt="Tarot Insights thumbnail"
                  className="w-full h-48 object-cover grayscale"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Clock size={10} /> 6 min read</span>
                    <span>•</span>
                    <span>May 31, 2024</span>
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-gray-900 hover:text-[#a68a56] transition-colors">Tarot Insights</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Dive into the world of tarot with our expert guidance. Learn to interpret the cards and uncover hidden messages about your past, present, and future.
                  </p>
                </div>
              </div>
              <Link to="/services" className="px-6 pb-6 pt-2 text-xs font-bold text-[#a68a56] hover:text-gray-900 transition-colors inline-flex items-center gap-1">
                Read Article <ArrowRight size={10} />
              </Link>
            </article>

          </div>
        </div>
      </section>
      {/* 6. TEXT MARQUEE SPLASH
      <section className="bg-white py-8 border-t border-b border-black/5 overflow-hidden w-full select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 font-cinzel text-xs font-bold text-gray-500 uppercase tracking-widest shrink-0 pr-12">
              <span>Horoscope</span> <span className="text-[#a68a56]">✦</span>
              <span>Constellation</span> <span className="text-[#a68a56]">✦</span>
              <span>Ascendant</span> <span className="text-[#a68a56]">✦</span>
              <span>Birth Chart</span> <span className="text-[#a68a56]">✦</span>
              <span>Planetary</span> <span className="text-[#a68a56]">✦</span>
              <span>Tarot Card</span> <span className="text-[#a68a56]">✦</span>
              <span>Retrograde</span> <span className="text-[#a68a56]">✦</span>
              <span>Numerical</span> <span className="text-[#a68a56]">✦</span>
            </div>
          ))}
        </div>
      </section> */}

      {/* Gallery Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-[100000] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setModalImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-[#c49b63] rounded-full p-2 transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); setModalImage(null); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-6xl w-full flex items-center justify-center">
            <img
              src={modalImage}
              alt="Gallery Full Size"
              className="max-h-[85vh] max-w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border-2 border-white/10 rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
