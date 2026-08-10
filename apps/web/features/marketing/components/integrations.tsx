'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Gemini } from '@/features/marketing/components/svgs/gemini';
import { GooglePaLM } from '@/features/marketing/components/svgs/google-palm';
import { MagicUI } from '@/features/marketing/components/svgs/magic-ui';
import { MediaWiki } from '@/features/marketing/components/svgs/media-wiki';
import { Replit } from '@/features/marketing/components/svgs/replit';
import { VSCodium } from '@/features/marketing/components/svgs/vs-codium';
import {
  easeOut,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/features/marketing/lib/motion';

const integrations = [
  {
    icon: <Gemini />,
    name: 'Gemini',
    description: "The AI model that powers Google's search engine.",
  },
  {
    icon: <Replit />,
    name: 'Replit',
    description: "The AI model that powers Google's search engine.",
  },
  {
    icon: <GooglePaLM />,
    name: 'GooglePaLM',
    description: "The AI model that powers Google's search engine.",
  },
  {
    icon: <MagicUI />,
    name: 'MagicUI',
    description: "The AI model that powers Google's search engine.",
  },
  {
    icon: <VSCodium />,
    name: 'VSCodium',
    description: "The AI model that powers Google's search engine.",
  },
  {
    icon: <MediaWiki />,
    name: 'MediaWiki',
    description: "The AI model that powers Google's search engine.",
  },
] as const;

export default function Integrations() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:gap-12">
          <div className="flex flex-col justify-between gap-12 pb-6 max-lg:order-last md:mt-6">
            <div>
              <h2 className="text-4xl font-medium tracking-tight text-balance lg:text-5xl">
                Integrate with your favorite Tools
              </h2>
              <p className="text-muted-foreground mt-4 mb-6 text-lg text-balance">
                Connect seamlessly with popular platforms and services to
                enhance your workflow.
              </p>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="#">Get Started</Link>}
              />
            </div>

            <p className="text-muted-foreground max-w-xs text-lg text-pretty">
              Conduit integrates with{' '}
              <span className="text-foreground font-medium">
                over 150 Tools
              </span>{' '}
              to enhance your workflow.
            </p>
          </div>

          <div className="-mx-6 mask-radial-[100%_80%] mask-radial-from-65% mask-radial-at-top-left px-6 sm:mx-auto sm:max-w-md md:-mx-6 md:mr-0 md:ml-auto">
            <div className="bg-card rounded-2xl border p-3 shadow-lg md:pb-12">
              <motion.div
                className="grid grid-cols-2 gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer(0.05, reduced)}
              >
                {integrations.map((item) => (
                  <Integration
                    key={item.name}
                    icon={item.icon}
                    name={item.name}
                    description={item.description}
                    reduced={reduced}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Integration = ({
  icon,
  name,
  description,
  reduced,
}: {
  icon: ReactNode;
  name: string;
  description: string;
  reduced: boolean;
}) => {
  return (
    <motion.div
      variants={staggerItem(reduced)}
      whileHover={reduced ? undefined : { y: -2 }}
      transition={{ duration: 0.16, ease: easeOut }}
      className="hover:bg-foreground/5 cursor-pointer space-y-4 rounded-lg border p-4 transition-colors duration-150"
    >
      <div className="flex size-fit items-center justify-center">{icon}</div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-muted-foreground line-clamp-1 text-sm md:line-clamp-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
