# Interview Wiki - PDF-Powered Blog UI

A responsive, modern blog interface that automatically converts PDF documents into readable web articles. Built with vanilla JavaScript, HTML, CSS, and PDF.js with intelligent Python-based PDF sync automation. Perfect for documentation, technical resources, and content management.

## Features

### 🎨 **Modern Design**
- Clean, minimalist interface with excellent typography
- Dark/light theme toggle with system preference detection
- Fully responsive design (mobile-first approach)
- Smooth animations and transitions

### 📄 **PDF Processing**
- Automatic PDF text extraction using PDF.js
- Smart content formatting and section detection
- **Python-based intelligent sync automation**
- Automatic category assignment based on filename and content
- Dynamic tag generation from content analysis
- Real-time PDF refresh functionality
- **One-command PDF sync** - no manual code updates needed

### � **Advanced Search & Filtering**
- Real-time search across PDF titles, content, and tags
- Category-based filtering
- Tag-based filtering with clickable tag clouds
- Multiple sorting options (date, title, category)

### 📱 **Responsive Layout**
- Mobile-optimized navigation
- Collapsible sidebar on smaller screens
- Touch-friendly interface elements
- Optimized for all device sizes

### ⚡ **Performance**
- Vanilla JavaScript (no framework dependencies)
- Lazy loading and efficient rendering
- Minimal bundle size
- Fast search and filtering

### 🎯 **User Experience**
- Keyboard shortcuts (Ctrl/Cmd + K for search, Esc to close)
- Smooth page transitions
- Reading progress indicators
- Syntax highlighting for code blocks

## Quick Start

### Option 1: Manual Setup
1. **Clone or download** the project files
2. **Add PDF files** to the `pdfs/` directory
3. **Open** `index.html` in your web browser
4. **Browse** your PDF documents as beautiful web articles!

```bash
# If using a local server (recommended)
python -m http.server 8000
# or
npx serve .
```

### Option 2: Automated Setup (Recommended)
1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Add PDF files** to the `pdfs/` directory

3. **Run the sync tool**:
   ```bash
   python sync_pdfs.py
   ```

4. **Start local server**:
   ```bash
   python -m http.server 8000
   ```

5. **Open** `http://localhost:8000` in your browser

## 🐍 Python PDF Sync Tool

The included Python script automatically syncs your PDF files with the web application:

### ✨ **What It Does**
- **Scans** the `pdfs/` directory for all PDF files
- **Extracts metadata** (pages, title, author, content preview)
- **Smart categorization** based on filename and content analysis
- **Generates professional excerpts** and relevant tags
- **Updates `app.js`** automatically with current PDF list
- **Creates metadata file** with all PDF information

### 🚀 **Usage**
```bash
# Basic sync (updates everything)
python sync_pdfs.py

# Preview changes without modifying files
python sync_pdfs.py --dry-run

# Specify different project directory
python sync_pdfs.py --dir /path/to/project
```

### 🎯 **Benefits**
- ⚡ **No manual code editing** required
- 🧠 **Intelligent categorization** (20+ categories)
- 🏷️ **Auto-generated tags** and excerpts
- 🔄 **Consistent workflow** for adding PDFs
- 📊 **Detailed metadata tracking**

### 📋 **Workflow**
1. Add PDF to `pdfs/` folder
2. Run `python sync_pdfs.py`
3. Review auto-generated changes
4. Test locally and deploy

**See `PDF_SYNC_GUIDE.md` for detailed documentation.**

## File Structure

```
interview-wiki/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles and themes
├── app.js                  # Main JavaScript application
├── sync_pdfs.py           # Python PDF sync automation tool
├── requirements.txt        # Python dependencies
├── pdf_metadata.json      # Generated PDF metadata (auto-created)
├── README.md              # This file
├── PDF_SYNC_GUIDE.md      # Detailed Python sync tool guide
├── DEPLOYMENT.md          # GitHub Pages deployment guide
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
└── pdfs/                  # Your PDF resources
    ├── Aws-1.pdf
    ├── GitHub_Actions_Complete_Guide.pdf
    ├── IQ cheat sheet.pdf
    ├── Terraform.pdf
    └── docker-tutorial.pdf
```

## How It Works

### Automated PDF Processing (Recommended)
1. **Place PDF files** in the `pdfs/` directory
2. **Run the sync tool**: `python sync_pdfs.py`
3. **Python script analyzes** PDFs and updates code automatically
4. **Smart categorization** based on filename and content analysis
5. **Professional excerpts** and tags generated automatically
6. **Code updated** without manual intervention

### Manual PDF Processing (Alternative)
1. **Place PDF files** in the `pdfs/` directory
2. **Refresh the page** or click the refresh button
3. **PDF.js extracts text** from your documents
4. **Basic categorization** based on filename patterns
5. **Dynamic tag generation** from content analysis
6. **Beautiful formatting** with sections and paragraphs

### Adding New PDFs (Automated Workflow)
1. **Add PDF** to the `pdfs/` directory
2. **Run sync tool**: `python sync_pdfs.py`
3. **Review changes** in `app.js` and `pdf_metadata.json`
4. **Test locally** and deploy

The automated system will:
- **Extract comprehensive metadata** (pages, title, author, content)
- **Intelligently categorize** based on 20+ categories
- **Generate professional excerpts** tailored to content type
- **Create relevant tags** from content analysis
- **Update code automatically** - no manual editing needed

### Supported PDF Types
- Technical documentation
- Interview guides
- Setup instructions
- Reference materials
- Any text-based PDF document

### Modifying Categories

Edit the category list in `index.html`:

```html
<ul class="category-list" id="categoryList">
    <li><a href="#" data-category="all" class="active">All Posts</a></li>
    <li><a href="#" data-category="your-category">Your Category</a></li>
    <!-- Add more categories -->
</ul>
```

### Customizing Themes

Modify CSS custom properties in `styles.css`:

```css
:root {
  --accent-color: #your-color;
  --bg-primary: #your-background;
  /* Modify other theme variables */
}
```

### Current PDF Categories

The system automatically categorizes PDFs based on filename patterns:
- **AWS** - Amazon Web Services documentation
- **GitHub Actions** - CI/CD and automation guides
- **Interview** - Interview preparation materials
- **Terraform** - Infrastructure as Code resources
- **macOS** - System setup and configuration guides

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Dependencies

### External CDN Resources
- **Google Fonts** - Inter font family
- **Highlight.js** - Syntax highlighting for code blocks
- **PDF.js** - PDF parsing and text extraction

### No Build Process Required
This is a vanilla JavaScript application with no build step or package manager required.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Open search |
| `Esc` | Close search or return to article list |

## API Reference

### BlogApp Class Methods

```javascript
// Access the global blog app instance
const app = window.blogApp;

// Add new article
app.addArticle(articleObject);

// Remove article by ID
app.removeArticle(articleId);

// Update existing article
app.updateArticle(articleId, updates);

// Filter articles
app.setActiveCategory(categoryName);

// Toggle theme
app.toggleTheme();
```

## Performance Tips

1. **Images**: Optimize images before adding them to articles
2. **Content**: Keep article content reasonable in size
3. **Search**: The search is optimized for up to ~1000 articles
4. **Code Blocks**: Use syntax highlighting sparingly for better performance

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast theme options
- Screen reader friendly

## License

MIT License - feel free to use this in your projects!

## Contributing

This is a simple, self-contained blog UI. To contribute:

1. Fork the repository
2. Make your changes
3. Test across different browsers
4. Submit a pull request

## Troubleshooting

### Search Not Working
- Ensure JavaScript is enabled in your browser
- Check browser console for any errors

### Styles Not Loading
- Make sure `styles.css` is in the same directory as `index.html`
- Check that the file path is correct

### Code Highlighting Not Working
- Verify that Highlight.js CDN is accessible
- Check your internet connection for CDN resources

---

**Built with ❤️ for the developer community**
