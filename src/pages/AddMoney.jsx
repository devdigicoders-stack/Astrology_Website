import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddMoney = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Wallet recharge karne ke liye aapko login karna hoga.',
        confirmButtonColor: '#c49b63'
      }).then(() => {
        navigate('/login');
      });
    }
  }, [token, navigate]);

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRecharge = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Kripaya ek valid amount chunein.', confirmButtonColor: '#c49b63' });
      return;
    }

    setLoading(true);

    try {
      // 1. Load the script
      const res = await loadRazorpayScript();
      if (!res) {
        Swal.fire({ icon: 'error', title: 'Connection Error', text: 'Razorpay SDK load nahi ho saka. Apni internet connection check karein.', confirmButtonColor: '#c49b63' });
        setLoading(false);
        return;
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

      // 2. Create Order on Backend
      const orderResponse = await fetch(`${backendUrl}/api/payments/create-recharge-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: Number(amount) })
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        Swal.fire({ icon: 'error', title: 'Error', text: orderData.message || 'Order create nahi ho saka.', confirmButtonColor: '#c49b63' });
        setLoading(false);
        return;
      }

      // 3. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Taroti Astrology',
        description: 'Wallet Recharge',
        order_id: orderData.order.id,
        handler: async function (response) {
          // 4. Verify payment on Backend
          try {
            const verifyResponse = await fetch(`${backendUrl}/api/payments/verify-recharge`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: Number(amount)
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok && verifyData.success) {
              Swal.fire({
                icon: 'success',
                title: 'Recharge Successful!',
                text: `Aapke wallet mein ₹${amount} add ho gaye hain. Naya Balance: ₹${verifyData.newBalance}`,
                confirmButtonColor: '#c49b63'
              });
              setAmount('');
            } else {
              Swal.fire({ icon: 'error', title: 'Verification Failed', text: verifyData.message || 'Payment verify nahi ho saki.', confirmButtonColor: '#c49b63' });
            }
          } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Server se connect nahi ho saka.', confirmButtonColor: '#c49b63' });
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phoneNumber || ''
        },
        theme: {
          color: '#c49b63'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        Swal.fire({ icon: 'error', title: 'Payment Failed', text: response.error.description, confirmButtonColor: '#c49b63' });
      });
      paymentObject.open();

    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Kuch galat ho gaya. Dobara try karein.', confirmButtonColor: '#c49b63' });
    } finally {
      setLoading(false);
    }
  };

  const presetAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-[#faf9f6] py-16 px-4 font-inter">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.07)] border border-[#f0ece6] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#c49b63]/10 to-[#f0ece6]/30 px-8 py-8 border-b border-[#f0ece6] text-center">
          <h2 className="font-cinzel text-3xl font-bold text-[#1c1c1c] mb-2">Recharge Wallet</h2>
          <p className="text-sm text-gray-500">Apne Taroti wallet mein paise add karein aur seamless astrology services ka anand lein.</p>
        </div>

        {/* Body */}
        <div className="p-8">
          <form onSubmit={handleRecharge}>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Kitna amount add karna chahte hain?
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[#c49b63] focus:ring-2 focus:ring-[#c49b63]/20 outline-none transition-all text-gray-800 text-lg font-semibold"
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Select</p>
              <div className="flex flex-wrap gap-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`px-4 py-2 rounded-lg border font-semibold transition-all ${
                      Number(amount) === amt
                        ? 'bg-[#c49b63] text-white border-[#c49b63]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#c49b63] hover:text-[#c49b63]'
                    }`}
                  >
                    + ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#1c1c1c] to-[#2a2a2a] hover:from-[#000000] hover:to-[#1c1c1c] text-[#c49b63] font-bold text-base tracking-widest uppercase rounded-xl shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-[#c49b63]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                'Proceed to Pay'
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">Secured by Razorpay. 100% Safe Payments.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMoney;
