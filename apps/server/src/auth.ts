import { createAuth } from '@repo/auth';
import type { Auth } from '@repo/auth/types';

export const auth: Auth = createAuth();

export type Session = typeof auth.$Infer.Session;
