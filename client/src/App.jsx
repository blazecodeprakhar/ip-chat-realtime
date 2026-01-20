import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Moon, Sun, Send, Info, User, Zap, ExternalLink } from 'lucide-react';

// Use environment variable for production, fallback to localhost for development
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const socket = io(SOCKET_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10
});

const getUserId = () => {
    let user = localStorage.getItem('chat_user');
    if (!user) {
        const randomId = Math.floor(Math.random() * 9000) + 1000;
        user = JSON.stringify({ username: `User${randomId}` });
        localStorage.setItem('chat_user', user);
    }
    return JSON.parse(user);
};

function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('chat_theme') || 'dark';
    });
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [currentUser, setCurrentUser] = useState({ username: 'Guest' });
    const [showAbout, setShowAbout] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('chat_theme', theme);

        const user = getUserId();
        setCurrentUser(user);

        // Socket event listeners
        socket.on('connect', () => {
            console.log('✅ Connected to server');
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('❌ Disconnected from server');
            setIsConnected(false);
        });

        socket.on('load_messages', (loadedMessages) => {
            console.log('📦 Loaded messages:', loadedMessages.length);
            setMessages(loadedMessages);
            scrollToBottom();
        });

        socket.on('chat_message', (msg) => {
            console.log('💬 New message:', msg);
            setMessages((prev) => {
                // Avoid duplicates
                const isDuplicate = prev.some(m =>
                    m.username === msg.username &&
                    m.text === msg.text &&
                    Math.abs(new Date(m.timestamp) - new Date(msg.timestamp)) < 1000
                );
                if (isDuplicate) return prev;
                return [...prev, msg];
            });
            scrollToBottom();
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('load_messages');
            socket.off('chat_message');
        };
    }, [theme]);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const sendMessage = (e) => {
        e.preventDefault();
        const trimmedText = inputText.trim();

        if (!trimmedText) return;
        if (!isConnected) {
            alert('Not connected to server. Please wait...');
            return;
        }

        console.log('📤 Sending message:', trimmedText);

        socket.emit('chat_message', {
            username: currentUser.username,
            text: trimmedText
        });

        setInputText('');
        inputRef.current?.focus();
    };

    return (
        <div className="app-container">
            {/* Header */}
            <header className="glass-panel header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="logo-box">
                        <Zap size={24} fill="#fff" />
                    </div>
                    <div>
                        <h1 className="app-title">IP Chat</h1>
                        <div className="status-indicator">
                            <span className={`status-dot ${isConnected ? 'online' : 'offline'}`} />
                            <span className="status-text">{isConnected ? 'Online' : 'Connecting...'}</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setShowAbout(true)} className="icon-btn" aria-label="About">
                        <Info size={22} />
                    </button>
                    <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
                        {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                </div>
            </header>

            {/* Chat Area */}
            <div className="chat-area custom-scrollbar">
                {messages.length === 0 && (
                    <div className="empty-state">
                        <Zap size={48} style={{ color: 'var(--accent-color)', opacity: 0.5 }} />
                        <p>No messages yet. Start the conversation! 💬</p>
                    </div>
                )}

                {messages.map((msg, index) => {
                    const isOwn = msg.username === currentUser.username;
                    return (
                        <div key={`${msg.username}-${msg.timestamp}-${index}`} className={`message-wrapper ${isOwn ? 'own' : ''}`}>
                            {!isOwn && (
                                <span className="username-label">
                                    {msg.username}
                                </span>
                            )}
                            <div className={`message-bubble ${isOwn ? 'sent' : 'received'}`}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="input-area glass-panel">
                <form onSubmit={sendMessage} className="input-form">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..."
                        className="chat-input"
                        disabled={!isConnected}
                        maxLength={500}
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim() || !isConnected}
                        className={`send-btn ${inputText.trim() && isConnected ? 'active' : ''}`}
                        aria-label="Send message"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>

            {/* About Modal */}
            {showAbout && (
                <div className="modal-overlay" onClick={() => setShowAbout(false)}>
                    <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                        <div className="modal-icon-box">
                            <Zap size={30} style={{ color: 'var(--accent-color)' }} />
                        </div>

                        <h2 className="modal-title">IP Chat</h2>
                        <p className="modal-desc">
                            Secure. Private. Ephemeral.<br />
                            Messages auto-destruct every 7 days.
                        </p>

                        <div className="user-id-badge">
                            <User size={18} style={{ color: 'var(--accent-color)' }} />
                            <span>Your ID: <strong>{currentUser.username}</strong></span>
                        </div>

                        <a
                            href="https://prakharcodes.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dev-link"
                        >
                            <ExternalLink size={18} />
                            Contact Developer
                        </a>

                        <button onClick={() => setShowAbout(false)} className="close-btn">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
