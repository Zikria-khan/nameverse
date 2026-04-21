/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Allow all hosts for Replit proxy
  allowedDevOrigins: [
    'https://faea070e-8320-40f1-92b2-b79c20b8d2f6-00-6rm0csoemn1l.kirk.replit.dev',
    'http://faea070e-8320-40f1-92b2-b79c20b8d2f6-00-6rm0csoemn1l.kirk.replit.dev',
    '*.replit.dev',
    '*.repl.co',
    '*.kirk.replit.dev',
  ],
  
  // Performance Optimizations
  compress: true,


  
  // Image Optimization this will happen in thesis
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers for Performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https: data:; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://analytics.ahrefs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://analytics.ahrefs.com; font-src 'self' data:; frame-ancestors 'self'; object-src 'none'; base-uri 'self';",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=0, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=0, must-revalidate',
          },
        ],
      },
      {
        source: '/images/:path*',
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
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Rewrite missing article image requests to a known placeholder
  async rewrites() {
    return [
      {
        source: '/article/:path*',
        destination: '/logo.png',
      },
      {
        source: '/images/articles/:path*',
        destination: '/logo.png',
      },
    ];
  },

  // Experimental Features for Performance
  experimental: {
    // optimizeCss: true, // Disabled - requires critters package
    optimizePackageImports: [
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-slot',
      '@heroicons/react',
      'framer-motion',
      'lodash'
    ],
  },

  // Turbopack configuration
  turbopack: {},

  // Webpack Optimizations (simplified to avoid build issues)
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;