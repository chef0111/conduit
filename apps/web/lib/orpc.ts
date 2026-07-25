import { createORPCClient } from "@orpc/client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import type { ContractRouterClient } from "@orpc/contract";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { contract } from "@repo/api-contract";
import { getServerBaseUrl } from "./env";

function createLink() {
  return new OpenAPILink(contract, {
    url: getServerBaseUrl(),
    headers: async () => {
      if (typeof window !== "undefined") {
        return {};
      }

      try {
        const { headers } = await import("next/headers");
        const incoming = await headers();
        const cookie = incoming.get("cookie");
        return cookie ? { cookie } : {};
      } catch {
        return {};
      }
    },
  });
}

export const client: ContractRouterClient<typeof contract> =
  createORPCClient(createLink());

export const orpc = createTanstackQueryUtils(client);
