'use client';

import { ArrowLeftRight, Bell, LineChart, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';

import {
  easeOut,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/features/home/lib/motion';

const featureItems = [
  {
    icon: ArrowLeftRight,
    title: 'Seamless handoffs.',
    body: 'Ownership changes without resetting the relationship.',
  },
  {
    icon: Bell,
    title: 'Proactive alerts.',
    body: 'Surface renewals and quiet accounts before they slip.',
  },
  {
    icon: Users,
    title: 'Shared timeline.',
    body: 'Sales, success, and support work from one account view.',
  },
  {
    icon: LineChart,
    title: 'Forecast clarity.',
    body: 'Leaders see risk and momentum without chasing updates.',
  },
] as const;

export default function Features() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        <h2 className="text-muted-foreground relative z-10 max-w-4xl text-4xl font-medium tracking-tight text-balance lg:text-5xl">
          <span className="text-foreground">Your stack, connected.</span> <br />{' '}
          Git sync or AI agents, your way.
        </h2>
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{
            duration: reduced ? 0.2 : 0.5,
            ease: easeOut,
          }}
          className="relative -mx-6 overflow-hidden px-3 pt-3 md:-mx-8"
        >
          <div className="absolute inset-3 z-1 size-64 rounded-tl-3xl border-t border-l mask-radial-[100%_60%] mask-radial-from-65% mask-radial-at-top-left md:size-96 lg:inset-4"></div>
          <div className="relative aspect-88/36 min-w-2xl mask-b-from-75% mask-b-to-95%">
            <Image
              src="/images/mail-upper.webp"
              className="absolute inset-0 z-10"
              alt="payments illustration"
              width={2797}
              height={1137}
            />
            <Image
              src="/images/mail-back.webp"
              alt="payments illustration"
              width={2797}
              height={1137}
              className="opacity-75"
            />
          </div>
        </motion.div>
        <motion.div
          className="mt-12 grid gap-3 *:max-w-xs max-sm:*:not-last:border-b max-sm:*:not-last:pb-3 sm:grid-cols-2 md:mt-16 md:gap-y-6 lg:mt-24 lg:grid-cols-4 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.05, reduced)}
        >
          {featureItems.map(({ icon: Icon, title, body }) => (
            <motion.p
              key={title}
              variants={staggerItem(reduced, { scale: false })}
              className="text-muted-foreground text-balance"
            >
              <span className="text-foreground font-medium">
                <Icon className="inline size-4 -translate-y-0.5" /> {title}
              </span>{' '}
              {body}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
