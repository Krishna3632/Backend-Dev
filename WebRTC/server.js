const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store active users and their socket IDs
const users = {};

// Handle socket connections
io.on('connection', (socket) => {
    console.log(`[${new Date().toLocaleTimeString()}] New user connected: ${socket.id}`);

    // Register user
    socket.on('register', (username) => {
        users[socket.id] = {
            username,
            socketId: socket.id
        };
        console.log(`User ${username} registered with socket ID: ${socket.id}`);
        
        // Broadcast updated user list to all clients
        io.emit('users-list', Object.values(users));
    });

    // Handle offer (call initiation)
    socket.on('offer', (data) => {
        const { to, offer } = data;
        console.log(`Offer sent from ${socket.id} to ${to}`);
        io.to(to).emit('offer', {
            from: socket.id,
            offer,
            fromUser: users[socket.id]?.username || 'Unknown'
        });
    });

    // Handle answer
    socket.on('answer', (data) => {
        const { to, answer } = data;
        console.log(`Answer sent from ${socket.id} to ${to}`);
        io.to(to).emit('answer', {
            from: socket.id,
            answer,
            fromUser: users[socket.id]?.username || 'Unknown'
        });
    });

    // Handle ICE candidates
    socket.on('ice-candidate', (data) => {
        const { to, candidate } = data;
        io.to(to).emit('ice-candidate', {
            from: socket.id,
            candidate
        });
    });

    // Handle call rejection
    socket.on('reject-call', (data) => {
        const { to } = data;
        io.to(to).emit('call-rejected', {
            from: socket.id
        });
    });

    // Handle call end
    socket.on('end-call', (data) => {
        const { to } = data;
        io.to(to).emit('call-ended', {
            from: socket.id
        });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        delete users[socket.id];
        io.emit('users-list', Object.values(users));
    });

    // Send initial user list to new user
    socket.emit('users-list', Object.values(users));
});

const PORT = process.env.PORT || 3000;
const os = require('os');

// Get local network IP
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const localIP = getLocalIP();

server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 WebRTC Signaling Server running`);
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Network: http://${localIP}:${PORT}`);
    console.log(`\n📡 Socket.IO server is ready for WebRTC connections`);
    console.log(`\n💡 Tip: Use the Network URL to connect from other devices on the same network\n`);
});
