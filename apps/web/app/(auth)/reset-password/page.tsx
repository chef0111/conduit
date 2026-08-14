'use client';

import { useSearchParams } from 'next/navigation';

import { AuthActionLink } from '@/features/auth/components/auth-action-link';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackURL');
  const email = searchParams.get('email');

  return (
    <div className="bg-background flex w-full flex-col items-center justify-center p-6 sm:p-8 lg:w-1/2">
      <div className="w-full max-w-md md:max-w-lg xl:max-w-xl">
        <div className="mb-6 text-center">
          <h2 className="text-foreground mb-2 text-3xl font-medium tracking-tight">
            Reset your password
          </h2>
          <p className="text-muted-foreground text-base">
            Enter your code and choose a new password.
          </p>
        </div>

        <ResetPasswordForm emailFromQuery={email} callbackURL={callbackURL} />

        <AuthActionLink
          prompt="Back to"
          href="/sign-in"
          label="Sign in"
          callbackURL={callbackURL}
        />
      </div>
    </div>
  );
}
