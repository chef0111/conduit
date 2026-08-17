import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

const root = dirname(fileURLToPath(import.meta.url));

config({ path: resolve(root, '.env') });

export default defineConfig({
  schema: 'database/schema.prisma',
  migrations: {
    path: 'database/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
    directUrl: env('DATABASE_DIRECT_URL'),
  },
});
