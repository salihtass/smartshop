const { GenerateSW } = require('workbox-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new GenerateSW({
          swDest: 'public/service-worker.js',
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'https-calls',
                networkTimeoutSeconds: 15,
                expiration: {
                  maxEntries: 150,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
