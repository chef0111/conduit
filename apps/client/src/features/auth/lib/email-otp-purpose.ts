import { z } from 'zod';

export const EmailOtpPurposeSchema = z.enum([
  'email-verification',
  'forget-password',
]);

export type EmailOtpPurpose = z.infer<typeof EmailOtpPurposeSchema>;

type EmailOtpCopy = {
  title: string;
  description: string;
  submitLabel: string;
  otpLabel: string;
};

export const emailOtpCopy = {
  'email-verification': {
    title: 'Verify your email',
    description: 'We sent a 6-digit code to your email',
    submitLabel: 'Verify email',
    otpLabel: 'Verification code',
  },
  'forget-password': {
    title: 'Enter your reset code',
    description: 'We sent a 6-digit code to reset your password',
    submitLabel: 'Continue',
    otpLabel: 'Reset code',
  },
} as const satisfies Record<EmailOtpPurpose, EmailOtpCopy>;

export function parseEmailOtpPurpose(value: string | null): EmailOtpPurpose {
  const parsed = EmailOtpPurposeSchema.safeParse(value);
  return parsed.success ? parsed.data : 'email-verification';
}

export function verifyEmailPath({
  email,
  purpose,
}: {
  email: string;
  purpose: EmailOtpPurpose;
}): string {
  const params = new URLSearchParams({ email, type: purpose });
  return `/verify-email?${params.toString()}`;
}

export function emailOtpCopyFor(purpose: EmailOtpPurpose): EmailOtpCopy {
  switch (purpose) {
    case 'email-verification':
      return emailOtpCopy['email-verification'];
    case 'forget-password':
      return emailOtpCopy['forget-password'];
    default: {
      purpose satisfies never;
      throw new Error(`Unhandled purpose: ${JSON.stringify(purpose)}`);
    }
  }
}
