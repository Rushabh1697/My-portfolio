import { useEffect } from 'react';

/** Half the height of the lit band, as a share of the screen height. */
const REACH = 0.18;

/**
 * Phones have no hover, so on touch screens every element marked `data-glow`
 * gets `data-lit` while it is near the middle of the screen. The `hover:`
 * styles apply to lit elements too (see index.css).
 */
export function useTouchGlow() {
  useEffect(() => {
    const touch = window.matchMedia('(hover: none)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const remaining = document.documentElement.scrollHeight - window.scrollY - height;
      // The band slides down near the end of the page, so the last items light too.
      const center = height - Math.min(height / 2, Math.max(remaining, 0));
      document.querySelectorAll<HTMLElement>('[data-glow]').forEach((element) => {
        const { top, bottom } = element.getBoundingClientRect();
        const lit = touch.matches && top < center + height * REACH && bottom > center - height * REACH;
        element.toggleAttribute('data-lit', lit);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    touch.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      touch.removeEventListener('change', schedule);
    };
  }, []);
}
