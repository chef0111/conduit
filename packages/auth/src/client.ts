import { createAuthClient } from 'better-auth/react';
import { emailOTPClient } from 'better-auth/client/plugins';

export function createAppAuthClient(baseURL?: string) {
  return createAuthClient({
    baseURL:
      baseURL ??
      process.env.NEXT_PUBLIC_SERVER_URL ??
      'https://api.conduit.localhost',
    plugins: [emailOTPClient()],
  });
}

export const authClient = createAppAuthClient();
