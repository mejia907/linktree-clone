import { z } from "zod";

export const formSchema = z.object({
  link: z
    .string({ required_error: "El link es obligatorio" })
    .min(4, "El link debe tener al menos 4 caracteres")
    .max(200, "El link no puede superar los 200 caracteres")
    .url("Debe ser una URL válida"),
});
