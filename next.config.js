/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT_STATIC === 'true';

const nextConfig = {
  images: { unoptimized: true },
  ...(isExport
    ? {
        output: 'export',
        trailingSlash: true,
        basePath: '/zaoqi.icu', // 仓库名
      }
    : {
        // SSR 部署时不需要 output 和 basePath
      }),
};

module.exports = nextConfig