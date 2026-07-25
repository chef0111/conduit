import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const here = dirname(fileURLToPath(import.meta.url));

const candidates = [
  resolve(here, "../.env"), // apps/server/.env when running from dist/
  resolve(process.cwd(), ".env"),
];

for (const path of candidates) {
  if (existsSync(path)) {
    const result = config({ path, override: true });
    if (result.error) {
      console.warn(`[env] failed to load ${path}:`, result.error.message);
    } else {
      console.log(
        `[env] loaded ${Object.keys(result.parsed ?? {}).length} vars from ${path}`,
      );
    }
    break;
  }
}

if (!process.env.DATABASE_URL) {
  console.warn(
    "[env] DATABASE_URL is still missing after loading .env — Nest does not auto-load env files",
  );
}
