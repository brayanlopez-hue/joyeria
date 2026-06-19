import { defineField, defineType } from "sanity";

/**
 * Categoría del catálogo (Anillos, Pulseras, Cadenas, Dijes).
 * Las subcategorías se modelan como lista de opciones en el producto para
 * mantener simple la edición; podrían promoverse a documentos si se requiere.
 */
export const category = defineType({
  name: "category",
  title: "Categoría",
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
    defineField({ name: "blurb", title: "Descripción corta", type: "text", rows: 2 }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Para ordenar los módulos de acceso rápido del home.",
    }),
  ],
});
