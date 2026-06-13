import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const mm = gsap.matchMedia();

  // ---- Full motion (only when the user hasn't asked to reduce it) ----
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Smooth scrolling
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Anchor links → smooth scroll via Lenis
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target as HTMLElement, { offset: -70 });
        }
      });
    });

    // Hero: kinetic line reveal
    const heroLines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
    heroLines.forEach((line) => {
      const split = new SplitType(line, { types: 'chars' });
      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.025,
        delay: 0.15,
      });
    });

    // Hero: fade-up supporting elements
    gsap.from('[data-hero-fade]', {
      y: 24,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.12,
      delay: 0.5,
    });

    // Scroll reveals (batched for performance)
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 85%',
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          overwrite: true,
        }),
    });

    // Count-up stats
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const raw = el.dataset.count || '';
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return;
      const suffix = raw.replace(/[0-9.]/g, '');
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(obj, {
            v: num,
            duration: 1.4,
            ease: 'expo.out',
            onUpdate: () => {
              el.textContent = Number.isInteger(num)
                ? Math.round(obj.v) + suffix
                : obj.v.toFixed(0) + suffix;
            },
          }),
      });
    });

    return () => {
      lenis.destroy();
    };
  });

  // ---- Reduced motion: make sure everything is simply visible ----
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('[data-reveal], [data-hero-fade]', { opacity: 1, y: 0 });
  });
}
