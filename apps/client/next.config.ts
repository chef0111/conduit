import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
  experimental: {
    useTypeScriptCli: false,
  },
};

export default nextConfig;
