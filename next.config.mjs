import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 排除服务端运行时不支持的 Node.js 模块
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('async_hooks');
    }
    return config;
  },
  // 确保静态导出兼容性
  trailingSlash: true,
  // 图片优化配置
  images: {
    unoptimized: true
  }
};

export default withNextIntl(nextConfig);