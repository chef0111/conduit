import { z } from 'zod';

const STORAGE_KEY = 'conduit.reset-password-otp';

const ResetPasswordOtpSchema = z.object({
  email: z.email(),
  otp: z.string().length(6),
});

export function stashResetPasswordOtp(email: string, otp: string): void {
  if (typeof sessionStorage === 'undefined') {
    return;
  }

  const payload = ResetPasswordOtpSchema.parse({ email, otp });
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function readResetPasswordOtp(email: string): string | null {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = ResetPasswordOtpSchema.safeParse(JSON.parse(raw));
    if (!parsed.success || parsed.data.email !== email) {
      return null;
    }
    return parsed.data.otp;
  } catch {
    return null;
  }
}

export function clearResetPasswordOtp(): void {
  if (typeof sessionStorage === 'undefined') {
    return;
  }

  sessionStorage.removeItem(STORAGE_KEY);
}
