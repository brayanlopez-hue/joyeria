import { siteConfig } from "@/lib/site";
import type { Product } from "@/lib/types";

/**
 * Inyecta datos estructurados (JSON-LD) para SEO. Render seguro: el contenido
 * es controlado por nosotros (no entrada de usuario).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Datos del negocio (JewelryStore) para el home. */
export function organizationLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
    },
    image: `${siteConfig.url}/images/og-image.svg`,
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };
}

/** Datos de un producto (Product) para la página de detalle. */
export function productLd(product: Product): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteConfig.url}${product.images[0]?.src}`,
    material: product.metal === "oro" ? "Oro" : "Plata",
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(product.priceFrom != null && {
      offers: {
        "@type": "Offer",
        priceCurrency: "MXN",
        price: product.priceFrom,
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/producto/${product.slug}`,
      },
    }),
  };
}
