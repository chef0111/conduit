import { betterAuth, type BetterAuthPlugin } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { emailOTP } from 'better-auth/plugins';
import { prisma } from '@repo/db';
import { Resend } from 'resend';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createAuth(extraPlugins: BetterAuthPlugin[] = []) {
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
    baseURL: process.env.BETTER_AUTH_URL ?? 'https://api.conduit.localhost',
    trustedOrigins: [
      process.env.BETTER_AUTH_TRUSTED_ORIGIN ?? 'https://conduit.localhost',
    ],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    emailVerification: {
      sendOnSignIn: true,
      autoSignInAfterVerification: true,
    },
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
        domain: process.env.AUTH_COOKIE_DOMAIN ?? 'conduit.localhost',
      },
      useSecureCookies: true,
    },
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
      ...extraPlugins,
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;
export type Session = Auth['$Infer']['Session'];
