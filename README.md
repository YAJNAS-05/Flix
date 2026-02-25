# Flix

A lightweight static movie/series showcase website.

## Overview

Flix is a simple front-end project that displays movies, series, and related assets using plain HTML, CSS, and JavaScript. It uses Boxicons and Owl Carousel from CDNs for icons and carousels.

## Files

- [about.html](about.html) — About page.
- [home.html](home.html) — Main landing page.
- [video-player.html](video-player.html) — Video player demo page.
- [app.js](app.js) — Main JavaScript (interactive UI, carousels, download demo).
- [app.css](app.css), [grid.css](grid.css) — Styling and layout.
- [images/](images/) — Image assets (icons, banners, posters).
- [videos/](videos/) — Optional local videos (currently excluded from Git via `.gitignore`).

## Local preview

Open `home.html` in a browser (double-click or use a local dev server). For better results run a local server (recommended):

```powershell
# Python 3
python -m http.server 8000
# then open http://localhost:8000/home.html
```

## Notes

- Large media files are not tracked in Git (see `.gitignore`). Consider using external storage or Git LFS for video files.
- Several image filenames contain spaces; renaming them to use hyphens or underscores prevents URL encoding issues.

## Want help?

If you want, I can:
- Rename images to remove spaces and update references.
- Add a license or CONTRIBUTING guide.
- Create a small GitHub Actions workflow to run a link/style check.
