import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Beacon } from '@/features/home/components/svgs/beacon';
import { Bolt } from '@/features/home/components/svgs/bolt';
import { Claude } from '@/features/home/components/svgs/claude';
import { FirebaseFull } from '@/features/home/components/svgs/firebase';
import { Hulu } from '@/features/home/components/svgs/hulu';
import { Spotify } from '@/features/home/components/svgs/spotify';
import { SupabaseFull } from '@/features/home/components/svgs/supabase';
import { VercelFull } from '@/features/home/components/svgs/vercel';

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-24 md:pt-36">
            <div className="mx-auto max-w-7xl">
              <div className="px-6 text-center sm:mx-auto lg:mt-0 lg:mr-auto">
                <Link
                  href="#link"
                  className="group mx-auto flex w-fit items-center gap-3 rounded-full p-1 pl-4 transition-colors duration-300"
                >
                  <span className="text-sm font-medium">New:</span>
                  <span className="text-muted-foreground text-sm">
                    Introducing breaking AI features
                  </span>

                  <div className="size-6 overflow-hidden rounded-full duration-500">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </Link>

                <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-medium tracking-tight text-balance md:text-6xl lg:mt-12 xl:text-7xl">
                  AI-ready home for team communication
                </h1>
                <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-balance md:text-lg">
                  Conduit organizes conversations into channels with threads, is
                  realtime, and uses AI to keep teams in sync.
                </p>

                <div className="mt-6 flex flex-col items-center justify-center gap-2 md:flex-row">
                  <Button
                    key={1}
                    nativeButton={false}
                    render={
                      <Link href="#">
                        <span className="text-nowrap">Get started</span>
                      </Link>
                    }
                  />

                  <Button
                    key={2}
                    variant="outline"
                    nativeButton={false}
                    render={
                      <Link href="#">
                        <span className="text-nowrap">Request a demo</span>
                      </Link>
                    }
                  />
                </div>
              </div>

              <div className="relative mt-8 overflow-hidden p-6 max-sm:-mr-56 sm:mt-16">
                <div className="absolute inset-0 rounded-4xl border bg-linear-to-b to-zinc-600 mask-t-from-25% mask-t-to-65%"></div>
                <div className="bg-background ring-foreground/6.5 before:ring-foreground before:border-foreground/10 relative rounded-2xl p-2 shadow-xl ring shadow-black/50 before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-t before:border-l before:mask-radial-[100%_60%] before:mask-radial-from-65% before:mask-radial-at-top-left">
                  <div className="bg-foreground/2 absolute inset-0 z-1 rounded-2xl"></div>
                  <Image
                    className="bg-background relative aspect-15/8 rounded-2xl"
                    src="/images/mail2.webp"
                    alt="app screen"
                    width="2700"
                    height="1440"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

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
            <div className="**:fill-foreground mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 group-hover:blur-xs sm:gap-x-16 sm:gap-y-14 md:grid-cols-4">
              <div className="flex items-center">
                <Bolt className="mx-auto h-5 w-full" />
              </div>
              <div className="flex items-center">
                <VercelFull className="mx-auto h-4 w-full" />
              </div>
              <div className="flex items-center">
                <SupabaseFull className="mx-auto h-6" />
              </div>
              <div className="flex items-center">
                <Hulu className="mx-auto h-4 w-full" />
              </div>
              <div className="flex items-center">
                <Spotify className="mx-auto h-6 w-full" />
              </div>
              <div className="flex items-center">
                <FirebaseFull className="mx-auto h-6 w-full" />
              </div>
              <div className="hidden items-center sm:flex">
                <Beacon className="mx-auto h-4 w-full" />
              </div>

              <div className="hidden items-center sm:flex">
                <Claude className="mx-auto h-5 w-full" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
