import { type Auth, createAuth } from '@repo/auth';

export const auth: Auth = createAuth();

export type Session = typeof auth.$Infer.Session;
