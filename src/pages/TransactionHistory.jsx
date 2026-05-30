import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const typeConfig = {
  wallet_recharge:   { label: 'Wallet Recharge',    emoji: '💰', bg: 'bg-green-100',  text: 'text-green-700'  },
  call_deduction:    { label: 'Call Charge',         emoji: '📞', bg: 'bg-blue-100',   text: 'text-blue-700'   },
  ai_chat:           { label: 'AI Chat Charge',      emoji: '🤖', bg: 'bg-purple-100', text: 'text-purple-700' },
  pooja_booking:     { label: 'Pooja Booking',       emoji: '🪔', bg: 'bg-orange-100', text: 'text-orange-700' },
  product_purchase:  { label: 'Product Purchase',    emoji: '🛒', bg: 'bg-indigo-100', text: 'text-indigo-700' },
  refund:            { label: 'Refund',              emoji: '↩️', bg: 'bg-teal-100',   text: 'text-teal-700'   },
  kundali_generation:{ label: 'Kundali Report',      emoji: '🔯', bg: 'bg-amber-100',  text: 'text-amber-700'  },
};

const FILTER_OPTIONS = [
  { value: 'all',               label: 'All Transactions' },
  { value: 'wallet_recharge',   label: 'Wallet Recharge' },
  { value: 'call_deduction',    label: 'Call Charges' },
  { value: 'ai_chat',           label: 'AI Chat' },
  { value: 'pooja_booking',     label: 'Pooja Booking' },
  { value: 'product_purchase',  label: 'Product Purchase' },
  { value: 'refund',            label: 'Refunds' },
  { value: 'kundali_generation',label: 'Kundali Reports' },
];

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Transaction history dekhne ke liye aapko login karna hoga.',
        confirmButtonColor: '#c49b63'
      }).then(() => navigate('/login'));
    } else {
      fetchTransactions();
    }
  }, [token, navigate]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/transactions/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions || []);
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: data.message || 'Transactions load nahi ho sake.', confirmButtonColor: '#c49b63' });
      }
    } catch (error) {
      console.error('Transaction fetch error:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Server se connect nahi ho saka.', confirmButtonColor: '#c49b63' });
    } finally {
      setLoading(false);
    }
  };

  // Summary Stats
  const stats = useMemo(() => {
    const totalCredits  = transactions.filter(t => t.direction === 'credit').reduce((s, t) => s + t.amount, 0);
    const totalDebits   = transactions.filter(t => t.direction === 'debit').reduce((s, t) => s + t.amount, 0);
    const totalCount    = transactions.length;
    return { totalCredits, totalDebits, totalCount };
  }, [transactions]);

  // Filter + paginate
  const filtered = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter(t => t.type === filter);
  }, [transactions, filter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (val) => { setFilter(val); setPage(1); };

  return (
    <div className="min-h-screen bg-[#faf9f6] py-12 px-4 font-inter">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ─── Header ─── */}
        <div className="text-center">
          <h1 className="font-cinzel text-3xl font-bold text-[#1c1c1c] mb-2">
            💳 Transaction History
          </h1>
          <p className="text-sm text-gray-500">Aapke wallet ki saari debit aur credit activity yahan dikhti hai.</p>
        </div>

        {/* ─── Stats Cards ─── */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-[#f0ece6] p-5 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Transactions</p>
              <p className="text-3xl font-bold text-[#1c1c1c]">{stats.totalCount}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-[#f0ece6] p-5 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Credits</p>
              <p className="text-3xl font-bold text-green-600">+₹{stats.totalCredits}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-[#f0ece6] p-5 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-red-500">-₹{stats.totalDebits}</p>
            </div>
          </div>
        )}

        {/* ─── Main Card ─── */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0ece6] overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#c49b63]/10 to-[#f0ece6]/30 px-6 py-5 border-b border-[#f0ece6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#1c1c1c]">All Activity</h2>
              <p className="text-xs text-gray-500 mt-0.5">{filtered.length} transactions found</p>
            </div>
            {/* Filter */}
            <select
              value={filter}
              onChange={e => handleFilterChange(e.target.value)}
              className="px-3 py-2 text-sm border border-[#e0d9ce] rounded-xl focus:border-[#c49b63] focus:ring-2 focus:ring-[#c49b63]/20 outline-none bg-white text-gray-700"
            >
              {FILTER_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-10 h-10 border-4 border-[#c49b63] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Loading your transactions...</p>
              </div>
            ) : paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-center px-4">
                <span className="text-6xl">📭</span>
                <p className="text-lg font-semibold text-gray-700">Koi transaction nahi mili</p>
                <p className="text-sm text-gray-400">
                  {filter !== 'all' ? 'Is category mein koi record nahi hai. Filter badalne ki koshish karein.' : 'Aapne abhi tak koi transaction nahi ki hai.'}
                </p>
                {filter !== 'all' && (
                  <button onClick={() => handleFilterChange('all')} className="mt-2 px-4 py-2 text-sm bg-[#c49b63] text-white rounded-lg hover:bg-[#b08a52] transition-colors">
                    Show All
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/70 text-xs uppercase text-gray-500 font-semibold border-b border-[#f0ece6]">
                    <tr>
                      <th className="px-6 py-4">Date & Time</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ece6] text-sm">
                    {paginated.map(txn => {
                      const config = typeConfig[txn.type] || { label: txn.type, emoji: '💳', bg: 'bg-gray-100', text: 'text-gray-700' };
                      const isCredit = txn.direction === 'credit';
                      return (
                        <tr key={txn._id} className="hover:bg-[#faf9f6] transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-gray-800 font-medium">
                              {new Date(txn.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(txn.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                              <span>{config.emoji}</span>
                              {config.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-600 text-xs max-w-[200px] truncate" title={txn.description}>
                              {txn.description || '—'}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <span className={`text-base font-bold ${isCredit ? 'text-green-600' : 'text-red-500'}`}>
                              {isCredit ? '+' : '-'}₹{txn.amount}
                            </span>
                            {txn.balanceAfter !== undefined && (
                              <p className="text-[11px] text-gray-400 mt-0.5">Bal: ₹{txn.balanceAfter}</p>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${
                              isCredit
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-red-50 text-red-600 border-red-200'
                            }`}>
                              {isCredit ? '↓ Credit' : '↑ Debit'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#f0ece6] text-sm text-gray-600">
                <span>Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 border border-[#e0d9ce] rounded-lg hover:bg-[#f0ece6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 border border-[#e0d9ce] rounded-lg hover:bg-[#f0ece6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-[#c49b63] hover:text-[#a68a56] underline underline-offset-4 transition-colors"
          >
            ← Wapas jaayein
          </button>
        </div>

      </div>
    </div>
  );
};

export default TransactionHistory;
