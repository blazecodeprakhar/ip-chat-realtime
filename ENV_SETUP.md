# Environment Configuration

## Backend Environment Variables

Create a file `server/.env` with the following content:

```env
# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE?retryWrites=true&w=majority

# Server Port
PORT=5000

# Environment
NODE_ENV=production
```

**Replace:**
- `YOUR_USERNAME` - Your MongoDB Atlas username
- `YOUR_PASSWORD` - Your MongoDB Atlas password
- `YOUR_CLUSTER` - Your cluster URL (e.g., cluster0.xxxxx.mongodb.net)
- `YOUR_DATABASE` - Your database name (e.g., ipchats)

## Frontend Environment Variables

Create a file `client/.env` with the following content:

```env
# Backend Socket URL
VITE_SOCKET_URL=http://localhost:5000
```

For production, change to your deployed backend URL:
```env
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

## Important Notes

- ⚠️ **NEVER commit `.env` files to Git**
- ✅ `.env` files are already in `.gitignore`
- ✅ Keep your credentials secure
- ✅ Use different credentials for development and production

## Getting MongoDB Credentials

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster (free tier available)
3. **Database Access** → Create database user
4. **Network Access** → Add IP address (0.0.0.0/0 for testing)
5. **Connect** → Get connection string
6. Replace `<password>` with your actual password
