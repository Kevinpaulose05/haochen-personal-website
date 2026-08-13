# Haochen Liu — Personal Website

Portfolio site for Haochen (Sheryl) Liu, Investment Product Manager at MY Securities.

Static site, no build step:

- `index.html` — main site (investment products work)
- `film.html` — production archive; earlier film/TV/live-event credits, reached only from a small footer link on the main page. Marked `noindex` so it doesn't surface in search results for her name, while staying available to anyone she sends the link to. Remove that meta tag to make it indexable.
- `css/style.css`, `js/main.js` — shared by both pages

## Run locally

```bash
npx serve -l 4173 .
```

Then open http://localhost:4173.

## Deploy

Any static host works as-is:

- **GitHub Pages** — push to GitHub, enable Pages on the `main` branch root.
- **Netlify / Vercel** — drag-and-drop the folder or connect the repo; no build command, publish directory is the repo root.

## Design notes

- Type: [Fraunces](https://fonts.google.com/specimen/Fraunces) (display serif) + Inter (text), loaded from Google Fonts.
- Palette: warm paper `#f6f2ea`, ink `#1c1a17`, cinnabar seal-red accent `#b03a24`, near-black `#121110` for the full-bleed Approach section and the whole production archive page.
- Emphasis: the main site leads with the investment-products work. Earlier media/production roles stay in the timeline below an "Earlier" divider, set in smaller, lighter type so they read as prior context rather than the headline. Named film/TV credits live only on `film.html`.
- Motion: IntersectionObserver scroll reveals + reading-progress bar, both disabled under `prefers-reduced-motion`.
