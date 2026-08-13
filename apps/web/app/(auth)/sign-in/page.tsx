'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { FieldSeparator } from '@/components/ui/field';
import { OAuthForm } from '@/features/auth/components/oauth-form';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { OAuthProvider, useOAuth } from '@/features/auth/context/oauth-provider';
import { withCallbackURL } from '@/features/auth/lib/callback-url';

function SignInContent({ callbackURL }: { callbackURL: string | null }) {
  const { isOAuthPending } = useOAuth();

  return (
    <div className="flex flex-col gap-6">
      <OAuthForm />
      <FieldSeparator>Or continue with</FieldSeparator>
      <SignInForm callbackURL={callbackURL} isOAuthPending={isOAuthPending} />
    </div>
  );
}

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackURL');

  return (
    <div className="bg-background flex w-full flex-col items-center justify-center p-6 sm:p-8 lg:w-1/2">
      <div className="w-full max-w-md md:max-w-lg xl:max-w-xl">
        <div className="mb-6 text-center">
          <h2 className="text-foreground mb-2 text-3xl font-medium tracking-tight">
            Sign in
          </h2>
          <p className="text-muted-foreground text-base">Welcome back.</p>
        </div>

        <OAuthProvider>
          <SignInContent callbackURL={callbackURL} />
        </OAuthProvider>

        <p className="text-muted-foreground mt-6 text-xs">
          Don&apos;t have an account?{' '}
          <Link
            href={withCallbackURL('/sign-up', callbackURL) as Route}
            className="text-foreground font-semibold underline-offset-3 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
