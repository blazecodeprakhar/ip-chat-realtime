require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage as fallback
let inMemoryMessages = [];
let isMongoConnected = false;

// MongoDB Connection (optional - will use in-memory if fails)
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    if (!MONGO_URI) {
        console.log('⚠️  No MongoDB URI found. Using in-memory storage.');
        return;
    }

    try {
        const conn = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        isMongoConnected = true;

        // Load existing messages from DB to memory
        const dbMessages = await Message.find().sort({ timestamp: 1 }).limit(100);
        inMemoryMessages = dbMessages.map(msg => ({
            username: msg.username,
            text: msg.text,
            timestamp: msg.timestamp
        }));
        console.log(`📦 Loaded ${inMemoryMessages.length} messages from database`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`);
        console.log('💡 Using in-memory storage instead. Messages will be lost on restart.');
        isMongoConnected = false;
    }
};

connectDB();

// Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('👤 User connected:', socket.id);

    // Send recent messages on connection (from memory)
    socket.emit('load_messages', inMemoryMessages);

    socket.on('chat_message', async (data) => {
        try {
            const messageData = {
                username: data.username,
                text: data.text,
                timestamp: new Date()
            };

            // Save to in-memory storage immediately
            inMemoryMessages.push(messageData);

            // Keep only last 100 messages in memory
            if (inMemoryMessages.length > 100) {
                inMemoryMessages = inMemoryMessages.slice(-100);
            }

            // Try to save to MongoDB if connected
            if (isMongoConnected) {
                try {
                    const newMessage = new Message({
                        username: data.username,
                        text: data.text
                    });
                    await newMessage.save();
                } catch (dbError) {
                    console.error('⚠️  DB save failed, but message stored in memory:', dbError.message);
                }
            }

            // Broadcast to all clients immediately
            io.emit('chat_message', messageData);

        } catch (error) {
            console.error('❌ Error processing message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('👋 User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Storage mode: ${isMongoConnected ? 'MongoDB + Memory' : 'Memory Only'}`);
});
