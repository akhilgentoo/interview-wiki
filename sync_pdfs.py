#!/usr/bin/env python3
"""
PDF Sync Tool for Interview Wiki
Automatically syncs PDF files with app.js and generates metadata
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime
import PyPDF2
import argparse

class PDFSyncer:
    def __init__(self, project_dir="."):
        self.project_dir = Path(project_dir)
        self.pdfs_dir = self.project_dir / "pdfs"
        self.app_js_path = self.project_dir / "app.js"
        self.metadata_path = self.project_dir / "pdf_metadata.json"
        
    def scan_pdfs(self):
        """Scan the pdfs directory and return list of PDF files"""
        if not self.pdfs_dir.exists():
            print(f"❌ PDFs directory not found: {self.pdfs_dir}")
            return []
        
        pdf_files = []
        for file in self.pdfs_dir.glob("*.pdf"):
            pdf_files.append(file.name)
        
        print(f"📁 Found {len(pdf_files)} PDF files:")
        for pdf in sorted(pdf_files):
            print(f"   • {pdf}")
        
        return sorted(pdf_files)
    
    def extract_pdf_info(self, pdf_path):
        """Extract metadata from PDF file"""
        try:
            with open(pdf_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                
                # Get basic info
                num_pages = len(reader.pages)
                
                # Try to extract text from first page for better categorization
                first_page_text = ""
                if num_pages > 0:
                    try:
                        first_page_text = reader.pages[0].extract_text()[:500]
                    except:
                        pass
                
                # Get PDF metadata and convert to strings
                metadata = reader.metadata or {}
                title = str(metadata.get('/Title', '')) if metadata and metadata.get('/Title') else ''
                author = str(metadata.get('/Author', '')) if metadata and metadata.get('/Author') else ''
                subject = str(metadata.get('/Subject', '')) if metadata and metadata.get('/Subject') else ''
                
                return {
                    'pages': num_pages,
                    'title': title,
                    'author': author,
                    'subject': subject,
                    'first_page_text': first_page_text,
                    'file_size': os.path.getsize(pdf_path)
                }
        except Exception as e:
            print(f"⚠️  Could not extract info from {pdf_path.name}: {e}")
            return {
                'pages': 0,
                'title': '',
                'author': '',
                'subject': '',
                'first_page_text': '',
                'file_size': os.path.getsize(pdf_path) if os.path.exists(pdf_path) else 0
            }
    
    def categorize_pdf(self, filename, pdf_info):
        """Smart categorization based on filename and content"""
        name = filename.lower()
        content = (pdf_info.get('first_page_text', '') + ' ' + 
                  pdf_info.get('title', '') + ' ' + 
                  pdf_info.get('subject', '')).lower()
        
        # Define category patterns
        categories = {
            'aws': ['aws', 'amazon', 'cloud', 'ec2', 's3', 'lambda'],
            'docker': ['docker', 'container', 'containerization'],
            'kubernetes': ['kubernetes', 'k8s', 'orchestration', 'kubectl'],
            'terraform': ['terraform', 'infrastructure', 'iac'],
            'github-actions': ['github', 'actions', 'ci/cd', 'workflow'],
            'python': ['python', 'django', 'flask', 'pandas', 'numpy'],
            'javascript': ['javascript', 'js', 'node', 'react', 'vue', 'angular'],
            'devops': ['devops', 'deployment', 'jenkins', 'ansible'],
            'security': ['security', 'cybersecurity', 'encryption', 'auth'],
            'database': ['database', 'sql', 'mysql', 'postgresql', 'mongodb'],
            'interview': ['interview', 'coding', 'algorithm', 'leetcode'],
            'machine-learning': ['machine learning', 'ml', 'ai', 'tensorflow', 'pytorch'],
            'web-development': ['web', 'html', 'css', 'frontend', 'backend'],
            'mobile': ['mobile', 'android', 'ios', 'flutter', 'react native'],
            'data-science': ['data science', 'analytics', 'visualization', 'tableau'],
            'networking': ['network', 'tcp', 'http', 'dns', 'firewall'],
            'linux': ['linux', 'ubuntu', 'centos', 'bash', 'shell'],
            'tutorial': ['tutorial', 'guide', 'howto', 'step-by-step'],
            'reference': ['reference', 'cheat', 'sheet', 'quick', 'manual'],
            'certification': ['certification', 'exam', 'study', 'prep']
        }
        
        # Check filename and content for category matches
        for category, keywords in categories.items():
            for keyword in keywords:
                if keyword in name or keyword in content:
                    return category
        
        return 'general'
    
    def generate_tags(self, filename, pdf_info, category):
        """Generate relevant tags for the PDF"""
        name = filename.lower()
        content = (pdf_info.get('first_page_text', '') + ' ' + 
                  pdf_info.get('title', '') + ' ' + 
                  pdf_info.get('subject', '')).lower()
        
        tags = set()
        
        # Add category as tag
        tags.add(category)
        
        # Technology tags
        tech_tags = {
            'aws', 'docker', 'kubernetes', 'terraform', 'python', 'javascript',
            'react', 'vue', 'angular', 'nodejs', 'django', 'flask', 'spring',
            'java', 'golang', 'rust', 'typescript', 'mongodb', 'mysql', 
            'postgresql', 'redis', 'nginx', 'apache', 'linux', 'ubuntu',
            'git', 'jenkins', 'ansible', 'prometheus', 'grafana', 'elasticsearch'
        }
        
        for tech in tech_tags:
            if tech in name or tech in content:
                tags.add(tech)
        
        # Content type tags
        if any(word in name for word in ['guide', 'tutorial', 'howto']):
            tags.add('guide')
        if any(word in name for word in ['cheat', 'sheet', 'reference']):
            tags.add('reference')
        if any(word in name for word in ['interview', 'coding', 'algorithm']):
            tags.add('interview-prep')
        if any(word in name for word in ['setup', 'install', 'config']):
            tags.add('setup')
        if any(word in name for word in ['advanced', 'expert', 'deep']):
            tags.add('advanced')
        if any(word in name for word in ['beginner', 'intro', 'basic']):
            tags.add('beginner')
        
        return list(tags)[:8]  # Limit to 8 tags
    
    def generate_excerpt(self, filename, pdf_info, category):
        """Generate a smart excerpt for the PDF"""
        
        excerpts = {
            'aws': "Comprehensive AWS guide covering cloud services, architecture, and best practices. Essential resource for AWS certification and solutions architecture.",
            'docker': "Complete Docker guide covering containerization, deployment, and best practices. Learn container orchestration and DevOps workflows.",
            'kubernetes': "Kubernetes orchestration guide covering pods, services, deployments, and cluster management. Essential for container orchestration.",
            'terraform': "Infrastructure as Code guide using Terraform. Learn to manage cloud infrastructure, modules, and automation best practices.",
            'github-actions': "Complete guide to GitHub Actions for CI/CD automation. Learn workflows, deployment strategies, and DevOps best practices.",
            'python': "Python programming guide covering fundamentals, libraries, frameworks, and best practices for development.",
            'javascript': "JavaScript programming guide covering modern development practices, frameworks, and advanced concepts.",
            'devops': "DevOps guide covering continuous integration, deployment pipelines, and infrastructure automation practices.",
            'security': "Cybersecurity guide covering best practices, threat analysis, and security implementation strategies.",
            'database': "Database guide covering design, optimization, queries, and administration best practices.",
            'interview': "Interview preparation materials with common questions, coding challenges, and technical concepts.",
            'machine-learning': "Machine Learning guide covering algorithms, frameworks, and practical implementation strategies.",
            'tutorial': "Step-by-step tutorial covering practical examples and hands-on learning exercises.",
            'reference': "Quick reference guide with essential commands, syntax, and best practices for rapid lookup.",
            'certification': "Certification study guide with exam preparation materials and practice questions."
        }
        
        # Use category-specific excerpt or generate generic one
        if category in excerpts:
            return excerpts[category]
        
        # Generate based on filename
        title = self.format_title(filename)
        pages = pdf_info.get('pages', 0)
        return f"{title} - A comprehensive PDF document with {pages} pages of technical content and reference materials."
    
    def format_title(self, filename):
        """Format filename into a readable title"""
        title = filename.replace('.pdf', '')
        title = re.sub(r'[-_]', ' ', title)
        title = re.sub(r'\b\w', lambda m: m.group(0).upper(), title)
        title = re.sub(r'\s+', ' ', title).strip()
        return title
    
    def generate_metadata(self, pdf_files):
        """Generate metadata for all PDF files"""
        metadata = {
            'generated_at': datetime.now().isoformat(),
            'total_files': len(pdf_files),
            'files': {}
        }
        
        print(f"\n🔍 Analyzing PDF files...")
        
        for filename in pdf_files:
            pdf_path = self.pdfs_dir / filename
            print(f"   📄 Processing: {filename}")
            
            # Extract PDF info
            pdf_info = self.extract_pdf_info(pdf_path)
            
            # Categorize and generate metadata
            category = self.categorize_pdf(filename, pdf_info)
            tags = self.generate_tags(filename, pdf_info, category)
            excerpt = self.generate_excerpt(filename, pdf_info, category)
            title = self.format_title(filename)
            
            metadata['files'][filename] = {
                'title': title,
                'category': category,
                'tags': tags,
                'excerpt': excerpt,
                'pages': pdf_info['pages'],
                'file_size': pdf_info['file_size'],
                'read_time': f"{max(1, pdf_info['pages'] * 2)} min read",
                'pdf_title': pdf_info.get('title', ''),
                'pdf_author': pdf_info.get('author', ''),
                'pdf_subject': pdf_info.get('subject', '')
            }
        
        return metadata
    
    def update_app_js(self, pdf_files):
        """Update app.js with the current PDF file list"""
        if not self.app_js_path.exists():
            print(f"❌ app.js not found: {self.app_js_path}")
            return False
        
        # Read current app.js
        with open(self.app_js_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        sorted_files = sorted(pdf_files)

        # Some versions of app.js used `const possiblePDFs = [...]`, others used `const knownPDFs = [...]`.
        # Newer versions can load `pdf_metadata.json` directly, so updating app.js is optional.

        possible_array = "const possiblePDFs = [\n" + "".join(
            f"                '{filename}',\n" for filename in sorted_files
        ) + "            ];"

        known_array = "const knownPDFs = [\n" + "".join(
            f"                '{filename}',\n" for filename in sorted_files
        ) + "            ];"

        possible_pattern = r'const possiblePDFs = \[[\s\S]*?\];'
        known_pattern = r'const knownPDFs = \[[\s\S]*?\];'

        if re.search(possible_pattern, content):
            new_content = re.sub(possible_pattern, possible_array, content)
            with open(self.app_js_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✅ Updated app.js (possiblePDFs) with {len(pdf_files)} PDF files")
            return True

        if re.search(known_pattern, content):
            new_content = re.sub(known_pattern, known_array, content)
            with open(self.app_js_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✅ Updated app.js (knownPDFs) with {len(pdf_files)} PDF files")
            return True

        print("⚠️  Could not find possiblePDFs/knownPDFs array in app.js (this is OK if app.js loads pdf_metadata.json)")
        return True
    
    def save_metadata(self, metadata):
        """Save metadata to JSON file"""
        with open(self.metadata_path, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Saved metadata to {self.metadata_path}")
    
    def sync(self):
        """Main sync function"""
        print("🔄 Starting PDF sync process...")
        print(f"📂 Project directory: {self.project_dir.absolute()}")
        
        # Scan for PDF files
        pdf_files = self.scan_pdfs()
        
        if not pdf_files:
            print("❌ No PDF files found. Add some PDFs to the pdfs/ directory.")
            return False
        
        # Generate metadata
        metadata = self.generate_metadata(pdf_files)

        # Save metadata (always)
        self.save_metadata(metadata)

        # Update app.js (optional)
        self.update_app_js(pdf_files)
        
        print(f"\n🎉 Sync completed successfully!")
        print(f"   📊 Processed {len(pdf_files)} PDF files")
        print(f"   📝 Generated metadata for all files")
        print(f"   🔧 Updated app.js (if applicable)")
        print(f"\n💡 Next steps:")
        print(f"   1. Review the changes in app.js")
        print(f"   2. Test locally: python -m http.server 8000")
        print(f"   3. Commit and push to GitHub for deployment")
        
        return True

def main():
    parser = argparse.ArgumentParser(description='Sync PDF files with Interview Wiki')
    parser.add_argument('--dir', '-d', default='.', help='Project directory (default: current directory)')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be done without making changes')
    
    args = parser.parse_args()
    
    syncer = PDFSyncer(args.dir)
    
    if args.dry_run:
        print("🔍 DRY RUN MODE - No changes will be made")
        pdf_files = syncer.scan_pdfs()
        metadata = syncer.generate_metadata(pdf_files)
        print("\n📋 Generated metadata preview:")
        for filename, data in metadata['files'].items():
            print(f"   📄 {filename}")
            print(f"      Title: {data['title']}")
            print(f"      Category: {data['category']}")
            print(f"      Tags: {', '.join(data['tags'])}")
            print(f"      Pages: {data['pages']}")
            print()
    else:
        syncer.sync()

if __name__ == "__main__":
    main()
