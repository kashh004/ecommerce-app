# 🚀 Deployment Guide

This guide will help you deploy your e-commerce application to production.

## 📋 Prerequisites

1. **GitHub Account** - For code repository
2. **Vercel Account** - For frontend hosting (free)
3. **Render Account** - For backend hosting (free)
4. **MongoDB Atlas Account** - For database (free tier available)

## 🗄️ Step 1: Set up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create a database user with password
5. Get your connection string
6. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

## 🔧 Step 2: Deploy Backend to Render

### Option A: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ecommerce-app.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `ecommerce-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add environment variables:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_jwt_secret_key
     NODE_ENV=production
     PORT=10000
     ```
   - Click "Create Web Service"

### Option B: Deploy via Render CLI

1. Install Render CLI:
   ```bash
   npm install -g @render/cli
   ```

2. Deploy:
   ```bash
   cd backend
   render deploy
   ```

## 🌐 Step 3: Deploy Frontend to Vercel

### Option A: Deploy via GitHub (Recommended)

1. **Create a new repository for frontend only:**
   ```bash
   # Create a new directory for frontend
   mkdir ecommerce-frontend
   cd ecommerce-frontend
   
   # Copy frontend files (excluding backend)
   cp -r ../project/src ./
   cp -r ../project/public ./
   cp ../project/package.json ./
   cp ../project/vite.config.js ./
   cp ../project/index.html ./
   cp ../project/vercel.json ./
   ```

2. **Update package.json for frontend only:**
   ```json
   {
     "name": "ecommerce-frontend",
     "private": true,
     "version": "1.0.0",
     "type": "module",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     },
     "dependencies": {
       "react": "^19.1.0",
       "react-dom": "^19.1.0",
       "react-router-dom": "^6.28.0",
       "axios": "^1.7.9",
       "bootstrap": "^5.3.3",
       "react-bootstrap": "^2.10.1",
       "jwt-decode": "^4.0.0"
     },
     "devDependencies": {
       "@types/react": "^19.1.8",
       "@types/react-dom": "^19.1.6",
       "@vitejs/plugin-react": "^4.6.0",
       "vite": "^7.0.4"
     }
   }
   ```

3. **Create .env file with your backend URL:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `./`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## 🔗 Step 4: Update CORS Settings

Update your backend `server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

## 🧪 Step 5: Test Your Deployment

1. **Test Backend API:**
   ```bash
   curl https://your-backend-url.onrender.com/api/products
   ```

2. **Test Frontend:**
   - Visit your Vercel URL
   - Try registering/logging in
   - Test product browsing and cart functionality

## 🔧 Step 6: Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
PORT=10000
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Check CORS configuration in backend
   - Ensure frontend URL is in allowed origins

2. **Database Connection:**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings

3. **Build Errors:**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json

4. **Environment Variables:**
   - Ensure all variables are set in deployment platform
   - Check variable names match exactly

## 📞 Support

If you encounter issues:
1. Check deployment platform logs
2. Verify environment variables
3. Test API endpoints individually
4. Check browser console for frontend errors

## 🎉 Success!

Once deployed, your e-commerce app will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.onrender.com`

Your app is now ready for production use! 🚀 