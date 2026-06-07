import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import Swal from 'sweetalert2';
import RatingModal from '../components/RatingModal';
import './VideoCallRoom.css';

const APP_ID = '5451ce0a7afa427b9b6f4153fafe2190';

const VideoCallRoom = () => {
  const { callId } = useParams();
  const navigate = useNavigate();

  const [localTracks, setLocalTracks] = useState([]);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [joined, setJoined] = useState(false);
  const [callDetails, setCallDetails] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const clientRef = useRef(null);
  const socketRef = useRef(null);
  const localTracksRef = useRef([]);  // ← Ref mein store karo taaki leaveCall mein latest tracks mile

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

    return () => {
      leaveCall();
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
      // Get Agora token from backend
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

      // Handle remote user publishing
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
          setRemoteUsers(prev => {
            const exists = prev.find(u => u.uid === user.uid);
            if (!exists) return [...prev, user];
            return prev;
          });
          setTimeout(() => {
            user.videoTrack?.play(`remote-video-${user.uid}`);
          }, 100);
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user) => {
        setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
      });

      client.on('user-left', (user) => {
        setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
      });

      await client.join(APP_ID, channelName, agoraToken, accountId);

      // Create and publish local tracks
      const [micTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      await client.publish([micTrack, cameraTrack]);

      // Play local video
      cameraTrack.play('local-video');

      localTracksRef.current = [micTrack, cameraTrack];  // ← Ref mein bhi save karo
      setLocalTracks([micTrack, cameraTrack]);
      setJoined(true);
    } catch (err) {
      console.error('Agora join error:', err);
      const errMsg = err?.message || err?.toString() || 'Unknown error';
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        html: `Failed to join video call.<br/><small style="color:#94a3b8">${errMsg}</small><br/><br/>Please check camera/mic permissions and try again.`
      });
    }
  };

  const leaveCall = async () => {
    // Ref se lo — hamesha latest tracks milegi, closure problem nahi hogi
    localTracksRef.current.forEach(track => {
      try { track.stop(); track.close(); } catch (e) { }
    });
    localTracksRef.current = [];
    if (clientRef.current) {
      try { await clientRef.current.leave(); } catch (e) { }
      clientRef.current = null;
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

    try {
      await fetch(`${API_URL}/api/calls/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ callId })
      });
      // Do not navigate here immediately; wait for socket 'call_ended'
    } catch (err) {
      console.error(err);
      navigate(-1);
    }
  };

  const toggleMic = () => {
    const micTrack = localTracks[0];
    if (!micTrack) return;
    micTrack.setMuted(!micMuted);
    setMicMuted(!micMuted);
  };

  const toggleCam = () => {
    const camTrack = localTracks[1];
    if (!camTrack) return;
    camTrack.setMuted(!camOff);
    setCamOff(!camOff);
  };

  const handleModalClose = () => {
    setShowRatingModal(false);
    navigate(-1);
  };

  // Customer app mein remote party hamesha Astrologer hota hai
  const remoteName = callDetails?.astrologer?.name || 'Astrologer';

  return (
    <div className="video-call-container">
      {/* Remote Video (Main) */}
      <div className="remote-video-area">
        {remoteUsers.length === 0 ? (
          <div className="waiting-screen">
            <div className="waiting-avatar">{remoteName.charAt(0)}</div>
            <p className="waiting-text">{joined ? `Waiting for ${remoteName} to join...` : 'Connecting...'}</p>
          </div>
        ) : (
          remoteUsers.map(user => (
            <div key={user.uid} id={`remote-video-${user.uid}`} className="remote-video-player" />
          ))
        )}
      </div>

      {/* Local Video (PiP) */}
      <div id="local-video" className={`local-video-pip ${camOff ? 'cam-off' : ''}`}>
        {camOff && <div className="cam-off-label">📷 Off</div>}
      </div>

      {/* Call Info Header */}
      <div className="video-header">
        <div className="video-header-info">
          <span className="live-dot"></span>
          <span>Live Video Call</span>
          {callDetails && <span className="remote-name-label">— {remoteName}</span>}
        </div>
      </div>

      {/* Controls */}
      <div className="video-controls">
        <button onClick={toggleMic} className={`ctrl-btn ${micMuted ? 'muted' : ''}`} title="Mute/Unmute">
          {micMuted ? <MicOff size={22} /> : <Mic size={22} />}
        </button>
        <button onClick={handleEndCall} className="ctrl-btn end-call-btn" title="End Call">
          <PhoneOff size={26} />
        </button>
        <button onClick={toggleCam} className={`ctrl-btn ${camOff ? 'muted' : ''}`} title="Camera On/Off">
          {camOff ? <VideoOff size={22} /> : <Video size={22} />}
        </button>
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

export default VideoCallRoom;
