'use client';

import { useSearchParams } from 'next/navigation';

import { AuthActionLink } from '@/features/auth/components/auth-action-link';
import { DirectionalTransition } from '@/features/auth/components/directional-transition';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

function ResetPasswordBody() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackURL');
  const email = searchParams.get('email');

  return (
    <>
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
        transitionTypes={['nav-back']}
      />
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <DirectionalTransition>
      <ResetPasswordBody />
    </DirectionalTransition>
  );
}
