# Deploy to Netlify

## Method 1: Drag & Drop (Easiest)
1. Run build command:
```bash
cd "C:\Users\princ\OneDrive\Desktop\E-commerce"
npm run build
```

2. Go to https://app.netlify.com/drop

3. Drag and drop the `dist` folder

4. Your site is live! 🎉

## Method 2: GitHub Auto-Deploy (Recommended)
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub account
4. Select your `ecommerce` repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

Your site will auto-deploy on every GitHub push!

---

# Deploy to Vercel

1. Go to https://vercel.com/new
2. Import GitHub repository
3. Framework preset: Next.js
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click "Deploy"

---

# Deploy to GitHub Pages

## Step 1: Update next.config.ts
Make sure this line exists:
```typescript
output: 'export',
distDir: 'dist',
```

## Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

## Step 3: Add to package.json
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

## Step 4: Deploy
```bash
npm run deploy
```

Site will be at: `https://yourusername.github.io/repo-name`
