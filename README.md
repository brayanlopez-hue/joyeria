# Joyería Diamante — Sitio Web

Catálogo interactivo de alta gama con cotizador a WhatsApp para **Joyería Diamante**,
joyería especializada en piezas personalizadas en oro y plata y en servicios de taller
(composturas). Construido con foco en estética premium, velocidad y mobile-first.

## Stack

- **Next.js 16** (App Router, TypeScript) — SSR/SSG para SEO y velocidad
- **Tailwind CSS v4** — tema premium (oro/plata/negro/marfil)
- **Sanity** (CMS headless) — gestión del catálogo _(opcional; ver abajo)_
- **next/image** + pipeline de Sanity — WebP, lazy loading, `srcset`
- **Framer Motion** — animaciones; **Embla Carousel** — galería táctil
- **react-medium-image-zoom** — zoom HD del detalle de producto
- **Resend** — envío de correos de los formularios _(opcional)_

## Inicio rápido

```bash
npm install
cp .env.example .env.local   # opcional: el sitio funciona sin variables
npm run dev                  # http://localhost:3000
```

> El proyecto funciona **sin configurar nada**: usa un catálogo de ejemplo
> (`lib/data/products.ts`) y los formularios responden OK simulando el envío
> (lo registran en la consola del servidor). Configura las variables para
> conectar el CMS, el envío de correos y Google Maps reales.

### Scripts

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint |

## Variables de entorno

Ver [`.env.example`](.env.example). Todas son opcionales en desarrollo:

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública (SEO, sitemap, Open Graph) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp del negocio, formato internacional sin `+` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Maps Embed API (sin key usa el embed clásico) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` | Activa el catálogo desde Sanity |
| `RESEND_API_KEY` / `EMAIL_FROM` / `CONTACT_TO_EMAIL` | Correos de formularios |

## Estructura

```
app/                 Rutas (App Router)
  page.tsx           Home (hero, categorías, destacados)
  catalogo/          Catálogo + [categoria] con filtros por metal
  producto/[slug]/   Detalle con zoom HD, galería swipe y grabado en vivo
  taller/            Composturas + formulario de carga de foto
  contacto/          Formulario + Google Maps
  api/               Route Handlers (taller, contacto)
  sitemap.ts robots.ts
components/           UI, layout, catálogo, formularios, WhatsApp, SEO
lib/                  Config del sitio, capa de datos, builder de WhatsApp, email
sanity/schemas/       Schemas del CMS (product, category, repairService)
public/images/        Imágenes placeholder (sustituir por fotos reales)
```

## Funcionalidades clave

- **WhatsApp adaptativo**: el mensaje prellenado cambia según la sección/producto
  (`lib/whatsapp.ts`). En el detalle, incluye el grabado elegido.
- **Grabado en vivo**: input limitado a `ENGRAVING_MAX_CHARS` con previsualización
  de tipografía en placa metálica (esclavas con nombre).
- **Guía de tallas interactiva** (anillos): calculadora diámetro → talla MX/US.
- **Optimización de imágenes**: WebP, `srcset` y lazy loading vía `next/image`.
- **SEO**: metadata + Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD
  (`JewelryStore` y `Product`), jerarquía H1–H3.

## Conectar Sanity (CMS) — opcional

1. Crea un proyecto en [sanity.io](https://www.sanity.io/) y un Studio nuevo.
2. Registra los schemas de [`sanity/schemas`](sanity/schemas) en el Studio
   (`schema: { types: schemaTypes }`).
3. Define `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET` en
   `.env.local`. La capa de datos (`lib/catalog.ts`) cambia automáticamente de los
   datos de ejemplo a GROQ — **sin tocar la UI**.

## Imágenes y video

- Las imágenes del catálogo son placeholders SVG en `public/images/products/`.
  Sustitúyelas por fotos reales (o súbelas a Sanity).
- Para el video del hero, coloca `public/videos/hero.mp4` (mientras tanto se usa
  el poster `public/images/hero-poster.svg`).

## Despliegue (Vercel)

1. Sube el repositorio a GitHub.
2. Importa el proyecto en [Vercel](https://vercel.com) (detecta Next.js).
3. Configura las variables de entorno en el panel de Vercel.
4. Deploy → **SSL automático** y previews por commit.
