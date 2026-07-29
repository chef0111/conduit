import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  typedRoutes: true,
  reactCompiler: true,
  experimental: {
    typedEnv: true,
    authInterrupts: true,
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@tabler/icons-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cfww31lk7t.ufs.sh',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*',
        port: '',
      },
    ],
  },
  transpilePackages: [
    '@repo/api-contract',
    '@repo/auth',
    '@repo/zod',
    '@repo/db',
  ],
};

export default nextConfig;
