// Simple PDF Blog Application - No Duplicates
class BlogApp {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentSort = 'date';
        this.searchQuery = '';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.processedFiles = new Set(); // Track processed files to prevent duplicates
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.loadPDFFiles();
    }

    // Simple PDF detection - check actual files in directory
    async loadPDFFiles() {
        this.showLoading();
        console.log('Loading PDF files...');
        
        try {
            // Clear previous data
            this.articles = [];
            this.processedFiles.clear();
            
            // Check only the files we know exist (from your directory listing)
            const knownPDFs = [
                'AI_ML.pdf',
                'AWS-Basic-Cheat-Sheet.pdf',
                'Aws-1.pdf',
                'GitHub_Actions_Complete_Guide.pdf',
                'GoogleCloudDeveloper.pdf',
                'IQ cheat sheet.pdf',
                'Jenkins-Cheat-Sheet-converted.pdf',
                'Kubernetes-Cheat-Sheet.pdf',
                'Nmap-Cheat-Sheet.pdf',
                'PostgreSQL-Cheat-Sheet.pdf',
                'Powershell.pdf',
                'System_Design_Blueprint.pdf',
                'Terraform.pdf',
                'ajax.pdf',
                'ansible.pdf',
                'atlassian-git-cheatsheet.pdf',
                'awk.pdf',
                'aws-cost.pdf',
                'aws-services.pdf',
                'cheatsheet-python-grok.pdf',
                'cicd-framework_by_densify.pdf',
                'cron.pdf',
                'curl.pdf',
                'docker-security.pdf',
                'docker-tutorial.pdf',
                'docker.pdf',
                'docker_by_jrebel.pdf',
                'ethtool.pdf',
                'find.pdf',
                'git_by_git-tower.pdf',
                'git_by_github.pdf',
                'github.pdf',
                'go_golang.pdf',
                'grep.pdf',
                'kubectl.pdf',
                'linux-bash-terminal.pdf',
                'linux-bash.pdf',
                'linux-networing-tools.pdf',
                'linux-networking-tool.pdf',
                'linux_commands.pdf',
                'netcat.pdf',
                'nginx.pdf',
                'ngrep.pdf',
                'nmap.pdf',
                'openssl.pdf',
                'ps.pdf',
                'puppet.pdf',
                'python-regular-expression-regex.pdf',
                'python_beginners.pdf',
                'redis.pdf',
                'regex.pdf',
                'rsync.pdf',
                'sed.pdf',
                'slack.pdf',
                'sort_uniq.pdf',
                'ssh.pdf',
                'tar.pdf',
                'terraform-cheatsheet1-.pdf',
                'top.pdf',
                'vim-cheat-sheet.pdf',
                'wireshark.pdf',
                'xargs.pdf',
            ];
            
            let id = 1;
            
            for (const filename of knownPDFs) {
                // Create a unique key to prevent duplicates
                const fileKey = filename.toLowerCase().replace(/[-_\s]/g, '');
                
                if (this.processedFiles.has(fileKey)) {
                    console.log(`Skipping duplicate: ${filename}`);
                    continue;
                }
                
                try {
                    // Check if file exists
                    const response = await fetch(`pdfs/${filename}`, { method: 'HEAD' });
                    if (response.ok) {
                        const article = await this.createPDFArticle(filename, id++);
                        if (article) {
                            this.articles.push(article);
                            this.processedFiles.add(fileKey);
                            console.log(`Added: ${filename}`);
                        }
                    }
                } catch (error) {
                    console.log(`File not found: ${filename}`);
                }
            }
            
            console.log(`Total PDFs loaded: ${this.articles.length}`);
            this.filteredArticles = [...this.articles];
            this.renderArticles();
            this.hideLoading();
            
        } catch (error) {
            console.error('Error loading PDF files:', error);
            this.showError('Failed to load PDF documents');
        }
    }
    
    async createPDFArticle(filename, id) {
        const pdfPath = `pdfs/${filename}`;
        
        try {
            // Get PDF info
            const loadingTask = pdfjsLib.getDocument(pdfPath);
            const pdf = await loadingTask.promise;
            const pageCount = pdf.numPages;
            
            const title = this.formatTitle(filename);
            const tags = this.generateTags(filename);
            const excerpt = this.createExcerpt(filename);
            
            return {
                id,
                title,
                excerpt,
                content: this.createPDFViewer(title, filename, pdfPath, pageCount),
                tags,
                date: new Date().toISOString().split('T')[0],
                readTime: `${Math.ceil(pageCount * 2)} min read`,
                filename,
                pageCount,
                pdfPath,
                isPDF: true
            };
            
        } catch (error) {
            console.error(`Error processing ${filename}:`, error);
            return null;
        }
    }
    
    formatTitle(filename) {
        return filename
            .replace('.pdf', '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .trim();
    }
    
    generateTags(filename) {
        const name = filename.toLowerCase();
        const tags = [];
        
        if (name.includes('aws')) tags.push('aws', 'cloud');
        if (name.includes('docker')) tags.push('docker', 'containers', 'devops');
        if (name.includes('github')) tags.push('github', 'ci-cd');
        if (name.includes('terraform')) tags.push('terraform', 'iac');
        if (name.includes('iq') || name.includes('interview')) tags.push('interview', 'preparation');
        if (name.includes('tutorial')) tags.push('tutorial', 'learning', 'guide');
        
        return tags.length > 0 ? tags : ['documentation'];
    }
    
    createExcerpt(filename) {
        const name = filename.toLowerCase();
        
        if (name.includes('aws')) return 'Comprehensive AWS guide covering cloud services, architecture, and best practices.';
        if (name.includes('docker')) return 'Complete Docker guide covering containerization, deployment, and best practices. Learn container orchestration and DevOps workflows.';
        if (name.includes('github')) return 'Complete guide to GitHub Actions for CI/CD automation and DevOps best practices.';
        if (name.includes('terraform')) return 'Infrastructure as Code guide using Terraform for cloud infrastructure management.';
        if (name.includes('iq') || name.includes('interview')) return 'Interview preparation materials with common questions and technical concepts.';
        
        return `${this.formatTitle(filename)} - Technical documentation and reference materials.`;
    }
    
    createPDFViewer(title, filename, pdfPath, pageCount) {
        return `
            <h1>${title}</h1>
            
            <div class="pdf-info">
                <p><strong>Source:</strong> ${filename}</p>
                <p><strong>Pages:</strong> ${pageCount}</p>
                <p><strong>Type:</strong> PDF Document</p>
            </div>
            
            <div class="pdf-viewer-container">
                <div class="pdf-controls">
                    <button class="pdf-btn" onclick="window.open('${pdfPath}', '_blank')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15,3 21,3 21,9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Open in New Tab
                    </button>
                    <button class="pdf-btn" onclick="this.parentElement.nextElementSibling.requestFullscreen()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                        </svg>
                        Fullscreen
                    </button>
                </div>
                
                <div class="pdf-embed">
                    <iframe 
                        src="${pdfPath}" 
                        width="100%" 
                        height="800px" 
                        style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <p>Your browser does not support PDFs. 
                           <a href="${pdfPath}" target="_blank">Download the PDF</a> instead.
                        </p>
                    </iframe>
                </div>
            </div>
        `;
    }
    
    showLoading() {
        const articlesGrid = document.getElementById('articlesGrid');
        articlesGrid.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading PDF documents...</p>
            </div>
        `;
    }
    
    hideLoading() {
        // Loading will be hidden when articles are rendered
    }
    
    showError(message) {
        const articlesGrid = document.getElementById('articlesGrid');
        articlesGrid.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 2rem; color: var(--error-color);">
                <h3>Error Loading Documents</h3>
                <p>${message}</p>
                <button onclick="window.blogApp.loadPDFFiles()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-color); color: white; border: none; border-radius: var(--radius-md); cursor: pointer;">
                    Retry
                </button>
            </div>
        `;
    }

    // Event Listeners
    setupEventListeners() {
        // Search functionality
        const searchToggle = document.getElementById('searchToggle');
        const searchContainer = document.getElementById('searchContainer');
        const searchInput = document.getElementById('searchInput');
        const searchClose = document.getElementById('searchClose');

        searchToggle?.addEventListener('click', () => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });

        searchClose?.addEventListener('click', () => {
            searchContainer.classList.remove('active');
            searchInput.value = '';
            this.searchQuery = '';
            this.filterArticles();
        });

        searchInput?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterArticles();
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Sort functionality
        const sortSelect = document.getElementById('sortSelect');
        sortSelect?.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.sortArticles();
        });
        
        // Refresh functionality
        const refreshBtn = document.getElementById('refreshBtn');
        refreshBtn?.addEventListener('click', () => {
            this.refreshPDFs();
        });

        // Tag filtering
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag')) {
                const tagText = e.target.textContent.toLowerCase();
                this.searchQuery = tagText;
                if (searchInput) searchInput.value = tagText;
                this.filterArticles();
            }
        });

        // Back button
        const backButton = document.getElementById('backButton');
        backButton?.addEventListener('click', () => {
            this.showBlogList();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (searchContainer?.classList.contains('active')) {
                    searchContainer.classList.remove('active');
                } else {
                    this.showBlogList();
                }
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchToggle?.click();
            }
        });
    }

    // Theme Management
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    // Article Filtering and Sorting
    filterArticles() {
        this.filteredArticles = this.articles.filter(article => {
            return this.searchQuery === '' || 
                article.title.toLowerCase().includes(this.searchQuery) ||
                article.excerpt.toLowerCase().includes(this.searchQuery) ||
                article.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
        });
        
        this.sortArticles();
    }

    sortArticles() {
        this.filteredArticles.sort((a, b) => {
            switch (this.currentSort) {
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
        
        this.renderArticles();
    }

    // Article Rendering
    renderArticles() {
        const articlesGrid = document.getElementById('articlesGrid');
        
        if (this.filteredArticles.length === 0) {
            articlesGrid.innerHTML = `
                <div class="text-center" style="grid-column: 1 / -1; padding: 2rem;">
                    <h3>No documents found</h3>
                    <p>Try adjusting your search or add PDF files to the pdfs/ directory.</p>
                </div>
            `;
            return;
        }
        
        articlesGrid.innerHTML = this.filteredArticles.map(article => `
            <div class="article-card" data-article-id="${article.id}">
                <div class="article-meta">
                    <span class="article-category">PDF Document</span>
                    <span>${this.formatDate(article.date)}</span>
                    <span>${article.readTime}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        // Add click listeners
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const articleId = parseInt(card.dataset.articleId);
                this.showArticle(articleId);
            });
        });
    }

    // Article Display
    showArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;
        
        const blogList = document.getElementById('blogList');
        const articleReader = document.getElementById('articleReader');
        const articleContent = document.getElementById('articleContent');
        
        articleContent.innerHTML = `
            <div class="article-meta mb-2">
                <span class="article-category">PDF Document</span>
                <span>${this.formatDate(article.date)}</span>
                <span>${article.readTime}</span>
            </div>
            ${article.content}
            <div class="article-tags mt-4">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        
        blogList.style.display = 'none';
        articleReader.style.display = 'block';
        window.scrollTo(0, 0);
    }

    showBlogList() {
        const blogList = document.getElementById('blogList');
        const articleReader = document.getElementById('articleReader');
        
        articleReader.style.display = 'none';
        blogList.style.display = 'block';
    }

    // Utility Methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Refresh PDFs
    async refreshPDFs() {
        console.log('Refreshing PDFs...');
        await this.loadPDFFiles();
    }

    // Add new PDF (for future use)
    addNewPDF(filename) {
        // To add a new PDF, just add it to the knownPDFs array in loadPDFFiles method
        console.log(`To add ${filename}, update the knownPDFs array in loadPDFFiles method`);
    }
}

// Initialize the blog application
document.addEventListener('DOMContentLoaded', () => {
    window.blogApp = new BlogApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogApp;
}
