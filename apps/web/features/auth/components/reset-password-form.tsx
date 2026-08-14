'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { authClient } from '@repo/auth/client';
import { IconAlertCircle } from '@tabler/icons-react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { FormInput } from '@/components/form/form-input';
import { FormInputOTP } from '@/components/form/form-otp';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { withCallbackURL } from '@/features/auth/lib/callback-url';
import { ResetPasswordSchema } from '@/features/auth/lib/validations';

type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

type ResetPasswordFormProps = {
  emailFromQuery: string | null;
  callbackURL: string | null;
};

export function ResetPasswordForm({
  emailFromQuery,
  callbackURL,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const parsedEmailFromQuery =
    ResetPasswordSchema.shape.email.safeParse(emailFromQuery);
  const validEmailFromQuery = parsedEmailFromQuery.success
    ? parsedEmailFromQuery.data
    : null;

  const { control, handleSubmit, formState, reset } =
    useForm<ResetPasswordFormValues>({
      resolver: standardSchemaResolver(ResetPasswordSchema),
      defaultValues: {
        email: validEmailFromQuery ?? '',
        otp: '',
        password: '',
        confirmPassword: '',
      },
    });

  const onSubmit = handleSubmit(async (values) => {
    const response = await authClient.emailOtp.resetPassword({
      email: values.email,
      otp: values.otp,
      password: values.password,
    });

    if (response?.data) {
      toast.success('Password updated. Sign in with your new password.');
      router.push(withCallbackURL('/sign-in', callbackURL) as Route);

      reset();
    } else {
      setError(response?.error?.message || 'Something went wrong');
    }
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <FieldGroup>
        {!validEmailFromQuery ? (
          <FormInput
            control={control}
            name="email"
            type="email"
            autoComplete="email"
            label="Email"
            placeholder="example@conduit.com"
          />
        ) : null}
        <FormInputOTP
          control={control}
          name="otp"
          label="Reset code"
          description="Enter the 6-digit code sent to your email."
        />
        <FormInput
          control={control}
          name="password"
          type="password"
          autoComplete="new-password"
          label="New password"
          placeholder="********"
        />
        <FormInput
          control={control}
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          label="Confirm password"
          placeholder="********"
        />
      </FieldGroup>

      {!!error && (
        <Alert
          variant="destructive"
          className="bg-destructive/10 border-destructive/20 border"
        >
          <IconAlertCircle />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="text-wrap">{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting && (
          <Spinner className="text-zinc-100" data-icon="inline-start" />
        )}
        Reset password
      </Button>
    </form>
  );
}
