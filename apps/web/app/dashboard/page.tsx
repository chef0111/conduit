import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getSession } from '@/lib/auth';

async function DashboardContent() {
  const session = await getSession();

  if (!session) {
    redirect('/sign-in');
  }

  return <main>Dashboard</main>;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<main />}>
      <DashboardContent />
    </Suspense>
  );
}
