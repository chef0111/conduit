'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { IconAlertCircle } from '@tabler/icons-react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { type SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { FormInput } from '@/components/form/form-input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { withCallbackURL } from '@/features/auth/lib/callback-url';
import { ForgotPasswordSchema } from '@/features/auth/lib/validations';
import { authClient } from '@/services/auth/client';

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

type ForgotPasswordFormProps = {
  callbackURL: string | null;
};

export function ForgotPasswordForm({ callbackURL }: ForgotPasswordFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState, reset } =
    useForm<ForgotPasswordFormValues>({
      resolver: standardSchemaResolver(ForgotPasswordSchema),
      defaultValues: {
        email: '',
      },
    });

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    const succeeded = await handleSubmit(async (values) => {
      setError(null);

      const response = await authClient.emailOtp.requestPasswordReset({
        email: values.email,
      });

      if (response?.data) {
        toast.success('If that email exists, a reset code has been sent.');
        router.push(
          withCallbackURL(
            `/reset-password?email=${encodeURIComponent(values.email)}`,
            callbackURL
          ) as Route
        );
        router.refresh();
        return true;
      }

      setError(response?.error?.message || 'Something went wrong');
      return false;
    })(event);

    if (succeeded) {
      reset();
    }
  };

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
        Continue
      </Button>
    </form>
  );
}
