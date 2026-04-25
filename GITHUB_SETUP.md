# GitHub Push Guide

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `ecommerce-app` (or any name)
3. Keep it Public or Private
4. **DON'T** initialize with README (we already have one)
5. Click "Create repository"

## Step 2: Run These Commands in Terminal

Open terminal in project folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - Full e-commerce app with auth, cart, payments"

# Add your GitHub repo URL (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify
Go to your GitHub repo URL - all files should be there!

## For Future Updates
```bash
git add .
git commit -m "Your update message"
git push origin main
```

## Important Files Included
- ✅ All source code (`src/`)
- ✅ Configuration files
- ✅ Static export ready (`next.config.ts`)
- ✅ Dependencies (`package.json`)
