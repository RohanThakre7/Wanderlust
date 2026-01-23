# How to Find MongoDB Atlas Network Access

## 📍 Step-by-Step Guide

### Method 1: Direct Navigation

1. **Go to MongoDB Atlas Dashboard**
   - Visit: https://cloud.mongodb.com
   - Log in with your credentials

2. **Select Your Project**
   - If you have multiple projects, click on the project that contains your cluster

3. **Click on "Network Access"**
   - Look in the **left sidebar menu**
   - It's usually located between **"Database Access"** and **"Database"**
   - Click on **"Network Access"** (or **"IP Access List"** in older versions)

### Method 2: From Your Cluster

1. **Go to Database → Your Cluster**
   - Click **"Database"** in the left sidebar
   - Click on your cluster name (e.g., "ClusterWl1")

2. **Click "Network Access" Tab**
   - At the top of the page, you'll see tabs like:
     - Overview
     - Collections
     - **Network Access** ← Click this
     - Performance Advisor
     - etc.

### Method 3: Quick Access URL

1. **Direct URL Pattern**:
   ```
   https://cloud.mongodb.com/v2#/security/network/list
   ```
   - Replace with your project ID if needed
   - Or navigate: **Security** → **Network Access**

---

## 🔍 What You Should See

Once you're in Network Access, you should see:

- **A list of IP addresses** (if any are configured)
- **A green "+ ADD IP ADDRESS" button** (top right)
- **Options to add:**
  - Specific IP addresses
  - IP ranges
  - **"Allow Access from Anywhere"** (0.0.0.0/0)

---

## ✅ Steps to Allow Render Access

1. **Click "+ ADD IP ADDRESS"** (green button, top right)

2. **Choose one of these options:**

   **Option A: Allow from Anywhere (Easiest)**
   - Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (allows all IPs)
   - ⚠️ **Less secure** but works for development/testing
   - Click **"Confirm"**

   **Option B: Add Specific IP (More Secure)**
   - Enter Render's IP ranges (if known)
   - Or add your current IP for testing
   - Click **"Confirm"**

3. **Wait for Status to Change**
   - The new entry will show as **"Active"** (green)
   - This usually takes a few seconds

---

## 🖼️ Visual Guide

```
MongoDB Atlas Dashboard
├── Projects (dropdown)
├── Database Access        ← User management
├── Network Access         ← THIS IS WHAT YOU NEED! 🔴
├── Database               ← Your clusters
├── Data Federation
└── ...
```

**Network Access Page Layout:**
```
┌─────────────────────────────────────────┐
│  Network Access                    [+ ADD IP ADDRESS] │
├─────────────────────────────────────────┤
│  IP Address        Access List Entry     │
│  0.0.0.0/0         Allow from Anywhere  │
│  192.168.1.1       My Home IP           │
└─────────────────────────────────────────┘
```

---

## 🆘 Still Can't Find It?

### Check These:

1. **Are you logged in?**
   - Make sure you're logged into the correct MongoDB Atlas account

2. **Do you have the right permissions?**
   - You need **Organization Owner** or **Project Owner** role
   - Contact your organization admin if you don't see it

3. **Try the search bar:**
   - At the top of Atlas dashboard, there's a search bar
   - Type: **"Network Access"** or **"IP Access"**

4. **Check the URL:**
   - The URL should contain: `/security/network/` or `/networkAccess/`

5. **Different Atlas Version:**
   - Some older versions call it **"IP Whitelist"** or **"IP Access List"**
   - Look for any security/network related option

---

## 📱 Alternative: Mobile/Tablet View

If you're on mobile:
1. Click the **hamburger menu** (☰) in top left
2. Scroll to find **"Security"** section
3. Click **"Network Access"**

---

## 🔗 Direct Links (Try These)

1. **Network Access List:**
   ```
   https://cloud.mongodb.com/v2#/security/network/list
   ```

2. **Or go to Security section:**
   ```
   https://cloud.mongodb.com/v2#/security
   ```
   Then click "Network Access"

---

## ✅ Quick Checklist

- [ ] Logged into MongoDB Atlas
- [ ] Selected the correct project
- [ ] Looking at left sidebar menu
- [ ] Found "Network Access" or "IP Access List"
- [ ] Clicked "+ ADD IP ADDRESS"
- [ ] Selected "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Clicked "Confirm"
- [ ] Status shows "Active"

---

## 🎯 What to Do After Adding IP

1. **Wait 1-2 minutes** for changes to propagate
2. **Test your connection** from Render
3. **Check Render logs** to see if MongoDB connection works

---

**Still having trouble?** 
- Take a screenshot of your MongoDB Atlas dashboard
- Or describe what you see in the left sidebar menu
- I can help guide you more specifically!
