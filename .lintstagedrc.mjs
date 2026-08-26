import path from 'path';

// Next.js lint-staged pattern: pass only staged files to eslint.
// https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
// Each package has its own eslint.config, so commands run from that package directory.
function toPosix(filePath) {
  return filePath.replace(/\\/g, '/');
}

function buildEslintCommand(cwd) {
  return (filenames) => {
    const dir = toPosix(path.relative(process.cwd(), cwd));
    const files = filenames
      .map((file) => `"${toPosix(path.relative(cwd, file))}"`)
      .join(' ');
    return `pnpm --dir ${dir} exec eslint --fix ${files}`;
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
