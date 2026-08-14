'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import type { ErrorContext } from '@repo/auth/types';
import { IconAlertCircle } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { FormInput } from '@/components/form/form-input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { authClient } from '@/services/auth/client';

type SignInFormValues = z.infer<typeof SignInSchema>;

type SignInFormProps = {
  callbackURL: string | null;
  isOAuthPending: boolean;
};

type SignInError = ErrorContext['error'];

function isUnverifiedEmailError(error: SignInError) {
  return (
    error?.code?.toLowerCase() === 'email_not_verified' &&
    (error?.statusCode === undefined || error?.statusCode === 403)
  );
}

export function SignInForm({ callbackURL, isOAuthPending }: SignInFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [openUnverifiedDialog, setOpenUnverifiedDialog] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');

  const { control, handleSubmit, formState, reset } = useForm<SignInFormValues>(
    {
      resolver: standardSchemaResolver(SignInSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    }
  );

  const onSubmit = handleSubmit(async (values) => {
    const response = await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: ({ error }) => {
          if (isUnverifiedEmailError(error)) {
            setUnverifiedEmail(values.email);
            setOpenUnverifiedDialog(true);
            return;
          }
        },
      }
    );

    if (response?.data?.user) {
      toast.success('Success', {
        description: 'You are now logged in',
      });

      router.push(
        (isSafeInternalPath(callbackURL) ? callbackURL : '/dashboard') as Route
      );

      reset();
    } else {
      setError(response?.error?.message || 'Something went wrong.');
    }
  });

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <FieldGroup>
          <FormInput
            control={control}
            name="email"
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
                tabIndex={-1}
              >
                Forgot password?
              </Link>
            }
          />
        </FieldGroup>

        {!!error && (
          <Alert
            variant="destructive"
            className="bg-destructive/10 border-destructive/20 border"
          >
            <IconAlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="text-wrap">
              {error}
              {error === 'Invalid email or password' && '. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isOAuthPending || formState.isSubmitting}
        >
          {formState.isSubmitting && (
            <Spinner className="text-zinc-100" data-icon="inline-start" />
          )}
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
