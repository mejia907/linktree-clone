import { useState } from "react"
import axios from "axios"
import Image from "next/image"
import { EditBackgroundProps } from "./EditBackground.types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUserInfo } from "@/hooks/useUser"
import { Ellipsis, ImagePlus } from "lucide-react"
import { UploadButton } from "@/lib/uploadthing"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export default function EditBackground({ onReload }: EditBackgroundProps) {
  const { reloadUser } = useUserInfo()
  const { showToast } = useToast()

  const [showDialog, setShowDialog] = useState(false)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  const onChangeBackground = async () => {
    if (!photoUrl) return

    try {
      await axios.patch("/api/update-user", {
        backgroundImage: photoUrl,
      });

      reloadUser();
      showToast("Imagen de fondo actualizada", "success")
      setPhotoUrl(null);
      setShowDialog(false);
      onReload(true);
    } catch (error: any) {
      showToast(error.response?.data?.message || "Error al actualizar la imagen", "error")
    }
  };

  return (
    <div>
      {/* Editar imagen de fondo */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer bg-gray-300 rounded-2xl hover:bg-gray-400">
              <Ellipsis className="w-5 h-5 text-gray-800" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild className="cursor-pointer">
              <AlertDialogTrigger className="flex gap-2 items-center">
                <ImagePlus className="h-4 w-4" />
                Editar imagen de fondo
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar Imagen de Fondo</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="my-4">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt="Vista previa de la imagen de fondo"
                width={300}
                height={300}
                className="rounded-md"
              />
            ) : (
              <UploadButton
                className="rounded-md text-slate-800 bg-slate-200 h-full py-10 w-full"
                endpoint="profileImage"
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    setPhotoUrl(res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  showToast("Error al subir la imagen", "error");
                }}
              />
            )}
          </div>
          <AlertDialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-indigo-600 cursor-pointer"
              disabled={!photoUrl}
              onClick={onChangeBackground}
            >
              Cambiar Fondo
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
