import { GeistMono } from 'geist/font/mono';
import { GeistPixelSquare } from 'geist/font/pixel';
import { GeistSans } from 'geist/font/sans';

import { cn } from '@/lib/utils';

const fontSans = GeistSans;
const fontMono = GeistMono;
const fontPixelSquare = GeistPixelSquare;

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontPixelSquare.variable,
  '[--font-sans:var(--font-geist-sans)]',
  '[--font-mono:var(--font-geist-mono)]'
);
