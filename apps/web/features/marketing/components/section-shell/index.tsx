import type { HTMLAttributes, ReactNode } from 'react';

import {
  type CutoutOrientation,
  SectionCutout,
} from '@/features/marketing/components/section-shell/section-cutout';
import { cn } from '@/lib/utils';

export type SectionTheme = 'light' | 'dark';

type SectionShellProps = {
  as?: 'section' | 'footer' | 'div';
  theme: SectionTheme;
  children: ReactNode;
  className?: string;
  id?: string;
  cutout?: CutoutOrientation;
} & Omit<HTMLAttributes<HTMLElement>, 'as' | 'children' | 'className' | 'id'>;

export function SectionShell({
  as = 'section',
  theme,
  children,
  className,
  id,
  cutout,
  ...props
}: SectionShellProps) {
  const Comp = as;

  return (
    <Comp
      id={id}
      data-header-theme={theme}
      data-surface={theme}
      className={cn(
        'bg-background text-foreground relative',
        theme === 'dark' && 'dark',
        className
      )}
      {...props}
    >
      {cutout ? <SectionCutout orientation={cutout} /> : null}
      {children}
    </Comp>
  );
}
