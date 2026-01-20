# 💬 IP Chat - Real-time Chat Application

<div align="center">
  <img src="preview.png" alt="IP Chat Preview" width="100%" />
  
  <p align="center">
    <strong>A modern, full-screen chat application with real-time messaging</strong>
  </p>
  
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a> •
    <a href="#screenshots">Screenshots</a>
  </p>
</div>

---

## ✨ Features

- ⚡ **Real-time Messaging** - Instant message delivery with Socket.io
- 🎨 **Modern UI** - Full-screen responsive design with glassmorphism effects
- 🌓 **Dark/Light Theme** - Toggle between themes with persistent preference
- 👤 **Random Usernames** - Auto-generated persistent user identities
- 💾 **Smart Storage** - MongoDB with in-memory fallback
- 🗑️ **Auto-Delete** - Messages expire after 7 days (when MongoDB is connected)
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🎭 **Smooth Animations** - Premium UI with buttery-smooth transitions

## � Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Socket.io Client** - Real-time communication
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Socket.io** - WebSocket library
- **MongoDB** - Database (optional)
- **Mongoose** - MongoDB ODM

## � Getting Started

### Prerequisites
- Node.js 16+ installed
- MongoDB (optional - app works without it)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/blazecodeprakhar/ip-chat-realtime.git
cd ip-chat-realtime
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

4. **Configure Environment Variables**

See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions on setting up environment variables.

Quick setup:
- Create `server/.env` with your MongoDB credentials
- Create `client/.env` with backend URL

> **Note**: Never commit `.env` files. They contain sensitive credentials.

5. **Run Backend**
```bash
cd server
npm start
```

6. **Run Frontend** (in a new terminal)
```bash
cd client
npm run dev
```

7. **Open Browser**
```
http://localhost:5173
```

## 🌐 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Deploy

**Frontend (Netlify):**
- Build command: `cd client && npm install && npm run build`
- Publish directory: `client/dist`
- Environment variable: `VITE_SOCKET_URL=https://your-backend-url.com`

**Backend (Render/Railway):**
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variable: `MONGO_URI=your_mongodb_atlas_url`

## 📸 Screenshots

<div align="center">
  <img src="preview.png" alt="Chat Interface" width="80%" />
  <p><em>Full-screen chat interface with modern design</em></p>
</div>

## 🎯 Features Breakdown

### Real-time Communication
- Instant message delivery using WebSockets
- Auto-reconnection on network issues
- Connection status indicator

### User Experience
- **Persistent Identity**: Username stored in localStorage
- **Theme Preference**: Dark/light mode saved locally
- **Smooth Scrolling**: Auto-scroll to latest messages
- **Typing Indicators**: Visual feedback (coming soon)

### Data Management
- **Dual Storage**: MongoDB + in-memory fallback
- **Auto-cleanup**: TTL index for 7-day message expiry
- **Graceful Degradation**: Works even if DB is down

### Responsive Design
- **Mobile First**: Optimized for touch devices
- **Tablet Support**: Perfect layout for medium screens
- **Desktop**: Full-screen immersive experience
- **Dynamic Viewport**: Handles mobile browser bars

## 🛠️ Development

### Project Structure
```
ipchats/
├── client/                 # Frontend React app
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── App.jsx        # Main component
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                 # Backend Node.js app
│   ├── models/
│   │   └── Message.js     # Mongoose model
│   ├── server.js          # Express + Socket.io server
│   └── package.json
├── DEPLOYMENT.md          # Deployment guide
└── README.md
```

### Environment Variables

For detailed environment setup instructions, see [ENV_SETUP.md](ENV_SETUP.md).

**Quick Reference:**
- Backend: `server/.env` (MongoDB URI, PORT)
- Frontend: `client/.env` (VITE_SOCKET_URL)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## � License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Created with ❤️ by [Prakhar](https://prakharcodes.netlify.app/)**

---

<div align="center">
  <p>If you found this project helpful, please give it a ⭐!</p>
</div>
