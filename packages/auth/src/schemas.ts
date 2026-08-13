import { z } from '@repo/zod';

export const signInEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpEmailSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  terms: z.literal(true),
});

export const emailOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    otp: z.string().length(6),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignInEmailInput = z.infer<typeof signInEmailSchema>;
export type SignUpEmailInput = z.infer<typeof signUpEmailSchema>;
export type EmailOtpInput = z.infer<typeof emailOtpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
