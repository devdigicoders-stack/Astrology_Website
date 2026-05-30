import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Show button when page is scrolled down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3.5 rounded-full bg-[#1c1c1c] border border-[#c49b63]/30 text-[#c49b63] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-[#c49b63] hover:text-white hover:border-[#c49b63] hover:-translate-y-1 transition-all duration-300 focus:outline-none flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={22} className="group-hover:animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default ScrollToTop;
