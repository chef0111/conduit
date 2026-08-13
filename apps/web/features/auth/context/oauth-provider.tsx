'use client';

import { authClient } from '@repo/auth/client';
import { useSearchParams } from 'next/navigation';
import { createContext, type ReactNode, useContext, useState } from 'react';
import { toast } from 'sonner';

import { isSafeInternalPath } from '@/features/auth/lib/callback-url';

import type { OAuthProvider } from '../types/auth';

type OAuthContextValue = {
  pendingProvider: OAuthProvider | null;
  isOAuthPending: boolean;
  signInWith: (provider: OAuthProvider) => Promise<void>;
};

const OAuthContext = createContext<OAuthContextValue | null>(null);

export function OAuthProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [pendingProvider, setPendingProvider] = useState<OAuthProvider | null>(
    null
  );

  const signInWith = async (provider: OAuthProvider) => {
    setPendingProvider(provider);

    try {
      const callbackURL = searchParams.get('callbackURL');

      await authClient.signIn.social({
        provider,
        callbackURL: isSafeInternalPath(callbackURL) ? callbackURL : '/',
        errorCallbackURL: '/banned',
        fetchOptions: {
          onError: (ctx) => {
            const message = ctx.error?.message ?? '';
            toast.error(
              message.toLowerCase().includes('banned')
                ? 'Your account has been suspended'
                : 'Authentication failed. Please try again.'
            );
          },
        },
      });
    } finally {
      setPendingProvider(null);
    }
  };

  return (
    <OAuthContext.Provider
      value={{
        pendingProvider,
        isOAuthPending: pendingProvider !== null,
        signInWith,
      }}
    >
      {children}
    </OAuthContext.Provider>
  );
}

export function useOAuth() {
  const context = useContext(OAuthContext);

  if (!context) {
    throw new Error('useOAuth must be used within OAuthProvider');
  }

  return context;
}
