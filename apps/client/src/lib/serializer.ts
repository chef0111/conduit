import { RPCJsonSerializer } from '@orpc/client';

export const serializer = new RPCJsonSerializer({
  handlers: {
    // put custom serializers here
  },
});
