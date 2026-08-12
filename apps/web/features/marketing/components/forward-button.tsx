import { IconChevronRight } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ForwardButtonProps {
  href: Route;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function ForwardButton({
  href,
  children,
  variant = 'default',
  size = 'default',
  className,
}: ForwardButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      nativeButton={false}
      render={<Link href={href} />}
      className={cn('group gap-1 overflow-hidden pr-1.5', className)}
    >
      {children}
      <div className="relative overflow-hidden rounded-full p-2">
        <IconChevronRight className="absolute inset-0 right-1.5 size-4 transition-all duration-300 group-hover:translate-x-6" />
        <IconChevronRight className="absolute inset-0 right-1.5 size-4 -translate-x-6 transition-all duration-300 group-hover:translate-x-0" />
      </div>
    </Button>
  );
}
