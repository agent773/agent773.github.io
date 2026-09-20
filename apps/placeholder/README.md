# Parth R. Patel — placeholder site

Astro stand-in built from the Figma file. It is published to GitHub Pages until the Angular site (`apps/site`) replaces it.

This is a Yarn workspace. From the repo root:

```
yarn
yarn dev:placeholder
yarn build:placeholder
yarn preview:placeholder
```

## Files

- `src/pages/index.astro` — markup, content arrays (portfolio shots, socials), SEO and JSON-LD
- `src/pages/404.astro` — not-found page (GitHub Pages serves it for unknown URLs)
- `src/assets/` — logo and photos, optimized by `astro:assets` at build time
- `public/styles/global.css` — all styles (theme tokens at the top)
- `public/scripts/main.js` — theme toggle, portfolio lightbox, email decoding, nav fade
- `public/robots.txt`, `public/.well-known/tdmrep.json` — crawler and AI-training opt-outs
