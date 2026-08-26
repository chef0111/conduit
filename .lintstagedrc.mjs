import path from 'node:path';

// Next.js lint-staged pattern: pass only staged files to eslint.
// https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
// Each package has its own eslint.config, so commands run from that package directory.
// On Windows, one shell string with many paths exceeds the ~8191 cmd limit, so we chunk.
function toPosix(filePath) {
  return filePath.replace(/\\/g, '/');
}

/** Stay under Windows cmd.exe max (~8191) with headroom for the prefix. */
const MAX_COMMAND_LENGTH = 7000;

function buildEslintCommand(cwd) {
  return (filenames) => {
    const dir = toPosix(path.relative(process.cwd(), cwd));
    const prefix = `pnpm --dir ${dir} exec eslint --fix`;
    const files = filenames.map((file) => toPosix(path.relative(cwd, file)));

    const commands = [];
    let batch = [];
    let length = prefix.length;

    for (const file of files) {
      const addition = ` "${file}"`.length;
      if (batch.length > 0 && length + addition > MAX_COMMAND_LENGTH) {
        commands.push(`${prefix} ${batch.map((f) => `"${f}"`).join(' ')}`);
        batch = [];
        length = prefix.length;
      }
      batch.push(file);
      length += addition;
    }

    if (batch.length > 0) {
      commands.push(`${prefix} ${batch.map((f) => `"${f}"`).join(' ')}`);
    }

    return commands;
  };
}

const root = process.cwd();

/** @type {import('lint-staged').Configuration} */
const lintStagedConfig = {
  'apps/web/**/*.{js,jsx,ts,tsx}': [
    buildEslintCommand(path.join(root, 'apps/web')),
  ],
  'apps/server/**/*.{js,jsx,ts,tsx}': [
    buildEslintCommand(path.join(root, 'apps/server')),
  ],
  'apps/client/**/*.{js,jsx,ts,tsx}': [
    buildEslintCommand(path.join(root, 'apps/client')),
  ],
  'packages/ui/**/*.{js,jsx,ts,tsx}': [
    buildEslintCommand(path.join(root, 'packages/ui')),
  ],
  '*.{ts,tsx,js,jsx,mjs,cjs,json,md,mdx,css}': 'prettier --write',
};

export default lintStagedConfig;
