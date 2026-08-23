import { SignOutButton } from '@/features/auth/components/sign-out-button';

export default function UnauthorizedPage() {
  return (
    <main className="bg-background flex min-h-svh flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-foreground text-2xl font-medium tracking-tight">
        Session expired
      </h1>
      <p className="text-muted-foreground max-w-sm text-center text-sm">
        Your sign-in cookie is present, but the server could not load a session.
        Sign out, then try again.
      </p>
      <SignOutButton />
    </main>
  );
}
