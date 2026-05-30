import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-[#c49b63]/20 pt-20 pb-10 text-white font-inter relative overflow-hidden">
      {/* Starry Space Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20 z-0"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
      </video>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#c49b63]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#c49b63]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Core footer elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 text-center md:text-left">

          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <Link to="/" className="font-cinzel text-3xl font-extrabold text-white tracking-[0.15em] block hover:text-[#c49b63] transition-colors relative inline-block">
              TAROTI
              <span className="text-[#c49b63] text-[10px] absolute -top-1 -right-4 animate-pulse">✦</span>
              <span className="text-[#c49b63] text-[8px] absolute bottom-1 -left-3 animate-pulse">✦</span>
            </Link>
            <p className="text-[13.5px] leading-loose text-gray-400">
              Unlock the secrets of the cosmos. Connect with our expert astrologers and tarot readers for personalized guidance that reveals your destiny.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
              <a href="https://facebook.com" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c49b63] hover:bg-[#c49b63] transition-all duration-300" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>
              </a>
              <a href="https://twitter.com" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c49b63] hover:bg-[#c49b63] transition-all duration-300" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://instagram.com" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c49b63] hover:bg-[#c49b63] transition-all duration-300" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://youtube.com" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c49b63] hover:bg-[#c49b63] transition-all duration-300" aria-label="Youtube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11C4.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.553a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h4 className="font-cinzel text-[15px] font-bold text-white tracking-widest uppercase border-b border-[#c49b63]/30 pb-3 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-[13.5px] w-full">
              <li>
                <Link to="/" className="flex items-center justify-center md:justify-start group text-gray-400 hover:text-[#c49b63] transition-colors">
                  <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#c49b63]" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center justify-center md:justify-start group text-gray-400 hover:text-[#c49b63] transition-colors">
                  <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#c49b63]" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center justify-center md:justify-start group text-gray-400 hover:text-[#c49b63] transition-colors">
                  <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#c49b63]" />
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/download" className="flex items-center justify-center md:justify-start group text-gray-400 hover:text-[#c49b63] transition-colors">
                  <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#c49b63]" />
                  Download App
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center justify-center md:justify-start group text-gray-400 hover:text-[#c49b63] transition-colors">
                  <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#c49b63]" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy Column */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h4 className="font-cinzel text-[15px] font-bold text-white tracking-widest uppercase border-b border-[#c49b63]/30 pb-3 inline-block">
              Support & Legal
            </h4>
            <ul className="space-y-3.5 text-[13.5px] w-full">
              <li>
                <Link to="/terms" className="flex items-center justify-center md:justify-start group text-gray-400 hover:text-[#c49b63] transition-colors">
                  <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#c49b63]" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="flex items-center justify-center md:justify-start group text-gray-400 hover:text-[#c49b63] transition-colors">
                  <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#c49b63]" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center md:justify-start group text-gray-400 hover:text-[#c49b63] transition-colors cursor-pointer">
                  <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#c49b63]" />
                  FAQ & Help Center
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center md:justify-start group text-gray-400 hover:text-[#c49b63] transition-colors cursor-pointer">
                  <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#c49b63]" />
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info Column */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h4 className="font-cinzel text-[15px] font-bold text-white tracking-widest uppercase border-b border-[#c49b63]/30 pb-3 inline-block">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-[13.5px] text-gray-400 w-full">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={16} className="text-[#c49b63] shrink-0 mt-1" />
                <span className="leading-relaxed text-center md:text-left">1080 Cosmic Avenue<br />Spiritual District, NY 10012</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={16} className="text-[#c49b63] shrink-0" />
                <a href="mailto:support@taroti.com" className="hover:text-white transition-colors">support@taroti.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={16} className="text-[#c49b63] shrink-0" />
                <span className="hover:text-white transition-colors cursor-pointer">+1 (555) 386-3090</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[12px] text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} TAROTI Astrology. All rights reserved. Designed with celestial energy.
          </div>

          <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6 text-gray-500 font-medium text-[11px] tracking-widest mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">VISA</span>
            <span className="hover:text-white cursor-pointer transition-colors">MASTERCARD</span>
            <span className="hover:text-white cursor-pointer transition-colors">PAYPAL</span>
            <span className="hover:text-white cursor-pointer transition-colors">APPLE PAY</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
