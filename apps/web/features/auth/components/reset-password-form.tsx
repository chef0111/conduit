'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { resetPasswordSchema, type ResetPasswordInput } from '@repo/auth/schemas';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/components/form/form-input';
import { FormInputOTP } from '@/components/form/form-otp';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@repo/auth/client';

type ResetPasswordFormProps = {
  emailFromQuery: string | null;
  callbackURL: string | null;
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

export function ResetPasswordForm({
  emailFromQuery,
  callbackURL,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<ResetPasswordInput>({
    resolver: standardSchemaResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromQuery ?? '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const { error } = await authClient.emailOtp.resetPassword({
      email: values.email,
      otp: values.otp,
      password: values.password,
    });

    if (error) {
      toast.error(error.message ?? 'Password reset failed. Please try again.');
      return;
    }

    toast.success('Password updated. Sign in with your new password.');
    router.push(withCallbackURL('/sign-in', callbackURL) as Route);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <FieldGroup>
        {!emailFromQuery ? (
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

      <Button type="submit" size="lg" className="w-full" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Reset password
      </Button>
    </form>
  );
}
