'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';

function isSafeInternalPath(value: string | null): value is string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//');
}

function withCallbackURL(pathname: string, callbackURL: string | null): string {
  if (!isSafeInternalPath(callbackURL)) {
    return pathname;
  }

  const params = new URLSearchParams({ callbackURL });
  const joiner = pathname.includes('?') ? '&' : '?';
  return `${pathname}${joiner}${params.toString()}`;
}

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackURL');

  return (
    <div className="bg-background flex w-full flex-col items-center justify-center p-6 sm:p-8 lg:w-1/2">
      <div className="w-full max-w-md md:max-w-lg xl:max-w-xl">
        <div className="mb-6 text-center">
          <h2 className="text-foreground mb-2 text-3xl font-medium tracking-tight">
            Forgot your password?
          </h2>
          <p className="text-muted-foreground text-base">
            We will send you a code to reset it.
          </p>
        </div>

        <ForgotPasswordForm callbackURL={callbackURL} />

        <p className="text-muted-foreground mt-6 text-xs">
          Back to{' '}
          <Link
            href={withCallbackURL('/sign-in', callbackURL) as Route}
            className="text-foreground font-semibold underline-offset-3 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
