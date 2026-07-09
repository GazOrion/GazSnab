import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/pod-obekt",
        destination: "/oborudovanie",
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  // Стабильнее file-watcher на Windows (если запуск без --turbopack)
  webpack: (config, { dev }) => {
    if (dev && process.platform === "win32") {
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300
      };
    }
    return config;
  }
};

export default nextConfig;
