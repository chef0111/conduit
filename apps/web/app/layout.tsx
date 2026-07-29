import './globals.css';

import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { fontVariables } from '@/config/font';
import { cn } from '@/lib/utils';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Conduit',
  description:
    'An all-in-one communication platform powered by AI, for modern teams and organizations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('h-full antialiased', fontVariables)}>
      <body>
        <Providers>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
