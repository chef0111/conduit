import Image from 'next/image';

import { cn } from '@/lib/utils';

export function HeroCircuitBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden select-none',
        className
      )}
    >
      <div className="absolute inset-0">
        <CircuitPanel className="absolute -top-8 right-1/2 aspect-969/887 w-[969px] opacity-50 sm:top-5" />
        <CircuitPanel className="absolute -top-8 right-1/2 aspect-969/887 w-[969px] origin-right -scale-x-100 opacity-50 sm:top-5" />
      </div>
      <div className="from-background absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t to-transparent" />
    </div>
  );
}

function CircuitPanel({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <Image
        alt="Circuit lines"
        src="/images/hero/circuit-lines.webp"
        width={1938}
        height={1774}
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full"
      />
      <Image
        alt="Circuit components"
        src="/images/hero/circuit-components.webp"
        width={1938}
        height={1774}
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
