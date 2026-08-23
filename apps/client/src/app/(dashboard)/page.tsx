import { unauthorized } from 'next/navigation';
import { Suspense } from 'react';

import { SignOutButton } from '@/features/auth/components/sign-out-button';
import { getQueryClient, HydrateClient } from '@/lib/query/hydration';
import { getSession } from '@/services/auth/session';

async function DashboardContent() {
  const session = await getSession();

  if (!session) return unauthorized();

  return (
    <HydrateClient client={getQueryClient()}>
      <main className="bg-background flex min-h-svh flex-col">
        <header className="border-border flex items-center justify-between gap-4 border-b px-6 py-4">
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-medium">
              {session.user.name}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {session.user.email}
            </p>
          </div>
          <SignOutButton />
        </header>
        <div className="p-6">
          <h1 className="text-foreground text-2xl font-medium tracking-tight">
            Dashboard
          </h1>
        </div>
      </main>
    </HydrateClient>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<main className="bg-background min-h-svh" />}>
      <DashboardContent />
    </Suspense>
  );
}
