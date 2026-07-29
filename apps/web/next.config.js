/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@repo/api-contract',
    '@repo/auth',
    '@repo/zod',
    '@repo/db',
  ],
};

export default nextConfig;
