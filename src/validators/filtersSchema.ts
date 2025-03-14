import { z } from "zod";

const queryArraySchema = z
  .array(z.object({ label: z.string(), value: z.string() }))
  .optional();

export const FiltersSchema = z.object({
  countries: queryArraySchema,
  agencies: queryArraySchema,
  drugs: queryArraySchema,
  biomarkers: queryArraySchema,
  modalities: queryArraySchema,
  diseases: queryArraySchema,
  final_recommendations: queryArraySchema,
  dt_upto: z.string().optional(),
});

export type FiltersSchemaType = z.infer<typeof FiltersSchema>;
