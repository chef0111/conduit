'use client';

import { authClient } from '@repo/auth/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export function SignOutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    setPending(true);

    const { error } = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.clear();
          router.push('/sign-in');
          router.refresh();
        },
      },
    });

    if (error) {
      setPending(false);
      toast.error(error.message ?? 'Sign-out failed. Please try again.');
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      disabled={pending}
      onClick={() => void handleSignOut()}
    >
      {pending ? <Spinner data-icon="inline-start" /> : null}
      Sign out
    </Button>
  );
}
