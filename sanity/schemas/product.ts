import { defineField, defineType } from "sanity";

/**
 * Producto del catálogo. La forma coincide con lib/types.ts (interface Product)
 * y con la proyección GROQ de lib/catalog.ts.
 */
export const product = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", title: "Resumen", type: "string" }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 4 }),
    defineField({
      name: "metal",
      title: "Metal",
      type: "string",
      options: {
        list: [
          { title: "Oro", value: "oro" },
          { title: "Plata", value: "plata" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "purity",
      title: "Pureza / Quilataje",
      type: "string",
      description: 'Ej. "14k", "18k", ".925"',
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subcategoría",
      type: "string",
      description:
        "Debe coincidir con un slug de subcategoría definido en lib/site.ts.",
      options: {
        list: [
          // Anillos
          { title: "Anillos · Compromiso", value: "compromiso" },
          { title: "Anillos · Promesa", value: "promesa" },
          // Pulseras y Esclavas
          { title: "Pulseras · Tipo Rolex", value: "tipo-rolex" },
          { title: "Pulseras · De Pulso", value: "de-pulso" },
          { title: "Pulseras · Esclavas con nombre", value: "esclavas-nombre" },
          { title: "Pulseras · Esclavas con diseño", value: "esclavas-diseno" },
          // Cadenas
          { title: "Cadenas · Confirmación", value: "confirmacion" },
          { title: "Cadenas · XV Años", value: "xv-anos" },
          { title: "Cadenas · Tipo Torzal", value: "torzal" },
          { title: "Cadenas · Italiana", value: "italiana" },
          // Dijes
          { title: "Dijes · Cristo", value: "cristo" },
          { title: "Dijes · San Judas", value: "san-judas" },
          { title: "Dijes · San Benito", value: "san-benito" },
          { title: "Dijes · Santa Muerte", value: "muerte" },
          { title: "Dijes · Figuras varias", value: "figuras" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
        },
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "priceFrom",
      title: "Precio desde (opcional)",
      type: "number",
    }),
    defineField({ name: "featured", title: "Destacado", type: "boolean" }),
    defineField({
      name: "engraving",
      title: "Permite grabado en vivo",
      type: "boolean",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "metal", media: "images.0" },
  },
});
