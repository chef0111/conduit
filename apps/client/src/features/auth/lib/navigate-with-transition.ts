/// <reference types="react/canary" />

import type { Route } from 'next';
import type { useRouter } from 'next/navigation';
import { addTransitionType, startTransition } from 'react';

type AppRouter = ReturnType<typeof useRouter>;

type AuthNavTransition = 'nav-forward' | 'nav-back';

export function navigateWithTransition({
  router,
  href,
  type,
}: {
  router: AppRouter;
  href: Route;
  type: AuthNavTransition;
}) {
  startTransition(() => {
    addTransitionType(type);
    router.push(href);
  });
}
