import { emailOTPClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export function createAppAuthClient(baseURL?: string) {
  return createAuthClient({
    baseURL:
      baseURL ??
      process.env.NEXT_PUBLIC_SERVER_URL ??
      'https://api.conduit.localhost',
    fetchOptions: {
      credentials: 'include',
    },
    plugins: [emailOTPClient()],
  });
}

export const authClient = createAppAuthClient();
