import { defineField, defineType } from "sanity";

/**
 * Servicio de taller / compostura (soldadura, ajuste de tallas, etc.).
 * Permite que el negocio edite la lista de servicios de la landing de Taller.
 */
export const repairService = defineType({
  name: "repairService",
  title: "Servicio de Taller",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 3 }),
    defineField({
      name: "icon",
      title: "Ícono (nombre lucide)",
      type: "string",
      description: 'Ej. "wrench", "ruler", "flame".',
    }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
});
