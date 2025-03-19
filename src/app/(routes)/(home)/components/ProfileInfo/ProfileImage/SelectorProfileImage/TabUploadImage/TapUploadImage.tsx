import { useState } from "react"
import axios from "axios"
import { ChevronLeft, Loader2 } from "lucide-react"
import { TabUploadImageProps } from "./TapUploadImage.types"
import { UploadButton } from "@/lib/uploadthing"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useUserInfo } from "@/hooks/useUser"

export default function TabUploadImage(props: TabUploadImageProps) {

  const { setShowDialog, setShowTab } = props
  const { reloadUser } = useUserInfo()

  const [photo, setPhoto] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()

  const onUploadPhoto = async () => {

    if (!photo) {
      showToast("Selecciona una imagen", "error")
      return
    }

    setIsLoading(true)

    try {
      // Espera a que se actualice el avatar
      await axios.patch("/api/update-user", { avatarUrl: photo })

      setShowDialog(false)
      showToast("Imagen actualizada con éxito", "success")
      reloadUser()
    } catch (error) {
      // Si hay algún error en la actualización
      console.error("Error al actualizar la imagen:", error)
      showToast("Error al actualizar la imagen", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div
        className="flex gap-1 items-center text-sm cursor-pointer hover:bg-slate-50 p-1 w-fit rounded-lg"
        onClick={() => setShowTab(null)}>
        <ChevronLeft className="h-4 w-4" />
        Regresar
      </div>
      <div className="my-4">
        <UploadButton
          className="rounded-md text-slate-800 bg-slate-300 h-full w-full p-4"
          endpoint="profileImage"
          onClientUploadComplete={(res) => {
            setPhoto(res[0].url) // Aquí se obtiene la URL de la foto subida
            setIsLoading(false) 
          }}
          onUploadError={(error) => {
            console.log("Error al subir la imagen:", error)
            showToast("Error al subir la imagen", "error")
            setIsLoading(false) 
          }}
        />
      </div>
      <div>
        <Button
          className="w-full    cursor-pointer"
          disabled={isLoading} 
          onClick={onUploadPhoto}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            <span className="text-white">Guardar</span>
          )}
        </Button>
      </div>
    </div>
  )
}
