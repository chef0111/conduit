import { z } from '@repo/zod';

export const signInEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpEmailSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const emailOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(4).max(12),
});

export type SignInEmailInput = z.infer<typeof signInEmailSchema>;
export type SignUpEmailInput = z.infer<typeof signUpEmailSchema>;
export type EmailOtpInput = z.infer<typeof emailOtpSchema>;
