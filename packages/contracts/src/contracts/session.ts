import { oc } from '@orpc/contract';

import { SessionOutputSchema } from '../schemas/session.js';

export const getSessionContract = oc
  .route({ method: 'GET', path: '/auth/session' })
  .output(SessionOutputSchema);
