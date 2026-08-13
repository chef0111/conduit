'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@repo/auth/schemas';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@repo/auth/client';

type ForgotPasswordFormProps = {
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

export function ForgotPasswordForm({ callbackURL }: ForgotPasswordFormProps) {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<ForgotPasswordInput>({
    resolver: standardSchemaResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await authClient.emailOtp.requestPasswordReset({
      email: values.email,
    });

    toast.success('If that email exists, a reset code has been sent.');
    router.push(
      withCallbackURL(
        `/reset-password?email=${encodeURIComponent(values.email)}`,
        callbackURL
      ) as Route
    );
  });

  return (
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
      </FieldGroup>

      <Button type="submit" size="lg" className="w-full" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Continue
      </Button>
    </form>
  );
}
