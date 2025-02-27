import { z } from "zod";

export const apiKeySchema = z.object({
  apiKey: z
    .string()
    .min(10, { message: "API key must be at least 10 characters" }),
});

export type ApiKeyType = z.infer<typeof apiKeySchema>;
