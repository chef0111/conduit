import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nestedWorkspace = path.join(root, 'apps/web/pnpm-workspace.yaml');
const rootWorkspace = path.join(root, 'pnpm-workspace.yaml');

const upgrade = spawnSync(
  'pnpm',
  ['--dir', 'apps/web', 'run', 'upgrade:next'],
  {
    stdio: 'inherit',
    shell: true,
    cwd: root,
  }
);

// @next/codemod (pnpm v11) may write apps/web/pnpm-workspace.yaml for overrides.
// That nested file makes pnpm treat web as its own workspace, so install fails.
// Always clean it up and finish install from the monorepo root.
if (fs.existsSync(nestedWorkspace)) {
  const nested = fs.readFileSync(nestedWorkspace, 'utf8');
  fs.unlinkSync(nestedWorkspace);
  console.log(
    'Removed nested apps/web/pnpm-workspace.yaml written by @next/codemod'
  );
  if ((upgrade.status ?? 1) !== 0) {
    console.log(
      'Codemod install failed due to the nested workspace; finishing with root pnpm install...'
    );
  }

  const overridesMatch = nested.match(/^overrides:\n(?: {2}.+\n)*/m);
  if (overridesMatch) {
    try {
      let rootYaml = fs.readFileSync(rootWorkspace, 'utf8');
      if (!/(^|\n)overrides:\n/.test(rootYaml)) {
        rootYaml = `${rootYaml.trimEnd()}\n\n${overridesMatch[0]}`;
        const tmp = `${rootWorkspace}.tmp`;
        fs.writeFileSync(tmp, rootYaml);
        fs.renameSync(tmp, rootWorkspace);
        console.log('Merged overrides into root pnpm-workspace.yaml');
      }
    } catch (error) {
      console.warn(
        'Could not merge overrides into root pnpm-workspace.yaml:',
        error instanceof Error ? error.message : error
      );
      console.warn('Add these overrides manually:\n' + overridesMatch[0]);
    }
  }
}

const install = spawnSync('pnpm', ['install'], {
  stdio: 'inherit',
  shell: true,
  cwd: root,
});

process.exit(install.status ?? upgrade.status ?? 1);
