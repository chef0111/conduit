import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { emailOTP } from 'better-auth/plugins';
import { prisma } from '@repo/db';
import { Resend } from 'resend';
import type {} from 'zod/v4/core';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getTrustedOrigins(): string[] {
  const configured =
    process.env.BETTER_AUTH_TRUSTED_ORIGIN ?? 'http://localhost:3000';
  const origins = new Set([configured]);

  if (process.env.NODE_ENV !== 'production') {
    origins.add('http://localhost:3000');
    origins.add('https://conduit.localhost');
  }

  return [...origins];
}

function getCookieAdvanced(baseURL: string) {
  const domain = process.env.AUTH_COOKIE_DOMAIN;

  return {
    useSecureCookies: baseURL.startsWith('https://'),
    crossSubDomainCookies:
      domain && !domain.includes(':')
        ? { enabled: true as const, domain }
        : { enabled: false as const },
  };
}

export function createAuth() {
  const baseURL = process.env.BETTER_AUTH_URL ?? 'http://localhost:3333';
  const resendApiKey = process.env.RESEND_API_KEY;
  const resend = resendApiKey ? new Resend(resendApiKey) : null;
  const emailFrom = process.env.AUTH_EMAIL_FROM ?? 'onboarding@resend.dev';
  const socialProviders: NonNullable<
    Parameters<typeof betterAuth>[0]['socialProviders']
  > = {};

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    socialProviders.google = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    };
  }

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    socialProviders.github = {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    };
  }

  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    secret: requireEnv('BETTER_AUTH_SECRET'),
    baseURL,
    trustedOrigins: getTrustedOrigins(),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    emailVerification: {
      sendOnSignIn: true,
      autoSignInAfterVerification: true,
    },
    advanced: getCookieAdvanced(baseURL),
    socialProviders,
    plugins: [
      emailOTP({
        overrideDefaultEmailVerification: true,
        sendVerificationOnSignUp: true,
        otpLength: 6,
        async sendVerificationOTP({ email, otp, type }) {
          const subject =
            type === 'sign-in'
              ? 'Your sign-in code'
              : type === 'email-verification'
                ? 'Verify your email'
                : type === 'forget-password'
                  ? 'Reset your password'
                  : 'Your verification code';

          if (!resend) {
            console.log(`[auth:otp] to=${email} type=${type} otp=${otp}`);
            return;
          }

          await resend.emails.send({
            from: emailFrom,
            to: email,
            subject,
            text: `Your code is ${otp}`,
          });
        },
      }),
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;
export type Session = Auth['$Infer']['Session'];
export type User = Session['user'];
