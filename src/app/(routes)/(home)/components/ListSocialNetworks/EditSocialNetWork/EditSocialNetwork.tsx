import { useState } from "react";
import { z } from "zod"
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EditSocialNetworkProps } from "./EditSocialNetwork.types"
import { formSchema } from "./EditsocialNetwork.form";
import { useToast } from "@/hooks/use-toast";
import { useUserInfo } from "@/hooks/useUser";

export default function EditSocialNetwork(props: EditSocialNetworkProps) {

  const { link, onReload } = props

  const { reloadUser } = useUserInfo()

  const { showToast } = useToast()

  const [showDialog, setShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: link.link || "",
    },
  })

  {/* Función para actualizar los datos del link */ }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    if (!values.link) {
      showToast("El link es obligatorio", "error")
      return
    }

    setIsLoading(true);

    try {
      await axios.patch(`/api/social-network/${link.id}`, { link: values.link });
      setShowDialog(false)
      reloadUser()
      onReload(true)
      showToast("Enlace actualizado con éxito", "success")
      form.reset()
    } catch (error: any) {
      showToast(error.response?.data?.message || "Ocurrió un error", "error")
    } finally {
      setIsLoading(false)
      setShowDialog(false)
    }

  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Pencil className="w-5 h-5 text-gray-600 hover:text-gray-800" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar</DialogTitle>
          {/* Formulario para editar el link */}
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linktree-clone.com/linktree" {...field} />
                      </FormControl>
                      <FormDescription>
                        Ejemplo : https://linktree-clone.com/linktree
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Botón para guardar los cambios */}
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}