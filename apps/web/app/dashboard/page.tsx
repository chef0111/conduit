import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/sign-in');
  }

  return <main>Dashboard</main>;
}
