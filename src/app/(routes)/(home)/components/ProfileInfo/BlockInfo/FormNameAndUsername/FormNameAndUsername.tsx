"use client"

import { useState } from "react"
import { z } from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUserInfo } from "@/hooks/useUser";
import { FormNameAndUsernameProps } from "./FormNameAndUsername.types";
import { formSchema } from "./FormNameAndUsername.form"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function FormNameAndUsername(props: FormNameAndUsernameProps) {

  const { setShowDialog } = props

  const { user, reloadUser } = useUserInfo()

  const { showToast } = useToast()

  const [isLoading, setIsLoading] = useState(false);

  {/* Configuración del formulario */ }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      bio: user?.bio || "",
    },
  })

  {/* Función para actualizar los datos del usuario */ }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.patch("/api/update-user", {
        name: values.name,
        username: values.username,
        bio: values.bio
      });
      setShowDialog(false)
      reloadUser()
      showToast("Datos actualizados con éxito", "success")
      form.reset()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data?.message || "Ocurrió un error al actualizar", "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("Ocurrió un error inesperado", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {/* Formulario para editar el nombre, username y biografia  */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biografía</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cuéntanos un poco sobre ti"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-indigo-600 text-white rounded-full py-5 text-lg hover:bg-indigo-800 cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <span className="text-white">Guardar</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}






