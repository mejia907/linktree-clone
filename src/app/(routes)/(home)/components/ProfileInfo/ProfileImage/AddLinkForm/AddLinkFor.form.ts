import { z } from "zod";
 
export const formSchema = z.object({
  icon: z.string().min(1, { message: "El icono es obligatorio" }),
  name: z.string().min(1, { message: "El nombre debe tener al menos 2 caracteres" }).max(50, { message: "El nombre no puede superar los 50 caracteres" }),
  link: z.string().url({ message: "Debe ser una URL válida" }).max(200, { message: "La URL no puede superar los 200 caracteres" }),
});
