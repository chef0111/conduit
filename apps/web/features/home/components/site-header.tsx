'use client';

import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/features/home/components/logo';
import { easeDrawer } from '@/features/home/lib/motion';

const menuItems = [
  { name: 'Product', href: '#link' },
  { name: 'Solutions', href: '#link' },
  { name: 'Pricing', href: '#link' },
  { name: 'Company', href: '#link' },
];

export default function SiteHeader() {
  const [menuState, setMenuState] = React.useState(false);
  const reduced = useReducedMotion() ?? false;

  React.useEffect(() => {
    if (!menuState) return;

    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const updateOverflow = () => {
      document.documentElement.classList.toggle(
        'overflow-hidden',
        mediaQuery.matches
      );
    };

    updateOverflow();
    mediaQuery.addEventListener('change', updateOverflow);

    return () => {
      mediaQuery.removeEventListener('change', updateOverflow);
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [menuState]);

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="bg-background fixed top-0 z-20 w-full border-b max-lg:data-[state=active]:bottom-0"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex flex-wrap items-center justify-between py-4 max-lg:gap-6">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 block cursor-pointer after:absolute after:-inset-4 lg:hidden"
              >
                <div
                  aria-hidden
                  className="m-auto flex size-4.5 flex-col items-center justify-center gap-[7px] duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0"
                >
                  <span className="bg-foreground h-0.5 w-full rounded-full" />
                  <span className="bg-foreground h-0.5 w-full rounded-full" />
                </div>

                <X className="absolute inset-0 m-auto size-6 translate-x-[-3px] scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto size-fit max-lg:hidden">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden w-fit flex-wrap items-center justify-end gap-3 lg:flex">
              <Button
                size="sm"
                variant="outline"
                nativeButton={false}
                render={<Link href="#">Login</Link>}
              />
              <Button
                size="sm"
                nativeButton={false}
                render={<Link href="#">Get Started</Link>}
              />
            </div>

            <AnimatePresence>
              {menuState ? (
                <motion.div
                  key="mobile-menu"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{
                    duration: reduced ? 0.15 : 0.25,
                    ease: easeDrawer,
                  }}
                  className="mb-6 w-full space-y-8 lg:hidden"
                >
                  <ul>
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={
                          reduced ? { opacity: 0 } : { opacity: 0, y: 6 }
                        }
                        animate={
                          reduced ? { opacity: 1 } : { opacity: 1, y: 0 }
                        }
                        transition={{
                          duration: reduced ? 0.15 : 0.22,
                          delay: reduced ? 0 : 0.04 * index,
                          ease: easeDrawer,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="text-foreground block py-3 text-2xl font-medium"
                          onClick={() => setMenuState(false)}
                        >
                          <span>{item.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0">
                    <Button
                      size="sm"
                      variant="outline"
                      nativeButton={false}
                      render={<Link href="#">Login</Link>}
                    />
                    <Button
                      size="sm"
                      nativeButton={false}
                      render={<Link href="#">Get Started</Link>}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
}
