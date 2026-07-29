import { config } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, env } from 'prisma/config';

const root = dirname(fileURLToPath(import.meta.url));

// Prefer app env in the monorepo; fall back to package-local .env
config({ path: resolve(root, '../../apps/server/.env') });
config({ path: resolve(root, '.env') });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
    directUrl: env('DATABASE_DIRECT_URL'),
  },
});
