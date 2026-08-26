import { oc } from '@orpc/contract';

import { SessionOutputSchema } from '@/schemas/users';

export const getSessionContract = oc
  .route({ method: 'GET', path: '/users/session' })
  .output(SessionOutputSchema);
