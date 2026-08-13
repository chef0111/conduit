'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { signInEmailSchema, type SignInEmailInput } from '@repo/auth/schemas';
import type { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@repo/auth/client';

type SignInFormProps = {
  callbackURL: string | null;
  isOAuthPending: boolean;
};

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

function isUnverifiedEmailError(error: {
  status?: number;
  code?: string;
  message?: string;
}) {
  const code = error.code?.toLowerCase() ?? '';
  const message = error.message?.toLowerCase() ?? '';

  if (
    code.includes('banned') ||
    code.includes('suspended') ||
    code.includes('suspend') ||
    code.includes('blocked') ||
    code.includes('disabled') ||
    code.includes('deactivated') ||
    message.includes('banned') ||
    message.includes('suspended') ||
    message.includes('suspend') ||
    message.includes('blocked') ||
    message.includes('disabled') ||
    message.includes('deactivated')
  ) {
    return false;
  }

  const hasCodeSignal = code.includes('email_not_verified');
  const hasExplicitMessageSignal = message.includes('email_not_verified');
  const hasClearUnverifiedMessage =
    message.includes('email is not verified') ||
    message.includes('email not verified') ||
    message.includes('verify your email') ||
    message.includes('not verified');

  if (hasCodeSignal || hasExplicitMessageSignal || hasClearUnverifiedMessage) {
    return true;
  }

  const hasVerificationSignal = message.includes('verif');
  const hasBannedOrSuspendedSignal =
    message.includes('banned') ||
    message.includes('suspended') ||
    message.includes('suspend') ||
    message.includes('blocked') ||
    message.includes('disabled') ||
    message.includes('deactivated');

  return Boolean(
    error.status === 403 && hasVerificationSignal && !hasBannedOrSuspendedSignal
  );
}

export function SignInForm({ callbackURL, isOAuthPending }: SignInFormProps) {
  const router = useRouter();
  const [openUnverifiedDialog, setOpenUnverifiedDialog] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const { control, handleSubmit, formState } = useForm<SignInEmailInput>({
    resolver: standardSchemaResolver(signInEmailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      if (isUnverifiedEmailError(error)) {
        setUnverifiedEmail(values.email);
        setOpenUnverifiedDialog(true);
        return;
      }

      toast.error(error.message ?? 'Sign-in failed. Please try again.');
      return;
    }

    router.push((isSafeInternalPath(callbackURL) ? callbackURL : '/') as Route);
  });

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <FieldGroup>
          <FormInput
            control={control}
            name="email"
            type="email"
            autoComplete="email"
            label="Email"
            placeholder="example@conduit.com"
          />
          <FormInput
            control={control}
            name="password"
            type="password"
            autoComplete="current-password"
            label="Password"
            placeholder="********"
            labelAction={
              <Link
                href={withCallbackURL('/forgot-password', callbackURL) as Route}
                className="text-muted-foreground text-xs underline-offset-3 hover:underline"
              >
                Forgot password?
              </Link>
            }
          />
        </FieldGroup>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isOAuthPending || formState.isSubmitting}
        >
          {formState.isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          Sign in
        </Button>
      </form>

      <AlertDialog open={openUnverifiedDialog} onOpenChange={setOpenUnverifiedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verify your email first</AlertDialogTitle>
            <AlertDialogDescription>
              Your account is not verified yet. Continue to the verification page to enter your code.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                router.push(
                  withCallbackURL(
                    `/verify-email?email=${encodeURIComponent(unverifiedEmail)}`,
                    callbackURL
                  ) as Route
                );
                setOpenUnverifiedDialog(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
