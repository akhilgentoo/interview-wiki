# PDF Sync Tool Guide

Automatically sync your PDF files with the Interview Wiki project. No more manual code updates!

## 🚀 Quick Setup

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Sync Tool
```bash
python sync_pdfs.py
```

## 📋 What It Does

The sync tool automatically:

### ✅ **Scans PDF Directory**
- Finds all `.pdf` files in the `pdfs/` folder
- Reports what files were found

### ✅ **Extracts PDF Metadata**
- **Page count** for read time estimation
- **PDF title, author, subject** from metadata
- **First page text** for smart categorization
- **File size** information

### ✅ **Smart Categorization**
Automatically categorizes PDFs based on filename and content:
- **aws** - AWS, Amazon, Cloud services
- **docker** - Docker, containerization
- **kubernetes** - K8s, orchestration
- **python** - Python, Django, Flask
- **javascript** - JS, React, Vue, Angular
- **devops** - CI/CD, Jenkins, Ansible
- **security** - Cybersecurity, encryption
- **interview** - Coding, algorithms, prep
- **tutorial** - Guides, how-tos
- **reference** - Cheat sheets, manuals

### ✅ **Generates Smart Content**
- **Professional titles** from filenames
- **Relevant tags** based on content
- **Custom excerpts** for each category
- **Read time estimates** (2 min per page)

### ✅ **Updates Code Automatically**
- **Updates `app.js`** with current PDF list
- **Saves metadata** to `pdf_metadata.json`
- **No manual code editing** required

## 🛠️ Usage Examples

### Basic Sync
```bash
python sync_pdfs.py
```

### Dry Run (Preview Only)
```bash
python sync_pdfs.py --dry-run
```

### Specify Different Directory
```bash
python sync_pdfs.py --dir /path/to/project
```

## 📁 File Structure

After running the sync tool:
```
interview-wiki/
├── pdfs/                    # Your PDF files
│   ├── docker-tutorial.pdf
│   ├── kubernetes-guide.pdf
│   └── python-basics.pdf
├── sync_pdfs.py            # The sync tool
├── pdf_metadata.json       # Generated metadata
├── app.js                  # Auto-updated
└── requirements.txt        # Python dependencies
```

## 🔄 Workflow

### Adding New PDFs:
1. **Drop PDF** into `pdfs/` folder
2. **Run sync tool**: `python sync_pdfs.py`
3. **Review changes** in `app.js`
4. **Test locally**: `python -m http.server 8000`
5. **Commit and push** to GitHub

### Example Output:
```
🔄 Starting PDF sync process...
📂 Project directory: /Users/you/interview-wiki

📁 Found 5 PDF files:
   • Aws-1.pdf
   • docker-tutorial.pdf
   • kubernetes-guide.pdf
   • python-basics.pdf
   • react-handbook.pdf

🔍 Analyzing PDF files...
   📄 Processing: Aws-1.pdf
   📄 Processing: docker-tutorial.pdf
   📄 Processing: kubernetes-guide.pdf
   📄 Processing: python-basics.pdf
   📄 Processing: react-handbook.pdf

✅ Updated app.js with 5 PDF files
💾 Saved metadata to pdf_metadata.json

🎉 Sync completed successfully!
   📊 Processed 5 PDF files
   📝 Generated metadata for all files
   🔧 Updated app.js with current PDF list

💡 Next steps:
   1. Review the changes in app.js
   2. Test locally: python -m http.server 8000
   3. Commit and push to GitHub for deployment
```

## 🎯 Benefits

### ⚡ **Instant Updates**
- No more manual code editing
- Automatic categorization
- Smart content generation

### 🧠 **Intelligent Processing**
- Reads PDF metadata
- Analyzes content for categorization
- Generates relevant tags and excerpts

### 🔄 **Seamless Workflow**
- Add PDF → Run script → Deploy
- Perfect for regular content updates
- Maintains code consistency

### 🛡️ **Safe & Reliable**
- Dry run mode for testing
- Backs up existing code structure
- Only updates the PDF list array

## 🔧 Troubleshooting

### PDF Not Detected
- Ensure file has `.pdf` extension
- Check file is in `pdfs/` directory
- Verify file is not corrupted

### Sync Failed
- Check `app.js` exists in project root
- Ensure Python dependencies installed
- Run with `--dry-run` to test first

### Wrong Category
- Rename PDF with descriptive filename
- Categories based on filename keywords
- Manual override in generated metadata

## 🚀 Advanced Usage

### Custom Categories
Edit the `categories` dict in `sync_pdfs.py`:
```python
categories = {
    'my-category': ['keyword1', 'keyword2'],
    # Add your custom categories
}
```

### Custom Excerpts
Edit the `excerpts` dict in `generate_excerpt()`:
```python
excerpts = {
    'my-category': "Custom excerpt for my category",
    # Add your custom excerpts
}
```

## 💡 Pro Tips

1. **Use descriptive filenames** for better categorization
2. **Run dry-run first** to preview changes
3. **Keep PDFs organized** in the pdfs/ folder
4. **Test locally** before deploying
5. **Commit regularly** to track changes

---

**No more manual syncing! Just add PDFs and run the script.** 🎉
