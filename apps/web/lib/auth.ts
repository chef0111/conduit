import 'server-only';
import { nextCookies } from 'better-auth/next-js';
import { createAuth } from '@repo/auth';
import { headers } from 'next/headers';

export const auth = createAuth([nextCookies()]);

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}
