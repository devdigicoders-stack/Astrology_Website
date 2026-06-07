import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import Swal from 'sweetalert2';
import RatingModal from '../components/RatingModal';
import './AudioCallRoom.css';

const APP_ID = '5451ce0a7afa427b9b6f4153fafe2190';

const AudioCallRoom = () => {
  const { callId } = useParams();
  const navigate = useNavigate();

  const [micTrack, setMicTrack] = useState(null);
  const micTrackRef = useRef(null);
  const [micMuted, setMicMuted] = useState(false);
  const [remoteConnected, setRemoteConnected] = useState(false);
  const [callDetails, setCallDetails] = useState(null);
  const [duration, setDuration] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const clientRef = useRef(null);
  const timerRef = useRef(null);
  const socketRef = useRef(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const SOCKET_URL = API_URL.replace('/api', '');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || !callId) return;

    // Connect to Socket
    const newSocket = io(SOCKET_URL);
    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      // Join personal room
      const userStr = localStorage.getItem('user');
      const astStr = localStorage.getItem('astrologer');
      const userData = userStr ? JSON.parse(userStr) : (astStr ? JSON.parse(astStr) : null);
      if (userData) {
        newSocket.emit('join_room', userData._id);
      }

      // Tell the server to start the billing timer
      newSocket.emit('start_timer', { callId });
    });

    newSocket.on('call_ended', async (data) => {
      Swal.fire({
        icon: 'success',
        title: 'Call Ended',
        html: `Duration: <b>${data.duration || 0} min</b>`,
        confirmButtonColor: '#c49b63'
      }).then(() => {
        setShowRatingModal(true);
      });
      await leaveCall();
    });

    newSocket.on('force_disconnect', async (data) => {
      Swal.fire({
        icon: 'error',
        title: 'Call Ended',
        text: data.message,
        confirmButtonColor: '#c49b63'
      }).then(() => navigate(-1));
      await leaveCall();
    });

    fetchCallDetails();
    joinCall();

    timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);

    return () => {
      leaveCall();
      clearInterval(timerRef.current);
      newSocket.disconnect();
    };
  }, [callId]);

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

  const joinCall = async () => {
    try {
      const res = await fetch(`${API_URL}/api/calls/${callId}/agora-token`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!data.success) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to get call token.' });
        return;
      }

      const { token: agoraToken, channelName, accountId } = data;

      const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      clientRef.current = client;

      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'audio') {
          user.audioTrack?.play();
          setRemoteConnected(true);
        }
      });

      client.on('user-left', () => setRemoteConnected(false));

      await client.join(APP_ID, channelName, agoraToken, accountId);

      const mic = await AgoraRTC.createMicrophoneAudioTrack();
      await client.publish([mic]);
      setMicTrack(mic);
      micTrackRef.current = mic;
    } catch (err) {
      console.error('Agora audio join error:', err);
      Swal.fire({ icon: 'error', title: 'Connection Error', text: 'Failed to join audio call. Check microphone permissions.' });
    }
  };

  const leaveCall = async () => {
    if (micTrackRef.current) {
      try {
        micTrackRef.current.stop();
        micTrackRef.current.close();
      } catch (e) { }
      micTrackRef.current = null;
    } else if (micTrack) {
      try {
        micTrack.stop();
        micTrack.close();
      } catch (e) { }
    }

    if (clientRef.current) {
      try { await clientRef.current.leave(); } catch (e) { }
    }
  };

  const handleEndCall = async () => {
    const result = await Swal.fire({
      title: 'End Call?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, End Call'
    });
    if (!result.isConfirmed) return;

    await leaveCall();
    clearInterval(timerRef.current);
    try {
      await fetch(`${API_URL}/api/calls/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ callId })
      });
      // Do not navigate immediately; wait for socket 'call_ended'
    } catch (err) {
      console.error(err);
      navigate(-1);
    }
  };

  const toggleMic = () => {
    if (!micTrack) return;
    micTrack.setMuted(!micMuted);
    setMicMuted(!micMuted);
  };

  const handleModalClose = () => {
    setShowRatingModal(false);
    navigate(-1);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Customer app mein remote party hamesha Astrologer hota hai
  const remoteName = callDetails?.astrologer?.name || 'Astrologer';

  return (
    <div className="audio-call-container">
      <div className="audio-call-card">
        {/* Avatar */}
        <div className="audio-avatar-ring">
          <div className="audio-avatar">{remoteName.charAt(0)}</div>
        </div>

        {/* Name & Status */}
        <h2 className="audio-remote-name">{remoteName}</h2>
        <p className="audio-status">
          {remoteConnected ? (
            <span className="connected-label">🟢 Connected</span>
          ) : (
            <span className="connecting-label">⏳ Connecting...</span>
          )}
        </p>

        {/* Timer */}
        <div className="audio-timer">{formatTime(duration)}</div>

        {/* Controls */}
        <div className="audio-controls">
          <button onClick={toggleMic} className={`audio-ctrl-btn ${micMuted ? 'muted' : ''}`}>
            {micMuted ? <MicOff size={22} /> : <Mic size={22} />}
            <span>{micMuted ? 'Unmute' : 'Mute'}</span>
          </button>
          <button onClick={handleEndCall} className="audio-ctrl-btn end-audio-btn">
            <PhoneOff size={24} />
            <span>End</span>
          </button>
        </div>
      </div>

      <RatingModal
        isOpen={showRatingModal}
        onClose={handleModalClose}
        astrologerId={callDetails?.astrologer?._id}
        callId={callId}
        astrologerName={callDetails?.astrologer?.name || 'Astrologer'}
      />
    </div>
  );
};

export default AudioCallRoom;
