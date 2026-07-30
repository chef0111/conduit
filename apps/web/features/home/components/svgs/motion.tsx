import type { SVGProps } from 'react';

import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

const MotionMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden
    viewBox="0 0 26 10"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9.587 0 4.57 9H0L3.917 1.972C4.524.883 6.039 0 7.301 0ZM20.794 2.25c0-1.243 1.023-2.25 2.285-2.25S25.364 1.007 25.364 2.25 24.341 4.5 23.079 4.5 20.794 3.493 20.794 2.25ZM10.443 0h4.57L9.997 9H5.427ZM15.841 0h4.57L16.494 7.028C15.887 8.117 14.372 9 13.11 9H10.825Z" />
  </svg>
);

export const Motion = ({ className }: LogoProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 text-[1.15rem] leading-none font-semibold tracking-tight',
      className
    )}
  >
    <MotionMark className="h-[0.75em] w-auto shrink-0" />
    Motion
  </span>
);
