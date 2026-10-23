# chalkd-site

The website for [Chalkd](https://github.com/DibsCodes/chalkd), the free, open-source, touch-first whiteboard for teachers.

It's a plain static site: no build step, no frameworks, no third-party requests except one call to the GitHub API that keeps the download buttons pointed at the latest release.

## Preview

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Layout

| Path | What it is |
|---|---|
| `index.html` | The whole page |
| `css/style.css` | Styles (colors match the app: slate, cream, chalkboard green, pen blue) |
| `js/main.js` | Sticky-nav border and latest-release download links |
| `img/screens/` | Screenshots of Chalkd 1.3.0 (WebP) |
| `img/og-image.png` | 1200×630 image for link previews |
| `fonts/` | Self-hosted Fraunces, Inter and Caveat (SIL Open Font License, see `fonts/LICENSE-*.txt`) |
| `_headers` | Cache and security headers for Cloudflare Pages or Netlify |

## Screenshots

The screenshots come from the real app (the 1.3.0 build), driven over the Chrome DevTools protocol in a throwaway library, so no real boards were used. The handwriting is a single-stroke font drawn as pen strokes.

## Releases

The download buttons link to the 1.3.0 files and `js/main.js` swaps in the latest release's files when the page loads, so a new release doesn't need a site change. If release file names change pattern, update `ASSETS` in `js/main.js`.

## Hosting

Served by GitHub Pages from `main` at https://dibscodes.github.io/chalkd-site/. Every push to `main` redeploys it. If the site moves to its own domain, update `canonical`, `og:url` and `og:image` in `index.html`.
