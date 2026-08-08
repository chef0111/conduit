import type { Transition, Variants } from 'motion/react';

/** Matches skill vocabulary: cubic-bezier(0.23, 1, 0.32, 1) */
export const easeOut = [0.23, 1, 0.32, 1] as const;

/** Matches skill vocabulary: cubic-bezier(0.32, 0.72, 0, 1) */
export const easeDrawer = [0.32, 0.72, 0, 1] as const;

export const viewportOnce = { once: true, amount: 0.2 as const };

export function fadeUpTransition(
  delay = 0,
  duration = 0.55,
  reduced = false
): Transition {
  if (reduced) {
    return { duration: 0.2, delay: 0, ease: 'linear' };
  }
  return { duration, delay, ease: easeOut };
}

export function fadeUpVariants(reduced = false): Variants {
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      ...(reduced ? {} : { y: 0 }),
      transition: fadeUpTransition(delay, reduced ? 0.2 : 0.55, reduced),
    }),
  };
}

/** Fade-up with blur soft-focus → sharp. Skip blur when reduced-motion. */
export function fadeUpBlurVariants(reduced = false): Variants {
  return {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 12, filter: 'blur(8px)' },
    visible: (delay: number = 0) => ({
      opacity: 1,
      ...(reduced ? {} : { y: 0, filter: 'blur(0px)' }),
      transition: fadeUpTransition(delay, reduced ? 0.2 : 0.65, reduced),
    }),
  };
}

export function staggerContainer(stagger = 0.05, reduced = false): Variants {
  return {
    hidden: {},
    visible: {
      transition: reduced
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren: 0.05 },
    },
  };
}

export function staggerItem(
  reduced = false,
  { scale = true }: { scale?: boolean } = {}
): Variants {
  return {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 8, ...(scale ? { scale: 0.97 } : {}) },
    visible: {
      opacity: 1,
      ...(reduced ? {} : { y: 0, ...(scale ? { scale: 1 } : {}) }),
      transition: fadeUpTransition(0, reduced ? 0.2 : 0.38, reduced),
    },
  };
}
