// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages as a PROJECT page:
//   https://afo.github.io/data-x-mba-prague/
// `site` + `base` make Astro emit correct absolute URLs for assets and links.
// To switch to a custom domain later: set `site` to the domain, `base` to '/',
// and add a public/CNAME file.
export default defineConfig({
  site: 'https://afo.github.io',
  base: '/data-x-mba-prague',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
