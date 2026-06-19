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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://joyeriadiamante.mx",
  locale: "es_MX",

  // Contacto / conversión
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "521234567890", // formato internacional sin '+'
  phoneDisplay: "+52 123 456 7890",
  email: "contacto@joyeriadiamante.mx",
  address: "Av. Reforma 123, Centro, Ciudad de México, CDMX",
  // Embed de Google Maps (se sustituye por la API key real en .env)
  mapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  mapsQuery: "Joyería+Diamante+Centro+CDMX",

  social: {
    instagram: "https://instagram.com/joyeriadiamante",
    facebook: "https://facebook.com/joyeriadiamante",
  },
} as const;

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
    blurb: "Confirmación, XV años y tejido tipo torzal.",
    subcategories: [
      { slug: "confirmacion", name: "Confirmación" },
      { slug: "xv-anos", name: "XV Años" },
      { slug: "torzal", name: "Tipo Torzal" },
    ],
  },
  {
    slug: "dijes",
    name: "Dijes",
    blurb: "Cristo, San Judas, San Benito y diferentes figuras.",
    subcategories: [
      { slug: "cristo", name: "Cristo" },
      { slug: "muerte", name: "Muerte" },
      { slug: "san-judas", name: "San Judas" },
      { slug: "san-benito", name: "San Benito" },
      { slug: "figuras", name: "Diferentes figuras" },
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
