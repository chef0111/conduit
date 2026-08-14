import 'server-only';

import { cache } from 'react';

import { orpc } from '@/lib/orpc.server';
import { getQueryClient } from '@/lib/query/hydration';

export const sessionQueryOptions = orpc.auth.getSession.queryOptions();

export function getSession() {
  const session = cache(() => getQueryClient().fetchQuery(sessionQueryOptions));
  return session();
}
