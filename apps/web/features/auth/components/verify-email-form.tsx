'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { IconAlertCircle } from '@tabler/icons-react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { FormInput } from '@/components/form/form-input';
import { FormInputOTP } from '@/components/form/form-otp';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { isSafeInternalPath } from '@/features/auth/lib/callback-url';
import { EmailOtpSchema } from '@/features/auth/lib/validations';
import { authClient } from '@/services/auth/client';

type VerifyEmailFormValues = z.infer<typeof EmailOtpSchema>;

type VerifyEmailFormProps = {
  emailFromQuery: string | null;
  callbackURL: string | null;
};

export function VerifyEmailForm({
  emailFromQuery,
  callbackURL,
}: VerifyEmailFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const parsedEmailFromQuery =
    EmailOtpSchema.shape.email.safeParse(emailFromQuery);
  const validEmailFromQuery = parsedEmailFromQuery.success
    ? parsedEmailFromQuery.data
    : null;

  const { control, handleSubmit, getValues, formState, reset } =
    useForm<VerifyEmailFormValues>({
      resolver: standardSchemaResolver(EmailOtpSchema),
      defaultValues: {
        email: validEmailFromQuery ?? '',
        otp: '',
      },
    });

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCooldown((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const onSubmit = handleSubmit(async (values) => {
    const response = await authClient.emailOtp.verifyEmail({
      email: values.email,
      otp: values.otp,
    });

    if (response?.data) {
      router.push(
        (isSafeInternalPath(callbackURL) ? callbackURL : '/dashboard') as Route
      );

      reset();
    } else {
      setError(response?.error?.message || 'Something went wrong.');
    }
  });

  const handleResend = async () => {
    if (isResending || cooldown > 0) {
      return;
    }

    const email = getValues('email');
    if (!email) {
      setError('Enter your email address first.');
      return;
    }

    setIsResending(true);
    const response = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'email-verification',
    });
    setIsResending(false);

    if (response?.data) {
      setError(null);
      setCooldown(60);
      toast.success('A new code has been sent.');
    } else {
      setError(response?.error?.message || 'Something went wrong');
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <FieldGroup>
        {!validEmailFromQuery && (
          <FormInput
            control={control}
            name="email"
            type="email"
            autoComplete="email"
            label="Email"
            placeholder="example@conduit.com"
          />
        )}
        <FormInputOTP
          control={control}
          name="otp"
          label="Verification code"
          description="Enter the 6-digit code sent to your email."
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

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting && (
            <Spinner className="text-foreground" data-icon="inline-start" />
          )}
          Verify email
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => void handleResend()}
          disabled={isResending || cooldown > 0}
        >
          {isResending && (
            <Spinner className="text-zinc-100" data-icon="inline-start" />
          )}
          {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
        </Button>
      </div>
    </form>
  );
}
