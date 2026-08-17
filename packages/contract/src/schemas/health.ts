import { z } from 'zod';

export const HealthStatusSchema = z.object({
  status: z.literal('ok'),
});

export type HealthStatus = z.infer<typeof HealthStatusSchema>;
