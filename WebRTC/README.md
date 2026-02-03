# WebRTC Video Call Application

A real-time peer-to-peer video calling application built with WebRTC, Socket.IO, and Express.

## 🎯 Features

- **Real-time Video Calling**: Peer-to-peer video communication
- **User Management**: Online users list with live updates
- **Call Control**: Accept, reject, and end calls
- **Connection Stats**: Monitor connection status and call state
- **Responsive Design**: Works on desktop and tablet devices
- **STUN Servers**: Multiple STUN servers for NAT traversal
- **ICE Candidates**: Automatic handling of ICE candidates

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Navigate to the WebRTC folder**:
   ```bash
   cd /Users/krishna/Code/Backend_Dev_Bridge/WebRTC
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - Open `http://localhost:3000` in multiple browser windows/tabs
   - Each should ideally be on a different device for best results

## 🌐 Same Network Setup (Multi-Device)

For testing video calls on the same Wi-Fi network:

1. **Start the server**:
   ```bash
   npm start
   ```
   The server will display both URLs:
   ```
   🚀 WebRTC Signaling Server running
      Local:   http://localhost:3000
      Network: http://192.168.x.x:3000
   ```

2. **On Device 1** (Server Host):
   - Open `http://localhost:3000`
   - Leave Server URL as default
   - Click "🔌 Connect"
   - Enter your name → Click "Join"
   - Click "📹 Start Video"

3. **On Device 2** (Same Network):
   - Open the Network URL (e.g., `http://192.168.x.x:3000`)
   - Update Server URL field with the network IP if needed
   - Click "🔌 Connect"
   - Enter your name → Click "Join"
   - Click "📹 Start Video"
   - Click Device 1's name to call

4. **Device 1** sees incoming call:
   - Click "✅ Accept"
   - Video call established! 🎥

### Finding Your Network IP

**macOS/Linux**:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows**:
```bash
ipconfig
```
Look for IPv4 like `192.168.x.x` or `10.x.x.x`

## 🚀 How to Use

1. **Enter Username**: Type your name and click "Join"
2. **Start Video**: Click "📹 Start Video" to enable camera/microphone
3. **Call Someone**: Click on a user from the online users list
4. **Accept/Reject**: Respond to incoming calls
5. **End Call**: Click "❌ End Call" to terminate the call

## 📁 Project Structure

```
WebRTC/
├── package.json           # Project dependencies
├── server.js              # Signaling server (Express + Socket.IO)
└── public/
    ├── index.html         # Main UI
    ├── styles.css         # Styling
    └── client.js          # WebRTC client logic
```

## 🔧 Technical Details

### Server (`server.js`)
- **Express**: Web server for serving static files
- **Socket.IO**: Real-time bidirectional communication
- **Signaling**: Handles offers, answers, and ICE candidates

### Client (`client.js`)
- **WebRTC API**: Peer connection and media handling
- **Socket.IO Client**: Real-time messaging with server
- **Media Constraints**: Optimized video resolution and audio quality

### Supported Events
- `register`: User joins the call
- `offer`: Initiates a call
- `answer`: Responds to call initiation
- `ice-candidate`: Exchanging connectivity information
- `reject-call`: Call rejection
- `end-call`: Call termination

## 🌐 STUN Servers Used

- stun.l.google.com:19302
- stun1.l.google.com:19302
- stun2.l.google.com:19302
- stun3.l.google.com:19302
- stun4.l.google.com:19302

These help establish connections across different networks.

## 🔒 Security Considerations

- Use HTTPS in production (WebRTC requires secure context)
- Implement authentication for production use
- Add TURN servers for better connectivity behind restrictive firewalls
- Validate all user inputs

## 📊 Browser Support

- Chrome/Chromium 34+
- Firefox 22+
- Safari 11+
- Edge 79+

## 🐛 Troubleshooting

### Camera/Microphone not working
- Check browser permissions
- Ensure HTTPS is used in production
- Verify device is not in use by another application

### No video from remote user
- Check connection status in stats panel
- Verify both users started their video
- Check firewall/NAT settings

### Peers can't connect
- Both users should be on the same network (for testing)
- For remote connections, TURN servers may be needed
- Check browser console for error messages

## 🚀 Future Enhancements

- Screen sharing capability
- Recording feature
- Multi-party conference calling
- Chat messaging
- User authentication
- Call history
- Quality adaptation
- TURN server integration

## 📝 License

ISC

## 👨‍💻 Author

Created as a WebRTC learning project

---

**Happy Calling! 🎥📞**
