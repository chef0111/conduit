'use client';

import { type ReactNode, Suspense, ViewTransition } from 'react';

const authNavClass = {
  'nav-forward': 'nav-forward',
  'nav-back': 'nav-back',
  default: 'none',
} as const;

export function DirectionalTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      name="auth-pane"
      share={authNavClass}
      enter={authNavClass}
      exit={authNavClass}
      default="none"
    >
      <div className="bg-background flex min-h-0 w-full flex-1 flex-col items-center justify-center self-stretch p-6 sm:p-8 lg:min-h-screen">
        <div className="w-full max-w-md md:max-w-lg xl:max-w-xl">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </ViewTransition>
  );
}
