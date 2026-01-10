/**
 * Pulp Image Site - Terminal-style Fuzzy Search
 * FZF-inspired search for CLI commands, UI options, and documentation
 */

(function() {
  'use strict';

  // ============================================
  // Search Index - All searchable content
  // ============================================
  
  const SEARCH_INDEX = [
    // CLI Commands
    {
      type: 'cli',
      title: '--width, -w',
      description: 'Output width in pixels. Aspect ratio preserved if height not specified.',
      command: 'pulp image.png --width 800',
      url: 'cli.html#resize',
      keywords: ['resize', 'width', 'dimensions', 'size', 'scale']
    },
    {
      type: 'cli',
      title: '--height, -h',
      description: 'Output height in pixels. Aspect ratio preserved if width not specified.',
      command: 'pulp image.png --height 600',
      url: 'cli.html#resize',
      keywords: ['resize', 'height', 'dimensions', 'size', 'scale']
    },
    {
      type: 'cli',
      title: '--format, -f',
      description: 'Output format: png, jpg, webp, or avif',
      command: 'pulp image.png --format webp',
      url: 'cli.html#format-conversion',
      keywords: ['format', 'convert', 'png', 'jpg', 'jpeg', 'webp', 'avif']
    },
    {
      type: 'cli',
      title: '--out, -o',
      description: 'Output directory. Default: ./pulp-image-results',
      command: 'pulp image.png --out ./output',
      url: 'cli.html#basic-usage',
      keywords: ['output', 'directory', 'folder', 'path', 'save']
    },
    {
      type: 'cli',
      title: '--quality',
      description: 'Quality for lossy formats (1-100). JPG=80, WebP=80, AVIF=50 by default.',
      command: 'pulp image.png --format jpg --quality 90',
      url: 'cli.html#format-conversion',
      keywords: ['quality', 'compression', 'lossy', 'optimize']
    },
    {
      type: 'cli',
      title: '--lossless',
      description: 'Use lossless compression for WebP and AVIF. PNG is always lossless.',
      command: 'pulp image.png --format webp --lossless',
      url: 'cli.html#format-conversion',
      keywords: ['lossless', 'compression', 'quality', 'perfect']
    },
    {
      type: 'cli',
      title: '--suffix',
      description: 'Custom suffix added before file extension.',
      command: 'pulp image.png --suffix optimized',
      url: 'cli.html#batch-processing',
      keywords: ['suffix', 'rename', 'filename', 'naming']
    },
    {
      type: 'cli',
      title: '--auto-suffix',
      description: 'Automatically add size-based suffix: -800w, -600h, or -800x600',
      command: 'pulp image.png --width 800 --auto-suffix',
      url: 'cli.html#batch-processing',
      keywords: ['auto', 'suffix', 'responsive', 'dimensions', 'naming']
    },
    {
      type: 'cli',
      title: '--background',
      description: 'Background color (hex) for flattening transparency. Default: #ffffff',
      command: 'pulp logo.png --format jpg --background "#1a1b26"',
      url: 'cli.html#transparency',
      keywords: ['background', 'color', 'transparency', 'alpha', 'flatten']
    },
    {
      type: 'cli',
      title: '--alpha-mode',
      description: 'How to handle transparency: flatten or error',
      command: 'pulp logo.png --format jpg --alpha-mode flatten',
      url: 'cli.html#transparency',
      keywords: ['alpha', 'transparency', 'flatten', 'error', 'mode']
    },
    {
      type: 'cli',
      title: '--overwrite',
      description: 'Overwrite existing output files. By default, existing files are skipped.',
      command: 'pulp ./images --format webp --overwrite',
      url: 'cli.html#safety',
      keywords: ['overwrite', 'replace', 'existing', 'skip']
    },
    {
      type: 'cli',
      title: '--delete-original',
      description: 'Delete original files after successful processing.',
      command: 'pulp ./images --format webp --out ./output --delete-original',
      url: 'cli.html#safety',
      keywords: ['delete', 'original', 'remove', 'cleanup']
    },
    {
      type: 'cli',
      title: '--verbose, -v',
      description: 'Show detailed per-file processing information.',
      command: 'pulp ./images --format webp --verbose',
      url: 'cli.html#batch-processing',
      keywords: ['verbose', 'debug', 'details', 'info', 'log']
    },
    {
      type: 'cli',
      title: 'pulp ui',
      description: 'Start the browser-based UI on localhost:3000',
      command: 'pulp ui --port 8080',
      url: 'cli.html#browser-ui-mode',
      keywords: ['ui', 'browser', 'gui', 'interface', 'visual', 'server']
    },
    {
      type: 'cli',
      title: 'Install Pulp',
      description: 'Install Pulp Image CLI globally via npm',
      command: 'npm install -g pulp-image',
      url: 'cli.html#installation',
      keywords: ['install', 'npm', 'setup', 'global']
    },
    
    // CLI Examples
    {
      type: 'example',
      title: 'Convert to WebP',
      description: 'Convert any image to WebP format with good compression',
      command: 'pulp image.png --format webp --quality 85',
      url: 'cli.html#format-conversion',
      keywords: ['webp', 'convert', 'modern', 'compression']
    },
    {
      type: 'example',
      title: 'Batch Process Folder',
      description: 'Convert all images in a folder to WebP',
      command: 'pulp ./images --format webp --out ./output',
      url: 'cli.html#batch-processing',
      keywords: ['batch', 'folder', 'directory', 'multiple', 'bulk']
    },
    {
      type: 'example',
      title: 'Create Thumbnails',
      description: 'Resize images to 400px width for thumbnails',
      command: 'pulp ./photos --width 400 --auto-suffix --out ./thumbs',
      url: 'cli.html#resize',
      keywords: ['thumbnail', 'resize', 'small', 'preview']
    },
    {
      type: 'example',
      title: 'Responsive Images',
      description: 'Generate multiple sizes for responsive design',
      command: 'pulp photo.jpg --width 800 --auto-suffix --format webp',
      url: 'cli.html#real-world-examples',
      keywords: ['responsive', 'srcset', 'sizes', 'mobile', 'web']
    },
    {
      type: 'example',
      title: 'Maximum Compression',
      description: 'Use AVIF for smallest possible file size',
      command: 'pulp ./archive --format avif --quality 40',
      url: 'cli.html#real-world-examples',
      keywords: ['avif', 'smallest', 'compression', 'archive']
    },
    {
      type: 'example',
      title: 'Social Media Images',
      description: 'Optimize for Open Graph / Twitter cards (1200×630)',
      command: 'pulp cover.png --format jpg --width 1200 --height 630 --quality 90',
      url: 'cli.html#real-world-examples',
      keywords: ['social', 'og', 'twitter', 'facebook', 'sharing']
    },
    
    // UI Options
    {
      type: 'ui',
      title: 'Input Source',
      description: 'Select files or entire folders to process',
      url: 'ui.html#selecting-images',
      keywords: ['input', 'files', 'folder', 'select', 'upload', 'drag']
    },
    {
      type: 'ui',
      title: 'Output Directory',
      description: 'Where processed images are saved. Default: timestamped folder in home directory.',
      url: 'ui.html#output-directory',
      keywords: ['output', 'directory', 'save', 'folder', 'path']
    },
    {
      type: 'ui',
      title: 'Output Format',
      description: 'Choose PNG, JPG, WebP, AVIF, or keep original format',
      url: 'ui.html#output-format',
      keywords: ['format', 'png', 'jpg', 'webp', 'avif', 'convert']
    },
    {
      type: 'ui',
      title: 'Dimensions',
      description: 'Set width and/or height in pixels. Aspect ratio preserved by default.',
      url: 'ui.html#dimensions',
      keywords: ['width', 'height', 'resize', 'dimensions', 'size']
    },
    {
      type: 'ui',
      title: 'Quality Slider',
      description: 'Adjust compression quality from 1-100 for lossy formats',
      url: 'ui.html#quality',
      keywords: ['quality', 'slider', 'compression', 'lossy']
    },
    {
      type: 'ui',
      title: 'Lossless Toggle',
      description: 'Enable lossless compression for WebP and AVIF',
      url: 'ui.html#lossless',
      keywords: ['lossless', 'toggle', 'perfect', 'quality']
    },
    {
      type: 'ui',
      title: 'Alpha Mode',
      description: 'Choose how to handle transparency: Flatten or Error',
      url: 'ui.html#alpha',
      keywords: ['alpha', 'transparency', 'flatten', 'error']
    },
    {
      type: 'ui',
      title: 'Background Color',
      description: 'Color picker for flattening transparent areas',
      url: 'ui.html#background',
      keywords: ['background', 'color', 'picker', 'transparency']
    },
    {
      type: 'ui',
      title: 'Rename Pattern',
      description: 'Use {name}, {ext}, {index} tokens to customize output filenames',
      url: 'ui.html#rename-pattern',
      keywords: ['rename', 'pattern', 'tokens', 'filename', 'naming']
    },
    {
      type: 'ui',
      title: 'Auto Suffix',
      description: 'Automatically add dimension-based suffix like -800w',
      url: 'ui.html#auto-suffix',
      keywords: ['auto', 'suffix', 'dimensions', 'naming']
    },
    {
      type: 'ui',
      title: 'Overwrite Toggle',
      description: 'Enable to replace existing files in output directory',
      url: 'ui.html#overwrite',
      keywords: ['overwrite', 'replace', 'existing']
    },
    
    // Formats
    {
      type: 'format',
      title: 'PNG Format',
      description: 'Lossless, supports transparency. Best for graphics and screenshots.',
      url: 'cli.html#format-conversion',
      keywords: ['png', 'lossless', 'transparency', 'graphics', 'screenshot']
    },
    {
      type: 'format',
      title: 'JPG Format',
      description: 'Lossy, no transparency. Best for photos.',
      url: 'cli.html#format-conversion',
      keywords: ['jpg', 'jpeg', 'lossy', 'photo', 'photography']
    },
    {
      type: 'format',
      title: 'WebP Format',
      description: 'Modern format, good compression, supports transparency.',
      url: 'cli.html#format-conversion',
      keywords: ['webp', 'modern', 'web', 'compression']
    },
    {
      type: 'format',
      title: 'AVIF Format',
      description: 'Best compression, supports transparency. Modern browsers only.',
      url: 'cli.html#format-conversion',
      keywords: ['avif', 'best', 'compression', 'modern', 'small']
    },
    
    // Pages
    {
      type: 'page',
      title: 'Homepage',
      description: 'Pulp Image main page - download, install, and get started',
      url: '/',
      keywords: ['home', 'homepage', 'main', 'start', 'index', 'landing']
    },
    {
      type: 'page',
      title: 'CLI Reference',
      description: 'Complete command-line documentation with all options and examples',
      url: 'cli.html',
      keywords: ['cli', 'command', 'terminal', 'reference', 'docs', 'documentation', 'help']
    },
    {
      type: 'page',
      title: 'CLI Help',
      description: 'Command-line help and documentation',
      url: 'cli.html',
      keywords: ['cli', 'help', 'command', 'terminal', 'documentation']
    },
    {
      type: 'page',
      title: 'UI Guide',
      description: 'Complete guide to the browser-based interface',
      url: 'ui.html',
      keywords: ['ui', 'gui', 'browser', 'interface', 'guide', 'documentation', 'help']
    },
    {
      type: 'page',
      title: 'UI Help',
      description: 'Browser UI help and documentation',
      url: 'ui.html',
      keywords: ['ui', 'help', 'browser', 'interface', 'documentation']
    },
    {
      type: 'page',
      title: 'Features',
      description: 'Overview of all Pulp Image features',
      url: '/#features',
      keywords: ['features', 'overview', 'capabilities', 'what']
    },
    {
      type: 'page',
      title: 'Use Cases',
      description: 'Common use cases and workflows for Pulp Image',
      url: '/#showcase-ui',
      keywords: ['use', 'cases', 'examples', 'workflows', 'how']
    },
    {
      type: 'page',
      title: 'Quick Start Examples',
      description: 'Get started quickly with common command examples',
      url: '/#examples',
      keywords: ['examples', 'quick', 'start', 'getting', 'started', 'commands']
    },
    
    // Downloads
    {
      type: 'download',
      title: 'Download for Windows',
      description: 'Download the portable UI for Windows (no install needed)',
      url: 'javascript:downloadForOS("windows")',
      keywords: ['download', 'windows', 'portable', 'ui', 'app']
    },
    {
      type: 'download',
      title: 'Download for macOS',
      description: 'Download the portable UI for macOS (works on Intel and Apple Silicon)',
      url: 'javascript:downloadForOS("macos")',
      keywords: ['download', 'mac', 'macos', 'apple', 'portable', 'ui', 'app']
    },
    {
      type: 'download',
      title: 'Download for Linux',
      description: 'Download the portable UI for Linux',
      url: 'javascript:downloadForOS("linux")',
      keywords: ['download', 'linux', 'ubuntu', 'debian', 'portable', 'ui', 'app']
    },
    
    // Actions / Support
    {
      type: 'action',
      title: 'Ask a Question',
      description: 'Get help by asking a question on GitHub',
      url: 'https://github.com/rebelliongeeks/pulp-image/issues/new?labels=question&title=Question:',
      keywords: ['question', 'help', 'ask', 'support', 'how']
    },
    {
      type: 'action',
      title: 'Report a Bug',
      description: 'Found a problem? Report it on GitHub',
      url: 'https://github.com/rebelliongeeks/pulp-image/issues/new?labels=bug&template=bug_report.md',
      keywords: ['bug', 'issue', 'problem', 'error', 'broken', 'report']
    },
    {
      type: 'action',
      title: 'Request a Feature',
      description: 'Have an idea? Suggest a new feature',
      url: 'https://github.com/rebelliongeeks/pulp-image/issues/new?labels=enhancement&template=feature_request.md',
      keywords: ['feature', 'request', 'idea', 'suggestion', 'enhancement', 'feedback']
    },
    {
      type: 'action',
      title: 'View on GitHub',
      description: 'View source code, star the project, or contribute',
      url: 'https://github.com/rebelliongeeks/pulp-image',
      keywords: ['github', 'source', 'code', 'star', 'contribute', 'repository']
    },
    {
      type: 'action',
      title: 'Install CLI via npm',
      description: 'Install the command-line interface globally',
      command: 'npm install -g pulp-image',
      url: 'cli.html#installation',
      keywords: ['install', 'npm', 'cli', 'command', 'terminal']
    }
  ];
  
  // ============================================
  // Download Helper (exposed globally)
  // ============================================
  
  window.downloadForOS = function(os) {
    const baseURL = 'https://github.com/rebelliongeeks/pulp-image/releases/latest/download/';
    const files = {
      'windows': 'pulp-image-windows.zip',
      'macos': 'pulp-image-macos.zip',
      'linux': 'pulp-image-linux.zip'
    };
    window.location.href = baseURL + (files[os] || files['linux']);
  };

  // ============================================
  // Fuzzy Search Implementation
  // ============================================
  
  function fuzzyMatch(pattern, text) {
    pattern = pattern.toLowerCase();
    text = text.toLowerCase();
    
    let patternIdx = 0;
    let textIdx = 0;
    let score = 0;
    let consecutive = 0;
    
    while (patternIdx < pattern.length && textIdx < text.length) {
      if (pattern[patternIdx] === text[textIdx]) {
        score += 1 + consecutive * 2; // Bonus for consecutive matches
        consecutive++;
        patternIdx++;
      } else {
        consecutive = 0;
      }
      textIdx++;
    }
    
    // All pattern characters must be found
    if (patternIdx !== pattern.length) {
      return 0;
    }
    
    // Bonus for matching at start
    if (text.startsWith(pattern)) {
      score += 10;
    }
    
    return score;
  }
  
  function search(query) {
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    query = query.trim().toLowerCase();
    
    const results = SEARCH_INDEX.map(item => {
      // Search in title, description, command, and keywords
      let score = 0;
      
      score += fuzzyMatch(query, item.title) * 3;
      score += fuzzyMatch(query, item.description) * 2;
      
      if (item.command) {
        score += fuzzyMatch(query, item.command) * 2;
      }
      
      if (item.keywords) {
        item.keywords.forEach(keyword => {
          if (keyword.includes(query) || query.includes(keyword)) {
            score += 5;
          }
          score += fuzzyMatch(query, keyword);
        });
      }
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Limit to 10 results
    
    return results;
  }

  // ============================================
  // UI Rendering
  // ============================================
  
  function getTypeIcon(type) {
    const icons = {
      'cli': '⌘',
      'ui': '🎛️',
      'example': '📝',
      'format': '📄',
      'page': '📖',
      'download': '⬇️',
      'action': '🔗'
    };
    return icons[type] || '•';
  }
  
  function getTypeLabel(type) {
    const labels = {
      'cli': 'CLI',
      'ui': 'UI',
      'example': 'Example',
      'format': 'Format',
      'page': 'Page',
      'download': 'Download',
      'action': 'Action'
    };
    return labels[type] || type;
  }
  
  function renderResults(results, selectedIndex) {
    const container = document.getElementById('search-results');
    if (!container) return;
    
    if (results.length === 0) {
      container.innerHTML = `
        <div class="search-no-results">
          <span class="search-no-results-icon">🔍</span>
          <p>No results found. Try different keywords.</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = results.map((item, index) => `
      <a href="${item.url}" class="search-result ${index === selectedIndex ? 'search-result-selected' : ''}" data-index="${index}">
        <span class="search-result-icon">${getTypeIcon(item.type)}</span>
        <div class="search-result-content">
          <div class="search-result-title">${escapeHtml(item.title)}</div>
          <div class="search-result-desc">${escapeHtml(item.description)}</div>
          ${item.command ? `<code class="search-result-cmd">${escapeHtml(item.command)}</code>` : ''}
        </div>
        <span class="search-result-type">${getTypeLabel(item.type)}</span>
      </a>
    `).join('');
  }
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ============================================
  // Event Handling
  // ============================================
  
  let isOpen = false;
  let selectedIndex = 0;
  let currentResults = [];
  
  function openSearch() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    if (!modal || !input) return;
    
    isOpen = true;
    selectedIndex = 0;
    currentResults = [];
    modal.classList.add('open');
    input.value = '';
    
    // Reset results
    const container = document.getElementById('search-results');
    if (container) {
      container.innerHTML = `
        <div class="search-hint-text">
          <p>Start typing to search CLI commands, UI options, and documentation...</p>
          <div class="search-shortcuts">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>Enter</kbd> Select</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
        </div>
      `;
    }
    
    document.body.style.overflow = 'hidden';
    
    // Focus input after modal transition starts (needs slight delay for visibility)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        input.focus();
      });
    });
  }
  
  function closeSearch() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    
    isOpen = false;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  function handleInput(e) {
    const query = e.target.value;
    currentResults = search(query);
    selectedIndex = 0;
    renderResults(currentResults, selectedIndex);
  }
  
  function scrollSelectedIntoView() {
    const selected = document.querySelector('.search-result-selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
  
  function handleKeydown(e) {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentResults.length > 0) {
          selectedIndex = (selectedIndex + 1) % currentResults.length;
          renderResults(currentResults, selectedIndex);
          scrollSelectedIntoView();
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (currentResults.length > 0) {
          selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
          renderResults(currentResults, selectedIndex);
          scrollSelectedIntoView();
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (currentResults.length > 0 && currentResults[selectedIndex]) {
          window.location.href = currentResults[selectedIndex].url;
          closeSearch();
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        closeSearch();
        break;
    }
  }
  
  // Detect if user is on macOS
  function isMac() {
    return navigator.platform?.toLowerCase().includes('mac') || 
           navigator.userAgent.toLowerCase().includes('mac');
  }
  
  function initSearch() {
    // Update shortcut hint based on OS
    const shortcutHint = document.getElementById('search-shortcut-hint');
    if (shortcutHint) {
      shortcutHint.textContent = isMac() ? '⌘K' : 'Ctrl+K';
    }
    
    // Toggle button
    const toggleBtn = document.getElementById('search-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', openSearch);
    }
    
    // Close button
    const closeBtn = document.getElementById('search-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeSearch);
    }
    
    // Modal background click
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeSearch();
        }
      });
    }
    
    // Input handling
    const input = document.getElementById('search-input');
    if (input) {
      input.addEventListener('input', handleInput);
      input.addEventListener('keydown', handleKeydown);
    }
    
    // Global keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          closeSearch();
        } else {
          openSearch();
        }
      }
      
      if (e.key === 'Escape' && isOpen) {
        closeSearch();
      }
    });
    
    // Result click handling (delegated)
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
      resultsContainer.addEventListener('click', (e) => {
        const result = e.target.closest('.search-result');
        if (result) {
          closeSearch();
        }
      });
    }
  }

  // ============================================
  // Initialize
  // ============================================
  
  // Wait for DOM and components to load
  function waitForComponents() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      initSearch();
    } else {
      // Components not loaded yet, try again
      setTimeout(waitForComponents, 100);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(waitForComponents, 50);
    });
  } else {
    setTimeout(waitForComponents, 50);
  }
})();

