# Render Deployment Checklist

## ✅ Quick Checklist

### Before Deployment:
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas password ready
- [ ] Generate strong SESSION_SECRET
- [ ] All Cloudinary credentials ready

### On Render:
- [ ] Create Web Service
- [ ] Connect GitHub repository
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add ALL environment variables (see below)
- [ ] Update MongoDB Atlas Network Access

### After Deployment:
- [ ] Test homepage loads
- [ ] Test user signup/login
- [ ] Test creating listing with image
- [ ] Check Render logs for errors

---

## 🔑 Environment Variables for Render

Add these in Render Dashboard → Your Service → Environment:

```
MONGO_URL=mongodb+srv://rohanzx71_db_user:YOUR_PASSWORD@clusterwl1.19vwc0e.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=ClusterWl1

SESSION_SECRET=YOUR_STRONG_RANDOM_STRING

NODE_ENV=production

PORT=10000

CLOUDINARY_CLOUD_NAME=dqpnbeosr

CLOUDINARY_API_KEY=399842376616793

CLOUDINARY_API_SECRET=O97cBjWQb0ZI96LUK4GstCo46rg
```

**⚠️ Replace:**
- `YOUR_PASSWORD` with your MongoDB Atlas password
- `YOUR_STRONG_RANDOM_STRING` with a generated secret (use: `openssl rand -base64 32`)

---

## 🚀 Quick Start

1. **Push to GitHub** (if not done)
2. **Go to Render.com** → Sign up/Login
3. **New +** → **Web Service**
4. **Connect your GitHub repo**
5. **Settings:**
   - Build: `npm install`
   - Start: `npm start`
6. **Add environment variables** (copy from above)
7. **Deploy!**

See **RENDER_DEPLOYMENT.md** for detailed steps.
