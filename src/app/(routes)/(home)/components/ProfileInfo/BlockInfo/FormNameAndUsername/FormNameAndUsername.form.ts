import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(2, "El nombre de usuario debe tener al menos 2 caracteres")
    .max(100, "El nombre de usuario no puede superar los 100 caracteres")
    .optional(),
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres")
    .optional(),
  bio: z
    .string()
    .min(2, "La biografía debe tener al menos 2 caracteres")
    .max(400, "La biografía no puede superar los 400 caracteres")
    .optional(),
});
