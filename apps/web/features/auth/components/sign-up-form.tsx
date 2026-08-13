'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { authClient } from '@repo/auth/client';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { FormCheckbox } from '@/components/form/form-checkbox';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { withCallbackURL } from '@/features/auth/lib/callback-url';
import { SignUpSchema } from '@/features/auth/lib/validations';

type SignUpFormValues = z.infer<typeof SignUpSchema>;

type SignUpFormProps = {
  callbackURL: string | null;
  isOAuthPending: boolean;
};

export function SignUpForm({ callbackURL, isOAuthPending }: SignUpFormProps) {
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<SignUpFormValues>({
    resolver: standardSchemaResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message ?? 'Sign-up failed. Please try again.');
      return;
    }

    router.push(
      withCallbackURL(
        `/verify-email?email=${encodeURIComponent(values.email)}`,
        callbackURL
      ) as Route
    );
  });

  const isDisabled = isOAuthPending || formState.isSubmitting;

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <FieldGroup>
        <FormInput
          control={control}
          name="name"
          type="text"
          autoComplete="name"
          label="Name"
          placeholder="Conduit"
        />
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
          autoComplete="new-password"
          label="Password"
          placeholder="********"
        />
        <FormInput
          control={control}
          name="confirmPassword"
          type="password"
          label="Confirm your password"
          placeholder="********"
        />
        <FormCheckbox
          control={control}
          name="terms"
          label={'I agree to all Terms and Privacy Policy.'}
        />
      </FieldGroup>

      <Button type="submit" size="lg" className="w-full" disabled={isDisabled}>
        {formState.isSubmitting && <Spinner data-icon="inline-start" />}
        Create account
      </Button>
    </form>
  );
}
