/* Dark-mode controller: toggle button + follow system preference.
   The INITIAL theme is set pre-paint by an inline script in Base.astro
   (so there's no flash). This wires up the toggle and live system sync. */

type Theme = 'light' | 'dark';
const KEY = 'theme';

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return systemDark() ? 'dark' : 'light';
}

function apply(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(theme === 'dark'));
    b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function initTheme() {
  // Sync toggle state with whatever the pre-paint script chose.
  apply(currentTheme());

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(KEY, next);
      } catch {}
      apply(next);
    });
  });

  // Follow the OS setting live — but only if the user hasn't picked explicitly.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    if (!stored) apply(e.matches ? 'dark' : 'light');
  });
}
