/* ============================================================
   Custom canvas visuals (no library, transform/opacity-friendly):
   1) Hero backdrop — drifting gradient mesh (Stripe-style, Predli
      palette) + a faint feed-forward neural net with travelling signals.
   2) Learn section — animated self-attention between tokens.
   Both pause when offscreen, render a single static frame for users who
   prefer reduced motion, and re-read their colours on theme change so
   they look right in both light and dark mode.
   ============================================================ */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type RAF = { stop: () => void };

/** Read the live theme colours from CSS variables. */
function readColors() {
  const cs = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => {
    const v = cs.getPropertyValue(name).trim();
    return v || fallback;
  };
  return {
    ink: get('--color-ink', '#0d0e11'),
    invert: get('--color-invert', '#0d0e11'),
    onInvert: get('--color-on-invert', '#f6f7f9'),
    accent: get('--color-accent', '#d5521a'),
    accentBright: get('--color-accent-bright', '#f06a2c'),
    mist: get('--color-mist', '#e7edf3'),
  };
}
let C = readColors();

function setupCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  let w = 0;
  let h = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const api = {
    ctx,
    get w() { return w; },
    get h() { return h; },
    onResize: (() => {}) as () => void,
    dispose: () => ro.disconnect(),
  };
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = Math.max(1, r.width);
    h = Math.max(1, r.height);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    api.onResize();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  if (document.fonts?.ready) document.fonts.ready.then(() => api.onResize());
  return api;
}

/** Run `frame` via rAF, but only while the canvas is on screen. */
function runVisible(canvas: HTMLCanvasElement, frame: (t: number) => void, drawOnce: () => void): RAF {
  let raf = 0;
  let visible = true;
  const loop = (t: number) => {
    frame(t);
    raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !REDUCED) raf = requestAnimationFrame(loop);
      if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
    },
    { threshold: 0.01 },
  );
  io.observe(canvas);

  if (REDUCED) drawOnce();
  else raf = requestAnimationFrame(loop);

  return { stop: () => { if (raf) cancelAnimationFrame(raf); io.disconnect(); } };
}

/* ---------------- Hero backdrop ---------------- */
function heroNeural(canvas: HTMLCanvasElement) {
  const c = setupCanvas(canvas);

  const layers = [4, 6, 6, 3];
  let nodes: { x: number; y: number }[][] = [];
  nodes = layers.map((count, li) => {
    const x = 0.12 + (li / (layers.length - 1)) * 0.78;
    return Array.from({ length: count }, (_, ni) => ({ x, y: 0.2 + ((ni + 0.5) / count) * 0.6 }));
  });

  const signals = Array.from({ length: 14 }, () => ({ layer: 0, from: 0, to: 0, t: Math.random(), speed: 0 }));
  const reseed = (s: (typeof signals)[number]) => {
    s.layer = Math.floor(Math.random() * (layers.length - 1));
    s.from = Math.floor(Math.random() * layers[s.layer]);
    s.to = Math.floor(Math.random() * layers[s.layer + 1]);
    s.t = 0;
    s.speed = 0.003 + Math.random() * 0.004;
  };
  signals.forEach(reseed);

  // Drifting gradient blobs — colour resolved from theme at draw time.
  const blobs: { key: 'accent' | 'mist' | 'accentBright'; x: number; y: number; r: number; dx: number; dy: number; a: number }[] = [
    { key: 'accent', x: 0.2, y: 0.3, r: 0.5, dx: 0.00007, dy: 0.00005, a: 0.1 },
    { key: 'mist', x: 0.8, y: 0.7, r: 0.6, dx: -0.00006, dy: 0.00004, a: 0.5 },
    { key: 'accentBright', x: 0.65, y: 0.2, r: 0.35, dx: 0.00005, dy: 0.00006, a: 0.07 },
  ];

  const draw = () => {
    const { ctx, w, h } = c;
    ctx.clearRect(0, 0, w, h);

    blobs.forEach((b) => {
      b.x += b.dx * (REDUCED ? 0 : 16);
      b.y += b.dy * (REDUCED ? 0 : 16);
      if (b.x < -0.1 || b.x > 1.1) b.dx *= -1;
      if (b.y < -0.1 || b.y > 1.1) b.dy *= -1;
      const cx = b.x * w;
      const cy = b.y * h;
      const rad = b.r * Math.max(w, h);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      const col = C[b.key];
      g.addColorStop(0, hexA(col, b.a));
      g.addColorStop(1, hexA(col, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });

    // edges
    ctx.lineWidth = 1;
    for (let li = 0; li < nodes.length - 1; li++) {
      for (const a of nodes[li]) {
        for (const b of nodes[li + 1]) {
          ctx.strokeStyle = hexA(C.ink, 0.06);
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      }
    }

    // nodes
    for (const layer of nodes) {
      for (const n of layer) {
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 3, 0, Math.PI * 2);
        ctx.fillStyle = hexA(C.ink, 0.28);
        ctx.fill();
      }
    }

    // travelling signals
    for (const s of signals) {
      if (!REDUCED) s.t += s.speed;
      if (s.t >= 1) reseed(s);
      const a = nodes[s.layer]?.[s.from];
      const b = nodes[s.layer + 1]?.[s.to];
      if (!a || !b) { reseed(s); continue; }
      const x = (a.x + (b.x - a.x) * s.t) * w;
      const y = (a.y + (b.y - a.y) * s.t) * h;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 9);
      glow.addColorStop(0, hexA(C.accent, 0.9));
      glow.addColorStop(1, hexA(C.accent, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = C.accent;
      ctx.fill();
    }
  };

  c.onResize = () => { if (REDUCED) draw(); };
  document.addEventListener('themechange', () => { C = readColors(); if (REDUCED) draw(); });
  return runVisible(canvas, draw, draw);
}

/* ---------------- Self-attention visual (always on a dark surface) ---------------- */
function attention(canvas: HTMLCanvasElement) {
  const c = setupCanvas(canvas);
  const tokens = ['The', 'transformer', 'attends', 'to', 'every', 'token', 'at', 'once'];

  const draw = (time: number) => {
    const { ctx, w, h } = c;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = C.invert; // dark in both themes
    ctx.fillRect(0, 0, w, h);

    const n = tokens.length;
    const padX = Math.min(80, w * 0.08);
    const usable = w - padX * 2;
    const step = usable / (n - 1);
    const topY = h * 0.26;
    const botY = h * 0.74;
    const xs = tokens.map((_, i) => padX + i * step);

    const t = time * 0.001;
    const active = Math.floor(t * 0.6) % n;
    const phase = (t * 0.6) % 1;

    for (let q = 0; q < n; q++) {
      for (let k = 0; k < n; k++) {
        const base = 0.04 + 0.1 * (1 - Math.abs(q - k) / n);
        const isActive = q === active;
        const pulse = isActive ? 0.6 + 0.4 * Math.sin((phase + k / n) * Math.PI * 2) : 0;
        const alpha = base + pulse * 0.5;
        ctx.strokeStyle = isActive ? hexA(C.accentBright, alpha) : hexA(C.onInvert, base * 0.5);
        ctx.lineWidth = isActive ? 1.4 : 0.6;
        const x1 = xs[q];
        const x2 = xs[k];
        const midY = (topY + botY) / 2 + Math.sin((q + k) * 0.7) * 8;
        ctx.beginPath();
        ctx.moveTo(x1, botY - 14);
        ctx.bezierCurveTo(x1, midY, x2, midY, x2, topY + 14);
        ctx.stroke();
      }
    }

    ctx.font = `500 ${Math.max(11, Math.min(15, w * 0.014))}px "DM Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const drawChip = (x: number, y: number, label: string, hot: boolean) => {
      const tw = ctx.measureText(label).width + 22;
      const th = 26;
      roundRect(ctx, x - tw / 2, y - th / 2, tw, th, 13);
      ctx.fillStyle = hot ? C.accent : hexA(C.onInvert, 0.06);
      ctx.fill();
      ctx.strokeStyle = hot ? C.accent : hexA(C.onInvert, 0.18);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = hot ? '#fff' : hexA(C.onInvert, 0.85);
      ctx.fillText(label, x, y);
    };
    tokens.forEach((tok, i) => drawChip(xs[i], topY, tok, false));
    tokens.forEach((tok, i) => drawChip(xs[i], botY, tok, i === active));
  };

  c.onResize = () => { if (REDUCED) draw(1200); };
  document.addEventListener('themechange', () => { C = readColors(); if (REDUCED) draw(1200); });
  return runVisible(canvas, draw, () => draw(1200));
}

/* ---------------- helpers ---------------- */
function hexA(hex: string, a: number) {
  const v = hex.replace('#', '');
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function initCanvas() {
  C = readColors();
  const hero = document.querySelector<HTMLCanvasElement>('[data-neural]');
  if (hero) heroNeural(hero);
  const att = document.querySelector<HTMLCanvasElement>('[data-attention]');
  if (att) attention(att);
}
