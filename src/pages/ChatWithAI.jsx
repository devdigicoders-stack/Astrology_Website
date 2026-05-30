import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send, Plus, Menu, X, User, Bot, Loader2, Home } from 'lucide-react';

const ChatWithAI = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchSessions();
  }, [token, navigate]);

  useEffect(() => {
    if (currentSessionId) {
      fetchHistory(currentSessionId);
    } else {
      setMessages([]);
    }
  }, [currentSessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_URL}/ai-chat/sessions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSessions(data.data);
      } else {
        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  const fetchHistory = async (sessionId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/ai-chat/history/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        const formattedMessages = [];
        data.data.forEach(chat => {
          formattedMessages.push({ role: 'user', text: chat.message });
          formattedMessages.push({ role: 'model', text: chat.aiResponse });
        });
        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const body = { message: userMessage };
      if (currentSessionId) {
        body.sessionId = currentSessionId;
      }

      const res = await fetch(`${API_URL}/ai-chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'model', text: data.data.aiResponse }]);
        
        // If it was a new chat, we need to update the session ID and refresh sessions list
        if (!currentSessionId) {
          setCurrentSessionId(data.data.sessionId);
          fetchSessions();
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: `Error: ${data.message}` }]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages(prev => [...prev, { role: 'model', text: 'Network error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#fdfaf5] font-inter overflow-hidden relative">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 absolute lg:static inset-y-0 left-0 z-50 w-72 bg-[#1c1c1c] text-white transition-transform duration-300 flex flex-col`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-cinzel text-xl text-[#c49b63] font-bold tracking-wider">Chat History</h2>
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white" title="Back to Home">
              <Home size={20} />
            </button>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white ml-2">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <button 
            onClick={startNewChat}
            className="w-full flex items-center justify-center space-x-2 bg-[#c49b63] hover:bg-[#b59055] text-white py-3 rounded-md transition-colors duration-200 font-medium"
          >
            <Plus size={20} />
            <span>New Consultation</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {sessions.length === 0 ? (
            <div className="text-center text-gray-500 text-sm mt-10">
              No previous consultations
            </div>
          ) : (
            sessions.map((session, idx) => (
              <button
                key={session._id || idx}
                onClick={() => {
                  setCurrentSessionId(session._id);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 text-left p-3 rounded-md transition-colors duration-200 ${
                  currentSessionId === session._id 
                    ? 'bg-white/10 text-white border-l-4 border-[#c49b63]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <MessageSquare size={18} className="shrink-0" />
                <span className="truncate text-sm font-medium">
                  {session.sessionTitle || "Previous Chat"}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
            <Menu size={24} />
          </button>
          <span className="font-cinzel font-bold tracking-wider text-[#1c1c1c]">AI Astrologer</span>
          <div className="w-6" /> {/* Placeholder for balance */}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#c49b63] rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center border-2 border-[#c49b63]/20 shadow-xl">
                  <Bot size={48} className="text-[#c49b63]" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-cinzel font-bold text-[#1c1c1c] tracking-wide">Namaste!</h2>
                <h3 className="text-xl text-[#c49b63] font-medium font-cinzel">Seek Celestial Guidance</h3>
              </div>
              <p className="text-gray-500 max-w-md text-[15px] leading-relaxed">
                I am your AI Astrologer. Ask me about your career, relationships, health, or request a reading based on your birth details. The stars hold the answers you seek.
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-[#1c1c1c] text-white ml-3' : 'bg-[#fdfaf5] border border-[#c49b63]/30 text-[#c49b63] mr-3'
                  }`}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={22} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`p-3 sm:p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-[#1c1c1c] text-white rounded-tr-sm' 
                      : 'bg-white border border-[#f0ece6] shadow-sm text-gray-800 rounded-tl-sm'
                  }`}>
                    <p className="whitespace-pre-wrap text-[14px] sm:text-[15px] leading-relaxed">
                      {msg.text}
                    </p>
                  </div>

                </div>
              </div>
            ))
          )}
          
          {loading && messages.length > 0 && (
            <div className="flex justify-start">
              <div className="flex max-w-[85%] flex-row">
                <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#fdfaf5] border border-[#c49b63]/30 text-[#c49b63] mr-3 flex items-center justify-center">
                  <Bot size={22} />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#f0ece6] shadow-sm rounded-tl-sm flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 text-[#c49b63] animate-spin" />
                  <span className="text-gray-500 text-sm">Consulting the stars...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask the AI Astrologer anything..."
              className="w-full pl-4 pr-14 py-4 bg-[#faf8f5] border border-[#e5e0d8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c49b63]/50 focus:border-[#c49b63] transition-all text-gray-800 placeholder-gray-400 shadow-inner"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-[#c49b63] hover:bg-[#b59055] text-white rounded-lg disabled:opacity-50 disabled:hover:bg-[#c49b63] transition-colors"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-gray-400">
            AI responses are for guidance purposes. Each message costs ₹5 from your wallet after free limit.
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatWithAI;
