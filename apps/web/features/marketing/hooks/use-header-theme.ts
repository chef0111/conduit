'use client';

import { useEffect, useState } from 'react';

import type { SectionTheme } from '@/features/marketing/components/section-shell';

/**
 * Sample Y for the light ↔ dark transition.
 * Higher = transition sooner.
 */
const SAMPLE_Y_PX = 80;

/** Returns the root margin for a 1px IntersectionObserver band at `sampleY`. */
function getRootMargin(sampleY: number) {
  const bottom = Math.max(0, window.innerHeight - sampleY - 1);
  return `-${sampleY}px 0px -${bottom}px 0px`;
}

function themeAt(
  sections: HTMLElement[],
  sampleY: number,
  fallback: SectionTheme
): SectionTheme {
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= sampleY && rect.bottom > sampleY) {
      return (section.getAttribute('data-header-theme') ??
        fallback) as SectionTheme;
    }
  }
  return fallback;
}

/**
 * Tracks which marketing band is under the dock.
 *
 * Two sample lines, no scroll-direction state (avoids blink):
 * - light above / dark below → follow `SAMPLE_Y_PX` (80)
 * - dark above / light below → follow `SAMPLE_Y_PX` (44)
 * - both lines same theme → that theme
 */
export function useHeaderTheme(defaultTheme: SectionTheme = 'light') {
  const [theme, setTheme] = useState<SectionTheme>(defaultTheme);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-header-theme]')
    );

    if (sections.length === 0) return;

    const resolveTheme = () => {
      const upper = themeAt(sections, SAMPLE_Y_PX, defaultTheme);
      const lower = themeAt(sections, SAMPLE_Y_PX, defaultTheme);

      let next: SectionTheme;
      if (upper === lower) {
        next = upper;
      } else if (upper === 'dark' && lower === 'light') {
        // Dark-above / light-below boundary → flip at the upper sample (44)
        next = upper;
      } else {
        // Light-above / dark-below boundary → flip at the lower sample (80)
        next = lower;
      }

      setTheme((prev) => (prev === next ? prev : next));
    };

    const sampleLines = Array.from(new Set([SAMPLE_Y_PX, SAMPLE_Y_PX]));

    const connect = () =>
      sampleLines.map((sampleY) => {
        const observer = new IntersectionObserver(() => resolveTheme(), {
          root: null,
          rootMargin: getRootMargin(sampleY),
          threshold: [0, 1],
        });
        for (const section of sections) {
          observer.observe(section);
        }
        return observer;
      });

    let observers = connect();
    resolveTheme();

    const onResize = () => {
      for (const observer of observers) {
        observer.disconnect();
      }
      observers = connect();
      resolveTheme();
    };

    // rAF-throttled scroll so we catch the boundary while crossing the gap
    // between the two sample lines (IO alone only fires on enter/leave).
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        resolveTheme();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, [defaultTheme]);

  return theme;
}
