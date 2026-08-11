'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { createQueryClient } from '@/lib/query/client';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
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
  );
}
