// Initialize Socket.IO
let socket = io();

// DOM Elements
const usernameInput = document.getElementById('usernameInput');
const serverURL = document.getElementById('serverURL');
const serverStatus = document.getElementById('serverStatus');
const usersList = document.getElementById('usersList');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startVideoBtn = document.getElementById('startVideoBtn');
const endCallBtn = document.getElementById('endCallBtn');
const incomingCallModal = document.getElementById('incomingCallModal');
const callerName = document.getElementById('callerName');
const callStatus = document.getElementById('callStatus');
const statusText = document.getElementById('statusText');
const connectionStatus = document.getElementById('connectionStatus');
const callState = document.getElementById('callState');
const videoState = document.getElementById('videoState');

// WebRTC Configuration
const peerConfiguration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' }
    ]
};

// Application State
let currentUsername = null;
let localStream = null;
let peerConnection = null;
let remoteStream = null;
let currentCallWith = null;
let allUsers = [];

// ==================== SERVER CONNECTION ====================

function connectToServer() {
    const url = serverURL.value.trim();

    if (!url) {
        alert('Please enter a server URL');
        return;
    }

    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
    }

    try {
        socket = io(url, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5
        });

        socket.on('connect', () => {
            updateServerStatus('connected');
            attachSocketListeners();
        });

        socket.on('disconnect', () => {
            updateServerStatus('disconnected');
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            alert(`Failed to connect to server: ${error.message}`);
            updateServerStatus('disconnected');
        });
    } catch (error) {
        console.error('Error connecting to server:', error);
        alert(`Error: ${error.message}`);
    }
}

function updateServerStatus(status) {
    serverStatus.textContent = status === 'connected' ? '🟢 Connected' : '🔴 Disconnected';
    serverStatus.className = `server-status ${status === 'connected' ? 'connected' : 'disconnected'}`;
}

function attachSocketListeners() {
    socket.removeAllListeners('users-list');
    socket.removeAllListeners('offer');
    socket.removeAllListeners('answer');
    socket.removeAllListeners('ice-candidate');
    socket.removeAllListeners('call-rejected');
    socket.removeAllListeners('call-ended');

    socket.on('users-list', (users) => {
        allUsers = users;
        renderUsersList();
    });

    socket.on('offer', async (data) => {
        const { from, offer, fromUser } = data;

        if (currentCallWith) {
            socket.emit('reject-call', { to: from });
            return;
        }

        if (!localStream) {
            socket.emit('reject-call', { to: from });
            alert('Please start your video first');
            return;
        }

        currentCallWith = from;
        callerName.textContent = `${fromUser} is calling...`;
        incomingCallModal.classList.remove('hidden');
        updateCallState(`Incoming call from ${fromUser}...`);

        window.pendingOffer = { from, offer, fromUser };
    });

    socket.on('answer', async (data) => {
        const { answer } = data;

        try {
            if (peerConnection) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
                updateStatus('Call in progress');
            }
        } catch (error) {
            console.error('Error setting remote description:', error);
        }
    });

    socket.on('ice-candidate', async (data) => {
        const { candidate } = data;

        try {
            if (peerConnection && candidate) {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            }
        } catch (error) {
            console.error('Error adding ICE candidate:', error);
        }
    });

    socket.on('call-rejected', () => {
        updateCallState('Call was rejected');
        endCall();
    });

    socket.on('call-ended', () => {
        updateCallState('Call ended');
        endCall();
    });
}

// ==================== USER MANAGEMENT ====================

function registerUser() {
    if (!socket || !socket.connected) {
        alert('Not connected to server. Please click "Connect" first.');
        return;
    }

    const username = usernameInput.value.trim();

    if (!username) {
        alert('Please enter a username');
        return;
    }

    currentUsername = username;
    socket.emit('register', username);
    usernameInput.disabled = true;
    updateConnectionStatus('connected');
}

function renderUsersList() {
    usersList.innerHTML = '';

    if (allUsers.length === 0) {
        usersList.innerHTML = '<p class="placeholder">No users online</p>';
        return;
    }

    allUsers.forEach((user) => {
        const isCurrentUser = user.username === currentUsername;
        const userElement = document.createElement('div');
        userElement.className = `user-item ${isCurrentUser ? 'self' : ''}`;

        userElement.innerHTML = `
            <div class="username">${user.username} ${isCurrentUser ? '(You)' : ''}</div>
            <div class="status">${isCurrentUser ? 'Your device' : 'Available'}</div>
        `;

        if (!isCurrentUser) {
            userElement.onclick = () => initiateCall(user.socketId, user.username);
        }

        usersList.appendChild(userElement);
    });
}

// ==================== VIDEO MANAGEMENT ====================

async function startVideo() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: true
        });

        localVideo.srcObject = localStream;
        startVideoBtn.classList.add('hidden');
        updateVideoState('On');
    } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Unable to access camera/microphone. Please check permissions.');
    }
}

function stopLocalVideo() {
    if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        localStream = null;
        localVideo.srcObject = null;
        startVideoBtn.classList.remove('hidden');
        updateVideoState('Off');
    }
}

// ==================== CALL MANAGEMENT ====================

async function initiateCall(targetSocketId, targetUsername) {
    if (!localStream) {
        alert('Please start your video first');
        return;
    }

    if (currentCallWith) {
        alert('Already in a call. End current call first.');
        return;
    }

    try {
        currentCallWith = targetSocketId;
        createPeerConnection();

        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        });

        const offer = await peerConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
        });

        await peerConnection.setLocalDescription(offer);
        socket.emit('offer', { to: targetSocketId, offer });

        updateCallState(`Calling ${targetUsername}...`);
    } catch (error) {
        console.error('Error initiating call:', error);
        currentCallWith = null;
    }
}

function createPeerConnection() {
    peerConnection = new RTCPeerConnection(peerConfiguration);

    peerConnection.onicecandidate = (event) => {
        if (event.candidate && currentCallWith) {
            socket.emit('ice-candidate', {
                to: currentCallWith,
                candidate: event.candidate
            });
        }
    };

    peerConnection.ontrack = (event) => {
        remoteStream = event.streams[0];
        remoteVideo.srcObject = remoteStream;
    };

    peerConnection.onconnectionstatechange = () => {
        if (peerConnection.connectionState === 'failed' || peerConnection.connectionState === 'disconnected') {
            endCall();
        }
    };
}

function acceptCall() {
    incomingCallModal.classList.add('hidden');
    respondToCall(true);
}

function rejectCall() {
    incomingCallModal.classList.add('hidden');
    respondToCall(false);
}

async function respondToCall(accept) {
    const { from, offer, fromUser } = window.pendingOffer;

    if (!accept) {
        socket.emit('reject-call', { to: from });
        currentCallWith = null;
        updateCallState('Call rejected');
        return;
    }

    try {
        createPeerConnection();

        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        });

        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket.emit('answer', { to: from, answer });
        updateCallState(`Connected with ${fromUser}`);
        updateStatus('Call in progress');
    } catch (error) {
        console.error('Error accepting call:', error);
        currentCallWith = null;
    }
}

// ==================== CALL TERMINATION ====================

function endCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }

    if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
        remoteStream = null;
    }

    if (currentCallWith && socket && socket.connected) {
        socket.emit('end-call', { to: currentCallWith });
    }

    remoteVideo.srcObject = null;
    currentCallWith = null;
    endCallBtn.classList.add('hidden');
    callStatus.classList.add('hidden');
    updateCallState('Not in call');
}

// ==================== UI UPDATES ====================

function updateConnectionStatus(status) {
    connectionStatus.textContent = status === 'connected' ? 'Connected' : 'Disconnected';
    connectionStatus.className = `status-badge ${status === 'connected' ? 'connected' : 'disconnected'}`;
}

function updateCallState(state) {
    callState.textContent = state;
    if (state !== 'Not in call') {
        endCallBtn.classList.remove('hidden');
        updateStatus(state);
    } else {
        endCallBtn.classList.add('hidden');
        callStatus.classList.add('hidden');
    }
}

function updateVideoState(state) {
    videoState.textContent = state;
}

function updateStatus(message) {
    statusText.textContent = message;
    callStatus.classList.remove('hidden');
}

// ==================== EVENT LISTENERS ====================

startVideoBtn.addEventListener('click', startVideo);
endCallBtn.addEventListener('click', endCall);

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        registerUser();
    }
});

serverURL.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        connectToServer();
    }
});

window.addEventListener('beforeunload', () => {
    stopLocalVideo();
    if (peerConnection) {
        peerConnection.close();
    }
    if (currentCallWith && socket && socket.connected) {
        socket.emit('end-call', { to: currentCallWith });
    }
});

attachSocketListeners();
setTimeout(() => {
    if (socket && socket.connected) {
        updateServerStatus('connected');
    }
}, 300);

console.log('🚀 WebRTC Client initialized');
