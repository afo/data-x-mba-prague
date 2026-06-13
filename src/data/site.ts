/** Prefix an internal path with the configured base (for GitHub Pages project page). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export const site = {
  title: 'Data-X · MBA Prague',
  shortTitle: 'Data-X',
  tagline: 'Applied AI, data science & machine learning for builders.',
  course: 'MBA Program',
  school: 'VŠE Prague',
  contactEmail: 'afo@berkeley.edu',
  repo: 'https://github.com/afo/data-x-mba',
  // Prague coordinates for the live location/clock motif
  geo: { label: 'Prague, Czechia', lat: "50°04'N", lon: "14°25'E", tz: 'Europe/Prague' },
} as const;
