# Data-X · MBA Prague

The course site for the **Data-X MBA Program** at VŠE Prague — applied AI, data science,
machine learning & deep learning.

Built with **[Astro](https://astro.build) + Tailwind v4**, deployed as a static site to
**GitHub Pages** via GitHub Actions. Design language inspired by [Predli](https://predli.com).

## Develop

```bash
npm install
npm run dev        # http://localhost:4321/data-x-mba-prague
npm run build      # static build → dist/  (run this to catch base-path issues)
npm run preview    # preview the production build
```

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds with
`withastro/action` and publishes to GitHub Pages. The site is served from a
**project path**, so `astro.config.mjs` sets `base: '/data-x-mba-prague'`.

> **One-time setup on GitHub:** Repo → **Settings → Pages → Build and deployment →
> Source → "GitHub Actions"**. (It was previously "Deploy from a branch".)

Live URL: `https://afo.github.io/data-x-mba-prague/`

### Switching to a custom domain later
Set `site` to the domain and `base: '/'` in `astro.config.mjs`, then add a
`public/CNAME` file containing the domain.

## Editing content

All content lives in **`src/data/`** — edit data, not markup:
- `course.ts` — dates, materials, final-project checklist, rubric, readings, instructors, FAQ.
- `resources.ts` — the curated Learning Path (verified free AI/ML/Python/Claude-Code links).
- `site.ts` — title, contact, repo, location.

Design tokens (Predli palette, type scale) live in `src/styles/global.css`.

## Project structure

```
src/
  components/   section components (Hero, LearningPath, …)
  data/         content source of truth (course.ts, resources.ts, site.ts)
  scripts/      motion.ts (GSAP+Lenis), neural-canvas.ts, clock.ts
  styles/       global.css (design tokens)
  layouts/      Base.astro
  pages/        index.astro
public/         favicon, images, .nojekyll
.github/        Pages deploy workflow
```

## Rollback

The previous Jekyll site is preserved in [`/archive`](./archive) (and in full git history).
To restore it: move `archive/*` back to the repo root, delete the Astro files, and switch
GitHub Pages back to "Deploy from a branch".
