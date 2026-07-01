# Happy Pocket Deployment Guide

This guide describes building, testing, and deploying the Happy Pocket client application.

## 1. Local Production Compilation

To run a production-ready compilation locally:
1. Ensure node dependencies are up to date:
   ```bash
   npm install
   ```
2. Build the optimized static bundle:
   ```bash
   npm run build
   ```
3. Preview the compiled production build locally to ensure no bundle load issues occur:
   ```bash
   npm run preview
   ```
The output files will be compiled inside the `/dist` directory.

---

## 2. Deploying to Vercel (Recommended)

Vercel is the optimal host for Vite-based React projects, offering integrated CDN distributions and automatic preview deployments.

### Option A: Via Vercel CLI
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Initiate login:
   ```bash
   vercel login
   ```
3. Deploy the application:
   ```bash
   vercel --prod
   ```

### Option B: Via Vercel Dashboard Git Integration
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Log in to the Vercel Dashboard and click **Add New Project**.
3. Import your project repository.
4. Configure build settings:
   * **Framework Preset**: `Vite` (Vercel automatically detects this configuration)
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Click **Deploy**. Vercel will build and assign an SSL secured subdomain automatically.

---

## 3. Deploying to Netlify

Netlify handles single-page app redirects cleanly.

### Setup Steps
1. Create a project on Netlify.
2. Link your Git repository.
3. Configure compilation properties:
   * **Build Command**: `npm run build`
   * **Publish Directory**: `dist`
4. Add redirection routing:
   Since React Router uses client-side history navigation, you must add a Netlify redirect rule so direct URL entries redirect back to the home router index instead of throwing a `404 Not Found` error.
   Create `public/_redirects` inside the repository:
   ```text
   /*    /index.html   200
   ```
5. Click deploy.
