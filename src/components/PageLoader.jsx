import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Star } from 'lucide-react';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    setIsLoading(true);
    
    // Start fading out after 600ms
    const fadeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    // Remove from DOM after transition completes (300ms fade)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#EDE9E2] transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer rotating wheel */}
        <svg 
          className="w-32 h-32 md:w-40 md:h-40 text-[#c49b63] animate-[spin_3s_linear_infinite]" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor"
        >
          <circle cx="50" cy="50" r="48" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="38" strokeWidth="0.25" strokeDasharray="1,2" />
          <circle cx="50" cy="50" r="25" strokeWidth="0.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <line 
                key={i} 
                x1="50" y1="50" x2="50" y2="2" 
                strokeWidth="0.25" 
                transform={`rotate(${angle} 50 50)`} 
              />
            );
          })}
        </svg>

        {/* Inner pulsing star */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Star className="w-8 h-8 md:w-10 md:h-10 text-[#c49b63] fill-[#c49b63] animate-pulse" />
        </div>
      </div>
      <span className="font-cinzel text-[#a68a56] text-xs md:text-sm uppercase tracking-[0.3em] font-semibold animate-pulse">Consulting the Stars...</span>
    </div>
  );
};

export default PageLoader;
