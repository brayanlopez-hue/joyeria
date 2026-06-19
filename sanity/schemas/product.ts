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
      title: "Subcategoría (slug)",
      type: "string",
      description:
        "Slug de la subcategoría definida en lib/site.ts (ej. compromiso, esclavas-nombre, torzal).",
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
