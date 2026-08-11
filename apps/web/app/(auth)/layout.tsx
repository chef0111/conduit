import { IconChevronLeft } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { Logo } from '@/components/logo';

import { Providers } from './providers';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main
        data-surface="light"
        className="bg-background text-foreground flex min-h-screen w-full flex-col font-sans lg:flex-row"
      >
        {/* Left Image Panel */}
        <div className="sticky flex min-h-[40vh] w-full flex-col justify-between overflow-hidden p-8 md:p-12 lg:min-h-screen lg:w-1/2 lg:p-16">
          {/* Background Image — wrapper owns the insets; fill ignores intrinsic width/height */}
          <div className="pointer-events-none absolute inset-0 lg:inset-8">
            <Image
              src="/images/auth.avif"
              alt="Abstract blue background"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover lg:rounded-2xl"
              priority
            />
          </div>

          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between">
            <Logo textClassName="text-white" />

            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-medium text-white/90 transition-colors hover:text-white md:text-sm lg:text-base"
            >
              <IconChevronLeft className="size-4" />
              Back to Website
            </Link>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 mt-12 lg:mt-0">
            <h1 className="mb-4 max-w-xl text-4xl leading-[1.1] font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              Where Innovation
              <br />
              Meets Impact.
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-balance text-white/90 sm:text-lg">
              Conduit empowers teams to build, scale, and transform with
              technology that drives real results.
            </p>
          </div>
        </div>

        {children}
      </main>
    </Providers>
  );
}
