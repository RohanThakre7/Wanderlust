# Quick Deployment Checklist

## 🚀 Fast Track Deployment (Render)

### 1. **MongoDB Atlas Setup** (5 minutes)
- [ ] Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Create free cluster (M0)
- [ ] Create database user (save username/password!)
- [ ] Network Access → Allow from anywhere (0.0.0.0/0)
- [ ] Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/wanderlust`

### 2. **Prepare Code** (2 minutes)
- [ ] Push code to GitHub
- [ ] Verify `.env` is in `.gitignore` ✅ (already done)
- [ ] Code is updated to use environment variables ✅ (already done)

### 3. **Deploy to Render** (10 minutes)
- [ ] Sign up at [render.com](https://render.com) (use GitHub)
- [ ] New → Web Service → Connect repository
- [ ] Settings:
  - **Build Command:** `npm install`
  - **Start Command:** `node app.js`
  - **Instance:** Free
- [ ] Add Environment Variables:
  ```
  MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust
  SESSION_SECRET=<generate with: openssl rand -base64 32>
  NODE_ENV=production
  PORT=10000
  ```
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (~5-10 min)

### 4. **Test** (2 minutes)
- [ ] Visit your app URL
- [ ] Test signup/login
- [ ] Test creating a listing
- [ ] Check logs if errors occur

---

## 📝 Environment Variables Template

Copy these to your deployment platform:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust
SESSION_SECRET=<generate-random-string>
NODE_ENV=production
PORT=10000
```

**Generate SESSION_SECRET:**
```bash
openssl rand -base64 32
```

---

## ⚠️ Important Notes

1. **Image Uploads**: Currently uses local storage. For production, set up Cloudinary (see DEPLOYMENT.md)
2. **MongoDB**: Update network access to allow Render's IPs for better security
3. **Session Secret**: Must be strong and unique in production
4. **HTTPS**: Enabled automatically on Render

---

## 🔧 Troubleshooting

**App won't start?**
- Check logs in Render dashboard
- Verify all environment variables are set
- Check MongoDB connection string

**Can't connect to MongoDB?**
- Verify network access allows 0.0.0.0/0
- Check username/password in connection string
- Ensure database name is correct

**Images not working?**
- Local uploads won't persist on free tier
- Set up Cloudinary (see full DEPLOYMENT.md)

---

For detailed instructions, see **DEPLOYMENT.md**
