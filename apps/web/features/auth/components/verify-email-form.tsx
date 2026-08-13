'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { authClient } from '@repo/auth/client';
import { type EmailOtpInput,emailOtpSchema } from '@repo/auth/schemas';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/components/form/form-input';
import { FormInputOTP } from '@/components/form/form-otp';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { isSafeInternalPath } from '@/features/auth/lib/callback-url';

type VerifyEmailFormProps = {
  emailFromQuery: string | null;
  callbackURL: string | null;
};

export function VerifyEmailForm({ emailFromQuery, callbackURL }: VerifyEmailFormProps) {
  const router = useRouter();
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const parsedEmailFromQuery = emailOtpSchema.shape.email.safeParse(emailFromQuery);
  const validEmailFromQuery = parsedEmailFromQuery.success
    ? parsedEmailFromQuery.data
    : null;
  const { control, handleSubmit, getValues, formState } = useForm<EmailOtpInput>({
    resolver: standardSchemaResolver(emailOtpSchema),
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
    const { error } = await authClient.emailOtp.verifyEmail({
      email: values.email,
      otp: values.otp,
    });

    if (error) {
      toast.error(error.message ?? 'Verification failed. Please try again.');
      return;
    }

    router.push((isSafeInternalPath(callbackURL) ? callbackURL : '/') as Route);
  });

  const handleResend = async () => {
    if (isResending || cooldown > 0) {
      return;
    }

    const email = getValues('email');
    if (!email) {
      toast.error('Enter your email address first.');
      return;
    }

    setIsResending(true);
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'email-verification',
    });
    setIsResending(false);

    if (error) {
      toast.error(error.message ?? 'Could not resend the code.');
      return;
    }

    setCooldown(60);
    toast.success('A new code has been sent.');
  };

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
          label="Verification code"
          description="Enter the 6-digit code sent to your email."
        />
      </FieldGroup>

      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" className="w-full" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          Verify email
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => void handleResend()}
          disabled={isResending || cooldown > 0}
        >
          {isResending ? <Spinner data-icon="inline-start" /> : null}
          {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
        </Button>
      </div>
    </form>
  );
}
