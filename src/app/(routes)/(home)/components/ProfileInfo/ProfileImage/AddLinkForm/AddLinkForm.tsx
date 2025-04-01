import { useState } from "react"
import { z } from "zod"
import axios from "axios"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { Loader2, Plus } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./AddLinkFor.form"
import { AddLinkFormProps } from "./AddLinkForm.types"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { linksSocialNetwork } from "@/data/linksSocialNetwork"
import { useUserInfo } from "@/hooks/useUser"

export default function AddLinkForm(props: AddLinkFormProps) {

  const { onReload } = props;
  const { showToast } = useToast();

  const { reloadUser } = useUserInfo();

  const [showDialog, setShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  {/* Configuración del formulario */ }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: "",
      name: "",
      link: "",
    },
  })

  {/* Función para crear un nuevo link */ }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    setIsLoading(true);

    try {
      await axios.post("/api/social-network", values)
      setShowDialog(false)
      reloadUser()
      onReload(true)
      showToast("Enlace creado con éxito", "success")
      form.reset()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data?.message || "Ocurrió un error al crear el enlace", "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("Ocurrió un error inesperado", "error");
      }
    } finally {
      setIsLoading(false)
      setShowDialog(false)
    }
  }

  return (
    <div className="mt-6">
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button className="w-full bg-indigo-600 text-white rounded-full py-5 text-lg hover:bg-indigo-800 cursor-pointer">
            <Plus className="h-7 w-7" />
            Añadir enlace
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir nuevo enlace</DialogTitle>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Selección de icono */}
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Selecciona un icono</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-4 gap-4">
                            {linksSocialNetwork.map((link) => (
                              <button
                                key={link.name}
                                type="button"
                                onClick={() => {
                                  field.onChange(link.icon)
                                  form.setValue("name", link.name)
                                  form.setValue("link", link.domain)
                                }}
                                className={`flex flex-col items-center justify-center border rounded-lg p-3 cursor-pointer shadow-sm transition 
                                  ${field.value === link.icon
                                    ? "border-indigo-500 ring-2 ring-blue-300"
                                    : "border-gray-300 hover:border-gray-500"
                                  }`}
                              >
                                <Image src={link.icon} alt={link.name} width={40} height={40} />
                                <span className="text-xs mt-2">{link.name}</span>
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Input para URL */}
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linktree-clone.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-800 rounded-full cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    ) : (
                      <span className="text-white">Guardar enlace</span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
