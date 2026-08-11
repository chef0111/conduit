'use client';

import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/context/theme';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
      <Toaster richColors closeButton />
    </ThemeProvider>
  );
}
