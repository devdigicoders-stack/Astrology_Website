import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Withdrawal = () => {
  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    holderName: '',
    upiId: ''
  });
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [fetching, setFetching] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Withdrawal karne ke liye aapko login karna hoga.',
        confirmButtonColor: '#c49b63'
      }).then(() => {
        navigate('/login');
      });
    } else {
      fetchMyRequests();
    }
  }, [token, navigate]);

  const fetchMyRequests = async () => {
    try {
      setFetching(true);
      const res = await fetch(`${backendUrl}/api/withdrawals/my-requests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.withdrawals);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Kripaya ek valid amount chunein.', confirmButtonColor: '#c49b63' });
      return;
    }

    if (!bankDetails.accountNumber && !bankDetails.upiId) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Account Number ya UPI ID mein se koi ek detail zaroori hai.', confirmButtonColor: '#c49b63' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/withdrawals/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          amount: Number(amount),
          bankDetails
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Request Submitted!',
          text: 'Aapki withdrawal request successfully submit ho gayi hai. Admin jald hi ise process karenge.',
          confirmButtonColor: '#c49b63'
        });
        setAmount('');
        setBankDetails({ accountNumber: '', ifscCode: '', bankName: '', holderName: '', upiId: '' });
        fetchMyRequests(); // Refresh the list
      } else {
        Swal.fire({ icon: 'error', title: 'Failed', text: data.message || 'Request submit nahi ho saki.', confirmButtonColor: '#c49b63' });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Server se connect nahi ho saka.', confirmButtonColor: '#c49b63' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">Approved</span>;
      case 'rejected': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-semibold">Rejected</span>;
      default: return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-semibold">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] py-12 px-4 font-inter">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Section: Form */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0ece6] overflow-hidden">
          <div className="bg-gradient-to-r from-[#c49b63]/10 to-[#f0ece6]/30 px-8 py-6 border-b border-[#f0ece6]">
            <h2 className="font-cinzel text-2xl font-bold text-[#1c1c1c] mb-1">Withdraw Funds</h2>
            <p className="text-sm text-gray-500">Apne wallet ka balance apne bank account ya UPI mein transfer karein.</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Amount Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Withdrawal Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount to withdraw"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#c49b63] focus:ring-2 focus:ring-[#c49b63]/20 outline-none transition-all text-gray-800 font-medium"
                      required
                      min="1"
                    />
                  </div>
                </div>

                {/* Bank Details */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-gray-800 border-b pb-2 mb-4">Bank / UPI Details</h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    name="holderName"
                    value={bankDetails.holderName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#c49b63] focus:ring-1 focus:ring-[#c49b63]/20 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={bankDetails.bankName}
                    onChange={handleInputChange}
                    placeholder="State Bank of India"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#c49b63] focus:ring-1 focus:ring-[#c49b63]/20 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#c49b63] focus:ring-1 focus:ring-[#c49b63]/20 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={bankDetails.ifscCode}
                    onChange={handleInputChange}
                    placeholder="SBIN0001234"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#c49b63] focus:ring-1 focus:ring-[#c49b63]/20 outline-none transition-all text-sm uppercase"
                  />
                </div>

                <div className="md:col-span-2 relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">OR</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    value={bankDetails.upiId}
                    onChange={handleInputChange}
                    placeholder="username@upi"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#c49b63] focus:ring-1 focus:ring-[#c49b63]/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 bg-[#1c1c1c] hover:bg-black text-[#c49b63] font-bold text-sm tracking-wider uppercase rounded-xl shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? 'Submitting...' : 'Submit Withdrawal Request'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: History */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0ece6] overflow-hidden">
          <div className="px-8 py-5 border-b border-[#f0ece6] bg-gray-50/50">
            <h3 className="font-semibold text-gray-800">Withdrawal History</h3>
          </div>
          
          <div className="p-0 overflow-x-auto">
            {fetching ? (
              <div className="p-8 text-center text-sm text-gray-500">Loading history...</div>
            ) : requests.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-500">Aapne abhi tak koi withdrawal request nahi ki hai.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 font-semibold border-b">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {requests.map(req => (
                    <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ₹{req.amount}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {req.bankDetails?.upiId ? 'UPI' : 'Bank Transfer'}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(req.status)}
                        {req.remarks && <p className="text-[10px] text-gray-400 mt-1 max-w-[150px] truncate" title={req.remarks}>{req.remarks}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Withdrawal;
