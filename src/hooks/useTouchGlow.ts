import { useEffect } from 'react';

/** Share of an element that must be on screen before it lights up. */
const VISIBLE_SHARE = 0.15;

/**
 * Phones have no hover, so on touch screens every element marked `data-glow`
 * gets `data-lit` for as long as it is on screen. The `hover:` styles apply to
 * lit elements too (see index.css).
 */
export function useTouchGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute('data-lit', entry.intersectionRatio >= VISIBLE_SHARE);
        }
      },
      { threshold: [0, VISIBLE_SHARE] },
    );
    const elements = document.querySelectorAll('[data-glow]');
    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      elements.forEach((element) => element.removeAttribute('data-lit'));
    };
  }, []);
}
