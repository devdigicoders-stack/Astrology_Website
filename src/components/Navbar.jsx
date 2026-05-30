import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-[#c49b63] font-semibold' : 'text-[#2c2c2c] hover:text-[#c49b63]';
  };

  const closeMenu = () => setIsOpen(false);

  // Left menu items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Our Astrologers', path: '/astrologers' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy & Policy', path: '/privacy' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Chat with AI', path: '/chat-with-ai' },
    { name: 'Kundali', path: '/kundali' },
    { name: 'Horoscope', path: '/horoscope' },
    { name: 'Add Money', path: '/add-money' },
    { name: 'Withdraw Funds', path: '/withdrawal' },
    { name: 'Transactions', path: '/transactions' },
  ];

  return (
    <header className="w-full z-[10000] sticky top-0 font-inter bg-white border-b border-[#f0ece6] shadow-sm select-none">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-[100px]">

          {/* Left Section: Logo and Download App */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center justify-center pointer-events-auto z-10 relative">
              {/* Elegant Sunburst background rays */}
              <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                <svg
                  className="w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] text-[#c49b63]/25 animate-spin-slower"
                  viewBox="0 0 100 100"
                >
                  {/* 24 radial rays radiating from center */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 360) / 24;
                    return (
                      <line
                        key={i}
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="4"
                        stroke="currentColor"
                        strokeWidth="0.35"
                        transform={`rotate(${angle} 50 50)`}
                      />
                    );
                  })}
                  {/* Central thin circle */}
                  <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="0.45" />
                </svg>
              </div>

              {/* Mystical Sparkles surrounding the logo */}
              <span className="absolute -top-6 left-1 text-[#c49b63] text-xs animate-pulse">✦</span>
              <span className="absolute -bottom-5 right-1 text-[#c49b63] text-[9px] animate-pulse">✦</span>
              <span className="absolute top-1 -left-4 text-[#c49b63] text-[10px] animate-pulse">✦</span>
              <span className="absolute -top-3 right-0 text-[#c49b63] text-[8px] animate-pulse">✦</span>

              <Link
                to="/"
                className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#1c1c1c] tracking-[0.18em] relative whitespace-nowrap z-10 transition-transform duration-300 hover:scale-[1.02]"
              >
                TAROTI
              </Link>
            </div>

          </div>

          {/* Right Section: Nav Links & CTA Buttons */}
          <div className="flex items-center">

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center space-x-3 xl:space-x-4 mr-6">
              {navItems.map((item, idx) => (
                <li key={idx} className="py-8">
                  <Link
                    to={item.path}
                    className={`text-[11.5px] font-medium tracking-wide transition-colors duration-200 ${isActive(item.path)}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              {/* Login / Logout Button */}
              {token ? (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 border border-solid border-[#c49b63] text-[#c49b63] hover:text-white hover:bg-[#c49b63] font-semibold text-[13px] tracking-wider uppercase transition-all duration-300 text-center rounded-none shadow-sm hover:shadow-md cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2.5 border border-solid border-[#c49b63] text-[#c49b63] hover:text-white hover:bg-[#c49b63] font-semibold text-[13px] tracking-wider uppercase transition-all duration-300 text-center rounded-none shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
              )}

              {/* Download App (Solid Button) */}
              <Link
                to="/download"
                className="px-5 py-2.5 bg-[#c49b63] hover:bg-[#b59055] text-white font-semibold text-[13px] tracking-wider uppercase transition-all duration-300 text-center rounded-none shadow-sm hover:shadow-md"
              >
                Download App
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden ml-4 p-2 text-gray-700 hover:text-[#c49b63] focus:outline-none transition-colors duration-200 z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-[100px] left-0 w-full bg-white border-t border-black/5 shadow-2xl z-40 transition-all duration-300">
          <div className="flex flex-col px-6 py-6 space-y-4 max-h-[calc(100vh-90px)] overflow-y-auto">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={closeMenu}
                className={`text-sm font-semibold tracking-wider uppercase py-2 border-b border-black/5 transition-colors duration-150 ${isActive(item.path)}`}
              >
                {item.name}
              </Link>
            ))}

            {/* Download App & Auth Buttons stacked on mobile */}
            <div className="pt-4 flex flex-col space-y-3">
              {token ? (
                <button
                  onClick={() => { closeMenu(); handleLogout(); }}
                  className="block w-full py-3 border border-solid border-[#c49b63] text-[#c49b63] hover:bg-[#c49b63] hover:text-white transition-all duration-300 text-center font-semibold text-xs tracking-wider uppercase cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block w-full py-3 border border-solid border-[#c49b63] text-[#c49b63] hover:bg-[#c49b63] hover:text-white transition-all duration-300 text-center font-semibold text-xs tracking-wider uppercase"
                >
                  Login
                </Link>
              )}

              <Link
                to="/download"
                onClick={closeMenu}
                className="block w-full py-3 bg-[#c49b63] text-white hover:bg-[#b59055] text-center font-semibold text-xs tracking-wider uppercase transition-colors duration-200"
              >
                Download App
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
