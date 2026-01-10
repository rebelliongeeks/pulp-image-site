/**
 * Pulp Image Landing Page - Interactive JavaScript
 * Handles: OS detection, copy to clipboard, dropdown menus
 */

(function() {
  'use strict';

  // ============================================
  // OS Detection
  // ============================================
  
  function detectOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';
    
    // Check for Windows
    if (userAgent.includes('win') || platform.includes('win')) {
      return 'windows';
    }
    
    // Check for macOS (single package works for both Intel and Apple Silicon)
    if (userAgent.includes('mac') || platform.includes('mac')) {
      return 'macos';
    }
    
    // Check for Linux
    if (userAgent.includes('linux') || platform.includes('linux')) {
      return 'linux';
    }
    
    // Default to generic
    return 'unknown';
  }
  
  function getOSDisplayName(os) {
    const names = {
      'windows': 'Windows',
      'macos': 'macOS',
      'linux': 'Linux',
      'unknown': 'your system'
    };
    return names[os] || 'your system';
  }
  
  function getDownloadURL(os) {
    // These would be the actual download URLs when you package the app
    const baseURL = 'https://github.com/rebelliongeeks/pulp-image/releases/latest/download/';
    const files = {
      'windows': 'pulp-image-windows.zip',
      'macos': 'pulp-image-macos.zip',
      'linux': 'pulp-image-linux.zip'
    };
    return baseURL + (files[os] || files['linux']);
  }

  // ============================================
  // Copy to Clipboard
  // ============================================
  
  async function copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      
      // Show success state
      button.classList.add('copied');
      
      // Reset after 2 seconds
      setTimeout(() => {
        button.classList.remove('copied');
      }, 2000);
      
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        
        button.classList.add('copied');
        setTimeout(() => {
          button.classList.remove('copied');
        }, 2000);
        
        return true;
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
        return false;
      }
    }
  }

  // ============================================
  // Dropdown Menu
  // ============================================
  
  function setupDropdown(toggleBtn, menu) {
    if (!toggleBtn || !menu) return;
    
    // Toggle dropdown on click
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        menu.classList.remove('open');
      }
    });
  }

  // ============================================
  // Initialize
  // ============================================
  
  function init() {
    // Detect OS and update download buttons
    const detectedOS = detectOS();
    
    // Update main download button text
    const osNameSpan = document.getElementById('os-name');
    if (osNameSpan) {
      osNameSpan.textContent = getOSDisplayName(detectedOS);
    }
    
    // Set up main download button
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        window.location.href = getDownloadURL(detectedOS);
      });
    }
    
    // Set up CTA download button and OS name
    const ctaOsNameSpan = document.getElementById('cta-os-name');
    if (ctaOsNameSpan) {
      ctaOsNameSpan.textContent = getOSDisplayName(detectedOS);
    }
    
    const ctaDownloadBtn = document.getElementById('cta-download-btn');
    if (ctaDownloadBtn) {
      ctaDownloadBtn.addEventListener('click', () => {
        window.location.href = getDownloadURL(detectedOS);
      });
    }
    
    // Set up hero dropdown
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    setupDropdown(dropdownToggle, dropdownMenu);
    
    // Set up CTA dropdown
    const ctaDropdownToggle = document.getElementById('cta-dropdown-toggle');
    const ctaDropdownMenu = document.getElementById('cta-dropdown-menu');
    setupDropdown(ctaDropdownToggle, ctaDropdownMenu);
    
    // Set up dropdown item clicks (for all dropdowns)
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const os = item.dataset.os;
        if (os) {
          window.location.href = getDownloadURL(os);
        }
        // Close all dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.classList.remove('open');
        });
      });
    });
    
    // Set up copy buttons for install commands
    const installCommands = document.querySelectorAll('.install-command[data-copy]');
    installCommands.forEach(command => {
      const copyBtn = command.querySelector('.copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const textToCopy = command.dataset.copy;
          copyToClipboard(textToCopy, copyBtn);
        });
      }
    });
    
    // Set up copy buttons for terminal blocks
    const terminalBlocks = document.querySelectorAll('.terminal-block[data-copy]');
    terminalBlocks.forEach(block => {
      const copyBtn = block.querySelector('.copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const textToCopy = block.dataset.copy;
          copyToClipboard(textToCopy, copyBtn);
        });
      }
    });
    
    // Set up copy buttons for terminal examples (in CLI/UI help pages)
    const terminalExamples = document.querySelectorAll('.terminal-example-body[data-copy]');
    terminalExamples.forEach(example => {
      const copyBtn = example.querySelector('.terminal-example-copy');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const textToCopy = example.dataset.copy;
          copyToClipboard(textToCopy, copyBtn);
        });
      }
    });
    
    // Smooth scroll for anchor links (handles both #anchor and /#anchor formats)
    const anchorLinks = document.querySelectorAll('a[href^="#"], a[href^="/#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        let href = link.getAttribute('href');
        if (href && href !== '#') {
          // Handle /#anchor format (used for cross-page navigation)
          if (href.startsWith('/#')) {
            // Only handle if we're on the homepage
            const isHomepage = window.location.pathname === '/' || 
                               window.location.pathname.endsWith('/index.html') ||
                               window.location.pathname === '/index.html';
            if (isHomepage) {
              href = href.substring(1); // Remove leading /
            } else {
              return; // Let the browser handle navigation to homepage
            }
          }
          
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Add scroll-based nav styling
    const nav = document.querySelector('.nav');
    if (nav) {
      let lastScroll = 0;
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
          nav.style.boxShadow = '0 2px 8px rgba(45, 39, 34, 0.08)';
        } else {
          nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
      });
    }
    
    // Note: Removed fade-in animations that were hiding content
    // Feature cards and example cards are now always visible
    
    // Handle screenshot scroll indicator
    const screenshotBody = document.querySelector('.screenshot-body');
    const screenshotFrame = screenshotBody?.closest('.screenshot-frame');
    
    if (screenshotBody && screenshotFrame) {
      let scrollTimeout;
      
      // Hide indicator when scrolling starts
      screenshotBody.addEventListener('scroll', () => {
        screenshotFrame.classList.add('scrolling');
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Remove scrolling class after scroll stops (for touch)
        scrollTimeout = setTimeout(() => {
          screenshotFrame.classList.remove('scrolling');
        }, 150);
        
        // Check if at bottom
        const isAtBottom = screenshotBody.scrollHeight - screenshotBody.scrollTop <= screenshotBody.clientHeight + 10;
        if (isAtBottom) {
          screenshotFrame.classList.add('at-bottom');
        } else {
          screenshotFrame.classList.remove('at-bottom');
        }
      });
      
      // Handle touch events - hide on touch, show on touch end
      let touchStartTime;
      let isScrolling = false;
      
      screenshotBody.addEventListener('touchstart', () => {
        screenshotFrame.classList.add('scrolling');
        touchStartTime = Date.now();
        isScrolling = false;
      });
      
      screenshotBody.addEventListener('touchmove', () => {
        isScrolling = true;
      });
      
      screenshotBody.addEventListener('touchend', () => {
        // Remove scrolling class after a delay to allow indicator to show again
        setTimeout(() => {
          if (!isScrolling || screenshotBody.scrollTop === 0) {
            screenshotFrame.classList.remove('scrolling');
          }
        }, 400);
      });
      
      // Handle mouse leave - ensure indicator can show again on hover
      screenshotFrame.addEventListener('mouseleave', () => {
        screenshotFrame.classList.remove('scrolling');
      });
    }
    
    // Scroll-linked unstack animation for stacked screenshots
    const stackedScreenshots = document.querySelector('.stacked-screenshots');
    if (stackedScreenshots) {
      const cardBack = stackedScreenshots.querySelector('.stacked-card-back');
      const cardMiddle = stackedScreenshots.querySelector('.stacked-card-middle');
      const cardFront = stackedScreenshots.querySelector('.stacked-card-front');
      const cards = [cardBack, cardMiddle, cardFront];
      
      // Store base transforms for hover effect
      let baseTransforms = { back: '', middle: '', front: '' };
      let currentProgress = 0;
      
      function updateCardPositions() {
        const rect = stackedScreenshots.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Element center position
        const elementCenter = rect.top + rect.height / 2;
        
        // Animation zones with dead zone in middle where cards stay unstacked
        const enterStart = windowHeight * 0.90;  // Start unstacking
        const enterEnd = windowHeight * 0.60;    // Fully unstacked
        const deadZoneTop = windowHeight * 0.60; // Stay unstacked...
        const deadZoneBottom = windowHeight * 0.40; // ...until here
        const exitStart = windowHeight * 0.40;   // Start stacking
        const exitEnd = windowHeight * 0.10;     // Fully stacked
        
        let progress = 0;
        
        if (elementCenter > enterStart) {
          // Above viewport - stacked
          progress = 0;
        } else if (elementCenter > enterEnd) {
          // Entering - unstacking
          progress = (enterStart - elementCenter) / (enterStart - enterEnd);
        } else if (elementCenter > deadZoneBottom) {
          // Dead zone - stay fully unstacked
          progress = 1;
        } else if (elementCenter > exitEnd) {
          // Exiting - stacking again
          progress = (elementCenter - exitEnd) / (exitStart - exitEnd);
        } else {
          // Below viewport - stacked
          progress = 0;
        }
        
        progress = Math.max(0, Math.min(1, progress));
        currentProgress = progress;
        
        // Check if mobile (vertical layout)
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          // Vertical spread on mobile
          const backY = -50 + (70 * progress);   // Back goes down
          const middleY = -50;
          const frontY = -50 - (70 * progress);  // Front goes up
          const backRotate = 4 * progress;
          const frontRotate = -3 * progress;
          const backScale = 0.92 + (0.08 * progress);
          const middleScale = 0.96 + (0.04 * progress);
          
          baseTransforms.back = `translate(-50%, ${backY}%) rotate(${backRotate}deg) scale(${backScale})`;
          baseTransforms.middle = `translate(-50%, ${middleY}%) rotate(2deg) scale(${middleScale})`;
          baseTransforms.front = `translate(-50%, ${frontY}%) rotate(${frontRotate}deg) scale(1)`;
        } else {
          // Desktop: Layout matching reference image exactly
          // Front (Options): center-left, tilted left
          // Middle (Files): bottom-right, behind front, "Files" visible at bottom
          // Back: top-right, furthest back
          
          // Front card (Options): center-left
          const frontX = -50 + (-28 * progress);  // Move left more
          const frontY = -50 + (5 * progress);    // Move down slightly
          const frontRotate = -2 - (4 * progress); // Tilt left
          
          // Middle card (Files): bottom-right, lower than front
          const middleX = -50 + (8 * progress);   // Move right less
          const middleY = -50 + (22 * progress);  // Move down
          const middleRotate = 2 + (5 * progress); // Tilt right
          
          // Back card: top-right, higher up
          const backX = -50 + (5 * progress);     // Move right less
          const backY = -50 + (-40 * progress);   // Move up
          const backRotate = 3 + (6 * progress);  // Tilt right
          
          const backScale = 0.90 + (0.10 * progress);
          const middleScale = 0.94 + (0.06 * progress);
          
          baseTransforms.front = `translate(${frontX}%, ${frontY}%) rotate(${frontRotate}deg) scale(1)`;
          baseTransforms.middle = `translate(${middleX}%, ${middleY}%) rotate(${middleRotate}deg) scale(${middleScale})`;
          baseTransforms.back = `translate(${backX}%, ${backY}%) rotate(${backRotate}deg) scale(${backScale})`;
        }
        
        // Apply transforms (unless hovering)
        if (!stackedScreenshots.classList.contains('hovering')) {
          cardBack.style.transform = baseTransforms.back;
          cardMiddle.style.transform = baseTransforms.middle;
          cardFront.style.transform = baseTransforms.front;
          
          // Reset z-index to default
          cardBack.style.zIndex = '1';
          cardMiddle.style.zIndex = '2';
          cardFront.style.zIndex = '3';
        }
      }
      
      // Update on scroll
      window.addEventListener('scroll', updateCardPositions, { passive: true });
      window.addEventListener('resize', updateCardPositions, { passive: true });
      
      // Initial update
      updateCardPositions();
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Load shared components first
      if (typeof loadComponents === 'function') {
        loadComponents();
      }
      init();
    });
  } else {
    // Load shared components first
    if (typeof loadComponents === 'function') {
      loadComponents();
    }
    init();
  }
})();

