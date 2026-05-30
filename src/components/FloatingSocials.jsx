import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingSocials = () => {
  const btnClass = "relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#c49b63] to-[#92784b] text-white shadow-[0_4px_15px_rgba(196,155,99,0.6)] flex items-center justify-center hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(196,155,99,0.8)] transition-all duration-300 group";

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex flex-col gap-3 md:gap-4 pointer-events-none">
      
      {/* WhatsApp */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} pointer-events-auto`}
        aria-label="WhatsApp"
      >
        {/* Subtle spinning glow ring */}
        <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-white/50 animate-[spin_8s_linear_infinite] group-hover:border-transparent transition-colors duration-300"></div>
        <MessageCircle className="w-5 h-5 md:w-[22px] md:h-[22px] animate-[pulse_2s_ease-in-out_infinite] group-hover:animate-none group-hover:scale-110 transition-transform duration-300" />
      </a>

      {/* Call */}
      <a
        href="tel:+1234567890"
        className={`${btnClass} pointer-events-auto`}
        aria-label="Call Us"
      >
        <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-white/50 animate-[spin_8s_linear_infinite_reverse] group-hover:border-transparent transition-colors duration-300"></div>
        <Phone className="w-[18px] h-[18px] md:w-5 md:h-5 animate-[pulse_2.5s_ease-in-out_infinite] group-hover:animate-none group-hover:scale-110 transition-transform duration-300" />
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} pointer-events-auto`}
        aria-label="Facebook"
      >
        <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-white/50 animate-[spin_10s_linear_infinite] group-hover:border-transparent transition-colors duration-300"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-[22px] md:h-[22px] animate-[pulse_3s_ease-in-out_infinite] group-hover:animate-none group-hover:scale-110 transition-transform duration-300"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} pointer-events-auto`}
        aria-label="Instagram"
      >
        <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-white/50 animate-[spin_10s_linear_infinite_reverse] group-hover:border-transparent transition-colors duration-300"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-[22px] md:h-[22px] animate-[pulse_2.5s_ease-in-out_infinite] group-hover:animate-none group-hover:scale-110 transition-transform duration-300"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </a>
    </div>
  );
};

export default FloatingSocials;
