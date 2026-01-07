/**
 * Pulp Image Site - Shared Components
 * Header and Footer are loaded from a single source
 */

const SITE_VERSION = 'v0.1.6';

// Navigation HTML - Single source of truth
function getNavHTML(activePage = '') {
  const isActive = (page) => activePage === page ? 'style="color: var(--orange-text);"' : '';
  
  return `
  <nav class="nav">
    <div class="nav-container">
      <a href="/" class="nav-brand">
        <img src="assets/pulp-logo.svg" alt="Pulp Image" class="nav-logo">
        <span class="nav-brand-text">Pulp Image</span>
      </a>
      <div class="nav-links">
        <button class="nav-search-btn" id="search-toggle" aria-label="Search documentation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <span class="nav-search-hint" id="search-shortcut-hint">⌘K</span>
        </button>
        <a href="/#features" class="nav-link">Features</a>
        <a href="ui.html" class="nav-link" ${isActive('ui')}>UI Guide</a>
        <a href="cli.html" class="nav-link" ${isActive('cli')}>CLI Reference</a>
        <a href="https://github.com/rebelliongeeks/pulp-image" target="_blank" rel="noopener" class="nav-link nav-link-github">
          <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </nav>
  
  <!-- Terminal Search Modal -->
  <div class="search-modal" id="search-modal">
    <div class="search-terminal">
      <div class="search-terminal-header">
        <span class="search-terminal-dot search-terminal-dot-red"></span>
        <span class="search-terminal-dot search-terminal-dot-yellow"></span>
        <span class="search-terminal-dot search-terminal-dot-green"></span>
        <span class="search-terminal-title">pulp search</span>
        <button class="search-close-btn" id="search-close" aria-label="Close search">ESC</button>
      </div>
      <div class="search-terminal-body">
        <div class="search-input-wrapper">
          <span class="search-prompt">❯</span>
          <input type="text" class="search-input" id="search-input" placeholder="Type to search commands, options, and help..." autocomplete="off" spellcheck="false">
        </div>
        <div class="search-results" id="search-results">
          <div class="search-hint-text">
            <p>Start typing to search CLI commands, UI options, and documentation...</p>
            <div class="search-shortcuts">
              <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
              <span><kbd>Enter</kbd> Select</span>
              <span><kbd>Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// Footer HTML - Single source of truth
function getFooterHTML() {
  return `
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-main">
        <div class="footer-brand">
          <img src="assets/pulp-logo-white.svg" alt="Pulp Image" class="footer-logo">
          <div class="footer-brand-info">
            <span class="footer-brand-name">Pulp Image</span>
            <span class="footer-tagline">Made in Cyprus with love by <a href="https://rebelliongeeks.com" target="_blank" rel="noopener">Rebellion Geeks</a></span>
          </div>
        </div>
        <div class="footer-links-grid">
          <div class="footer-links-group">
            <span class="footer-links-title">Documentation</span>
            <a href="cli.html" class="footer-link">CLI Reference</a>
            <a href="ui.html" class="footer-link">UI Guide</a>
          </div>
          <div class="footer-links-group">
            <span class="footer-links-title">Community</span>
            <a href="https://github.com/rebelliongeeks/pulp-image" target="_blank" rel="noopener" class="footer-link">
              <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
          <div class="footer-links-group">
            <span class="footer-links-title">Get Help</span>
            <a href="https://github.com/rebelliongeeks/pulp-image/issues/new?labels=question&title=Question:" target="_blank" rel="noopener" class="footer-link">Ask a Question</a>
            <a href="https://github.com/rebelliongeeks/pulp-image/issues/new?labels=bug&template=bug_report.md" target="_blank" rel="noopener" class="footer-link">Report a Bug</a>
            <a href="https://github.com/rebelliongeeks/pulp-image/issues/new?labels=enhancement&template=feature_request.md" target="_blank" rel="noopener" class="footer-link">Request a Feature</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-license">MIT License • Open Source</span>
        <span class="footer-version">${SITE_VERSION}</span>
      </div>
    </div>
  </footer>
  `;
}

// Load components into placeholders
function loadComponents() {
  // Get the current page name from the URL
  const path = window.location.pathname;
  let activePage = '';
  if (path.includes('cli.html')) activePage = 'cli';
  else if (path.includes('ui.html')) activePage = 'ui';
  
  // Load navigation
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = getNavHTML(activePage);
  }
  
  // Load footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = getFooterHTML();
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getNavHTML, getFooterHTML, loadComponents, SITE_VERSION };
}

