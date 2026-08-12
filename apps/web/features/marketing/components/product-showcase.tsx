'use client';

import { IconHash, IconMessageCircle, IconUsers } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';

import {
  easeOut,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/features/marketing/lib/motion';

import { ForwardButton } from './forward-button';
import { SectionShell } from './section-shell';

const surfaces = [
  {
    icon: IconHash,
    title: 'Channels',
    body: 'Organize work by project, team, or topic without losing context.',
  },
  {
    icon: IconMessageCircle,
    title: 'Threads',
    body: 'Keep side conversations nested so the main feed stays readable.',
  },
  {
    icon: IconUsers,
    title: 'Members',
    body: 'Invite teammates, set roles, and see who is online in realtime.',
  },
] as const;

export default function ProductShowcase() {
  const reduced = useReducedMotion() ?? false;

  return (
    <SectionShell
      theme="dark"
      id="product"
      cutout="down"
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            Built for how teams already talk
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base text-pretty md:text-lg">
            Drop-in surfaces for channels, threads, and presence - ready to
            embed in your product or run as your workspace.
          </p>
        </div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: reduced ? 0.2 : 0.55, ease: easeOut }}
          className="relative aspect-88/36 min-w-2xl mask-b-from-75% mask-b-to-95%"
        >
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
        </motion.div>

        <motion.div
          className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.06, reduced)}
        >
          {surfaces.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={staggerItem(reduced, { scale: false })}
              className="space-y-3"
            >
              <div className="border-border bg-card/50 flex size-10 items-center justify-center rounded-lg border">
                <Icon className="text-foreground size-5" />
              </div>
              <h3 className="text-foreground text-lg font-medium">{title}</h3>
              <p className="text-muted-foreground text-sm text-balance md:text-base">
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <ForwardButton variant="ghost" href="/sign-up">
            Explore all surfaces
          </ForwardButton>
        </div>
      </div>
    </SectionShell>
  );
}
