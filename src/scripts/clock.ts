/** Live Prague clock — updates every [data-live-clock] element. */
export function initClock(tz = 'Europe/Prague') {
  const els = document.querySelectorAll<HTMLElement>('[data-live-clock]');
  if (!els.length) return;

  const fmt = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: tz,
  });

  const tick = () => {
    const t = fmt.format(new Date());
    els.forEach((el) => (el.textContent = t));
  };

  tick();
  window.setInterval(tick, 1000);
}
