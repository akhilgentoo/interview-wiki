# GitHub Pages Deployment Guide

This guide will help you deploy your PDF-powered Interview Wiki to GitHub Pages for free hosting.

## 🚀 Quick Setup

### Step 1: Push to GitHub
1. **Create a new repository** on GitHub (e.g., `interview-wiki`)
2. **Push your code** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PDF-powered blog"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/interview-wiki.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The deployment workflow will run automatically

### Step 3: Add Your PDFs
1. **Upload PDF files** to the `pdfs/` directory in your repository
2. **Commit and push** the changes:
   ```bash
   git add pdfs/
   git commit -m "Add PDF documents"
   git push
   ```
3. The site will **automatically redeploy** with your new PDFs

## 📁 Repository Structure

Your repository should look like this:
```
interview-wiki/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Deployment workflow
├── pdfs/                       # Your PDF files
│   ├── Aws-1.pdf
│   ├── docker-tutorial.pdf
│   └── ...
├── index.html                  # Main HTML file
├── app.js                      # JavaScript application
├── styles.css                  # Styling
├── README.md                   # Project documentation
└── DEPLOYMENT.md              # This file
```

## 🔧 Configuration

### Custom Domain (Optional)
If you have a custom domain:
1. **Uncomment** the CNAME line in `.github/workflows/deploy.yml`
2. **Replace** `yourdomain.com` with your actual domain
3. **Configure DNS** to point to GitHub Pages

### Adding New PDFs
To add new PDF files:
1. **Upload PDFs** to the `pdfs/` directory
2. **Update** the `knownPDFs` array in `app.js` (if needed)
3. **Commit and push** - site will auto-deploy

## 🌐 Access Your Site

After deployment, your site will be available at:
- **GitHub Pages URL**: `https://YOUR_USERNAME.github.io/interview-wiki/`
- **Custom domain** (if configured): `https://yourdomain.com/`

## 🔄 Automatic Updates

The deployment workflow runs automatically when you:
- ✅ **Push to main branch**
- ✅ **Add new PDFs**
- ✅ **Update any files**
- ✅ **Run manually** from Actions tab

## 🛠️ Troubleshooting

### PDFs Not Loading
- Ensure PDFs are in the `pdfs/` directory
- Check that filenames match exactly in `app.js`
- Verify PDFs are not corrupted

### Deployment Failed
- Check the **Actions** tab for error details
- Ensure repository has Pages enabled
- Verify workflow file syntax

### Site Not Updating
- Check if deployment completed successfully
- Clear browser cache (Ctrl+Shift+R)
- Wait a few minutes for CDN to update

## 📝 Notes

- **Free hosting** with GitHub Pages
- **Automatic HTTPS** provided
- **Custom domains** supported
- **No server maintenance** required
- **Version control** for all changes

## 🎉 Success!

Once deployed, you'll have a professional PDF-powered blog accessible from anywhere on the internet!

Your PDFs will be beautifully displayed with:
- 📱 **Responsive design**
- 🔍 **Search functionality**
- 🏷️ **Tag filtering**
- 📄 **PDF viewer with controls**
- 🌙 **Dark/light theme toggle**
