# 🚀 Deployment Guide - IP Chat

This guide will help you deploy your IP Chat application to production.

## 📋 Overview

Your app has two parts:
- **Frontend (Client)**: React app → Deploy to **Netlify**
- **Backend (Server)**: Node.js + Socket.io → Deploy to **Render.com** (free tier)

---

## 🔧 Part 1: Deploy Backend to Render.com

### Step 1: Prepare Your Code

1. Make sure your code is pushed to GitHub
2. Ensure `server/.env.example` exists (already created)

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 3: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ipchat-backend` (or any name)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 4: Add Environment Variables

In Render dashboard, add:
```
MONGO_URI=mongodb+srv://prakharyadav096_db_user:oeRPKgpcHmARicbk@cluster0.kmlkwkw.mongodb.net/ipchats?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
```

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. **Copy your backend URL** (e.g., `https://ipchat-backend.onrender.com`)

---

## 🌐 Part 2: Deploy Frontend to Netlify

### Step 1: Update Environment Variable

1. Create `client/.env.production`:
```env
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url` with your actual Render URL from Part 1.

### Step 2: Build Locally (Optional - to test)

```bash
cd client
npm run build
```

This creates a `dist` folder.

### Step 3: Deploy to Netlify

**Option A: Drag & Drop (Easiest)**

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login
3. Drag the `client/dist` folder to Netlify
4. Done! ✅

**Option B: GitHub Auto-Deploy (Recommended)**

1. Go to Netlify → **"Add new site"** → **"Import from Git"**
2. Connect GitHub and select your repo
3. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `client/dist`
4. **Environment Variables**:
   - Key: `VITE_SOCKET_URL`
   - Value: `https://your-backend-url.onrender.com`
5. Click **"Deploy site"**

---

## ✅ Part 3: Verify Deployment

### Test Your App

1. Open your Netlify URL (e.g., `https://your-app.netlify.app`)
2. Check if "Online" status shows (green dot)
3. Send a test message
4. Open in another tab/browser - verify real-time sync

### Troubleshooting

**If "Connecting..." shows forever:**
- Check backend URL in Netlify environment variables
- Verify backend is running on Render
- Check browser console for errors

**If messages don't send:**
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for testing)
- Check Render logs for errors

---

## 🔒 MongoDB Atlas Setup (Important!)

### Whitelist IPs

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → **Add IP Address**
3. Add: `0.0.0.0/0` (allows all IPs - for testing)
4. For production, add only Render's IP

---

## 📝 Quick Checklist

- [ ] Backend deployed to Render
- [ ] Backend URL copied
- [ ] Frontend `.env.production` updated with backend URL
- [ ] Frontend deployed to Netlify
- [ ] MongoDB IP whitelist configured
- [ ] Tested chat functionality
- [ ] Verified real-time messaging works

---

## 🎉 You're Done!

Your chat app is now live! Share the Netlify URL with friends.

**Example URLs:**
- Frontend: `https://ipchat-app.netlify.app`
- Backend: `https://ipchat-backend.onrender.com`

---

## 💡 Tips

1. **Free Tier Limits**:
   - Render free tier sleeps after 15 min inactivity
   - First request after sleep takes 30-60 seconds
   - Consider upgrading for production use

2. **Custom Domain**:
   - Netlify: Settings → Domain management
   - Add your custom domain

3. **HTTPS**:
   - Both Netlify and Render provide free HTTPS
   - Already configured automatically

---

## 🆘 Need Help?

Check:
- Render logs: Dashboard → Logs
- Netlify logs: Deploys → Deploy log
- Browser console: F12 → Console tab

---

**Created by [Prakhar](https://prakharcodes.netlify.app/)**
