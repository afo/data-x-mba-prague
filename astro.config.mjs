// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages as a PROJECT page under the account's custom domain:
//   https://alex.fo/data-x-mba-prague/   (also https://afo.github.io/data-x-mba-prague/)
// `site` is used for canonical/OG absolute URLs; `base` prefixes all assets & links.
// The custom domain `alex.fo` is configured on the account's main Pages site, so
// this project repo must NOT contain its own CNAME file.
export default defineConfig({
  site: 'https://alex.fo',
  base: '/data-x-mba-prague',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
