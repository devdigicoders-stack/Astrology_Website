import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingSocials from './components/FloatingSocials';
import FloatingAppStores from './components/FloatingAppStores';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import DownloadApp from './pages/DownloadApp';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import ChatWithAI from './pages/ChatWithAI';
import AstrologersList from './pages/AstrologersList';
import AstrologerProfile from './pages/AstrologerProfile';
import ChatRoom from './pages/ChatRoom';
import VideoCallRoom from './pages/VideoCallRoom';
import AudioCallRoom from './pages/AudioCallRoom';
import Kundali from './pages/Kundali';
import AddMoney from './pages/AddMoney';
import Withdrawal from './pages/Withdrawal';
import TransactionHistory from './pages/TransactionHistory';

import './index.css';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <FloatingSocials />
      <FloatingAppStores />
    </div>
  );
};

function App() {
  return (
    <Router>
      <PageLoader />
      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/download" element={<DownloadApp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/astrologers" element={<AstrologersList />} />
          <Route path="/astrologer/:id" element={<AstrologerProfile />} />
          <Route path="/kundali" element={<Kundali />} />
          <Route path="/add-money" element={<AddMoney />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/transactions" element={<TransactionHistory />} />
        </Route>

        {/* Routes without Navbar and Footer */}
        <Route path="/chat-with-ai" element={<ChatWithAI />} />
        <Route path="/chat/:callId" element={<ChatRoom />} />
        <Route path="/video/:callId" element={<VideoCallRoom />} />
        <Route path="/audio/:callId" element={<AudioCallRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
