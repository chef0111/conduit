'use client';

import { GitHubIcon, GoogleIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { useOAuth } from '../context/oauth-provider';
import type { OAuthProvider } from '../types/auth';

export const OAuthForm = () => {
  const { pendingProvider, isOAuthPending, signInWith } = useOAuth();

  const renderButtonContent = (provider: OAuthProvider) => {
    if (pendingProvider === provider) {
      return (
        <>
          <Spinner className="text-muted-foreground" data-icon="inline-start" />
          <span>Redirecting...</span>
        </>
      );
    }

    switch (provider) {
      case 'google':
        return (
          <>
            <GoogleIcon data-icon="inline-start" />
            <span>Continue with Google</span>
          </>
        );
      case 'github':
        return (
          <>
            <GitHubIcon data-icon="inline-start" />
            <span>Continue with GitHub</span>
          </>
        );
      default: {
        const exhaustiveCheck: never = provider;
        return exhaustiveCheck;
      }
    }
  };

  const handleSignIn = async (provider: OAuthProvider) => {
    await signInWith(provider);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="secondary"
        className="w-full"
        disabled={isOAuthPending}
        onClick={() => void handleSignIn('google')}
      >
        {renderButtonContent('google')}
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        disabled={isOAuthPending}
        onClick={() => void handleSignIn('github')}
      >
        {renderButtonContent('github')}
      </Button>
    </div>
  );
};
