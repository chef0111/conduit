import './globals.css';

import type { Metadata } from 'next';

import { fontVariables } from '@/config/font';
import { ThemeProvider } from '@/context/theme-provider';
import { cn } from '@/lib/utils';

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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
