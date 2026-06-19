import { category } from "./category";
import { product } from "./product";
import { repairService } from "./repairService";

/**
 * Registro de schemas para el Sanity Studio.
 * Importar en sanity.config.ts del Studio: `schema: { types: schemaTypes }`.
 */
export const schemaTypes = [product, category, repairService];
