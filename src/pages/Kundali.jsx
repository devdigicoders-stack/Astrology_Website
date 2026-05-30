import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Kundali = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    lat: '',
    lon: '',
    city: '',
  });

  const [loading, setLoading] = useState(false);
  const [kundaliData, setKundaliData] = useState(null);
  const [kundaliRate, setKundaliRate] = useState(null);
  const [error, setError] = useState('');
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [activePlanet, setActivePlanet] = useState('Sun');
  const [downloadLoading, setDownloadLoading] = useState(false);
  const cityInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();

  // Load Google Maps Script dynamically
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key missing in .env');
      return;
    }

    // If google maps already loaded (e.g., hot reload), mark as ready
    if (window.google && window.google.maps && window.google.maps.places) {
      setMapsLoaded(true);
      return;
    }

    // If script tag already exists, wait for it to finish
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.onload = () => setMapsLoaded(true);
      return;
    }

    // Otherwise, create and inject the script
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapsLoaded(true);
    script.onerror = () => console.error('Google Maps script failed to load');
    document.head.appendChild(script);
  }, []);

  // Fetch Kundali Rate
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${backendUrl}/api/kundali/rate`);
        const data = await response.json();
        if (data.success) {
          setKundaliRate(data.kundaliRate);
        }
      } catch (err) {
        console.error("Failed to fetch kundali rate");
      }
    };
    fetchRate();
  }, []);


  // Initialize Autocomplete after Maps loads
  useEffect(() => {
    if (!mapsLoaded || !cityInputRef.current) return;
    if (autocompleteRef.current) return; // Already initialized

    // Safety guard — ensure google.maps.places is truly available
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
    setKundaliData(null);

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
      setError('Kundali banane ke liye aapko login karna hoga.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (kundaliRate !== null) {
      const result = await Swal.fire({
        title: 'Payment Confirmation',
        text: `Kundali banane ke liye aapke wallet se ₹${kundaliRate} kat jayenge. Kya aap confirm karte hain?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c49b63',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Haan, Kundali Banao',
        cancelButtonText: 'Cancel',
        background: '#fff',
        color: '#1c1c1c'
      });

      if (!result.isConfirmed) {
        return; // User canceled
      }
    }

    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/kundali/generate`, {
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
        }),
      });

      const data = await response.json();
      if (response.status === 402) {
        // Insufficient balance
        setError(`Aapke wallet mein balance kam hai. Kundali ka charge ₹${data.required} hai, par aapke paas ₹${data.currentBalance} hain. Kripaya recharge karein.`);
        return;
      }

      if (data.success) {
        setKundaliData(data.data);
        setTimeout(() => {
          document.getElementById('kundali-result')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError(data.message || 'Kundali generate nahi ho payi. Dobara try karo.');
      }
    } catch (err) {
      setError('Server se connection fail hua. Ensure karo ki backend chal raha hai.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    const token = localStorage.getItem('token');
    if (!token || !kundaliData) return;
    setDownloadLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const userRaw = localStorage.getItem('user');
      const userObj = userRaw ? JSON.parse(userRaw) : {};

      const response = await fetch(`${backendUrl}/api/kundali/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          birthDetails: kundaliData.birthDetails,
          planets: kundaliData.planets,
          predictions: kundaliData.predictions || [],
          userInfo: {
            name: userObj.name || 'User',
            dob: formData.date,
            tob: formData.time,
            city: formData.city || ''
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        Swal.fire({ icon: 'error', title: 'Download Failed', text: errData.message || 'PDF generate nahi ho saka.', confirmButtonColor: '#c49b63' });
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const userName = userObj.name ? userObj.name.replace(/\s+/g, '_') : 'User';
      a.download = `Kundali_${userName}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      Swal.fire({
        icon: 'success',
        title: '📄 Kundali Downloaded!',
        text: 'Aapki Kundali PDF safaltapoorvak download ho gayi!',
        confirmButtonColor: '#c49b63',
        timer: 3000,
        timerProgressBar: true
      });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'PDF download fail hua. Please try again.', confirmButtonColor: '#c49b63' });
    } finally {
      setDownloadLoading(false);
    }
  };

  const getPlanetEmoji = (name) => {
    const emojis = { Sun: '☀️', Moon: '🌙', Mars: '♂️', Mercury: '☿', Jupiter: '♃', Venus: '♀️', Saturn: '♄', Rahu: '☊', Ketu: '☋' };
    return emojis[name] || '⭐';
  };

  const getRashiNumber = (signName) => {
    if (!signName) return 1;
    const signs = [
      'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ];
    const hindiSigns = [
      'mesh', 'vrish', 'mithun', 'kark', 'sinh', 'kanya',
      'tula', 'vrishchik', 'dhanu', 'makar', 'kumbh', 'meen'
    ];
    const name = signName.toLowerCase().trim();
    let index = signs.indexOf(name);
    if (index === -1) {
      index = hindiSigns.indexOf(name);
    }
    return index !== -1 ? index + 1 : 1;
  };

  const getPlanetHindiAbbreviation = (name) => {
    const mappingHindi = {
      'Sun': 'सू',
      'Moon': 'चं',
      'Mars': 'मं',
      'Mercury': 'बु',
      'Jupiter': 'गु',
      'Venus': 'शु',
      'Saturn': 'श',
      'Rahu': 'रा',
      'Ketu': 'के',
      'Ascendant': 'ल',
    };
    return mappingHindi[name] || name.substring(0, 2);
  };

  const housePositions = {
    1: { rashi: { x: 200, y: 55 }, planets: { x: 200, y: 110 } },
    2: { rashi: { x: 130, y: 40 }, planets: { x: 90, y: 70 } },
    3: { rashi: { x: 40, y: 130 }, planets: { x: 70, y: 90 } },
    4: { rashi: { x: 55, y: 205 }, planets: { x: 115, y: 205 } },
    5: { rashi: { x: 40, y: 275 }, planets: { x: 70, y: 310 } },
    6: { rashi: { x: 130, y: 365 }, planets: { x: 90, y: 335 } },
    7: { rashi: { x: 200, y: 350 }, planets: { x: 200, y: 295 } },
    8: { rashi: { x: 270, y: 365 }, planets: { x: 310, y: 335 } },
    9: { rashi: { x: 360, y: 275 }, planets: { x: 330, y: 310 } },
    10: { rashi: { x: 345, y: 205 }, planets: { x: 285, y: 205 } },
    11: { rashi: { x: 360, y: 130 }, planets: { x: 330, y: 90 } },
    12: { rashi: { x: 270, y: 40 }, planets: { x: 310, y: 70 } },
  };

  const getChartDetails = () => {
    if (!kundaliData || !kundaliData.planets) return { rashiMap: {}, planetsMap: {} };

    const ascendantPlanet = kundaliData.planets.find(p => p.name === 'Ascendant');
    const lagnaSignName = ascendantPlanet ? ascendantPlanet.sign : 'Aries';
    const lagnaRashiNo = getRashiNumber(lagnaSignName);

    const rashiMap = {};
    const planetsMap = {
      1: ['ल'],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    };

    // Fill Rashi Numbers for each house
    for (let h = 1; h <= 12; h++) {
      rashiMap[h] = ((lagnaRashiNo - 1 + h - 1) % 12) + 1;
    }

    // Fill Planet Abbreviations for each house
    const chartPlanets = kundaliData.planets.filter(p => p.name !== 'Ascendant');
    chartPlanets.forEach(p => {
      const houseNo = parseInt(p.house);
      if (houseNo >= 1 && houseNo <= 12) {
        const abbreviation = getPlanetHindiAbbreviation(p.name);
        planetsMap[houseNo].push(abbreviation);
      }
    });

    return { rashiMap, planetsMap };
  };

  const renderPlanetsText = (planetsList, x, y) => {
    if (planetsList.length === 0) return null;
    if (planetsList.length <= 3) {
      return (
        <text
          x={x}
          y={y}
          textAnchor="middle"
          className="fill-red-800 font-bold text-[14px] tracking-wide"
        >
          {planetsList.join(' ')}
        </text>
      );
    } else {
      const line1 = planetsList.slice(0, 3).join(' ');
      const line2 = planetsList.slice(3).join(' ');
      return (
        <>
          <text
            x={x}
            y={y - 8}
            textAnchor="middle"
            className="fill-red-800 font-bold text-[12px] tracking-normal"
          >
            {line1}
          </text>
          <text
            x={x}
            y={y + 8}
            textAnchor="middle"
            className="fill-red-800 font-bold text-[12px] tracking-normal"
          >
            {line2}
          </text>
        </>
      );
    }
  };

  const renderKundaliChart = () => {
    const { rashiMap, planetsMap } = getChartDetails();
    
    return (
      <div className="bg-white rounded-2xl shadow border border-[#f0ece6] overflow-hidden my-8">
        <div className="px-8 py-6 border-b border-[#f0ece6] bg-gradient-to-r from-[#c49b63]/10 to-transparent flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-[#1c1c1c] flex items-center gap-2">
              🔮 Janam Kundali Chakra <span className="text-sm font-sans font-medium text-gray-500">(Lagna Chart)</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">Pandit ji ke dwara banaye gaye shudh Vedic style mein aapka Lagna Kundali chakra</p>
          </div>
        </div>
        
        <div className="p-8 flex flex-col lg:flex-row justify-center items-center gap-8 bg-[#fdfcfa]">
          {/* SVG Chart Container */}
          <div className="relative bg-[#fdfbf7] p-6 rounded-2xl border-2 border-[#c49b63]/30 shadow-inner max-w-full overflow-auto flex justify-center items-center">
            <svg viewBox="0 0 400 400" className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] select-none shadow-md rounded-lg">
              {/* Parchment Background */}
              <rect x="0" y="0" width="400" height="400" fill="#fdfbf7" stroke="#991b1b" strokeWidth="4" rx="8" />
              
              {/* Inner accent border */}
              <rect x="6" y="6" width="388" height="388" fill="none" stroke="#d97706" strokeWidth="1.5" rx="6" opacity="0.6" />
              
              {/* Diagonals */}
              <line x1="0" y1="0" x2="400" y2="400" stroke="#991b1b" strokeWidth="2.5" />
              <line x1="400" y1="0" x2="0" y2="400" stroke="#991b1b" strokeWidth="2.5" />
              
              {/* Diamond */}
              <polygon points="200,0 0,200 200,400 400,200" fill="none" stroke="#991b1b" strokeWidth="2.5" />
              
              {/* Traditional Decorative Corner Accents */}
              <text x="30" y="35" textAnchor="middle" className="fill-[#b45309] font-bold text-[14px] opacity-70">ॐ</text>
              <text x="370" y="35" textAnchor="middle" className="fill-[#b45309] font-bold text-[14px] opacity-70">श्री</text>
              <text x="30" y="375" textAnchor="middle" className="fill-[#b45309] font-bold text-[14px] opacity-70">शुभ</text>
              <text x="370" y="375" textAnchor="middle" className="fill-[#b45309] font-bold text-[14px] opacity-70">लाभ</text>

              {/* Center decorative bindu */}
              <circle cx="200" cy="200" r="4.5" className="fill-[#b45309]" />
              
              {/* Render Houses */}
              {Object.keys(housePositions).map((houseStr) => {
                const houseNo = parseInt(houseStr);
                const rashi = rashiMap[houseNo];
                const planetsList = planetsMap[houseNo] || [];
                const pos = housePositions[houseNo];
                
                return (
                  <g key={houseNo}>
                    {/* Rashi Number */}
                    {rashi && (
                      <text
                        x={pos.rashi.x}
                        y={pos.rashi.y}
                        textAnchor="middle"
                        className="fill-[#b45309] font-semibold text-[13px] select-none"
                      >
                        {rashi}
                      </text>
                    )}
                    {/* Planets */}
                    {renderPlanetsText(planetsList, pos.planets.x, pos.planets.y)}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend and Info */}
          <div className="w-full lg:w-96 space-y-6">
            <div className="bg-white rounded-xl p-5 border border-[#f0ece6] shadow-sm">
              <h4 className="font-semibold text-sm text-[#1c1c1c] border-b border-[#f0ece6] pb-2 mb-3 flex items-center gap-2">
                🕉️ Graha Sanket (Planet Legends)
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">ल</span>
                  <span>Lagna (Ascendant)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">सू</span>
                  <span>Surya (Sun)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">चं</span>
                  <span>Chandra (Moon)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">मं</span>
                  <span>Mangal (Mars)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">बु</span>
                  <span>Budha (Mercury)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">गु</span>
                  <span>Guru (Jupiter)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">शु</span>
                  <span>Shukra (Venus)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">श</span>
                  <span>Shani (Saturn)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">रा</span>
                  <span>Rahu (North Node)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#a82c2c] bg-red-50 w-6 h-6 flex items-center justify-center rounded border border-red-100">के</span>
                  <span>Ketu (South Node)</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-200/50">
              <h4 className="font-semibold text-sm text-[#854d0e] mb-2 flex items-center gap-1.5">
                📜 Pandit ji Vichaar
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                Yeh Janam Kundali chakra aapke janam samay aur janam sthan ke aadhar par aakashiya grahon ki sthiti ko darshata hai. Isme pratham ghar (top-center) aapka vyaktitva aur sharir (Lagna) hai. Graha sthiti ke anusar aapki rashi <span className="font-bold text-amber-900">{kundaliData.planets.find(p => p.name === 'Moon')?.sign || 'N/A'}</span> aur lagna <span className="font-bold text-amber-900">{kundaliData.planets.find(p => p.name === 'Ascendant')?.sign || 'N/A'}</span> hai.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPredictionsSection = () => {
    if (!kundaliData || !kundaliData.predictions) return null;

    const planetsList = [
      { id: 'Sun', name: 'सूर्य (Sun)', emoji: '☀️' },
      { id: 'Moon', name: 'चन्द्र (Moon)', emoji: '🌙' },
      { id: 'Mars', name: 'मंगल (Mars)', emoji: '🔴' },
      { id: 'Mercury', name: 'बुध (Mercury)', emoji: '🟢' },
      { id: 'Jupiter', name: 'गुरु (Jupiter)', emoji: '🟡' },
      { id: 'Venus', name: 'शुक्र (Venus)', emoji: '🌸' },
      { id: 'Saturn', name: 'शनि (Saturn)', emoji: '🪐' },
      { id: 'Rahu', name: 'राहु (Rahu)', emoji: '🌀' },
      { id: 'Ketu', name: 'केतु (Ketu)', emoji: '☄️' },
    ];

    const activePrediction = kundaliData.predictions.find(
      p => p.planet.toLowerCase() === activePlanet.toLowerCase()
    );

    const getPlanetHouseDetails = (planetId) => {
      const planetObj = kundaliData.planets.find(p => p.name === planetId);
      if (!planetObj) return '';
      return `Ghar (House) ${planetObj.house} - ${planetObj.sign} Rashi`;
    };

    return (
      <div className="bg-white rounded-2xl shadow border border-[#f0ece6] overflow-hidden my-8 animate-fade-in">
        <div className="px-8 py-6 border-b border-[#f0ece6] bg-gradient-to-r from-[#c49b63]/10 to-transparent">
          <h3 className="font-cinzel text-xl font-bold text-[#1c1c1c] flex items-center gap-2">
            🔮 Grah Bhavishyafal <span className="text-sm font-sans font-medium text-gray-500">(Planetary Future Predictions)</span>
          </h3>
          <p className="text-xs text-gray-500 mt-1">Aapki janm patrika ke anusaar pratyek grah ka aapke jeevan par prabhav aur bhavishyavani</p>
        </div>

        <div className="p-6 md:p-8 bg-[#fdfcfa]">
          {/* Horizonal scrollable planet tab selectors */}
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide border-b border-gray-100 mb-6">
            {planetsList.map(planet => (
              <button
                key={planet.id}
                onClick={() => setActivePlanet(planet.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all shrink-0 select-none ${
                  activePlanet === planet.id
                    ? 'bg-[#c49b63] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-[#f0ece6] hover:bg-[#faf9f6]'
                }`}
              >
                <span>{planet.emoji}</span>
                <span>{planet.name}</span>
              </button>
            ))}
          </div>

          {/* Prediction Content Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#eaddc9] shadow-sm relative overflow-hidden">
            {/* Background watermarked traditional pattern */}
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none select-none text-[150px] font-bold fill-amber-900 font-sans">
              🕉️
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-[#f0ece6] pb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl bg-amber-50 w-14 h-14 rounded-xl flex items-center justify-center border border-amber-100 shadow-sm">
                  {planetsList.find(p => p.id === activePlanet)?.emoji}
                </span>
                <div>
                  <h4 className="text-lg font-bold text-[#1c1c1c] font-cinzel">
                    {planetsList.find(p => p.id === activePlanet)?.name} Vichaar
                  </h4>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">
                    Grah Stthiti: {getPlanetHouseDetails(activePlanet)}
                  </p>
                </div>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200 uppercase tracking-wider">
                Vedic Prediction
              </span>
            </div>

            {/* Prediction body */}
            <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-4 font-sans select-text pl-4">
              {activePrediction && activePrediction.house_report ? (
                <div 
                  className="prose max-w-none text-gray-700 leading-8 space-y-4 font-sans"
                  dangerouslySetInnerHTML={{ __html: activePrediction.house_report }}
                />
              ) : (
                <p className="text-gray-500 italic text-center py-8">Bhavishyavani loading ho rahi hai ya uplabdh nahi hai...</p>
              )}
            </div>

            {/* Footer Accent */}
            <div className="mt-8 pt-4 border-t border-[#fdf3e7] flex items-center gap-3 text-xs text-gray-500 bg-[#fffdfa] -mx-8 -mb-8 px-8 py-4">
              <span className="text-base">📜</span>
              <span><strong>Note:</strong> Yeh faladesh aadhunik Vedic shashtron ke calculations par aadharit hai. Graha dasha ke anusar isme parivartan sambhav hai.</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] font-inter">

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#1c1c1c] via-[#2a2010] to-[#1c1c1c] py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #c49b63 0%, transparent 50%), radial-gradient(circle at 80% 50%, #c49b63 0%, transparent 50%)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#c49b63] text-sm font-semibold tracking-[0.3em] uppercase mb-3">Vedic Astrology</p>
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-5">
            Free Janam <span className="text-[#c49b63]">Kundali</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Apni janam patrika ke rahasya jaaniye. Apna janam divas, samay aur sthan daalein aur apni poori Kundali paayein.
          </p>
        </div>
        {/* Decorative stars */}
        <span className="absolute top-8 left-12 text-[#c49b63] text-2xl animate-pulse opacity-60">✦</span>
        <span className="absolute bottom-10 right-16 text-[#c49b63] text-xl animate-pulse opacity-40">✦</span>
        <span className="absolute top-16 right-32 text-[#c49b63] text-sm animate-pulse opacity-50">✦</span>
      </div>

      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.07)] border border-[#f0ece6] overflow-hidden mb-14">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#c49b63]/10 to-[#f0ece6]/30 px-8 py-6 border-b border-[#f0ece6]">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-cinzel text-xl font-bold text-[#1c1c1c]">Janam Vivaran Bharein</h2>
                <p className="text-sm text-gray-500 mt-1">Apni janm kundali banane ke liye ye details dein</p>
              </div>
              {kundaliRate !== null && (
                <div className="bg-[#c49b63] text-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-xs uppercase tracking-wider font-semibold block text-white/80">Charge</span>
                  <span className="font-bold text-lg">₹{kundaliRate}</span>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                📅 Janam Divas <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#c49b63] focus:ring-2 focus:ring-[#c49b63]/20 outline-none transition-all text-gray-800"
                required
              />
            </div>

            {/* Time of Birth */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                ⏰ Janam Samay <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#c49b63] focus:ring-2 focus:ring-[#c49b63]/20 outline-none transition-all text-gray-800"
                required
              />
            </div>

            {/* City Search with Google Maps - spans full width */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                📍 Janam Sthan (City) <span className="text-red-500">*</span>
              </label>
              <input
                ref={cityInputRef}
                type="text"
                name="city"
                placeholder={mapsLoaded ? 'City ka naam type karo...' : 'Google Maps load ho rahi hai...'}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#c49b63] focus:ring-2 focus:ring-[#c49b63]/20 outline-none transition-all text-gray-800 placeholder-gray-400"
                disabled={!mapsLoaded}
                readOnly={false}
              />
              {/* Lat/Lon display (readonly) */}
              {formData.lat && formData.lon && (
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-semibold">
                    ✓ Lat: {formData.lat}
                  </span>
                  <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-semibold">
                    ✓ Lon: {formData.lon}
                  </span>
                </div>
              )}
              {!mapsLoaded && (
                <p className="text-xs text-yellow-600 mt-1">⏳ Google Maps load ho rahi hai, kuch seconds wait karo...</p>
              )}
            </div>

            {/* Submit button - spans full width */}
            <div className="md:col-span-2">
              <button
                type="submit"
                id="generate-btn"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#c49b63] to-[#b08040] hover:from-[#b08040] hover:to-[#9a6f38] text-white font-bold text-base tracking-widest uppercase rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Kundali Ban Rahi Hai...
                  </span>
                ) : '🔮 Kundali Banao'}
              </button>
            </div>
          </form>

          {/* Error */}
          {error && (
            <div className="mx-8 mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Result Section */}
        {kundaliData && (
          <div id="kundali-result" className="animate-fade-in space-y-8">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Lagna (Ascendant)', value: kundaliData.planets.find(p => p.name === 'Ascendant')?.sign || 'N/A', icon: '⬆️' },
                { label: 'Rashi (Moon Sign)', value: kundaliData.planets.find(p => p.name === 'Moon')?.sign || 'N/A', icon: '🌙' },
                { label: 'Sun Sign', value: kundaliData.planets.find(p => p.name === 'Sun')?.sign || 'N/A', icon: '☀️' },
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-[#1c1c1c] to-[#2c2c2c] rounded-xl p-6 text-center shadow-lg border border-[#c49b63]/20">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-[#c49b63] text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-white text-xl font-bold font-cinzel">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Birth Details Card */}
            <div className="bg-white rounded-2xl shadow border border-[#f0ece6] p-8">
              <h3 className="font-cinzel text-xl font-bold text-[#1c1c1c] mb-5">📋 Janam Vivaran</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {[
                  { label: 'Sunrise', value: kundaliData.birthDetails.sunrise },
                  { label: 'Sunset', value: kundaliData.birthDetails.sunset },
                  { label: 'Ayanamsha', value: kundaliData.birthDetails.ayanamsha?.toFixed(4) },
                  { label: 'Timezone', value: `+${kundaliData.birthDetails.timezone}` },
                ].map((item, i) => (
                  <div key={i} className="bg-[#faf9f6] rounded-lg p-4 border border-[#f0ece6] text-center">
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="text-[#1c1c1c] font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kundali Chart */}
            {renderKundaliChart()}

            {/* Planet Predictions */}
            {renderPredictionsSection()}

            {/* Planets Table */}
            <div className="bg-white rounded-2xl shadow border border-[#f0ece6] overflow-hidden">
              <div className="px-8 py-6 border-b border-[#f0ece6] bg-gradient-to-r from-[#c49b63]/10 to-transparent">
                <h3 className="font-cinzel text-xl font-bold text-[#1c1c1c]">🪐 Graha Sthiti (Planetary Positions)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-[#faf9f6] text-gray-600 border-b border-[#f0ece6]">
                    <tr>
                      <th className="px-6 py-4">Graha</th>
                      <th className="px-6 py-4">Rashi (Sign)</th>
                      <th className="px-6 py-4">Rashi Swami</th>
                      <th className="px-6 py-4">Nakshatra</th>
                      <th className="px-6 py-4">Paad</th>
                      <th className="px-6 py-4">Bhava (House)</th>
                      <th className="px-6 py-4">Awastha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kundaliData.planets.filter(p => p.name !== 'Ascendant').map((planet, index) => (
                      <tr key={index} className={`border-b border-[#f0ece6] hover:bg-[#faf9f6] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#fdfcfa]'}`}>
                        <td className="px-6 py-4 font-semibold text-[#1c1c1c] whitespace-nowrap">
                          {getPlanetEmoji(planet.name)} {planet.name}
                          {(planet.isRetro === 'true' || planet.isRetro === true) && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-normal">Vakri</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{planet.sign}</td>
                        <td className="px-6 py-4 text-gray-700">{planet.signLord}</td>
                        <td className="px-6 py-4 text-gray-700">{planet.nakshatra}</td>
                        <td className="px-6 py-4 text-gray-700 text-center">{planet.nakshatra_pad}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-[#c49b63]/10 text-[#c49b63] border border-[#c49b63]/30 px-3 py-1 rounded-full font-bold text-xs">
                            {planet.house}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-xs">{planet.planet_awastha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#1c1c1c] to-[#2c2c2c] rounded-2xl p-8 text-center shadow-xl">
              <h3 className="font-cinzel text-2xl font-bold text-white mb-3">Aur Gehri Jaankari Chahiye?</h3>
              <p className="text-gray-400 mb-6">Hamare expert Jyotishi se baat karein aur apni Kundali ki puri vyakhya paayein.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handleDownload}
                  disabled={downloadLoading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1c1c1c] hover:bg-gray-100 font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {downloadLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-[#c49b63]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      PDF Ban Rahi Hai...
                    </>
                  ) : (
                    <>📥 Kundali Download Karo</>
                  )}
                </button>
                <a
                  href="/astrologers"
                  className="inline-block px-8 py-3.5 bg-[#c49b63] hover:bg-[#b08040] text-white font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Astrologer Se Milein ✨
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kundali;
