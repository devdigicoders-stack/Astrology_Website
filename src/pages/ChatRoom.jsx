import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Send, PhoneOff, Clock } from 'lucide-react';
import Swal from 'sweetalert2';

const ChatRoom = () => {
  const { callId } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [callDetails, setCallDetails] = useState(null);
  const [balance, setBalance] = useState(null);
  const [timerMsg, setTimerMsg] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const SOCKET_URL = API_URL.replace('/api', '');
  const BACKEND_URL = API_URL.replace('/api', '');
  const token = localStorage.getItem('token');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getImageUrl = (filename, defaultName = 'User') => {
    if (!filename) return `https://ui-avatars.com/api/?name=${defaultName}&background=c49b63&color=fff`;
    if (filename.startsWith('http')) return filename;
    return `${BACKEND_URL}/uploads/${filename}`;
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Initialize Socket
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Fetch initial Call Details and Chat History
    fetchCallDetails();
    fetchChatHistory();

    newSocket.on('connect', () => {
      console.log('Connected to socket for chat');
      // Join the call room
      newSocket.emit('join_room', `call_${callId}`);

      // Join personal room to receive call_ended events
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          newSocket.emit('join_room', userObj._id);
        } catch (e) {
          console.error(e);
        }
      }

      // Since we are the User, we must tell the server to start the billing timer
      newSocket.emit('start_timer', { callId });
    });

    // Listeners
    newSocket.on('receive_chat_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on('timer_started', (data) => {
      setTimerMsg(data.message);
    });

    newSocket.on('balance_update', (data) => {
      setBalance(data.walletBalance);
    });

    newSocket.on('low_balance_warning', (data) => {
      Swal.fire({
        icon: 'warning',
        title: 'Low Balance',
        text: data.message,
        confirmButtonColor: '#c49b63'
      });
    });

    newSocket.on('force_disconnect', (data) => {
      Swal.fire({
        icon: 'error',
        title: 'Chat Ended',
        text: data.message,
        confirmButtonColor: '#c49b63'
      }).then(() => {
        setShowRatingModal(true);
      });
    });

    newSocket.on('call_ended', (data) => {
      Swal.fire({
        icon: 'success',
        title: 'Chat Ended',
        html: `Duration: <b>${data.duration} min</b><br/>Cost: <b>₹${data.totalCost || 0}</b>`,
        confirmButtonColor: '#c49b63'
      }).then(() => {
        setShowRatingModal(true);
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [callId, navigate, token]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchCallDetails = async () => {
    try {
      const res = await fetch(`${API_URL}/api/calls/${callId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setCallDetails(data.call);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/chat/${callId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !callDetails) return;

    try {
      const res = await fetch(`${API_URL}/api/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          callId,
          receiverId: callDetails.astrologer._id,
          receiverModel: 'Astrologer',
          message: newMessage
        })
      });
      const data = await res.json();
      if (data.success) {
        setNewMessage("");
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const endCall = async () => {
    const result = await Swal.fire({
      title: 'End Chat?',
      text: "Are you sure you want to end this chat?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, End Chat'
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`${API_URL}/api/calls/end`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ callId })
      });
    } catch (err) {
      console.error(err);
      navigate('/astrologers');
    }
  };

  const handleRatingClose = () => {
    setShowRatingModal(false);
    navigate('/astrologers');
  };

  // The logged-in user id
  const userId = callDetails ? callDetails.user._id : null;

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10 sticky top-0 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
            <img
              src={getImageUrl(callDetails?.astrologer?.profilePic, callDetails?.astrologer?.name || 'Astro')}
              alt="Astro"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{callDetails?.astrologer?.name || 'Astrologer'}</h2>
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-green-500 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span> Live</span>
              {balance !== null && <span className="text-[#c49b63] font-semibold">Bal: ₹{balance}</span>}
              {timerMsg && <span className="text-gray-400 flex items-center"><Clock size={12} className="mr-1" /> {timerMsg}</span>}
            </div>
          </div>
        </div>
        <button
          onClick={endCall}
          className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
        >
          <PhoneOff size={18} />
          <span className="hidden sm:inline">End Chat</span>
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}>
        {messages.map((msg, idx) => {
          const isMine = msg.senderId === userId;
          return (
            <div key={idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${isMine ? 'bg-[#c49b63] text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'}`}>
                <p className="text-[15px]">{msg.message}</p>
                <span className={`text-[10px] mt-1 block text-right ${isMine ? 'text-[#f5e6d3]' : 'text-gray-400'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="bg-white p-4 border-t border-gray-200">
        <form onSubmit={handleSend} className="flex space-x-3 w-full">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:border-[#c49b63] focus:ring-1 focus:ring-[#c49b63] transition-all"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-[#1c1c1c] text-white p-3 rounded-full hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-12 h-12"
          >
            <Send size={20} className="ml-1" />
          </button>
        </form>
      </footer>

      {/* Rating Modal — Chat end hone ke baad dikhega */}
      {showRatingModal && (
        <InlineChatRatingModal
          onClose={handleRatingClose}
          astrologerId={callDetails?.astrologer?._id}
          callId={callId}
          astrologerName={callDetails?.astrologer?.name || 'Astrologer'}
          apiUrl={API_URL}
          token={token}
        />
      )}
    </div>
  );
};

// ─── Inline Rating Modal Component ───────────────────────────────────────────
const InlineChatRatingModal = ({ onClose, astrologerId, callId, astrologerName, apiUrl, token }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Swal.fire({ icon: 'warning', title: 'Oops!', text: 'Pehle rating select karo!', confirmButtonColor: '#c49b63' });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${apiUrl}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ astrologerId, callId, rating, comment })
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({ icon: 'success', title: 'Thank You! 🙏', text: 'Aapka review submit ho gaya.', confirmButtonColor: '#c49b63' });
        onClose();
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: data.message });
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Review submit nahi ho paya.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '2rem',
        width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1c1c1c', margin: '0 0 0.3rem' }}>
          Rate Your Consultation
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          <b style={{ color: '#c49b63' }}>{astrologerName}</b> ke saath kaisa raha?
        </p>

        {/* Stars */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '2.2rem', transition: 'transform 0.15s',
                transform: star <= (hover || rating) ? 'scale(1.2)' : 'scale(1)',
                color: star <= (hover || rating) ? '#f59e0b' : '#d1d5db'
              }}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Koi comment likhna ho toh... (optional)"
          maxLength={500}
          style={{
            width: '100%', minHeight: '80px', borderRadius: '12px',
            border: '1.5px solid #e2e8f0', padding: '0.75rem 1rem',
            fontSize: '0.9rem', resize: 'none', outline: 'none',
            fontFamily: 'inherit', boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#c49b63'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              flex: 1, padding: '0.75rem', borderRadius: '12px',
              border: '1.5px solid #e2e8f0', background: '#f8fafc',
              color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem'
            }}
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            style={{
              flex: 2, padding: '0.75rem', borderRadius: '12px',
              border: 'none', background: rating === 0 ? '#e2e8f0' : '#c49b63',
              color: rating === 0 ? '#94a3b8' : '#fff',
              cursor: rating === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '700', fontSize: '0.9rem', transition: 'background 0.2s'
            }}
          >
            {isSubmitting ? 'Submitting...' : '⭐ Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
