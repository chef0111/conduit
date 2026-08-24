import { z } from 'zod';

export const EmailOtpTypeSchema = z.enum([
  'email-verification',
  'forget-password',
]);

export type EmailOtpType = z.infer<typeof EmailOtpTypeSchema>;

type EmailOtpCopy = {
  title: string;
  description: string;
  submitLabel: string;
  successLabel: string;
  otpLabel: string;
};

export const emailOtpCopy = {
  'email-verification': {
    title: 'Verify your email',
    description: 'We sent a 6-digit code to your email',
    submitLabel: 'Verify email',
    successLabel: 'Verified',
    otpLabel: 'Verification code',
  },
  'forget-password': {
    title: 'Enter your reset code',
    description: 'We sent a 6-digit code to reset your password',
    submitLabel: 'Continue',
    successLabel: 'Code confirmed',
    otpLabel: 'Reset code',
  },
} as const satisfies Record<EmailOtpType, EmailOtpCopy>;

export function parseEmailOtpType(value: string | null): EmailOtpType {
  const parsed = EmailOtpTypeSchema.safeParse(value);
  return parsed.success ? parsed.data : 'email-verification';
}

export function verifyEmailPath({
  email,
  type,
}: {
  email: string;
  type: EmailOtpType;
}): string {
  const params = new URLSearchParams({ email, type: type });
  return `/verify-email?${params.toString()}`;
}

export function emailOtpCopyFor(emailType: EmailOtpType): EmailOtpCopy {
  switch (emailType) {
    case 'email-verification':
      return emailOtpCopy['email-verification'];
    case 'forget-password':
      return emailOtpCopy['forget-password'];
    default: {
      emailType satisfies never;
      throw new Error(`Unhandled type: ${JSON.stringify(emailType)}`);
    }
  }
}
