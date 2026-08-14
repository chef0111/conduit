'use client';

import { useSearchParams } from 'next/navigation';

import { FieldSeparator } from '@/components/ui/field';
import { AuthActionLink } from '@/features/auth/components/auth-action-link';
import { OAuthForm } from '@/features/auth/components/oauth-form';
import { SignUpForm } from '@/features/auth/components/sign-up-form';
import {
  OAuthProvider,
  useOAuth,
} from '@/features/auth/context/oauth-provider';

function SignUpContent({ callbackURL }: { callbackURL: string | null }) {
  const { isOAuthPending } = useOAuth();

  return (
    <div className="flex flex-col gap-6">
      <OAuthForm />
      <FieldSeparator>Or continue with</FieldSeparator>
      <SignUpForm callbackURL={callbackURL} isOAuthPending={isOAuthPending} />
    </div>
  );
}

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackURL');

  return (
    <div className="bg-background flex w-full flex-col items-center justify-center p-6 sm:p-8 lg:w-1/2">
      <div className="w-full max-w-md md:max-w-lg xl:max-w-xl">
        <div className="mb-6 text-center">
          <h2 className="text-foreground mb-2 text-3xl font-medium tracking-tight">
            Create your Account
          </h2>
          <p className="text-muted-foreground text-base">
            Join the AIO platform where teams connect and collaborate.
          </p>
        </div>

        <OAuthProvider>
          <SignUpContent callbackURL={callbackURL} />
        </OAuthProvider>

        <AuthActionLink
          prompt="Already have an account?"
          href="/sign-in"
          label="Sign in"
          callbackURL={callbackURL}
        />
      </div>
    </div>
  );
}
