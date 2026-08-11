'use client';

import { useEffect, useState } from 'react';

import type { SectionTheme } from '@/features/marketing/components/section-shell';

/**
 * Sample Y for the light ↔ dark transition.
 * Higher = section must travel further under the dock before the header flips.
 */
const SAMPLE_Y_PX = 80;

/** Returns the root margin for a 1px IntersectionObserver band at `sampleY`. */
function getRootMargin(sampleY: number) {
  const bottom = Math.max(0, window.innerHeight - sampleY - 1);
  return `-${sampleY}px 0px -${bottom}px 0px`;
}

/**
 * Tracks which marketing band crosses the sample line under the dock.
 * Uses a 1px IntersectionObserver band (no continuous theme thrashing).
 */
export function useHeaderTheme(defaultTheme: SectionTheme = 'light') {
  const [theme, setTheme] = useState<SectionTheme>(defaultTheme);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-header-theme]')
    );

    if (sections.length === 0) return;

    const resolveTheme = () => {
      let best: Element | null = null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= SAMPLE_Y_PX && rect.bottom > SAMPLE_Y_PX) {
          best = section;
          break;
        }
      }

      const next = (best?.getAttribute('data-header-theme') ??
        defaultTheme) as SectionTheme;
      setTheme((prev) => (prev === next ? prev : next));
    };

    let observer = new IntersectionObserver(() => resolveTheme(), {
      root: null,
      rootMargin: getRootMargin(SAMPLE_Y_PX),
      threshold: [0, 1],
    });

    for (const section of sections) {
      observer.observe(section);
    }
    resolveTheme();

    const onResize = () => {
      observer.disconnect();
      observer = new IntersectionObserver(() => resolveTheme(), {
        root: null,
        rootMargin: getRootMargin(SAMPLE_Y_PX),
        threshold: [0, 1],
      });
      for (const section of sections) {
        observer.observe(section);
      }
      resolveTheme();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, [defaultTheme]);

  return theme;
}
