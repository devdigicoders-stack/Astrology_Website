import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MessageCircle, Phone, Video, Languages, Award, IndianRupee, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';

const AstrologerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [astrologer, setAstrologer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const BACKEND_URL = API_URL.replace('/api', '');

  useEffect(() => {
    fetchAstrologerDetails();
  }, [id]);

  const fetchAstrologerDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/astrologer/public/${id}`);
      const data = await response.json();

      if (data.success) {
        setAstrologer(data.astrologer);
      } else {
        setError(data.message || 'Failed to load astrologer details.');
      }
    } catch (err) {
      console.error('Error fetching astrologer:', err);
      setError('Network error. Unable to connect to servers.');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (filename) => {
    if (!filename) return 'https://ui-avatars.com/api/?name=Astro&background=c49b63&color=fff';
    if (filename.startsWith('http')) return filename;
    return `${BACKEND_URL}/uploads/${filename}`;
  };

  const handleInitiate = async (type) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Please login first to connect with astrologers!");
      return;
    }

    try {
      // type passed from buttons is 'Chat', 'Audio Call', 'Video Call'. Map it to api types:
      const apiType = type === 'Chat' ? 'chat' : type === 'Audio Call' ? 'audio' : 'video';

      const response = await fetch(`${API_URL}/api/calls/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ astrologerId: id, type: apiType })
      });

      const data = await response.json();

      if (data.success) {
        alert(`Successfully initiated ${type}! Waiting for Astrologer to accept...`);
      } else {
        alert(`Failed: ${data.message}`);
      }
    } catch (err) {
      console.error('Initiate error:', err);
      alert('Network error while trying to connect.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfaf5] pt-24 pb-16 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (error || !astrologer) {
    return (
      <div className="min-h-screen bg-[#fdfaf5] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Astrologer not found'}</p>
          <button
            onClick={() => navigate('/astrologers')}
            className="px-6 py-2 bg-[#1c1c1c] text-white rounded-lg hover:bg-black transition-colors"
          >
            Back to Astrologers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfaf5] min-h-screen pt-24 pb-16 font-inter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate('/astrologers')}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#c49b63] transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to List</span>
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-[#f0ece6] overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-[#1c1c1c] to-[#3a3a3a] relative">
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span>Online</span>
            </div>
          </div>

          <div className="px-6 md:px-10 pb-10">
            {/* Profile Image & Basic Info */}
            <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-8 gap-6">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white relative shrink-0">
                <img
                  src={getImageUrl(astrologer.profilePic)}
                  alt={astrologer.name}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Astro&background=c49b63&color=fff' }}
                />
                {astrologer.isVerified && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white" title="Verified Astrologer">
                    <ShieldCheck size={16} />
                  </div>
                )}
              </div>

              <div className="flex-1 pb-2">
                <h1 className="text-3xl font-extrabold text-[#1c1c1c] font-cinzel">{astrologer.name}</h1>
                <p className="text-[#c49b63] font-medium text-lg mt-1">
                  {astrologer.expertise?.join(', ') || 'Vedic Astrologer'}
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-[#c49b63] text-[#c49b63]" />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">(4.9/5 - 120+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-[#faf8f5] p-6 rounded-2xl border border-[#f0ece6]">
              <div className="flex flex-col items-center justify-center p-3 text-center">
                <Award size={24} className="text-[#c49b63] mb-2" />
                <span className="text-sm text-gray-500">Experience</span>
                <span className="font-semibold text-gray-900">{astrologer.experience || 0} Years</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center border-l border-[#f0ece6]">
                <Languages size={24} className="text-[#c49b63] mb-2" />
                <span className="text-sm text-gray-500">Languages</span>
                <span className="font-semibold text-gray-900 truncate w-full">{astrologer.languages?.join(', ') || 'Hindi, English'}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center md:border-l border-[#f0ece6]">
                <Clock size={24} className="text-[#c49b63] mb-2" />
                <span className="text-sm text-gray-500">Response Time</span>
                <span className="font-semibold text-gray-900">~2 Mins</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center border-l border-[#f0ece6]">
                <IndianRupee size={24} className="text-[#c49b63] mb-2" />
                <span className="text-sm text-gray-500">Chat Rate</span>
                <span className="font-semibold text-gray-900">₹{astrologer.pricing?.chatRate || 0}/min</span>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Left Column: About */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1c1c1c] font-cinzel mb-3 flex items-center">
                    About {astrologer.name}
                  </h3>
                  <div className="text-gray-600 leading-relaxed bg-[#faf8f5] p-5 rounded-xl border border-[#f0ece6]">
                    {astrologer.about ? (
                      <p className="whitespace-pre-wrap">{astrologer.about}</p>
                    ) : (
                      <p>
                        {astrologer.name} is a highly experienced astrologer specializing in {astrologer.expertise?.join(', ')}.
                        With a deep understanding of cosmic energies, {astrologer.name} has guided thousands of individuals
                        through their life's challenges regarding career, love, marriage, and personal growth.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Action Buttons */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-2xl border-2 border-[#c49b63] p-5 shadow-lg sticky top-24">
                  <h3 className="font-bold text-center text-lg text-[#1c1c1c] mb-4">Connect Now</h3>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleInitiate('Chat')}
                      disabled={astrologer.availability !== 'online'}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group shadow-md ${astrologer.availability === 'online' ? 'bg-[#1c1c1c] text-white hover:bg-black' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <MessageCircle size={20} className={astrologer.availability === 'online' ? "group-hover:scale-110 transition-transform" : ""} />
                        <span className="font-semibold">{astrologer.availability === 'online' ? 'Chat' : 'Offline'}</span>
                      </div>
                      <span className="text-sm">₹{astrologer.pricing?.chatRate || 0}/min</span>
                    </button>

                    <button
                      onClick={() => handleInitiate('Audio Call')}
                      disabled={astrologer.availability !== 'online'}
                      className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all group ${astrologer.availability === 'online' ? 'border-[#c49b63] text-[#1c1c1c] hover:bg-[#faf8f5]' : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Phone size={20} className={astrologer.availability === 'online' ? "text-[#c49b63] group-hover:scale-110 transition-transform" : "text-gray-400"} />
                        <span className="font-semibold">{astrologer.availability === 'online' ? 'Audio Call' : 'Offline'}</span>
                      </div>
                      <span className="text-sm font-medium">₹{astrologer.pricing?.audioCallRate || (astrologer.pricing?.chatRate || 0) + 5}/min</span>
                    </button>

                    <button
                      onClick={() => handleInitiate('Video Call')}
                      disabled={astrologer.availability !== 'online'}
                      className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all group ${astrologer.availability === 'online' ? 'border-gray-200 text-[#1c1c1c] hover:bg-gray-50' : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Video size={20} className={astrologer.availability === 'online' ? "text-blue-500 group-hover:scale-110 transition-transform" : "text-gray-400"} />
                        <span className="font-semibold">{astrologer.availability === 'online' ? 'Video Call' : 'Offline'}</span>
                      </div>
                      <span className="text-sm font-medium">₹{astrologer.pricing?.videoCallRate || (astrologer.pricing?.chatRate || 0) + 10}/min</span>
                    </button>
                  </div>

                  <p className="text-xs text-center text-gray-400 mt-4">
                    100% Secure & Confidential
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstrologerProfile;
