'use client';

import { IconBell, IconSparkles, IconWifi } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';

import { SectionShell } from '@/features/marketing/components/section-shell';
import {
  easeOut,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/features/marketing/lib/motion';

const realtimePoints = [
  {
    icon: IconWifi,
    title: 'Realtime by default',
    body: 'Messages, typing, and presence update instantly across every client.',
  },
  {
    icon: IconBell,
    title: 'Proactive alerts',
    body: 'Surface quiet channels and missed replies before work stalls.',
  },
] as const;

const aiPoints = [
  {
    icon: IconSparkles,
    title: 'AI that stays in context',
    body: 'Effortless summaries, handoffs, and next steps grounded in the same thread history.',
  },
] as const;

export function FeatureBands() {
  const reduced = useReducedMotion() ?? false;

  return (
    <SectionShell
      theme="light"
      id="solutions"
      cutout="up"
      className="space-y-24 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            Conversations that move at the speed of your team
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-base text-balance md:text-lg">
            Conduit keeps every channel live so ownership changes and follow-ups
            never reset the relationship.
          </p>

          <motion.ul
            className="mt-10 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.06, reduced)}
          >
            {realtimePoints.map(({ icon: Icon, title, body }) => (
              <motion.li
                key={title}
                variants={staggerItem(reduced, { scale: false })}
                className="flex gap-4"
              >
                <div className="border-border bg-muted/50 flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <Icon className="text-foreground size-5" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium">{title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm text-balance md:text-base">
                    {body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: reduced ? 0.2 : 0.55, ease: easeOut }}
          className="border-border relative overflow-hidden rounded-2xl border bg-zinc-50 p-2 shadow-sm"
        >
          <Image
            src="/images/mail-back.webp"
            alt="Realtime channel activity in Conduit"
            width={2797}
            height={1137}
            className="w-full rounded-[10px] object-cover"
          />
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: reduced ? 0.2 : 0.55, ease: easeOut }}
          className="border-border bg-card/40 relative order-2 overflow-hidden rounded-2xl border p-2 lg:order-1"
        >
          <Image
            src="/images/mail2.webp"
            alt="AI summaries and sync inside Conduit threads"
            width={2700}
            height={1440}
            className="aspect-video w-full rounded-[10px] object-cover"
          />
        </motion.div>

        <div className="order-1 lg:order-2">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            AI that keeps every thread clear
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-base text-balance md:text-lg">
            From catch-up summaries to forecast clarity, Conduit uses AI so
            leaders see risk and momentum without chasing updates.
          </p>

          <motion.ul
            className="mt-10 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.06, reduced)}
          >
            {aiPoints.map(({ icon: Icon, title, body }) => (
              <motion.li
                key={title}
                variants={staggerItem(reduced, { scale: false })}
                className="flex gap-4"
              >
                <div className="border-border bg-card/50 flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <Icon className="text-foreground size-5" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium">{title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm text-pretty md:text-base">
                    {body}
                  </p>
                </div>
              </motion.li>
            ))}
            <motion.li
              variants={staggerItem(reduced, { scale: false })}
              className="text-muted-foreground text-sm text-balance md:text-base"
            >
              <span className="text-foreground font-medium">
                Shared timeline.{' '}
              </span>
              Collaboration works from one account view.
            </motion.li>
            <motion.li
              variants={staggerItem(reduced, { scale: false })}
              className="text-muted-foreground text-sm text-balance md:text-base"
            >
              <span className="text-foreground font-medium">
                Seamless handoffs.{' '}
              </span>
              Ownership changes without relationship resets.
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </SectionShell>
  );
}
