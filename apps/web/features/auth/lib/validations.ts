import { z } from 'zod';

const PasswordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .max(100, { message: 'Password cannot exceed 100 characters.' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter.',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Password must contain at least one special character.',
  });

export const SignInSchema = z.object({
  email: z.email(),
  password: PasswordSchema,
});

export const SignUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Email is required'),
    password: PasswordSchema,
    confirmPassword: z.string().min(8),
    terms: z
      .boolean()
      .refine((value) => value, { message: 'You must accept the terms' }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const EmailOtpSchema = z.object({
  email: z.email('Email is required'),
  otp: z.string().length(6),
});

export const ForgotPasswordSchema = z.object({
  email: z.email('Email is required'),
});

export const ResetPasswordSchema = z
  .object({
    email: z.email('Email is required'),
    otp: z.string().length(6),
    password: PasswordSchema,
    confirmPassword: z.string().min(8),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
