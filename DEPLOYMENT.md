# Wanderlust Deployment Guide

This guide will walk you through deploying your Wanderlust application step by step.

## Table of Contents
1. [Pre-Deployment Preparation](#pre-deployment-preparation)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Cloud Storage Setup (for images)](#cloud-storage-setup)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Deploy to Render](#deploy-to-render)
6. [Alternative: Deploy to Railway](#alternative-deploy-to-railway)
7. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Pre-Deployment Preparation

### Step 1: Update app.js for Production

The app currently has hardcoded values. We need to make it environment-aware.

**Changes needed:**
- Replace hardcoded MongoDB URL with environment variable
- Replace hardcoded session secret with environment variable
- Make port configurable
- Add production-ready session settings

### Step 2: Update package.json

Add a start script for production deployment.

---

## MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Cluster
1. Click "Create" or "Build a Database"
2. Choose **FREE** tier (M0)
3. Select a cloud provider and region (choose closest to your deployment region)
4. Name your cluster (e.g., "wanderlust-cluster")
5. Click "Create"

### Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password (SAVE THIS!)
5. Set privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - **Note:** For production, restrict to your deployment platform's IP ranges
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `wanderlust` (or your preferred database name)
6. **Save this connection string** - you'll need it for deployment

---

## Cloud Storage Setup (for images)

Since the `uploads` folder won't persist on most hosting platforms, you need cloud storage.

### Option A: Cloudinary (Recommended - Free Tier Available)

1. **Sign up at [Cloudinary](https://cloudinary.com)**
   - Free tier includes 25GB storage and 25GB bandwidth

2. **Get your credentials:**
   - Dashboard → Settings → Product Environment Credentials
   - Copy: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

3. **Install Cloudinary:**
   ```bash
   npm install cloudinary multer-storage-cloudinary
   ```

### Option B: AWS S3 (More Complex)

1. Create AWS account
2. Create S3 bucket
3. Configure IAM user with S3 access
4. Install `aws-sdk` and `multer-s3`

### Option C: Keep Local Storage (Not Recommended)
- Only works on platforms with persistent storage
- Files will be lost on server restarts

---

## Environment Variables Setup

### Step 1: Create .env file (for local development)

Create a `.env` file in your project root:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
PORT=3000
NODE_ENV=development

# If using Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 2: Update app.js to use environment variables

The app.js needs to be updated to read from environment variables.

---

## Deploy to Render

### Step 1: Prepare Your Repository
1. Make sure your code is pushed to GitHub/GitLab/Bitbucket
2. Ensure `.env` is in `.gitignore` (already done)
3. Commit all changes

### Step 2: Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub (recommended) or email
3. Verify your email

### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your repository (authorize Render if needed)
3. Select your `wanderlust` repository
4. Configure settings:
   - **Name:** wanderlust (or your preferred name)
   - **Region:** Choose closest to your users
   - **Branch:** main (or master)
   - **Root Directory:** (leave empty if root)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node app.js`
   - **Instance Type:** Free (or paid for better performance)

### Step 4: Add Environment Variables
In Render dashboard, go to your service → Environment:
- `MONGO_URL` = Your MongoDB Atlas connection string
- `SESSION_SECRET` = Generate a strong random string (use: `openssl rand -base64 32`)
- `PORT` = 10000 (Render sets this automatically, but include for safety)
- `NODE_ENV` = production
- `CLOUDINARY_CLOUD_NAME` = (if using Cloudinary)
- `CLOUDINARY_API_KEY` = (if using Cloudinary)
- `CLOUDINARY_API_SECRET` = (if using Cloudinary)

### Step 5: Deploy
1. Click "Create Web Service"
2. Render will build and deploy your app
3. Wait for deployment to complete (5-10 minutes)
4. Your app will be live at: `https://your-app-name.onrender.com`

### Step 6: Update MongoDB Network Access
1. Go back to MongoDB Atlas
2. Network Access → Add IP Address
3. Add Render's IP ranges or use 0.0.0.0/0 (less secure but simpler)

---

## Alternative: Deploy to Railway

### Step 1: Create Railway Account
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `wanderlust` repository

### Step 3: Add MongoDB Service
1. Click "+ New"
2. Select "Database" → "MongoDB"
3. Railway will create a MongoDB instance automatically
4. Copy the connection string from the MongoDB service

### Step 4: Configure Environment Variables
1. Go to your Web Service → Variables
2. Add:
   - `MONGO_URL` = Railway MongoDB connection string (or Atlas)
   - `SESSION_SECRET` = Generate random string
   - `NODE_ENV` = production
   - `CLOUDINARY_*` = (if using Cloudinary)

### Step 5: Deploy
1. Railway auto-deploys on git push
2. Your app will be live at: `https://your-app-name.up.railway.app`

---

## Post-Deployment Checklist

### ✅ Security Checklist
- [ ] Session secret is strong and unique
- [ ] MongoDB password is strong
- [ ] Environment variables are set correctly
- [ ] `.env` file is not committed to git
- [ ] MongoDB network access is configured
- [ ] HTTPS is enabled (Render/Railway do this automatically)

### ✅ Functionality Checklist
- [ ] App loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Creating listings works
- [ ] Image uploads work (if configured)
- [ ] Reviews can be added
- [ ] Search functionality works
- [ ] Flash messages display correctly

### ✅ Performance Checklist
- [ ] Database connection is stable
- [ ] Images load correctly
- [ ] Pages load in reasonable time
- [ ] No console errors

### ✅ Monitoring
- Check Render/Railway logs regularly
- Monitor MongoDB Atlas for connection issues
- Set up error tracking (optional: Sentry)

---

## Troubleshooting

### Common Issues:

1. **"Cannot connect to MongoDB"**
   - Check MongoDB Atlas network access (allow 0.0.0.0/0)
   - Verify connection string is correct
   - Check username/password

2. **"Session not working"**
   - Verify SESSION_SECRET is set
   - Check cookie settings in production

3. **"Images not uploading"**
   - Check Cloudinary credentials
   - Verify multer configuration
   - Check file size limits

4. **"App crashes on startup"**
   - Check logs in Render/Railway dashboard
   - Verify all environment variables are set
   - Check Node.js version compatibility

5. **"Port already in use"**
   - Use `process.env.PORT || 3000` in app.js
   - Render/Railway set PORT automatically

---

## Next Steps

1. **Set up custom domain** (optional)
   - Render: Settings → Custom Domain
   - Railway: Settings → Generate Domain

2. **Enable auto-deploy** (usually enabled by default)
   - Deploys automatically on git push

3. **Set up monitoring**
   - Use Render/Railway built-in monitoring
   - Consider adding error tracking (Sentry)

4. **Optimize performance**
   - Enable caching
   - Optimize images
   - Use CDN for static assets

---

## Quick Reference Commands

```bash
# Generate session secret
openssl rand -base64 32

# Test MongoDB connection locally
mongosh "your-connection-string"

# Check Node version
node --version

# Install dependencies
npm install

# Run locally
node app.js
```

---

**Need Help?**
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
