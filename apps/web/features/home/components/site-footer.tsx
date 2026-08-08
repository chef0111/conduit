import type { Route } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogoIcon } from '@/features/home/components/logo';

type FooterLink = { href: Route; label: string };

const communityLinks: FooterLink[] = [
  { href: '#' as Route, label: 'GitHub' },
  { href: '#' as Route, label: 'Discord' },
  { href: '#' as Route, label: 'Slack' },
  { href: '#' as Route, label: 'X / Twitter' },
];

const footerLinks: { name: string; links: FooterLink[] }[] = [
  {
    name: 'Product',
    links: [
      { href: '#' as Route, label: 'Security' },
      { href: '#' as Route, label: 'Customization' },
      { href: '#' as Route, label: 'Enterprise' },
      { href: '#' as Route, label: 'Partners' },
    ],
  },
  {
    name: 'Company',
    links: [
      { href: '#' as Route, label: 'About' },
      { href: '#' as Route, label: 'Customers' },
      { href: '#' as Route, label: 'Enterprise' },
      { href: '#' as Route, label: 'Partners' },
      { href: '#' as Route, label: 'Jobs' },
    ],
  },
  {
    name: 'Legal',
    links: [
      { href: '#' as Route, label: 'Licence' },
      { href: '#' as Route, label: 'Privacy Policy' },
      { href: '#' as Route, label: 'Terms of Service' },
      { href: '#' as Route, label: 'Cookie Policy' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl space-y-16 px-6 pt-32 pb-16">
        <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:grid-cols-4 lg:grid-cols-5">
          <div className="max-lg:col-span-full">
            <Link href="/" aria-label="go home">
              <LogoIcon />
            </Link>
          </div>

          {footerLinks.map((linksGroup, index) => (
            <div key={index}>
              <span className="text-sm font-medium">{linksGroup.name}</span>
              <ul className="mt-4 list-inside space-y-4">
                {linksGroup.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-primary text-muted-foreground text-sm duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <span className="text-sm font-medium">Community</span>
            <ul className="mt-4 list-inside space-y-4">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-primary text-muted-foreground text-sm duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <form className="mt-12 w-full max-w-xs">
              <div className="space-y-2.5">
                <Label className="block text-sm font-medium" htmlFor="email">
                  Subscribe to our newsletter
                </Label>
                <Input
                  className="text-sm"
                  placeholder="Your email"
                  type="email"
                  id="email"
                  required
                  name="email"
                />
              </div>
              <Button type="submit" className="mt-3" size="sm">
                <span>Subscribe</span>
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-16">
          <span className="text-muted-foreground block text-sm">
            &copy; Conduit 2026 - All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
