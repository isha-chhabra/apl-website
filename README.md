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
| `assets/` | Logo, doctor photo, placeholder photos, and the built React bundles (`hero`, `offer`, `csr-stack`) |

## Common edits

- **Phone numbers, hours, addresses:** search the HTML files for the number or address and change it (they repeat in the header, footer and bottom bar).
- **Prices and tests:** `legacy-static/packages-data.js`.
- **Photos:** replace files in `legacy-static/assets/photos/` (gallery and CSR use them) and `legacy-static/assets/dr-chhabra.jpg`.
- **Cache busting:** stylesheets and scripts are linked with `?v=darkNN`; bump it in the HTML files after a change so phones fetch the new file.

## Rebuilding the React bundles (only if you edit them)

Three pieces are React "islands" whose source lives outside `legacy-static/`:

| Bundle | Page | Source |
|---|---|---|
| `assets/hero.{js,css}` | Home hero and mobile menu | `components/ui/hero-1.tsx`, `scripts/hero-island-*` |
| `assets/offer.{js,css}` | About page radial "What We Offer" dial | `components/ui/radial-orbital-timeline.tsx`, `lib/data/offer.ts`, `scripts/offer-island-*` |
| `assets/csr-stack.{js,css}` | CSR stacking cards | `components/ui/stacking-card.tsx`, `lib/data/csr.ts`, `scripts/csr-island-*` |

```bash
npm install
npm run build:csr   # rebuilds all three into legacy-static/assets/
```

The built files are committed, so deploying never needs this.

## Repo notes

`app/`, `docs/` and the `next`/`shadcn` parts of `package.json` are an earlier Next.js redesign that was not used. They are kept for reference and are not deployed.
