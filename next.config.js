/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 SWC 压缩（比 Terser 快 7x）
  swcMinify: true,
  
  // 启用生产优化
  productionBrowserSourceMaps: false,
  
  // 优化编译
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  // 优化输出
  output: 'standalone',
  
  // 压缩配置
  compress: true,
  
  // 优化图片
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // 实验性功能
  experimental: {
    optimizeCss: true, // CSS 优化
    optimizePackageImports: ['@/components', '@/lib'], // 优化导入
  },
  
  // React 严格模式
  reactStrictMode: true,
  
  // 启用 HTTP 头优化
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|json)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
