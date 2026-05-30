import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  // State for the multi-step form
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Registration
  
  // Form fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  
  // Loading & Error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });
      const data = await res.json();
      
      if (data.success) {
        setMessage('OTP has been sent to your phone number.');
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp })
      });
      const data = await res.json();
      
      if (data.success) {
        // Login successful
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else if (data.needDetails) {
        // New user registration flow
        setMessage('Please provide your details to complete registration.');
        setStep(3);
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email) {
      setError('Name and Email are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber, 
          otp, 
          name, 
          email,
          gender,
          dateOfBirth,
          timeOfBirth,
          placeOfBirth
        })
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter flex-1">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-cinzel">
          TAROTI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 1 && "Sign in or create a new account"}
          {step === 2 && "Enter the OTP sent to your phone"}
          {step === 3 && "Complete your profile"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#f0ece6]">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {message && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm text-green-700">{message}</p>
            </div>
          )}

          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSendOTP}>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="flex-1 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 focus:ring-[#c49b63] focus:border-[#c49b63] p-2 border"
                    placeholder="Enter your 10-digit number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    disabled={loading}
                    maxLength="10"
                    minLength="10"
                    pattern="[0-9]{10}"
                    title="Please enter exactly 10 digits"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || phoneNumber.length !== 10}
                  className="w-full flex justify-center py-2.5 border border-transparent rounded-none shadow-sm text-sm font-semibold text-white bg-[#c49b63] hover:bg-[#b59055] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c49b63] disabled:opacity-70 tracking-wider uppercase transition-all duration-300"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleVerifyOTP}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  One Time Password (OTP)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#c49b63] focus:border-[#c49b63] sm:text-sm"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button type="button" onClick={() => setStep(1)} className="font-medium text-[#c49b63] hover:text-[#b59055]">
                    Change phone number
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || otp.length < 4}
                  className="w-full flex justify-center py-2.5 border border-transparent rounded-none shadow-sm text-sm font-semibold text-white bg-[#c49b63] hover:bg-[#b59055] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c49b63] disabled:opacity-70 tracking-wider uppercase transition-all duration-300"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="space-y-6" onSubmit={handleCompleteRegistration}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#c49b63] focus:border-[#c49b63] sm:text-sm"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#c49b63] focus:border-[#c49b63] sm:text-sm"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    name="gender"
                    id="gender"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#c49b63] focus:border-[#c49b63] sm:text-sm"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={loading}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#c49b63] focus:border-[#c49b63] sm:text-sm text-gray-700"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="timeOfBirth" className="block text-sm font-medium text-gray-700">
                    Time of Birth
                  </label>
                  <div className="mt-1">
                    <input
                      type="time"
                      name="timeOfBirth"
                      id="timeOfBirth"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#c49b63] focus:border-[#c49b63] sm:text-sm text-gray-700"
                      value={timeOfBirth}
                      onChange={(e) => setTimeOfBirth(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="placeOfBirth" className="block text-sm font-medium text-gray-700">
                  Place of Birth
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="placeOfBirth"
                    id="placeOfBirth"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#c49b63] focus:border-[#c49b63] sm:text-sm"
                    placeholder="City, State"
                    value={placeOfBirth}
                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || !name || !email}
                  className="w-full flex justify-center py-2.5 border border-transparent rounded-none shadow-sm text-sm font-semibold text-white bg-[#c49b63] hover:bg-[#b59055] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c49b63] disabled:opacity-70 tracking-wider uppercase transition-all duration-300"
                >
                  {loading ? 'Completing...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
