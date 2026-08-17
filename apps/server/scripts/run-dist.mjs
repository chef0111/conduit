import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { replaceTscAliasPaths } from 'tsc-alias';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

await replaceTscAliasPaths({
  configFile: resolve(root, 'tsconfig.build.json'),
  resolveFullPaths: true,
  resolveFullExtension: '.js',
});

const child = spawn(process.execPath, process.argv.slice(2), {
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
