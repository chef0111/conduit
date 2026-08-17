import { OpenAPILink } from '@orpc/openapi-client/fetch';
import { contract } from '@repo/contracts';

import { getServerBaseUrl } from './env';

export function createOrpcLink(
  getHeaders?: () => Promise<Record<string, string>>
) {
  return new OpenAPILink(contract, {
    url: getServerBaseUrl(),
    fetch: (request, init) =>
      globalThis.fetch(request, {
        ...init,
        credentials: 'include',
        cache: 'no-store',
      }),
    ...(getHeaders ? { headers: getHeaders } : {}),
  });
}
