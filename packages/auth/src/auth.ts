import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { emailOTP } from 'better-auth/plugins';
import type {} from 'better-auth/plugins';
import { prisma } from '@repo/db';
import { Resend } from 'resend';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createAuth() {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resend = resendApiKey ? new Resend(resendApiKey) : null;
  const emailFrom = process.env.AUTH_EMAIL_FROM ?? 'onboarding@resend.dev';

  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const githubClientId = process.env.GITHUB_CLIENT_ID;
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    secret: requireEnv('BETTER_AUTH_SECRET'),
    baseURL: process.env.BETTER_AUTH_URL ?? 'https://api.conduit.localhost',
    trustedOrigins: [
      process.env.BETTER_AUTH_TRUSTED_ORIGIN ?? 'https://conduit.localhost',
    ],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    socialProviders: {
      ...(googleClientId && googleClientSecret
        ? {
            google: {
              clientId: googleClientId,
              clientSecret: googleClientSecret,
            },
          }
        : {}),
      ...(githubClientId && githubClientSecret
        ? {
            github: {
              clientId: githubClientId,
              clientSecret: githubClientSecret,
            },
          }
        : {}),
    },
    plugins: [
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          const subject =
            type === 'sign-in'
              ? 'Your sign-in code'
              : type === 'email-verification'
                ? 'Verify your email'
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
