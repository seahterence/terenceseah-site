# Terence Seah Reviews

Singapore new launch condo reviews — terenceseah.com

## Writing a review

Go to `/admin` on the live site and log in. Everything is a form field;
you never need to touch this repository.

## How it is built

- Content lives in `src/post/*.md` — one file per review.
- Layout lives in `src/_includes/` — change it once, every review follows.
- `src/site.css` holds the whole design.
- Eleventy builds `src/` into `_site/`, which Netlify serves.

Local: `npm install && npm run dev`

## Hosting

Build command: `npm run build`
Build output directory: `_site`
Node version: 22 (pinned in `.node-version`)

Caching and header rules live in `src/_headers` (Cloudflare Pages).
`netlify.toml` is kept only while the Netlify deploy is still running.
