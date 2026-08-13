import 'server-only';

import { createAuth } from '@repo/auth';
import { nextCookies } from 'better-auth/next-js';
import { headers } from 'next/headers';

export const auth = createAuth([nextCookies()]);

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}
