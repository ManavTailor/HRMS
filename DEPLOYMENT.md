# HRMS Lite - Deployment Guide

## Quick Summary

Deploy your HRMS Lite application to production:
- **Database**: Supabase (PostgreSQL)
- **Backend**: Render
- **Frontend**: Vercel

---

## Prerequisites

- GitHub account
- Supabase account
- Render account  
- Vercel account

---

## Step 1: Database Setup (Supabase)

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

**Quick steps:**
1. Create Supabase account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy PostgreSQL connection URL (direct connection, port 5432)
4. Save your database password

---

## Step 2: Backend Deployment (Render)

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Render Web Service

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `hrms-lite-api`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 3. Add Environment Variables

In Render dashboard → Environment tab:

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[ref].supabase.co:5432/postgres
CORS_ORIGINS=http://localhost:5173
```

(Update `CORS_ORIGINS` after frontend deployment)

### 4. Deploy

- Click **"Create Web Service"**
- Wait for build to complete (~2-3 minutes)
- Copy your backend URL: `https://your-service.onrender.com`

---

## Step 3: Frontend Deployment (Vercel)

### 1. Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository

### 2. Configure Project

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3. Add Environment Variable

```
VITE_API_URL=https://your-render-backend.onrender.com
```

### 4. Deploy

- Click **"Deploy"**
- Wait for deployment (~1-2 minutes)
- Copy your frontend URL: `https://your-app.vercel.app`

---

## Step 4: Update CORS

Go back to Render → Environment → Update:

```
CORS_ORIGINS=https://your-app.vercel.app
```

Click **"Save Changes"** (Render will auto-redeploy)

---

## Step 5: Verify Deployment

### Test Backend
Visit: `https://your-backend.onrender.com/docs`

You should see the FastAPI interactive documentation.

### Test Frontend
Visit: `https://your-app.vercel.app`

You should see the HRMS dashboard.

### Test Full Flow
1. Add an employee
2. Mark attendance
3. View dashboard statistics

---

## Troubleshooting

### Backend Issues

**Build fails with pydantic error:**
- Ensure `.python-version` file exists with `python-3.11.0`
- Check `requirements.txt` has `pydantic[email]==2.6.0`

**Database connection error:**
- Verify `DATABASE_URL` is correct
- Use direct connection (port 5432), not pooler (port 6543)
- Check Supabase project is active

**CORS error:**
- Verify `CORS_ORIGINS` includes your Vercel URL
- No trailing slash in URLs

### Frontend Issues

**API calls fail:**
- Check `VITE_API_URL` environment variable
- Ensure backend is deployed and running
- Check browser console for errors

**Build fails:**
- Run `npm install` locally first
- Check for any missing dependencies

---

## Monitoring

### Render
- Logs: Dashboard → Your Service → Logs
- Metrics: Dashboard → Your Service → Metrics

### Vercel
- Deployments: Dashboard → Your Project → Deployments
- Analytics: Dashboard → Your Project → Analytics

### Supabase
- Database: Dashboard → Database → Usage
- Tables: Dashboard → Table Editor

---

## Updating Your Application

### Backend Updates
```bash
git add backend/
git commit -m "Update backend"
git push
```
Render auto-deploys on push.

### Frontend Updates
```bash
git add frontend/
git commit -m "Update frontend"
git push
```
Vercel auto-deploys on push.

---

## Important Notes

- **Free Tier Limits**: Render may sleep after inactivity (first request takes ~30s)
- **Database**: Supabase free tier: 500MB storage, 2GB bandwidth/month
- **HTTPS**: Both Render and Vercel provide free SSL certificates

---

## Next Steps

1. ✅ Test all features thoroughly
2. ✅ Monitor application performance
3. ✅ Set up error tracking (optional: Sentry)
4. ✅ Enable database backups in Supabase

---

**Your HRMS Lite is now live! 🎉**

For detailed Supabase setup, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
