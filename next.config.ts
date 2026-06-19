import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formatos modernos para optimización automática (requisito: WebP)
    formats: ["image/avif", "image/webp"],
    // Permite servir los placeholders SVG locales del catálogo de ejemplo.
    // En producción con fotos reales (Sanity) esto sigue siendo seguro porque
    // las imágenes provienen del CDN configurado abajo.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        // CDN de imágenes de Sanity (cuando se conecte el CMS real)
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
