import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { ComponentType } from 'react';

import { Arcjet } from './svgs/arcjet';
import { BetterAuth } from './svgs/better-auth';
import { Claude } from './svgs/claude';
import { Cursor } from './svgs/cursor';
import { Motion } from './svgs/motion';
import { Neon } from './svgs/neon';
import { Prisma } from './svgs/prisma';
import { VercelFull } from './svgs/vercel';

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

export function LogoCloud() {
  return (
    <section className="bg-background pt-6 pb-16 md:pb-32">
      <div className="group relative m-auto max-w-5xl px-6">
        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
          <Link
            href="/"
            className="block text-sm duration-150 hover:opacity-75"
          >
            <span> See the network</span>

            <ChevronRight className="ml-1 inline-block size-3" />
          </Link>
        </div>
        <div className="text-foreground mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 group-hover:blur-xs sm:gap-x-16 sm:gap-y-14 md:grid-cols-4">
          {partnerLogos.map(({ name, Logo, className }) => (
            <div key={name} className="flex h-8 items-center justify-center">
              <Logo className={className} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
