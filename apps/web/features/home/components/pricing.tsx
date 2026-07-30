'use client';

import { Check } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  easeOut,
  staggerContainer,
  viewportOnce,
} from '@/features/home/lib/motion';

const plans = [
  {
    name: 'Starter',
    description: 'For solo developers',
    price: '$0',
    featured: false,
    variant: 'outline' as const,
    features: [
      'Basic Analytics Dashboard',
      '5GB Cloud Storage',
      'Email and Chat Support',
    ],
    className: 'flex flex-col gap-8 max-lg:border-b lg:border-r',
  },
  {
    name: 'Pro',
    description: 'For ambitious founders',
    price: '$59',
    featured: true,
    variant: 'default' as const,
    features: [
      'Everything in Free Plan',
      '5GB Cloud Storage',
      'Email and Chat Support',
      'Access to Community Forum',
      'Single User Access',
      'Access to Basic Templates',
      'Mobile App Access',
      '1 Custom Report Per Month',
      'Monthly Product Updates',
      'Standard Security Features',
    ],
    className:
      'bg-card relative flex flex-col gap-8 shadow-xl max-lg:border-y lg:border-x',
  },
  {
    name: 'Startup',
    description: 'For growing businesses and teams',
    price: '$99',
    featured: false,
    variant: 'outline' as const,
    features: [
      'Everything in Pro Plan',
      '10GB Cloud Storage',
      'Email and Chat Support',
      'Access to Community Forum',
      'Single User Access',
      'Access to Basic Templates',
      'Mobile App Access',
      '1 Custom Report Per Month',
      'Monthly Product Updates',
      'Standard Security Features',
    ],
    className: 'flex flex-col gap-8 max-lg:border-t lg:border-l',
  },
] as const;

export default function Pricing() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-lg space-y-6">
          <h1 className="text-muted-foreground text-4xl font-medium tracking-tight text-balance lg:text-5xl">
            <span className="text-foreground">Start free.</span> <br /> Upgrade
            as you scale.
          </h1>
        </div>

        <motion.div
          className="mt-12 grid gap-6 border *:p-8 max-lg:mx-auto max-lg:max-w-sm lg:mt-20 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.06, reduced)}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={plan.className}
              variants={{
                hidden: reduced
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 10,
                      scale: plan.featured ? 0.98 : 1,
                    },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: reduced ? 0.2 : 0.4,
                    delay: reduced ? 0 : plan.featured ? 0.04 : 0,
                    ease: easeOut,
                  },
                },
              }}
            >
              {plan.featured ? (
                <div className="inset-ring-foreground/10 absolute top-0 right-0 w-fit translate-x-px -translate-y-px rounded-bl bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-200 inset-ring [corner-shape:bevel]">
                  Popular
                </div>
              ) : null}
              <div>
                <p className="text-lg font-medium">{plan.name}</p>
                <p className="text-muted-foreground text-lg font-medium">
                  {plan.description}
                </p>

                <div className="my-8 block text-4xl font-medium tracking-tight">
                  {plan.price}{' '}
                  <span className="text-muted-foreground text-lg">/mo</span>
                </div>

                <Button
                  className="w-full"
                  variant={plan.variant}
                  nativeButton={false}
                  render={<Link href="#">Get Started</Link>}
                />
              </div>

              <ul className="text-muted-foreground list-outside space-y-3">
                {plan.features.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="text-muted-foreground size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
