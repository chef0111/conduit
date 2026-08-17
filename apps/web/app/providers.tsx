'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/context/auth-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { createQueryClient } from '@/lib/query/client';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <AuthProvider>
      <ThemeProvider
        defaultTheme="system"
        attribute="class"
        enableSystem={true}
        disableTransitionOnChange
      >
        <ProgressProvider
          color="var(--primary)"
          height="2px"
          delay={500}
          options={{ showSpinner: false }}
        >
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>{children}</TooltipProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ProgressProvider>
        <Toaster richColors closeButton />
      </ThemeProvider>
    </AuthProvider>
  );
}
