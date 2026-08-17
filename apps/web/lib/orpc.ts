import { createORPCClient } from '@orpc/client';
import type { ContractRouterClient } from '@orpc/contract';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import type { contract } from '@repo/contracts';

import { createOrpcLink } from './orpc-link';

export const client: ContractRouterClient<typeof contract> =
  createORPCClient(createOrpcLink());

export const orpc = createTanstackQueryUtils(client);
