# Developer notes

The website is the plain static site in the **parent folder** (`index.html`, `assets/`, ...). This `dev/` folder is only the workshop: the source for the three React pieces and the search index. Publishing needs none of it.

## Rebuild the React pieces

```bash
cd dev
npm install
npm run build:csr      # writes ../assets/hero.*, offer.*, csr-stack.*
npm run build:search   # writes ../search-data.js (pages, facts, FAQs the home search reads)
```

The built files are committed, so nobody has to run this to deploy or to add photos.

| Bundle | Page | Source (inside `dev/`) |
|---|---|---|
| `assets/hero.{js,css}` | Home hero, site search, mobile menu | `components/ui/hero-1.tsx`, `components/ui/site-search.tsx`, `scripts/hero-island-*` |
| `assets/offer.{js,css}` | About page radial dial | `components/ui/radial-orbital-timeline.tsx`, `lib/data/offer.ts`, `scripts/offer-island-*` |
| `assets/csr-stack.{js,css}` | CSR stacking cards | `components/ui/stacking-card.tsx`, `lib/data/csr.ts`, `scripts/csr-island-*` |

Run `build:search` after editing FAQs (they live in `faqs.html`) or the facts in `scripts/build-search-index.mjs`.

## Common edits

- **Package prices and tests:** `packages-data.js`. **Profile prices and tests:** `profiles-data.js` (each profile lists its sections and tests; the home search and the Profiles tab both read it). Then bump the `?v=` tag, below.
- **Sample report PDFs** for two profiles are in `assets/reports/`.
- **Phone numbers, hours, addresses:** search the HTML files; they repeat in the header, footer and bottom bar.
- **Cache tag:** stylesheets and scripts are linked with `?v=lightNN`. Bump it in the HTML files after a CSS or JS change so phones fetch the new file.
- **Look and feel:** colour tokens are at the top of `shared.css`.

## Local preview

```bash
python3 -m http.server 8080    # run from the repo root, then open http://localhost:8080
```

## Not used

`app/`, `docs/`, `public/`, `next.config.ts` and the `next` / `shadcn` packages are an earlier Next.js redesign that was not used. They are kept for reference.
