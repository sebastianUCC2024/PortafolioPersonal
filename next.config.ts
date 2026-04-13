import type { NextConfig } from "next";
import { securityHeaders } from "./next.config.headers";

const nextConfig: NextConfig = {
  // Optimizaciones de rendimiento
  reactStrictMode: true,
  
  // Headers de seguridad y performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  
  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optimización de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Optimización de bundle
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-slot'],
  },
  
  // Optimización de producción
  poweredByHeader: false,
  compress: true,
  
  // Configuración vacía de Turbopack para silenciar el warning
  turbopack: {},
};

export default nextConfig;
