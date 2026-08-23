import { accessSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const entry = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../dist/src/main.js'
);

try {
  accessSync(entry);
} catch {
  console.error(
    `missing ${entry}. nest build must emit dist/src/main.js or the Vercel function crashes.`
  );
  process.exit(1);
}
