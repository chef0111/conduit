'use client';

import type { ComponentType } from 'react';

import { SectionShell } from '../section-shell';
import {
  Arcjet,
  BetterAuth,
  Claude,
  Cursor,
  Motion,
  Neon,
  Prisma,
  VercelFull,
} from '../svgs';
import { LogosCarousel } from './logos-carousel';

type PartnerLogo = {
  name: string;
  Logo: ComponentType<{ className?: string }>;
  className: string;
};

const partnerLogos: PartnerLogo[] = [
  { name: 'Arcjet', Logo: Arcjet, className: 'h-5 w-auto max-w-full' },
  { name: 'Vercel', Logo: VercelFull, className: 'h-5 w-full' },
  { name: 'Neon', Logo: Neon, className: 'h-5 w-auto max-w-full' },
  { name: 'Prisma', Logo: Prisma, className: 'h-7 w-auto max-w-full' },
  { name: 'Better Auth', Logo: BetterAuth, className: 'h-5 w-auto max-w-full' },
  { name: 'Motion', Logo: Motion, className: 'h-5 w-auto max-w-full' },
  { name: 'Cursor', Logo: Cursor, className: 'h-5 w-auto max-w-full' },
  { name: 'Claude', Logo: Claude, className: 'h-5 w-full max-w-full' },
];

export default function LogoCloud() {
  return (
    <SectionShell theme="light" className="border-border border-y">
      <div className="mx-auto mb-24 grid max-w-6xl grid-cols-1 md:grid-cols-[minmax(12rem,18rem)_1fr]">
        <div className="flex items-center px-6 py-8 md:py-10">
          <p className="text-foreground max-w-[14rem] text-sm font-medium text-balance">
            Trusted by fast-growing companies around the world.
          </p>
        </div>

        <div className="flex items-center px-4 py-8 md:px-6 md:py-10">
          <LogosCarousel
            columnCount={4}
            className="divide-border w-full gap-0 divide-x [&_[data-slot=logos-carousel-column]]:px-4 sm:[&_[data-slot=logos-carousel-column]]:px-6"
          >
            {partnerLogos.map(({ name, Logo, className }) => (
              <div
                key={name}
                className="text-foreground flex h-10 items-center justify-center opacity-80"
                aria-label={name}
              >
                <Logo className={className} />
              </div>
            ))}
          </LogosCarousel>
        </div>
      </div>
    </SectionShell>
  );
}
