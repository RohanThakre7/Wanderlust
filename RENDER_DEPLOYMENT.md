# Deploy Wanderlust to Render - Step by Step Guide

## ✅ Pre-Deployment Checklist

Your app is ready! Here's what's configured:
- ✅ MongoDB Atlas connection
- ✅ Cloudinary for image uploads
- ✅ MongoDB session storage
- ✅ Environment variables setup
- ✅ Procfile for Render
- ✅ Start script in package.json

---

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   ```

2. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (e.g., `wanderlust`)
   - **DO NOT** initialize with README

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/wanderlust.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Create Render Account

1. Go to [Render](https://render.com)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with **GitHub** (recommended - easier to connect repos)
4. Authorize Render to access your GitHub repositories

---

### Step 3: Create Web Service on Render

1. **Click "New +"** → **"Web Service"**

2. **Connect Repository**:
   - Click **"Connect account"** if needed
   - Select your **wanderlust** repository
   - Click **"Connect"**

3. **Configure Service**:
   - **Name**: `wanderlust` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., `Oregon (US West)`)
   - **Branch**: `main` (or `master`)
   - **Root Directory**: (leave empty)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node app.js`)
   - **Instance Type**: 
     - **Free** (for testing) - spins down after 15 min inactivity
     - **Starter** ($7/month) - always on, better for production

4. **Click "Create Web Service"**

---

### Step 4: Add Environment Variables

**IMPORTANT**: Add these in Render dashboard before first deployment!

1. Go to your service → **"Environment"** tab

2. **Add these environment variables**:

   ```
   MONGO_URL=mongodb+srv://rohanzx71_db_user:YOUR_PASSWORD@clusterwl1.19vwc0e.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=ClusterWl1
   ```
   ⚠️ **Replace `YOUR_PASSWORD` with your actual MongoDB password**

   ```
   SESSION_SECRET=generate-a-strong-random-string-here
   ```
   💡 **Generate with**: `openssl rand -base64 32`

   ```
   NODE_ENV=production
   ```

   ```
   PORT=10000
   ```
   (Render sets this automatically, but include for safety)

   ```
   CLOUDINARY_CLOUD_NAME=dqpnbeosr
   ```

   ```
   CLOUDINARY_API_KEY=399842376616793
   ```

   ```
   CLOUDINARY_API_SECRET=O97cBjWQb0ZI96LUK4GstCo46rg
   ```

3. **Click "Save Changes"**

---

### Step 5: Update MongoDB Atlas Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (`0.0.0.0/0`)
   - Or add Render's IP ranges for better security
4. **Save**

---

### Step 6: Deploy

1. Render will **automatically start deploying** after you save environment variables
2. Watch the **"Logs"** tab for deployment progress
3. Wait 5-10 minutes for first deployment
4. You'll see: **"Your service is live at https://wanderlust.onrender.com"**

---

### Step 7: Test Your Deployed App

1. **Visit your app URL** (e.g., `https://wanderlust.onrender.com`)
2. **Test**:
   - ✅ Homepage loads
   - ✅ User signup/login
   - ✅ Create listing with image upload
   - ✅ View listings
   - ✅ Add reviews

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to MongoDB"
- **Fix**: Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- **Fix**: Verify `MONGO_URL` in Render environment variables is correct

### Issue: "Session not working"
- **Fix**: Ensure `SESSION_SECRET` is set in Render
- **Fix**: Check `NODE_ENV=production` is set

### Issue: "Images not uploading"
- **Fix**: Verify all `CLOUDINARY_*` variables are set in Render
- **Fix**: Check Cloudinary credentials are correct

### Issue: "App crashes on startup"
- **Fix**: Check Render logs for specific error
- **Fix**: Verify all environment variables are set
- **Fix**: Check `package.json` has correct start script

### Issue: "Free tier spins down"
- **Fix**: Free tier sleeps after 15 min inactivity
- **Fix**: Upgrade to Starter ($7/month) for always-on

---

## 📝 Environment Variables Summary

Copy-paste these into Render (replace placeholders):

```env
MONGO_URL=mongodb+srv://rohanzx71_db_user:YOUR_PASSWORD@clusterwl1.19vwc0e.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=ClusterWl1
SESSION_SECRET=YOUR_STRONG_RANDOM_SECRET
NODE_ENV=production
PORT=10000
CLOUDINARY_CLOUD_NAME=dqpnbeosr
CLOUDINARY_API_KEY=399842376616793
CLOUDINARY_API_SECRET=O97cBjWQb0ZI96LUK4GstCo46rg
```

---

## 🎉 Post-Deployment

### Optional: Custom Domain
1. Go to Render service → **"Settings"**
2. **"Custom Domain"** → Add your domain
3. Follow DNS configuration instructions

### Auto-Deploy
- Render **automatically deploys** on every git push to `main` branch
- No manual deployment needed!

### Monitor
- Check **"Logs"** tab for errors
- Check **"Metrics"** for performance
- Monitor MongoDB Atlas for connection issues

---

## 🆘 Need Help?

- **Render Docs**: https://render.com/docs
- **Render Status**: https://status.render.com
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

---

**Good luck with your deployment! 🚀**
