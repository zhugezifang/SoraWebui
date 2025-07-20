import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

// next.config.js
module.exports = {
    experimental: {
      runtime: 'experimental-edge', // 启用 Edge Runtime
      serverComponents: true, // 如果使用 Server Components
    },
};

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);