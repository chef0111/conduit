'use client';

import { IconArrowRight } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  easeOut,
  fadeUpBlurVariants,
  fadeUpVariants,
} from '@/features/home/lib/motion';

import { LogoCloud } from './logo-could';

export default function HeroSection() {
  const reduced = useReducedMotion() ?? false;
  const variants = fadeUpVariants(reduced);

  return (
    <>
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-24 md:pt-36">
            <div className="mx-auto max-w-7xl">
              <div className="px-6 text-center sm:mx-auto lg:mt-0 lg:mr-auto">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  <Link
                    href="#link"
                    className="group border-input bg-input/30 mx-auto flex w-fit items-center gap-2 rounded-full border p-1 pl-4 transition-colors duration-300"
                  >
                    <span className="text-sm font-medium">New:</span>
                    <span className="text-muted-foreground text-sm">
                      Introducing breaking AI features
                    </span>

                    <div className="size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <IconArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <IconArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                <motion.h1
                  custom={0.08}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpBlurVariants(reduced)}
                  className="mx-auto mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-balance md:text-6xl lg:mt-12 xl:text-7xl"
                >
                  <span className="text-transparent [filter:drop-shadow(0_0_10px_color-mix(in_oklch,var(--foreground)_70%,transparent))_drop-shadow(0_0_28px_color-mix(in_oklch,var(--foreground)_18%,transparent))] [-webkit-text-stroke:1.5px_var(--foreground)]">
                    AI-ready
                  </span>{' '}
                  home for team communication
                </motion.h1>
                <motion.p
                  custom={0.14}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  className="text-muted-foreground mx-auto mt-4 max-w-2xl font-medium text-balance md:text-lg"
                >
                  Conduit organizes conversations into channels with threads, is
                  realtime, and uses AI to keep teams in sync.
                </motion.p>

                <motion.div
                  custom={0.2}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  className="mt-6 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
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
                </motion.div>
              </div>

              <motion.div
                initial={
                  reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }
                }
                animate={
                  reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{
                  duration: reduced ? 0.2 : 0.6,
                  delay: reduced ? 0 : 0.28,
                  ease: easeOut,
                }}
                className="relative mt-8 overflow-hidden p-6 max-sm:-mr-56 sm:mt-16"
              >
                <div className="absolute inset-0 rounded-4xl border bg-linear-to-b to-zinc-600 mask-t-from-25% mask-t-to-65%"></div>
                <div className="bg-background ring-foreground/6.5 before:ring-foreground before:border-foreground/10 relative rounded-2xl p-2 shadow-xl ring shadow-black/50 before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-t before:border-l before:mask-radial-[100%_60%] before:mask-radial-from-65% before:mask-radial-at-top-left">
                  <div className="bg-foreground/2 absolute inset-0 z-1 rounded-2xl"></div>
                  <Image
                    className="bg-background relative aspect-15/8 rounded-2xl"
                    src="/images/mail2.webp"
                    alt="app screen"
                    width="2700"
                    height="1440"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <LogoCloud />
      </main>
    </>
  );
}
