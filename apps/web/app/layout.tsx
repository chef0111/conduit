import './globals.css';

import { cn } from '@repo/ui/lib/utils';
import type { Metadata } from 'next';

import { fontVariables } from '@/config/font';

export const metadata: Metadata = {
  title: 'Conduit',
  description:
    'All-in-one communication platform powered by AI, for modern teams and organizations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full antialiased', fontVariables)}
      style={{ colorScheme: 'light' }}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
