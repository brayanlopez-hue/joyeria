import type { MetadataRoute } from "next";
import { siteConfig, categories } from "@/lib/site";
import { getAllProductSlugs } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, priority: 1 },
    { url: `${base}/catalogo`, lastModified: now, priority: 0.9 },
    { url: `${base}/taller`, lastModified: now, priority: 0.8 },
    { url: `${base}/contacto`, lastModified: now, priority: 0.7 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/catalogo/${c.slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  const slugs = await getAllProductSlugs();
  const productPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/producto/${slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
