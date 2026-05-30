import React from 'react';

const FloatingAppStores = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-none">
      
      {/* Google Play Store */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-[#13151b]/95 backdrop-blur-md border border-[#c49b63]/50 border-r-0 shadow-[-5px_5px_20px_rgba(196,155,99,0.15)] rounded-l-full overflow-hidden translate-x-[calc(100%-56px)] hover:translate-x-0 transition-transform duration-300 pointer-events-auto group h-14"
        aria-label="Google Play Store"
      >
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 relative">
           <div className="absolute inset-0 rounded-l-full border-[1.5px] border-dashed border-[#c49b63]/60 animate-[spin_8s_linear_infinite] group-hover:border-transparent transition-colors duration-300"></div>
           <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Play Store" className="w-7 h-7 object-contain pl-0.5" />
        </div>
        <span className="font-cinzel font-bold text-white text-sm whitespace-nowrap pr-6 pl-2 tracking-wide group-hover:text-[#c49b63] transition-colors">
          Play Store
        </span>
      </a>

      {/* Apple App Store */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-[#13151b]/95 backdrop-blur-md border border-[#c49b63]/50 border-r-0 shadow-[-5px_5px_20px_rgba(196,155,99,0.15)] rounded-l-full overflow-hidden translate-x-[calc(100%-56px)] hover:translate-x-0 transition-transform duration-300 pointer-events-auto group h-14"
        aria-label="Apple App Store"
      >
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 relative">
           <div className="absolute inset-0 rounded-l-full border-[1.5px] border-dashed border-[#c49b63]/60 animate-[spin_8s_linear_infinite_reverse] group-hover:border-transparent transition-colors duration-300"></div>
           <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" alt="App Store" className="w-7 h-7 object-contain mb-1" />
        </div>
        <span className="font-cinzel font-bold text-white text-sm whitespace-nowrap pr-6 pl-2 tracking-wide group-hover:text-[#c49b63] transition-colors">
          App Store
        </span>
      </a>

    </div>
  );
};

export default FloatingAppStores;
