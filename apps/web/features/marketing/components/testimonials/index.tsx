'use client';

import { IconRosetteDiscountCheck } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'motion/react';

import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/features/marketing/lib/motion';

import { SectionShell } from '../section-shell';
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
  TestimonialVerifiedBadge,
} from './testimonial';
import { TestimonialSpotlight } from './testimonial-spotlight';

const quotes = [
  {
    body: 'Conduit replaced three tools for us. Channels stay focused, and AI catch-up means I am never lost after a day offline.',
    name: 'Mira Chen',
    role: 'Head of Engineering, Latticeforge',
    avatar: 'https://picsum.photos/seed/mira-chen-conduit/96/96',
  },
  {
    body: 'Realtime presence finally feels boring in the best way. Messages just land, threads stay tidy, and handoffs stopped breaking.',
    name: 'Owen Drake',
    role: 'Product Lead, Northline',
    avatar: 'https://picsum.photos/seed/owen-drake-conduit/96/96',
  },
  {
    body: 'We shipped org-wide chat in a week. The shared timeline alone paid for the migration.',
    name: 'Priya Nair',
    role: 'CTO, Harborstack',
    avatar: 'https://picsum.photos/seed/priya-nair-conduit/96/96',
  },
] as const;

export default function Testimonials() {
  const reduced = useReducedMotion() ?? false;

  return (
    <SectionShell theme="dark" id="company" className="pt-16 pb-24 md:pb-48">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-foreground mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          Teams shipped faster with Conduit
        </h2>

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.06, reduced)}
        >
          {quotes.map((quote) => (
            <motion.div
              key={quote.name}
              variants={staggerItem(reduced, { scale: false })}
              className="h-full"
            >
              <TestimonialSpotlight className="h-full [--spotlight-color:rgba(255,255,255,0.18)] [--spotlight-opacity:0.7] [--spotlight-size:55%]">
                <Testimonial>
                  <TestimonialQuote>
                    &ldquo;{quote.body}&rdquo;
                  </TestimonialQuote>

                  <TestimonialAuthor>
                    <TestimonialAvatar>
                      <TestimonialAvatarImg
                        src={quote.avatar}
                        alt={quote.name}
                      />
                      <TestimonialAvatarRing />
                    </TestimonialAvatar>

                    <TestimonialAuthorName>
                      {quote.name}
                      <TestimonialVerifiedBadge>
                        <IconRosetteDiscountCheck className="text-primary" />
                      </TestimonialVerifiedBadge>
                    </TestimonialAuthorName>

                    <TestimonialAuthorTagline>
                      {quote.role}
                    </TestimonialAuthorTagline>
                  </TestimonialAuthor>
                </Testimonial>
              </TestimonialSpotlight>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
