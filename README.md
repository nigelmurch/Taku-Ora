# Taku-Ora (Practice-scroll)

This is a static site (HTML/CSS/JS). The repo contains the site assets.

Quick checklist performed:
- Fixed malformed navigation anchors in `index.html`.
- Added a missing `<main>` start tag so the document structure is balanced.
- Added a small placeholder `script/particles.js` to avoid a runtime 404; replace with your real particles script if needed.

How to run locally (macOS / zsh):

1. From the project root (`/Users/a642171/Desktop/Practice-scroll`) run a simple static server:

```bash
# Python 3 built-in HTTP server (serves current directory on port 8000)
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Deployment options

- GitHub Pages: push this repository to GitHub and enable Pages in the repository settings. For a repository-site, use the `main` branch's `/` root.
- Netlify: drag & drop the site folder in Netlify's dashboard or connect the repository and point build settings to `main` (no build required for plain static sites).

Notes & next steps
- `script/particles.js` is a placeholder — replace with your particle implementation if needed.
- Confirm `images/` contains the assets used by the HTML. If large images cause slow load, optimize them for web (WebP/resize).
- Consider adding a small CI check or linter for HTML/CSS (optional).

If you want, I can:
- Add a `style.min.css` and `script.min.js` build step.
- Create a basic `index.html` metadata (OpenGraph/twitter) and sitemap.
- Wire up a GitHub Actions workflow to auto-deploy to GitHub Pages or Netlify on push.
