import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Calendar, Clock, MapPin, Search } from 'lucide-react';

const Horoscope = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    lat: '',
    lon: '',
    city: '',
  });

  const [loading, setLoading] = useState(false);
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' or 'weekly'
  const [rates, setRates] = useState({ daily: null, weekly: null });
  const [error, setError] = useState('');
  const [mapsLoaded, setMapsLoaded] = useState(false);
  
  const cityInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();

  // Load Google Maps Script
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key missing in .env');
      return;
    }

    if (window.google && window.google.maps && window.google.maps.places) {
      setMapsLoaded(true);
      return;
    }

    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.onload = () => setMapsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapsLoaded(true);
    script.onerror = () => console.error('Google Maps script failed to load');
    document.head.appendChild(script);
  }, []);

  // Fetch Rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${backendUrl}/api/horoscope/rates`);
        const data = await response.json();
        if (data.success) {
          setRates({ daily: data.dailyRate, weekly: data.weeklyRate });
        }
      } catch (err) {
        console.error("Failed to fetch horoscope rates");
      }
    };
    fetchRates();
  }, []);

  // Initialize Autocomplete
  useEffect(() => {
    if (!mapsLoaded || !cityInputRef.current) return;
    if (autocompleteRef.current) return;

    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error('Google Maps Places not available yet.');
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(cityInputRef.current, {
      types: ['geocode'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const lat = place.geometry.location.lat().toFixed(4);
      const lon = place.geometry.location.lng().toFixed(4);

      setFormData(prev => ({
        ...prev,
        city: place.formatted_address || place.name,
        lat: lat,
        lon: lon,
      }));
    });

    autocompleteRef.current = autocomplete;
  }, [mapsLoaded]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setHoroscopeData(null);

    if (!formData.date || !formData.time) {
      setError('Kripaya Date aur Time of Birth bharo.');
      return;
    }
    if (!formData.lat || !formData.lon) {
      setError('Kripaya apna Janam Sthan (City) select karo dropdown se.');
      return;
    }

    const [year, month, day] = formData.date.split('-');
    const [hour, min] = formData.time.split(':');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Horoscope dekhne ke liye aapko login karna hoga.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const currentRate = activeTab === 'daily' ? rates.daily : rates.weekly;
    const typeText = activeTab === 'daily' ? 'Daily' : 'Weekly';

    if (currentRate !== null) {
      const result = await Swal.fire({
        title: 'Payment Confirmation',
        text: `${typeText} Horoscope dekhne ke liye aapke wallet se ₹${currentRate} kat jayenge. Kya aap confirm karte hain?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c49b63',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Haan, Dekho',
        cancelButtonText: 'Cancel',
        background: '#fff',
        color: '#1c1c1c'
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const endpoint = '/api/horoscope/fetch';

      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          day: parseInt(day),
          month: parseInt(month),
          year: parseInt(year),
          hour: parseInt(hour),
          min: parseInt(min),
          lat: parseFloat(formData.lat),
          lon: parseFloat(formData.lon),
          tzone: 5.5,
          type: activeTab,  // "daily" or "weekly"
        }),
      });

      const data = await response.json();
      if (response.status === 402) {
        setError(`Aapke wallet mein balance kam hai. Charge ₹${data.required} hai, par aapke paas ₹${data.currentBalance} hain. Kripaya recharge karein.`);
        return;
      }

      if (data.success) {
        setHoroscopeData(data.data);
        // Refresh header user data to update wallet
        window.dispatchEvent(new Event('walletUpdated'));
        setTimeout(() => {
          document.getElementById('horoscope-result')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError(data.message || 'Horoscope generate nahi ho paya. Dobara try karo.');
      }
    } catch (err) {
      setError('Server se connection fail hua. Ensure karo ki backend chal raha hai.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] text-[#1c1c1c] font-sans pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1532968961962-810cb2552611?auto=format&fit=crop&q=80" alt="Horoscope Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#c49b63] mb-4 drop-shadow-lg">
            Personalized Horoscope
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
            Apni Janam Kundali ke grahon ke aadhar par apna Daily aur Weekly rashifal jaaniye.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-md inline-flex">
              <button 
                onClick={() => { setActiveTab('daily'); setHoroscopeData(null); }}
                className={`px-8 py-3 rounded-full font-medium transition-colors ${activeTab === 'daily' ? 'bg-[#c49b63] text-white' : 'text-gray-600 hover:text-[#c49b63]'}`}
              >
                Daily Horoscope {rates.daily !== null && <span className="ml-2 text-xs opacity-80">(₹{rates.daily})</span>}
              </button>
              <button 
                onClick={() => { setActiveTab('weekly'); setHoroscopeData(null); }}
                className={`px-8 py-3 rounded-full font-medium transition-colors ${activeTab === 'weekly' ? 'bg-[#c49b63] text-white' : 'text-gray-600 hover:text-[#c49b63]'}`}
              >
                Weekly Horoscope {rates.weekly !== null && <span className="ml-2 text-xs opacity-80">(₹{rates.weekly})</span>}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif text-[#1c1c1c] mb-2">Apni Details Darj Karein</h2>
                <p className="text-gray-500">Sateek rashifal ke liye sahi janam samay aur sthan zaroori hai.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md flex items-center gap-3">
                  <div className="p-1 bg-red-100 rounded-full">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#c49b63]" /> Date of Birth
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c49b63] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#c49b63]" /> Time of Birth
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c49b63] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#c49b63]" /> Place of Birth (City)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      ref={cityInputRef}
                      placeholder="Search your birth city..."
                      defaultValue={formData.city}
                      className="w-full px-4 py-3 pl-11 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c49b63] focus:border-transparent transition-all"
                      required
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#c49b63] hover:bg-[#b08953] text-white rounded-xl font-medium text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-[#c49b63]/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>Get {activeTab === 'daily' ? 'Daily' : 'Weekly'} Horoscope</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Result Section */}
      {horoscopeData && (
        <section id="horoscope-result" className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-10 text-[#c49b63]">Aapka {activeTab === 'daily' ? 'Daily' : 'Weekly'} Rashifal</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {/* Note: Adjust rendering based on exact AstrologyAPI response structure */}
              <div className="prose max-w-none text-gray-700">
                {Object.keys(horoscopeData).length > 0 ? (
                  Object.entries(horoscopeData).map(([key, value]) => {
                    // Ignore simple primitive keys if we want to show only main predictions
                    if (typeof value === 'string' || typeof value === 'number') {
                      if (key === 'prediction' || key === 'bot_response' || key.includes('prediction')) {
                        return (
                          <div key={key} className="mb-6">
                            <h3 className="text-xl font-bold capitalize mb-2 text-gray-900">{key.replace(/_/g, ' ')}</h3>
                            <p className="leading-relaxed whitespace-pre-wrap">{value}</p>
                          </div>
                        )
                      }
                      return null;
                    }
                    if (typeof value === 'object' && value !== null) {
                      return (
                         <div key={key} className="mb-6">
                            <h3 className="text-xl font-bold capitalize mb-2 text-gray-900 border-b pb-2">{key.replace(/_/g, ' ')}</h3>
                            <div className="space-y-3 mt-4">
                              {Object.entries(value).map(([subKey, subVal]) => (
                                <div key={subKey}>
                                  <span className="font-semibold capitalize">{subKey.replace(/_/g, ' ')}:</span> 
                                  <span className="ml-2">{typeof subVal === 'string' || typeof subVal === 'number' ? subVal : JSON.stringify(subVal)}</span>
                                </div>
                              ))}
                            </div>
                         </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <p>Data nahi mila.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Horoscope;
