'use client';

import { useSearchParams } from 'next/navigation';

import { AuthActionLink } from '@/features/auth/components/auth-action-link';
import { DirectionalTransition } from '@/features/auth/components/directional-transition';
import { VerifyEmailForm } from '@/features/auth/components/verify-email-form';
import {
  emailOtpCopyFor,
  parseEmailOtpType,
} from '@/features/auth/lib/email-otp-type';

function VerifyEmailBody() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackURL');
  const email = searchParams.get('email');
  const type = parseEmailOtpType(searchParams.get('type'));
  const copy = emailOtpCopyFor(type);

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-foreground mb-2 text-3xl font-medium tracking-tight">
          {copy.title}
        </h2>
        <p className="text-muted-foreground text-base">{copy.description}</p>
      </div>

      <VerifyEmailForm
        type={type}
        emailFromQuery={email}
        callbackURL={callbackURL}
      />

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

export default function VerifyEmailPage() {
  return (
    <DirectionalTransition>
      <VerifyEmailBody />
    </DirectionalTransition>
  );
}
