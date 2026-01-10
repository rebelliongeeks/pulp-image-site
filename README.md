# Pulp Image Landing Site

Landing page and documentation site for [Pulp Image](https://github.com/rebelliongeeks/pulp-image) — a powerful, safety-first CLI and portable UI for image processing.

---

## ✅ Placeholders Status

| Location | What to Replace | File(s) | Status |
|----------|-----------------|---------|--------|
| **UI Screenshots** | Replace `.screenshot-placeholder` elements with actual UI screenshots | `index.html`, `ui.html` | ✅ COMPLETED |
| **Terminal Animations** | Replace `.terminal-placeholder` elements with asciinema embeds or GIFs | `index.html` | ✅ COMPLETED |
| **Download ZIP URLs** | Update `getDownloadURL()` with real GitHub Release URLs | `app.js`, `search.js` | ✅ URLs configured (need actual files) |

### Screenshots Added

1. ✅ **Homepage hero** — `hero-ui-screenshot.webp` (scrollable with gradient & indicator)
2. ✅ **UI Showcase section** — `ui-card-front.webp`, `ui-card-middle.webp`, `ui-card-back.webp` (scroll-linked stack animation)
3. ✅ **UI Guide** — All screenshots for ui.html:
   - ✅ `ui-overview.webp` — Interface overview
   - ✅ `ui-input-source.webp` — File/folder selection
   - ✅ `ui-format-selection.webp` — Format dropdown
   - ✅ `ui-dimensions.webp` — Width & height controls
   - ✅ `ui-quality-slider.webp` — Quality slider & lossless toggle
   - ✅ `ui-background-color.webp` — Color picker
   - ✅ `ui-rename-pattern.webp` — Rename pattern & auto suffix
   - ✅ `ui-results-summary.webp` — Processing results

### Terminal Animations

1. ✅ **CLI showcase** — `cli-demo.cast` (asciinema player showing batch processing workflow)

---

### Progress Summary

**All placeholders completed!** ✅

**Total Progress:** 11/11 placeholders completed (100%)

### Download Files to Create

Create and upload to GitHub Releases:
- `pulp-image-windows.zip` — Windows portable UI
- `pulp-image-macos.zip` — macOS portable UI (universal)
- `pulp-image-linux.zip` — Linux portable UI

---

## Structure

```
pulp-site/
├── index.html        # Main landing page
├── cli.html          # CLI reference documentation
├── ui.html           # UI guide documentation
├── styles.css        # Main stylesheet (citrus theme + Tokyo Night terminals)
├── app.js            # Interactive JavaScript (copy, OS detection, dropdown)
├── components.js     # Shared header/footer/search modal components
├── search.js         # Terminal-style fuzzy search (fzf inspired)
├── assets/
│   ├── pulp-logo.svg       # Orange logo for light backgrounds
│   └── pulp-logo-white.svg # White logo for dark footer
└── README.md         # This file
```

## Features

### Landing Page (`index.html`)
- Hero section with npm install command (click-to-copy)
- OS-detection download button for portable UI (detects Windows/macOS/Linux)
- Dropdown to select alternate OS
- Features grid (based on actual codebase features)
- Browser UI showcase with placeholder screenshots
- CLI showcase with placeholder terminal animations
- Quick examples section with click-to-copy commands
- Stats preview showing sample compression results
- Footer with GitHub link and "Made in Cyprus with love by Rebellion Geeks"

### CLI Reference (`cli.html`)
- Complete documentation of all CLI commands and options
- Tokyo Night themed terminal code blocks
- Click-to-copy on every command example
- Sections: Installation, Basic Usage, All Options, Resize, Format Conversion, Batch Processing, Safety, Transparency, Real-World Examples, Browser UI Mode, Troubleshooting

### UI Guide (`ui.html`)
- Complete guide to the browser-based UI
- Screenshot placeholders for each section
- Detailed explanation of every option
- Tips & Best Practices
- Troubleshooting section

## Shared Components

The header (navigation), footer, and search modal are controlled from a single source in `components.js`. 

Each page includes:
```html
<div id="nav-placeholder"></div>
<!-- page content -->
<div id="footer-placeholder"></div>

<script src="components.js"></script>
<script src="app.js"></script>
<script src="search.js"></script>
```

To update navigation or footer site-wide, edit `components.js`.
To update search content, edit `SEARCH_INDEX` in `search.js`.

## Styling

The site uses a warm citrus/orange color scheme with Tokyo Night theme for terminal/code blocks.

### CSS Variables (in `styles.css`)

**Orange Theme (WCAG AA compliant):**
| Variable | Value | Use |
|----------|-------|-----|
| `--orange-primary` | `#ff8c42` | Decorative elements only |
| `--orange-dark` | `#d65a1a` | Buttons with white text |
| `--orange-deep` | `#b84a12` | Button hover states |
| `--orange-text` | `#c24e10` | Orange text on light backgrounds |
| `--orange-text-hover` | `#a33f0a` | Hover state for orange text |

**Terminal Theme (Tokyo Night):**
| Variable | Value | Use |
|----------|-------|-----|
| `--tokyo-bg` | `#1a1b26` | Terminal background |
| `--tokyo-fg` | `#c0caf5` | Terminal text |
| `--tokyo-green` | `#9ece6a` | Success, commands |
| `--tokyo-cyan` | `#7dcfff` | Flags, CLI badges |
| `--tokyo-yellow` | `#e0af68` | Highlights |

**Fonts:**
- Display: Fraunces (Google Fonts)
- Body: DM Sans (Google Fonts)
- Code: JetBrains Mono (Google Fonts)

### Badge System

| Class | Style | Use For |
|-------|-------|---------|
| `.section-badge` | Orange bg + white text | UI-related content |
| `.section-badge-dark` | Tokyo bg + cyan text | CLI-related content (light bg) |
| `.section-badge-dark-on-dark` | Cyan border + cyan text | CLI content on dark bg |
| `.feature-badge-ui` | Orange bg + white text | UI-only features |
| `.feature-badge-cli` | Tokyo bg + cyan text | CLI-only features |

## Development

### Preview locally
```bash
cd pulp-site
python3 -m http.server 8080
# Open http://localhost:8080
```

Or use any static file server (e.g., `npx serve`).

### Updating version
1. Update `SITE_VERSION` in `components.js`
2. The footer will automatically use the new version

## Placeholders (All Completed ✅)

All placeholder content has been replaced with actual screenshots and animations. No remaining placeholders.

### Download URLs

**In `app.js`** — Update `getDownloadURL()`:
```javascript
function getDownloadURL(os) {
  const baseURL = 'https://github.com/rebelliongeeks/pulp-image/releases/latest/download/';
  const files = {
    'windows': 'pulp-image-windows.zip',
    'macos': 'pulp-image-macos.zip',
    'linux': 'pulp-image-linux.zip'
  };
  return baseURL + (files[os] || files['linux']);
}
```

**In `search.js`** — Update `downloadForOS()`:
```javascript
window.downloadForOS = function(os) {
  const baseURL = 'https://github.com/rebelliongeeks/pulp-image/releases/latest/download/';
  const files = {
    'windows': 'pulp-image-windows.zip',
    'macos': 'pulp-image-macos.zip',
    'linux': 'pulp-image-linux.zip'
  };
  window.location.href = baseURL + (files[os] || files['linux']);
};
```

Note: macOS uses a single package (works on both Intel and Apple Silicon).

## GitHub Pages Deployment

This site is **fully compatible with GitHub Pages**! It's 100% static HTML/CSS/JS with no server-side requirements.

### Steps to Deploy
1. Push the `pulp-site/` folder contents to a repository
2. Go to repository Settings → Pages
3. Choose "Deploy from a branch" and select `main` (or your branch) and `/` (root)
4. Your site will be live at `https://yourusername.github.io/repo-name/`

### Note on Paths
If deploying to a subdirectory (e.g., `rebelliongeeks.github.io/pulp-image/`), update:
- Logo paths in `components.js` (change `assets/` to `./assets/` or absolute paths)
- Navigation links if needed

## Download Tracking

**GitHub Releases provides free download analytics!**

When you host your zip files as GitHub Release assets:
1. Go to your repo → Releases → Create/Edit a release
2. Upload the zip files as release assets
3. GitHub automatically tracks download counts!

To see download counts:
- View the Releases page (shows counts next to each asset)
- Use the GitHub API: `GET /repos/owner/repo/releases` includes `download_count` for each asset

## Feedback & Support

The footer includes links to GitHub for user support:

- **Report a Bug**: Opens GitHub Issues with bug report template
- **Request a Feature**: Opens GitHub Issues with feature request template  
- **Ask a Question**: Links to GitHub Discussions

### Setting Up GitHub Issue Templates

Create these files in your main repo:
```
.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   └── feature_request.md
```

If you prefer to use GitHub Discussions instead of Issues for questions, enable Discussions in your repo settings.

## Moving to Separate Repo

When moving this to its own repository:

1. Copy the entire `pulp-site/` folder contents to the new repo root
2. Update download URLs in `app.js` to point to the correct release assets
3. Update GitHub links in `components.js` if the repo URL changes
4. Add screenshots and terminal animations
5. Deploy to GitHub Pages, Netlify, Vercel, or any static host

## Search Feature

The site includes a terminal-style fuzzy search (`search.js`) accessible via:
- Search icon in navigation
- Keyboard shortcut: `⌘K` (Mac) or `Ctrl+K` (Windows/Linux)

### Adding New Search Results

Search results are defined in the `SEARCH_INDEX` array in `search.js`. Each item has this structure:

```javascript
{
  type: 'cli',           // Type: cli, ui, example, format, page, download, action
  title: '--width, -w',  // Display title
  description: 'Output width in pixels...',  // Short description
  command: 'pulp image.png --width 800',     // Optional: command to show
  url: 'cli.html#resize', // URL with anchor to specific section
  keywords: ['resize', 'width', 'dimensions']  // Keywords for search matching
}
```

**Types and their icons:**
| Type | Icon | Use For |
|------|------|---------|
| `cli` | ⌘ | CLI options/flags |
| `ui` | 🎛️ | UI options/settings |
| `example` | 📝 | Command examples |
| `format` | 📄 | Format documentation |
| `page` | 📖 | Page links |
| `download` | ⬇️ | Download links |
| `action` | 🔗 | External links (GitHub, support) |

**To add a new searchable item:**
1. Open `search.js`
2. Add an entry to `SEARCH_INDEX` array
3. Make sure the `url` points to a valid page and anchor (e.g., `cli.html#resize`)
4. The anchor must exist as an `id` attribute on the target section

**Example: Adding a new CLI option**
```javascript
{
  type: 'cli',
  title: '--new-option',
  description: 'Description of what this option does',
  command: 'pulp image.png --new-option value',
  url: 'cli.html#section-id',  // Must match an id="" in cli.html
  keywords: ['keyword1', 'keyword2', 'keyword3']
}
```

---

## Complete CLI Reference

This section documents all CLI functionality for reference when updating the site.

### Installation
```bash
npm install -g pulp-image
```

### Basic Syntax
```bash
pulp [input] [options]
```

### All CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `-w, --width <number>` | Output width in pixels | — |
| `-h, --height <number>` | Output height in pixels | — |
| `-f, --format <format>` | Output format: `png`, `jpg`, `webp`, `avif` | Same as input |
| `-o, --out <dir>` | Output directory | `./pulp-image-results` |
| `--quality <number>` | Quality for lossy formats (1-100) | JPG: 80, WebP: 80, AVIF: 50 |
| `--lossless` | Use lossless compression (WebP, AVIF) | Off |
| `--suffix <text>` | Custom suffix before extension | — |
| `--auto-suffix` | Auto-add size suffix (-800w, -600h) | Off |
| `--background <color>` | Background color for flattening | `#ffffff` |
| `--alpha-mode <mode>` | `flatten` or `error` | `flatten` |
| `--overwrite` | Overwrite existing files | Off (skip) |
| `--delete-original` | Delete originals after processing | Off |
| `-v, --verbose` | Detailed output | Off |
| `--version` | Show version | — |
| `--help` | Show help | — |

### UI Command
```bash
pulp ui              # Start on port 3000
pulp ui --port 8080  # Start on custom port
```

### Supported Formats

| Format | Transparency | Compression | Default Quality |
|--------|--------------|-------------|-----------------|
| PNG | ✓ Yes | Always lossless | — |
| JPG | ✗ No | Always lossy | 80 |
| WebP | ✓ Yes | Lossy or lossless | 80 |
| AVIF | ✓ Yes | Lossy or lossless | 50 |

### Example Terminal Output

**Single file processing:**
```
✓ Processed: pulp-image-results/photo.png
  Original: 4.2 MB (3000x2000)
  Final:    892 KB
  Saved:    3.32 MB (79%)
```

**Batch processing:**
```
Found 12 image file(s) to process...

✓ Processed: 12 file(s)
  Total original size: 48.2 MB
  Total final size:    8.4 MB
  Total saved:         39.8 MB (82.57%)
```

**Skipped file:**
```
⚠ Skipped: image.png
  Reason: Output file already exists
```

**Failed file:**
```
✗ Failed: corrupted.png
  Error: Could not read image file
```

### Common Examples

```bash
# Convert to WebP
pulp image.png --format webp --quality 85

# Resize to 800px width
pulp photo.jpg --width 800

# Batch convert folder
pulp ./images --format webp --out ./output

# Create thumbnails with auto-naming
pulp ./photos --width 400 --auto-suffix --out ./thumbs

# Maximum compression for archive
pulp ./archive --format avif --quality 40

# Social media size (1200×630)
pulp cover.png --format jpg --width 1200 --height 630 --quality 90

# Flatten transparency to custom background
pulp logo.png --format jpg --background "#1a1b26"

# Responsive image generation
pulp photo.jpg --width 400 --auto-suffix --format webp --out ./responsive
pulp photo.jpg --width 800 --auto-suffix --format webp --out ./responsive
pulp photo.jpg --width 1200 --auto-suffix --format webp --out ./responsive
```

---

## UI Options Reference

All options available in the browser UI:

| Option | Description |
|--------|-------------|
| **Input Source** | Select files or folder. Supports PNG, JPG, WebP, AVIF. |
| **Output Directory** | Where to save. Default: timestamped folder in home dir. |
| **Output Format** | PNG, JPG, WebP, AVIF, or keep original. |
| **Width** | Output width in pixels. Leave empty for auto. |
| **Height** | Output height in pixels. Leave empty for auto. |
| **Quality** | Slider 1-100 for lossy formats. |
| **Lossless** | Toggle for lossless WebP/AVIF. |
| **Alpha Mode** | Flatten (default) or Error. |
| **Background Color** | Color picker for flattening transparency. |
| **Rename Pattern** | Tokens: `{name}`, `{ext}`, `{index}` |
| **Auto Suffix** | Auto-add dimension suffix (-800w, etc.) |
| **Overwrite** | Allow overwriting existing files. |

### UI-Only Features
- **Rename Pattern** with tokens — CLI users use shell tools like `mv` or `rename`

### CLI-Only Features
- **--delete-original** — Browser security prevents file deletion
- **--verbose** — UI shows results visually

---

## Features List

For the homepage features grid, here are all documented features:

1. **Resize with Aspect Ratio** — Width, height, or both. Aspect ratio preserved.
2. **Format Conversion** — PNG, JPG, WebP, AVIF.
3. **Batch Processing** — Process entire directories.
4. **Safety First** — Output to separate folder, no overwrites by default.
5. **Quality & Lossless Control** — Quality 1-100 or lossless mode.
6. **Transparency Handling** — Flatten to background or error.
7. **Auto & Custom Suffix** — -800w, -600h, or custom text.
8. **Detailed Statistics** — Original size, final size, bytes saved.
9. **Rename Patterns** (UI only) — {name}, {ext}, {index} tokens.
10. **Delete Originals** (CLI only) — --delete-original flag.
11. **Verbose Output** (CLI only) — --verbose flag.
12. **Overwrite Control** — Skip existing or overwrite.

---

## File Structure Reference

```
pulp-site/
├── index.html          # Landing page
├── cli.html            # CLI documentation
├── ui.html             # UI documentation
├── styles.css          # All styles (citrus theme + Tokyo Night)
├── app.js              # Core JS (copy, OS detection, dropdown, smooth scroll)
├── components.js       # Shared nav + footer (single source of truth)
├── search.js           # Terminal fuzzy search
├── assets/
│   ├── pulp-logo.svg            # Orange logo
│   ├── pulp-logo-white.svg      # White logo for footer
│   ├── hero-ui-screenshot.webp  # Hero section screenshot
│   ├── ui-card-front.webp       # UI showcase card (front)
│   ├── ui-card-middle.webp      # UI showcase card (middle)
│   ├── ui-card-back.webp        # UI showcase card (back)
│   ├── ui-overview.webp         # UI guide overview
│   ├── ui-input-source.webp     # Input source section
│   ├── ui-format-selection.webp # Format dropdown
│   ├── ui-dimensions.webp       # Width/height controls
│   ├── ui-quality-slider.webp   # Quality & lossless
│   ├── ui-background-color.webp # Color picker
│   ├── ui-rename-pattern.webp   # Rename pattern & auto suffix
│   ├── ui-results-summary.webp  # Processing results
│   └── cli-demo.cast            # Asciinema recording
└── README.md               # This file
```

---

## Quick Reference for Common Tasks

### Update version
Edit `SITE_VERSION` in `components.js`

### Update navigation
Edit `getNavHTML()` in `components.js`

### Update footer
Edit `getFooterHTML()` in `components.js`

### Update search content
Edit `SEARCH_INDEX` array in `search.js`

### Change colors
Edit CSS variables at top of `styles.css`

### Add new CLI option
1. Add to options table in `cli.html`
2. Add to search index in `search.js`
3. Update features grid in `index.html` if significant

---

## License

MIT License — same as the main Pulp Image project.

---

Made in Cyprus with love by [Rebellion Geeks](https://rebelliongeeks.com)

