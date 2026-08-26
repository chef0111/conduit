import { oc } from '@orpc/contract';
import { HealthStatusSchema } from '@/schemas/health';

export const healthCheckContract = oc
  .route({ method: 'GET', path: '/health' })
  .output(HealthStatusSchema);
