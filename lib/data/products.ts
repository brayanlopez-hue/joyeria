import type { Product } from "../types";
import type { Metal } from "../site";

/**
 * Catálogo de ejemplo (seed). En producción estos datos provienen de Sanity
 * (ver sanity/schemas/product.ts); la forma es idéntica para migrar sin cambios.
 */

// Mapea categoría → base del nombre de archivo de imagen placeholder.
const imgBase: Record<string, string> = {
  anillos: "anillo",
  pulseras: "pulsera",
  cadenas: "cadena",
  dijes: "dije",
};

/** Construye la galería placeholder de un producto a partir de su categoría/metal. */
function gallery(category: string, metal: Metal, name: string) {
  const base = imgBase[category];
  const other: Metal = metal === "oro" ? "plata" : "oro";
  return [
    { src: `/images/products/${base}-${metal}.svg`, alt: `${name} — vista principal` },
    { src: `/images/products/${base}-${other}.svg`, alt: `${name} — detalle` },
    { src: `/images/products/${base}-${metal}.svg`, alt: `${name} — vista lateral` },
  ];
}

interface Seed {
  slug: string;
  name: string;
  excerpt: string;
  description: string;
  metal: Metal;
  purity: string;
  category: string;
  subcategory: string;
  priceFrom?: number;
  featured?: boolean;
  engraving?: boolean;
}

const seeds: Seed[] = [
  // ── Anillos ─────────────────────────────────────────────
  {
    slug: "anillo-compromiso-solitario-oro",
    name: "Anillo Solitario de Compromiso",
    excerpt: "Solitario clásico en oro de 14k con engaste de 6 garras.",
    description:
      "Anillo de compromiso solitario elaborado en oro de 14 quilates, con engaste de seis garras que maximiza el brillo de la piedra central. Acabado pulido espejo. Disponible bajo pedido en distintas tallas y quilatajes.",
    metal: "oro",
    purity: "14k",
    category: "anillos",
    subcategory: "compromiso",
    priceFrom: 8500,
    featured: true,
  },
  {
    slug: "anillo-compromiso-pave-oro",
    name: "Anillo de Compromiso Pavé",
    excerpt: "Banda con pavé de acentos en oro de 18k.",
    description:
      "Diseño de compromiso con banda en pavé que rodea la pieza central de acentos, en oro de 18 quilates. Una opción luminosa y contemporánea para una ocasión única.",
    metal: "oro",
    purity: "18k",
    category: "anillos",
    subcategory: "compromiso",
    priceFrom: 11200,
  },
  {
    slug: "anillo-promesa-trenzado-plata",
    name: "Anillo de Promesa Trenzado",
    excerpt: "Banda trenzada en plata .925 con acabado satinado.",
    description:
      "Anillo de promesa con banda trenzada en plata ley .925, acabado satinado de bajo mantenimiento. Símbolo de un compromiso que crece con el tiempo.",
    metal: "plata",
    purity: ".925",
    category: "anillos",
    subcategory: "promesa",
    priceFrom: 1450,
    featured: true,
  },
  {
    slug: "anillo-promesa-infinito-oro",
    name: "Anillo de Promesa Infinito",
    excerpt: "Diseño de infinito en oro de 10k.",
    description:
      "Anillo de promesa con motivo de infinito en oro de 10 quilates. Ligero, cómodo para uso diario y personalizable con grabado interior.",
    metal: "oro",
    purity: "10k",
    category: "anillos",
    subcategory: "promesa",
    priceFrom: 3200,
  },

  // ── Pulseras y Esclavas ────────────────────────────────
  {
    slug: "pulsera-tipo-rolex-oro",
    name: "Pulsera Tipo Rolex",
    excerpt: "Eslabón presidente en oro de 14k.",
    description:
      "Pulsera de eslabón tipo presidente (Rolex) en oro de 14 quilates, con broche de seguridad. Pieza de presencia y peso, ideal para ocasiones especiales.",
    metal: "oro",
    purity: "14k",
    category: "pulseras",
    subcategory: "tipo-rolex",
    priceFrom: 18500,
    featured: true,
  },
  {
    slug: "pulsera-de-pulso-plata",
    name: "Pulsera de Pulso Clásica",
    excerpt: "Cadena fina de pulso en plata .925.",
    description:
      "Pulsera de pulso en plata ley .925, tejido fino y ligero, con broche de mosquetón. Perfecta para uso diario o para combinar en capas.",
    metal: "plata",
    purity: ".925",
    category: "pulseras",
    subcategory: "de-pulso",
    priceFrom: 950,
  },
  {
    slug: "esclava-nombre-oro",
    name: "Esclava Personalizada con Nombre",
    excerpt: "Esclava grabada con el nombre que elijas, en oro de 14k.",
    description:
      "Esclava en oro de 14 quilates con placa central para grabar el nombre a tu gusto. Personaliza la tipografía y previsualiza el resultado antes de cotizar.",
    metal: "oro",
    purity: "14k",
    category: "pulseras",
    subcategory: "esclavas-nombre",
    priceFrom: 6800,
    featured: true,
    engraving: true,
  },
  {
    slug: "esclava-nombre-plata",
    name: "Esclava con Nombre en Plata",
    excerpt: "Placa para grabar en plata .925.",
    description:
      "Esclava en plata ley .925 con amplia placa central para grabado de nombre o fecha. Una pieza personal y accesible.",
    metal: "plata",
    purity: ".925",
    category: "pulseras",
    subcategory: "esclavas-nombre",
    priceFrom: 1850,
    engraving: true,
  },
  {
    slug: "esclava-diseno-grabado-oro",
    name: "Esclava con Diseño Grabado",
    excerpt: "Esclava con grabado de diseño en oro de 14k.",
    description:
      "Esclava en oro de 14 quilates con grabado de diseño en la superficie. Elige entre patrones florales, geométricos o motivos a la medida.",
    metal: "oro",
    purity: "14k",
    category: "pulseras",
    subcategory: "esclavas-diseno",
    priceFrom: 7200,
  },

  // ── Cadenas ─────────────────────────────────────────────
  {
    slug: "cadena-confirmacion-oro",
    name: "Cadena de Confirmación",
    excerpt: "Cadena ligera ideal para confirmación, oro de 10k.",
    description:
      "Cadena en oro de 10 quilates, longitud y grosor pensados para confirmación. Se puede combinar con un dije religioso de nuestro catálogo.",
    metal: "oro",
    purity: "10k",
    category: "cadenas",
    subcategory: "confirmacion",
    priceFrom: 2800,
  },
  {
    slug: "cadena-xv-anos-oro",
    name: "Cadena XV Años",
    excerpt: "Cadena especial para XV años en oro de 14k.",
    description:
      "Cadena conmemorativa de XV años en oro de 14 quilates, con acabado brillante. Una pieza para recordar una fecha única.",
    metal: "oro",
    purity: "14k",
    category: "cadenas",
    subcategory: "xv-anos",
    priceFrom: 5400,
    featured: true,
  },
  {
    slug: "cadena-torzal-oro",
    name: "Cadena Tipo Torzal",
    excerpt: "Tejido torzal en oro de 14k.",
    description:
      "Cadena de tejido tipo torzal en oro de 14 quilates. Su trenzado le da fuerza y un brillo distintivo desde cualquier ángulo.",
    metal: "oro",
    purity: "14k",
    category: "cadenas",
    subcategory: "torzal",
    priceFrom: 9600,
  },
  {
    slug: "cadena-torzal-plata",
    name: "Cadena Torzal en Plata",
    excerpt: "Tejido torzal en plata .925.",
    description:
      "Cadena de tejido torzal en plata ley .925, una alternativa elegante y de gran durabilidad.",
    metal: "plata",
    purity: ".925",
    category: "cadenas",
    subcategory: "torzal",
    priceFrom: 1650,
  },
  {
    slug: "cadena-italiana-oro",
    name: "Cadena Italiana",
    excerpt: "Tejido italiano fino y flexible en oro de 14k.",
    description:
      "Cadena de tejido italiano en oro de 14 quilates: ligera, flexible y con un brillo uniforme. Un clásico versátil para uso diario o para portar un dije.",
    metal: "oro",
    purity: "14k",
    category: "cadenas",
    subcategory: "italiana",
    priceFrom: 7400,
  },
  {
    slug: "cadena-italiana-plata",
    name: "Cadena Italiana en Plata",
    excerpt: "Tejido italiano en plata .925.",
    description:
      "Cadena de tejido italiano en plata ley .925, con caída elegante y acabado brillante. Una opción accesible y atemporal.",
    metal: "plata",
    purity: ".925",
    category: "cadenas",
    subcategory: "italiana",
    priceFrom: 1250,
  },

  // ── Dijes ───────────────────────────────────────────────
  {
    slug: "dije-cristo-oro",
    name: "Dije de Cristo",
    excerpt: "Cristo en oro de 14k con relieve detallado.",
    description:
      "Dije de Cristo en oro de 14 quilates, con relieve detallado y argolla reforzada. Combínalo con cualquiera de nuestras cadenas.",
    metal: "oro",
    purity: "14k",
    category: "dijes",
    subcategory: "cristo",
    priceFrom: 2400,
    featured: true,
  },
  {
    slug: "dije-santa-muerte-plata",
    name: "Dije de Santa Muerte",
    excerpt: "Figura de la Santa Muerte en plata .925.",
    description:
      "Dije de la Santa Muerte en plata ley .925, con detalle fino en la guadaña y el manto. Pieza de devoción popular, con argolla reforzada.",
    metal: "plata",
    purity: ".925",
    category: "dijes",
    subcategory: "muerte",
    priceFrom: 890,
  },
  {
    slug: "dije-santa-muerte-oro",
    name: "Dije de Santa Muerte en Oro",
    excerpt: "Santa Muerte en oro de 14k con relieve detallado.",
    description:
      "Dije de la Santa Muerte en oro de 14 quilates, con relieve detallado. Combínalo con cualquiera de nuestras cadenas.",
    metal: "oro",
    purity: "14k",
    category: "dijes",
    subcategory: "muerte",
    priceFrom: 2700,
    featured: true,
  },
  {
    slug: "dije-san-judas-oro",
    name: "Dije de San Judas Tadeo",
    excerpt: "San Judas Tadeo en oro de 14k.",
    description:
      "Dije de San Judas Tadeo en oro de 14 quilates, patrono de las causas difíciles. Acabado con detalle fino en la figura.",
    metal: "oro",
    purity: "14k",
    category: "dijes",
    subcategory: "san-judas",
    priceFrom: 2600,
  },
  {
    slug: "dije-san-benito-plata",
    name: "Medalla de San Benito",
    excerpt: "Medalla de San Benito en plata .925.",
    description:
      "Medalla de San Benito en plata ley .925, con la cruz e inscripciones tradicionales. Pieza de protección y devoción.",
    metal: "plata",
    purity: ".925",
    category: "dijes",
    subcategory: "san-benito",
    priceFrom: 780,
  },
  {
    slug: "dije-figura-personalizada-oro",
    name: "Dije de Figura Personalizada",
    excerpt: "Diseña tu propia figura en oro.",
    description:
      "Dije de figura a la medida en oro: iniciales, mascotas, símbolos o cualquier idea que tengas. Cuéntanos tu diseño y lo cotizamos.",
    metal: "oro",
    purity: "14k",
    category: "dijes",
    subcategory: "figuras",
    priceFrom: 3500,
  },
];

/**
 * Slugs con foto real (public/images/products/photo-<slug>.jpg).
 * El resto usa el placeholder SVG generado por `gallery()`.
 * Los dijes religiosos (Santa Muerte, San Judas) no tienen foto de stock
 * con fondo blanco apropiada: súbelas tú desde /admin.
 */
const PHOTO_SLUGS = new Set<string>([
  "anillo-compromiso-solitario-oro",
  "anillo-compromiso-pave-oro",
  "anillo-promesa-trenzado-plata",
  "anillo-promesa-infinito-oro",
  "pulsera-tipo-rolex-oro",
  "pulsera-de-pulso-plata",
  "esclava-nombre-oro",
  "esclava-nombre-plata",
  "esclava-diseno-grabado-oro",
  "cadena-confirmacion-oro",
  "cadena-xv-anos-oro",
  "cadena-torzal-oro",
  "cadena-torzal-plata",
  "cadena-italiana-oro",
  "cadena-italiana-plata",
  "dije-cristo-oro",
  "dije-san-benito-plata",
  "dije-figura-personalizada-oro",
]);

function imagesFor(s: Seed) {
  if (PHOTO_SLUGS.has(s.slug)) {
    return [{ src: `/images/products/photo-${s.slug}.jpg`, alt: s.name }];
  }
  return gallery(s.category, s.metal, s.name);
}

export const products: Product[] = seeds.map((s, i) => ({
  _id: `seed-${i + 1}`,
  ...s,
  images: imagesFor(s),
}));
