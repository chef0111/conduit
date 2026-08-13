'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { authClient } from '@repo/auth/client';
import type { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { FormInput } from '@/components/form/form-input';
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
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import {
  isSafeInternalPath,
  withCallbackURL,
} from '@/features/auth/lib/callback-url';
import { SignInSchema } from '@/features/auth/lib/validations';

type SignInFormValues = z.infer<typeof SignInSchema>;

type SignInFormProps = {
  callbackURL: string | null;
  isOAuthPending: boolean;
};

function isUnverifiedEmailError(error: { status?: number; code?: string }) {
  return (
    error.code?.toLowerCase() === 'email_not_verified' &&
    (error.status === undefined || error.status === 403)
  );
}

export function SignInForm({ callbackURL, isOAuthPending }: SignInFormProps) {
  const router = useRouter();
  const [openUnverifiedDialog, setOpenUnverifiedDialog] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');

  const { control, handleSubmit, formState } = useForm<SignInFormValues>({
    resolver: standardSchemaResolver(SignInSchema),
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

    router.push(
      (isSafeInternalPath(callbackURL) ? callbackURL : '/dashboard') as Route
    );
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

      <AlertDialog
        open={openUnverifiedDialog}
        onOpenChange={setOpenUnverifiedDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verify your email first</AlertDialogTitle>
            <AlertDialogDescription>
              Your account is not verified yet. Continue to the verification
              page to enter your code.
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
