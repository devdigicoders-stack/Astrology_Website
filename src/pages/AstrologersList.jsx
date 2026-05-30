import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MessageCircle, Phone, Video, Languages, Award, IndianRupee, Filter, Search, Loader2 } from 'lucide-react';
import { io } from 'socket.io-client';

const AstrologersList = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter States
  const [expertise, setExpertise] = useState('');
  const [language, setLanguage] = useState('');
  const [maxCharge, setMaxCharge] = useState('');
  const [availability, setAvailability] = useState('');

  // Call Waiting States
  const [waitingCall, setWaitingCall] = useState(false);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const BACKEND_URL = API_URL.replace('/api', '');

  useEffect(() => {
    fetchAstrologers();
  }, [expertise, language, maxCharge, availability]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        const newSocket = io(BACKEND_URL);
        
        newSocket.on('connect', () => {
          newSocket.emit('join_room', user._id);
        });

        newSocket.on('call_accepted', (data) => {
          setWaitingCall(false);
          const { callId, type } = data;
          if (type === 'video') navigate(`/video/${callId}`);
          else if (type === 'audio') navigate(`/audio/${callId}`);
          else navigate(`/chat/${callId}`);
        });

        newSocket.on('call_rejected', (data) => {
          setWaitingCall(false);
          alert(data.message);
        });

        setSocket(newSocket);

        return () => {
          newSocket.disconnect();
        };
      } catch (e) {
        console.error(e);
      }
    }
  }, [BACKEND_URL, navigate]);

  const fetchAstrologers = async () => {
    setLoading(true);
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      if (expertise) queryParams.append('expertise', expertise);
      if (language) queryParams.append('language', language);
      if (maxCharge) queryParams.append('maxCharge', maxCharge);
      if (availability) queryParams.append('availability', availability);

      const url = `${API_URL}/astrologer/public${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setAstrologers(data.astrologers);
      } else {
        setError('Failed to load astrologers. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching astrologers:', err);
      setError('Network error. Unable to connect to servers.');
    } finally {
      setLoading(false);
    }
  };

  const handleInitiate = async (astrologerId, type) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("Please login first to connect with astrologers!");
      // Optionally redirect to login: window.location.href = '/login';
      return;
    }

    try {
      const response = await fetch(`${API_URL}/calls/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ astrologerId, type })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setWaitingCall(true);
      } else {
        alert(`Failed: ${data.message}`);
      }
    } catch (err) {
      console.error('Initiate error:', err);
      alert('Network error while trying to connect.');
    }
  };

  const getImageUrl = (filename) => {
    if (!filename) return 'https://ui-avatars.com/api/?name=Astro&background=c49b63&color=fff';
    if (filename.startsWith('http')) return filename;
    return `${BACKEND_URL}/uploads/${filename}`;
  };

  return (
    <div className="bg-[#fdfaf5] min-h-screen pt-24 pb-16 font-inter">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1c1c1c] font-cinzel mb-4">
          Our Expert <span className="text-[#c49b63]">Astrologers</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
          Connect with India's best Vedic Astrologers, Tarot Readers, and Numerologists. Get instant guidance for your life problems.
        </p>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#f0ece6] flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 text-gray-700 font-medium">
            <Filter size={18} className="text-[#c49b63]" />
            <span>Filters:</span>
          </div>
          
          <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
            <select 
              className="flex-1 bg-[#faf8f5] border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c49b63] text-sm"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="online">🟢 Online</option>
              <option value="offline">⚫ Offline</option>
              <option value="busy">🟡 Busy</option>
            </select>

            <select 
              className="flex-1 bg-[#faf8f5] border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c49b63] text-sm"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
            >
              <option value="">All Expertise</option>
              <option value="Vedic">Vedic Astrology</option>
              <option value="Tarot">Tarot Reading</option>
              <option value="Numerology">Numerology</option>
              <option value="Vastu">Vastu</option>
            </select>

            <select 
              className="flex-1 bg-[#faf8f5] border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c49b63] text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">All Languages</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Marathi">Marathi</option>
              <option value="Gujarati">Gujarati</option>
            </select>

            <select 
              className="flex-1 bg-[#faf8f5] border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c49b63] text-sm"
              value={maxCharge}
              onChange={(e) => setMaxCharge(e.target.value)}
            >
              <option value="">Any Budget</option>
              <option value="15">Under ₹15/min</option>
              <option value="30">Under ₹30/min</option>
              <option value="50">Under ₹50/min</option>
            </select>
          </div>
        </div>
      </div>

      {/* Waiting Modal */}
      {waitingCall && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
            <Loader2 size={48} className="animate-spin text-[#c49b63] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Calling Astrologer...</h2>
            <p className="text-gray-500">Please wait while the astrologer accepts your request. Do not close this window.</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-[#f0ece6] p-6 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">{error}</p>
            <button 
              onClick={fetchAstrologers}
              className="mt-4 px-6 py-2 bg-[#1c1c1c] text-white rounded-md hover:bg-black transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : astrologers.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl border border-[#f0ece6] shadow-sm">
            <Star size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-cinzel font-bold text-gray-800 mb-2">No Astrologers Available</h3>
            <p className="text-gray-500">All our astrologers are currently busy or offline. Please check back shortly.</p>
          </div>
        ) : (
          /* Astrologers Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {astrologers.map((astro) => (
              <div key={astro._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#f0ece6] overflow-hidden group">
                
                {/* Status Badge */}
                {astro.availability === 'online' ? (
                  <div className="absolute mt-4 ml-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center space-x-1 z-10 shadow-md">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span>Online</span>
                  </div>
                ) : (
                  <div className="absolute mt-4 ml-4 px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full flex items-center space-x-1 z-10 shadow-md">
                    <span className="w-2 h-2 bg-gray-200 rounded-full"></span>
                    <span>Offline</span>
                  </div>
                )}

                <div className="p-6">
                  <Link to={`/astrologer/${astro._id}`} className="flex items-start space-x-4 mb-5 group-hover:opacity-90 transition-opacity block">
                    {/* Profile Picture */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full p-1 border-2 border-[#c49b63] bg-white group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={getImageUrl(astro.profilePic)} 
                          alt={astro.name} 
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Astro&background=c49b63&color=fff' }}
                        />
                      </div>
                    </div>
                    
                    {/* Basic Info */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl font-bold text-[#1c1c1c] truncate">{astro.name}</h3>
                      <p className="text-[#c49b63] text-sm font-medium mb-1 truncate">
                        {astro.expertise?.join(', ') || 'Vedic Astrologer'}
                      </p>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={14} className="fill-[#c49b63] text-[#c49b63]" />
                        ))}
                      </div>
                    </div>
                  </Link>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-6 bg-[#faf8f5] p-4 rounded-xl border border-[#f0ece6]">
                    <div className="flex items-center space-x-2">
                      <Languages size={16} className="text-[#c49b63]" />
                      <span className="truncate">{astro.languages?.slice(0,2).join(', ') || 'Hindi'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award size={16} className="text-[#c49b63]" />
                      <span>Exp: {astro.experience || 0} Years</span>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <IndianRupee size={16} className="text-[#c49b63]" />
                      <span className="font-semibold text-gray-900">
                        ₹{astro.pricing?.chatRate || 0}/min
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <button 
                      onClick={(e) => { e.preventDefault(); handleInitiate(astro._id, 'chat'); }}
                      disabled={astro.availability !== 'online'}
                      className={`flex items-center justify-center space-x-1 py-2 text-xs md:text-sm rounded-lg font-semibold transition-colors duration-300 shadow-sm ${astro.availability === 'online' ? 'bg-[#1c1c1c] text-white hover:bg-black' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      <MessageCircle size={16} />
                      <span className="hidden sm:inline">{astro.availability === 'online' ? 'Chat' : 'Offline'}</span>
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); handleInitiate(astro._id, 'audio'); }}
                      disabled={astro.availability !== 'online'}
                      className={`flex items-center justify-center space-x-1 py-2 text-xs md:text-sm border rounded-lg font-semibold transition-colors duration-300 ${astro.availability === 'online' ? 'border-[#c49b63] text-[#c49b63] hover:bg-[#faf8f5]' : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'}`}
                    >
                      <Phone size={16} />
                      <span className="hidden sm:inline">{astro.availability === 'online' ? 'Call' : 'Offline'}</span>
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); handleInitiate(astro._id, 'video'); }}
                      disabled={astro.availability !== 'online'}
                      className={`flex items-center justify-center space-x-1 py-2 text-xs md:text-sm border rounded-lg font-semibold transition-colors duration-300 ${astro.availability === 'online' ? 'border-gray-200 text-blue-600 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'}`}
                    >
                      <Video size={16} />
                      <span className="hidden sm:inline">{astro.availability === 'online' ? 'Video' : 'Offline'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AstrologersList;
