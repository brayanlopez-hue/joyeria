/**
 * Configuración central del sitio Joyería Diamante.
 * Todo lo configurable por el negocio (contacto, redes, taxonomía del catálogo)
 * vive aquí para que sea fácil de mantener.
 */

export const siteConfig = {
  name: "Joyería Diamante",
  shortName: "Diamante",
  tagline: "Piezas personalizadas en oro y plata",
  description:
    "Joyería de alta gama especializada en el diseño de piezas personalizadas en oro y plata, anillos de compromiso, esclavas grabadas, cadenas, dijes y servicio de taller (composturas).",
  // URL pública (ajustar al dominio real en producción)
  // URL pública real (cámbiala aquí o vía env cuando tengan dominio propio)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://joyeria-henna.vercel.app",
  locale: "es_MX",

  // Contacto / conversión
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "525585868498", // formato internacional sin '+'
  phoneDisplay: "+52 55 8586 8498",
  email: "contacto@joyeriadiamante.mx",
  address: "Av. 5 de Mayo 40, Int. 301 Piso 3, Centro Histórico, Cuauhtémoc, 06000 CDMX",
  // Embed de Google Maps (se sustituye por la API key real en .env)
  mapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  mapsQuery: "Av.+5+de+Mayo+40+Centro+Histórico+Cuauhtémoc+Ciudad+de+México",
} as const;

/** Teléfono normalizado para enlaces `tel:` (solo dígitos y '+'). */
export const phoneTel = siteConfig.phoneDisplay.replace(/[^\d+]/g, "");

/** Metales disponibles para el filtro dinámico del catálogo. */
export const METALS = [
  { value: "oro", label: "Oro" },
  { value: "plata", label: "Plata" },
] as const;

export type Metal = (typeof METALS)[number]["value"];

export interface Subcategory {
  slug: string;
  name: string;
  /** Activa el módulo de grabado en vivo (esclavas con nombre). */
  engraving?: boolean;
  /**
   * Grupo de presentación para los filtros (ej. "Ocasiones Especiales").
   * Es puramente visual: el filtrado sigue siendo por `slug`.
   */
  group?: string;
}

export interface Category {
  slug: string;
  name: string;
  /** Texto corto para módulos de acceso rápido del home. */
  blurb: string;
  subcategories: Subcategory[];
}

/**
 * Taxonomía del catálogo (mapa de la información del documento de requerimientos).
 */
export const categories: Category[] = [
  {
    slug: "anillos",
    name: "Anillos",
    blurb: "Compromiso y promesa con guía de tallas interactiva.",
    subcategories: [
      { slug: "compromiso", name: "Compromiso" },
      { slug: "promesa", name: "Promesa" },
    ],
  },
  {
    slug: "pulseras",
    name: "Pulseras y Esclavas",
    blurb: "Tipo Rolex, de pulso y esclavas personalizadas con nombre.",
    subcategories: [
      { slug: "tipo-rolex", name: "Tipo Rolex" },
      { slug: "de-pulso", name: "De Pulso" },
      { slug: "esclavas-nombre", name: "Esclavas con nombre", engraving: true },
      { slug: "esclavas-diseno", name: "Esclavas con diseño" },
    ],
  },
  {
    slug: "cadenas",
    name: "Cadenas",
    blurb: "Ocasiones especiales y estilos clásicos: confirmación, XV años, torzal e italiana.",
    subcategories: [
      { slug: "confirmacion", name: "Confirmación", group: "Ocasiones Especiales" },
      { slug: "xv-anos", name: "XV Años", group: "Ocasiones Especiales" },
      { slug: "torzal", name: "Tipo Torzal", group: "Estilos Clásicos" },
      { slug: "italiana", name: "Italiana", group: "Estilos Clásicos" },
    ],
  },
  {
    slug: "dijes",
    name: "Dijes",
    blurb: "Galería de devoción y estilo: Cristo, San Judas, San Benito, Santa Muerte y figuras a la medida.",
    subcategories: [
      { slug: "cristo", name: "Cristo", group: "Religiosos y Protectores" },
      { slug: "san-judas", name: "San Judas", group: "Religiosos y Protectores" },
      { slug: "san-benito", name: "San Benito", group: "Religiosos y Protectores" },
      { slug: "muerte", name: "Santa Muerte", group: "Culturales / Tendencia" },
      { slug: "figuras", name: "Figuras varias", group: "Figuras Varias" },
    ],
  },
];

/** Devuelve una categoría por slug. */
export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Navegación principal (incluye Taller, que no es categoría de catálogo). */
export const mainNav = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/taller", label: "Taller" },
  { href: "/contacto", label: "Contacto" },
] as const;

/** Límite de caracteres para grabados en esclavas con nombre. */
export const ENGRAVING_MAX_CHARS = 14;
