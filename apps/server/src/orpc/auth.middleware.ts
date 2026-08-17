import { ORPCError } from '@orpc/nest';
import { os } from '@orpc/server';
import { fromNodeHeaders } from 'better-auth/node';
import type { Request } from 'express';

import { auth } from '@/auth/auth.config';

export const authorized = os
  .$context<{ request: Request }>()
  .middleware(async ({ context, next }) => {
    const result = await auth.api.getSession({
      headers: fromNodeHeaders(context.request.headers),
    });

    if (!result) {
      throw new ORPCError('UNAUTHORIZED', {
        message: 'Authentication required',
      });
    }

    return next({
      context: {
        user: result.user,
        session: result.session,
      },
    });
  });
