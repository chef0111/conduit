'use client';

import { type ReactNode, useLayoutEffect } from 'react';

import { Toaster } from '@/components/ui/sonner';

export type ForcedTheme = 'light' | 'dark';

type ForcedThemeProviderProps = {
  theme: ForcedTheme;
  children: ReactNode;
};

/**
 * Locks the document to a fixed color scheme for a route tree.
 *
 * Avoids nesting `next-themes` ThemeProvider (React 19 rejects its inline
 * `<script>` on the client). Sets `color-scheme` on `<html>` so the scrollbar
 * matches even over opposite `data-surface` bands.
 */
export function ForcedThemeProvider({
  theme,
  children,
}: ForcedThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScheme = root.style.colorScheme;
    const hadDark = root.classList.contains('dark');

    root.style.colorScheme = theme;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    return () => {
      root.style.colorScheme = previousScheme;
      if (hadDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
  }, [theme]);

  return (
    <>
      {children}
      <Toaster richColors closeButton theme={theme} />
    </>
  );
}
