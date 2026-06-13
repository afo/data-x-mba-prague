# Data-X MBA Prague — project guide

Modern, interactive course site. **Astro 6 + Tailwind v4**, static output, deployed to
**GitHub Pages via GitHub Actions** (`.github/workflows/deploy.yml`).

## Commands
- `npm run dev` — local dev server (http://localhost:4321/data-x-mba-prague)
- `npm run build` — static build to `dist/` (run this to catch base-path issues)
- `npm run preview` — preview the production build

## Deploy
- Pushing to `master` triggers the Actions workflow (`withastro/action`).
- One-time manual step in GitHub: **Settings → Pages → Source = GitHub Actions**.
- Project page → `astro.config.mjs` sets `base: '/data-x-mba-prague'`.
  **All internal links/assets must use `import.meta.env.BASE_URL`** (helper `withBase()` in `src/data/site.ts`).

## Conventions
- **Design tokens** live in `src/styles/global.css` (CSS variables — Predli palette + spacing/type). Don't hardcode hex; use the `--c-*` vars / Tailwind theme tokens.
- **Content source of truth** is `src/data/` (`resources.ts`, `course.ts`). Edit data there, not markup.
- **Client JS:** prefer `client:visible`; only nav/hero use `client:load`. Animate **transform/opacity only**; all GSAP wrapped in `gsap.matchMedia()` honoring `prefers-reduced-motion`.
- **A11y:** semantic HTML, one `<h1>`, visible `:focus-visible`, real `alt`, ≥4.5:1 contrast.

## Rollback
Old Jekyll site is in `/archive/` (and full git history). To restore: move `archive/*` back to root and remove the Astro files.
