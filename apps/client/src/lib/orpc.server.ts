import 'server-only';

import { createORPCClient } from '@orpc/client';
import type { RouterContractClient } from '@orpc/contract';
import {
  createTanstackQueryUtils,
  type RouterUtils,
} from '@orpc/tanstack-query';
import type { contract } from '@repo/contract';
import { headers } from 'next/headers';

import { createOrpcLink } from './orpc-link';

export const client: RouterContractClient<typeof contract> = createORPCClient(
  createOrpcLink(async () => {
    const incoming = await headers();
    const cookie = incoming.get('cookie');
    const requestHeaders: Record<string, string> = {};

    if (cookie) {
      requestHeaders.cookie = cookie;
    }

    return requestHeaders;
  })
);

export const orpc: RouterUtils<typeof client> =
  createTanstackQueryUtils(client);
