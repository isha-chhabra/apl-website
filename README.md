# Aakash Pathology Laboratory, Ankleshwar

Website for Aakash Pathology Laboratory. Built phone-first (about 99% of visitors are on a phone), light only: warm cream and white with a burnt-orange accent and tiny sky-blue hints.

**The site is the plain static folder [`legacy-static/`](legacy-static).** It needs no build step and no server: HTML, one stylesheet, and three small pre-built React bundles. Deploy that folder as it is.

## Deploy (pick one)

| Host | Steps |
|---|---|
| **Vercel** | Import the repo. `vercel.json` already sets the output folder. Click Deploy. |
| **Netlify** | Import the repo. `netlify.toml` already sets the publish folder. Click Deploy. |
| **GitHub Pages** | Copy `deploy/github-pages.yml` to `.github/workflows/pages.yml` (GitHub blocks some tokens from adding workflow files, so it is not pre-installed). Then Settings, Pages, Source: **GitHub Actions**, and push to `main`. |
| **Any static host** | Upload the contents of `legacy-static/` (Cloudflare Pages, S3, Firebase Hosting, an nginx folder). |

To look at it locally: `npx serve legacy-static` (or `python3 -m http.server -d legacy-static`).

## What is in `legacy-static/`

| File | What |
|---|---|
| `index.html`, `about.html`, `packages.html`, `faqs.html`, `gallery.html`, `csr.html`, `contact.html` | The pages |
| `shared.css` | Design tokens and shared styles (dark theme, header, footer, bands) |
| `packages-data.js` | Every package, price and test (from the printed chart). Edit prices and tests here |
| `search-data.js` | What the home-page search looks through besides tests and packages (pages, facts, FAQs). Generated: run `npm run build:search` after editing FAQs or facts in `scripts/build-search-index.mjs` |
| `assets/` | Logo, doctor photo, placeholder photos, and the built React bundles (`hero`, `offer`, `csr-stack`) |

## Common edits

- **Phone numbers, hours, addresses:** search the HTML files for the number or address and change it (they repeat in the header, footer and bottom bar).
- **Prices and tests:** `legacy-static/packages-data.js`.
- **Photos:** CSR uses `legacy-static/assets/photos/csr-*.jpg` and the doctor photo is `assets/dr-chhabra.jpg`. **Gallery:** save each photo in `assets/photos/`, then edit the `photos` list at the top of the script in `gallery.html` (file, alt text, caption, group). Stand-in photos show a small "Sample photo" tag; delete `sample:true` from a line once it is a real photo of the lab.
- **Cache busting:** stylesheets and scripts are linked with `?v=darkNN`; bump it in the HTML files after a change so phones fetch the new file.

## Rebuilding the React bundles (only if you edit them)

Three pieces are React "islands" whose source lives outside `legacy-static/`:

| Bundle | Page | Source |
|---|---|---|
| `assets/hero.{js,css}` | Home hero, site search and mobile menu | `components/ui/hero-1.tsx`, `components/ui/site-search.tsx`, `scripts/hero-island-*` |
| `assets/offer.{js,css}` | About page radial "What We Offer" dial | `components/ui/radial-orbital-timeline.tsx`, `lib/data/offer.ts`, `scripts/offer-island-*` |
| `assets/csr-stack.{js,css}` | CSR stacking cards | `components/ui/stacking-card.tsx`, `lib/data/csr.ts`, `scripts/csr-island-*` |

```bash
npm install
npm run build:csr   # rebuilds all three into legacy-static/assets/
```

The built files are committed, so deploying never needs this.

## Repo notes

`app/`, `docs/` and the `next`/`shadcn` parts of `package.json` are an earlier Next.js redesign that was not used. They are kept for reference and are not deployed.
