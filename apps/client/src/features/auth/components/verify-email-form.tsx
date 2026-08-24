'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/alert';
import { Button } from '@repo/ui/components/button';
import { FieldGroup } from '@repo/ui/components/field';
import { Spinner } from '@repo/ui/components/spinner';
import { IconAlertCircle } from '@tabler/icons-react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { FormInput } from '@/components/form/form-input';
import { FormInputOTP } from '@/components/form/form-otp';
import {
  isSafeInternalPath,
  withCallbackURL,
} from '@/features/auth/lib/callback-url';
import {
  emailOtpCopyFor,
  type EmailOtpPurpose,
} from '@/features/auth/lib/email-otp-purpose';
import { navigateWithTransition } from '@/features/auth/lib/navigate-with-transition';
import { stashResetPasswordOtp } from '@/features/auth/lib/reset-password-otp';
import { EmailOtpSchema } from '@/features/auth/lib/validations';
import { authClient } from '@/services/auth/client';

type VerifyEmailFormValues = z.infer<typeof EmailOtpSchema>;

type VerifyEmailFormProps = {
  purpose: EmailOtpPurpose;
  emailFromQuery: string | null;
  callbackURL: string | null;
};

export function VerifyEmailForm({
  purpose,
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
  const copy = emailOtpCopyFor(purpose);

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

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    const succeeded = await handleSubmit(async (values) => {
      setError(null);

      switch (purpose) {
        case 'email-verification': {
          const response = await authClient.emailOtp.verifyEmail({
            email: values.email,
            otp: values.otp,
          });

          if (response?.data) {
            router.push(
              (isSafeInternalPath(callbackURL) ? callbackURL : '/') as Route
            );
            router.refresh();
            return true;
          }

          setError(response?.error?.message || 'Something went wrong.');
          return false;
        }
        case 'forget-password': {
          const response = await authClient.emailOtp.checkVerificationOtp({
            email: values.email,
            type: 'forget-password',
            otp: values.otp,
          });

          if (response?.data) {
            stashResetPasswordOtp(values.email, values.otp);
            const params = new URLSearchParams({ email: values.email });
            navigateWithTransition({
              router,
              href: withCallbackURL(
                `/reset-password?${params.toString()}`,
                callbackURL
              ) as Route,
              type: 'nav-forward',
            });
            return true;
          }

          setError(response?.error?.message || 'Something went wrong.');
          return false;
        }
        default: {
          purpose satisfies never;
          throw new Error(`Unhandled purpose: ${JSON.stringify(purpose)}`);
        }
      }
    })(event);

    if (succeeded) {
      reset();
    }
  };

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

    let response:
      | Awaited<ReturnType<typeof authClient.emailOtp.sendVerificationOtp>>
      | Awaited<ReturnType<typeof authClient.emailOtp.requestPasswordReset>>;

    switch (purpose) {
      case 'email-verification': {
        response = await authClient.emailOtp.sendVerificationOtp({
          email,
          type: 'email-verification',
        });
        break;
      }
      case 'forget-password': {
        response = await authClient.emailOtp.requestPasswordReset({
          email,
        });
        break;
      }
      default: {
        purpose satisfies never;
        throw new Error(`Unhandled purpose: ${JSON.stringify(purpose)}`);
      }
    }

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
          label={copy.otpLabel}
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
          {copy.submitLabel}
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
