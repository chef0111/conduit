import 'server-only';

import { orpc } from '@/lib/orpc.server';
import { getQueryClient } from '@/lib/query/hydration';

export const sessionQueryOptions = orpc.auth.getSession.queryOptions();

export function getSession() {
  return getQueryClient().fetchQuery(sessionQueryOptions);
}
