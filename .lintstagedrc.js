const path = require('path');

// Next.js lint-staged pattern: pass only staged files to eslint.
// https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
// Each app has its own eslint.config, so commands run from that app directory.
function toPosix(filePath) {
  return filePath.replace(/\\/g, '/');
}

function buildEslintCommand(cwd) {
  return (filenames) => {
    const dir = toPosix(path.relative(process.cwd(), cwd));
    const files = filenames
      .map((file) => `"${toPosix(path.relative(cwd, file))}"`)
      .join(' ');
    return `pnpm --dir ${dir} exec eslint --fix --max-warnings 0 ${files}`;
  };
}

module.exports = {
  'apps/web/**/*.{js,jsx,ts,tsx}': [
    buildEslintCommand(path.join(process.cwd(), 'apps/web')),
  ],
  'apps/server/**/*.{js,jsx,ts,tsx}': [
    buildEslintCommand(path.join(process.cwd(), 'apps/server')),
  ],
  '*.{ts,tsx,js,jsx,mjs,cjs,json,md,mdx,css}': 'prettier --write',
};
