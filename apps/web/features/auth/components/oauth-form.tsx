'use client';

import { authClient } from '@repo/auth/client';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { GitHubIcon, GoogleIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import type { OAuthProvider } from '../types/auth';

export const OAuthForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';
  const [googlePending, startGoogleTransition] = useTransition();
  const [githubPending, startGithubTransition] = useTransition();

  const handleSocialSignIn = async (provider: OAuthProvider) => {
    await authClient.signIn.social({
      provider,
      callbackURL: callbackUrl,
      errorCallbackURL: '/banned',
      fetchOptions: {
        onError: (ctx) => {
          toast.error(
            ctx.error?.message?.toLowerCase().includes('banned')
              ? 'Your account has been suspended'
              : 'Authentication failed. Please try again.'
          );
        },
      },
    });
  };

  const handleGoogleSignIn = async () => {
    startGoogleTransition(async () => {
      await handleSocialSignIn('google');
    });
  };

  const handleGithubSignIn = async () => {
    startGithubTransition(async () => {
      await handleSocialSignIn('github');
    });
  };

  return (
    <div className="mx-6 space-y-2">
      <Button
        variant="secondary"
        className="w-full"
        disabled={googlePending || githubPending}
        onClick={handleGoogleSignIn}
      >
        {googlePending ? (
          <>
            <Spinner />
            <span>Redirecting...</span>
          </>
        ) : (
          <>
            <GoogleIcon data-icon="inline-start" />
            <span>Continue with Google</span>
          </>
        )}
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        disabled={githubPending || googlePending}
        onClick={handleGithubSignIn}
      >
        {githubPending ? (
          <>
            <Spinner />
            <span>Redirecting...</span>
          </>
        ) : (
          <>
            <GitHubIcon data-icon="inline-start" />
            <span>Continue with GitHub</span>
          </>
        )}
      </Button>
    </div>
  );
};
