'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { authClient } from '@repo/auth/client';
import { type ForgotPasswordInput,forgotPasswordSchema } from '@repo/auth/schemas';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { withCallbackURL } from '@/features/auth/lib/callback-url';

type ForgotPasswordFormProps = {
  callbackURL: string | null;
};

export function ForgotPasswordForm({ callbackURL }: ForgotPasswordFormProps) {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<ForgotPasswordInput>({
    resolver: standardSchemaResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const { error } = await authClient.emailOtp.requestPasswordReset({
      email: values.email,
    });

    if (error) {
      toast.error(error.message ?? 'Could not send reset code. Please try again.');
      return;
    }

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
