import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getSession } from '@/features/auth/services/session';
import { getQueryClient, HydrateClient } from '@/lib/query/hydration';

async function DashboardContent() {
  const session = await getSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <HydrateClient client={getQueryClient()}>
      <main>Dashboard</main>
    </HydrateClient>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<main />}>
      <DashboardContent />
    </Suspense>
  );
}
