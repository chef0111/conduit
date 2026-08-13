'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { signUpEmailSchema, type SignUpEmailInput } from '@repo/auth/schemas';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormCheckbox } from '@/components/form/form-checkbox';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@repo/auth/client';

type SignUpFormProps = {
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

export function SignUpForm({ callbackURL, isOAuthPending }: SignUpFormProps) {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<SignUpEmailInput>({
    resolver: standardSchemaResolver(signUpEmailSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: true,
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
        <FormCheckbox
          control={control}
          name="terms"
          label={
            'I agree to all Terms and Privacy Policy.'
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
        Create account
      </Button>
    </form>
  );
}
