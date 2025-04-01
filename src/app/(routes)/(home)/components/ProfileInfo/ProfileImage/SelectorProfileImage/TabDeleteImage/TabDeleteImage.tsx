import axios from "axios"
import { ChevronLeft, Trash2 } from "lucide-react"
import { TabDeleteImageProps } from "./TabDeleteImage.types"
import { useUserInfo } from "@/hooks/useUser"
import { useConfirm } from "@/hooks/use-confirm"
import { useToast } from "@/hooks/use-toast"

export default function TabDeleteImage(props: TabDeleteImageProps) {

  const { setShowDialog, setShowTab } = props
  const { reloadUser } = useUserInfo()
  const { showToast } = useToast()

  const { confirm, DialogComponent } = useConfirm();

  {/* Función para eliminar la imagen de perfil */ }
  const onDeleteImage = async () => {
    const confirmed = await confirm("¿Estás seguro de que quieres eliminar la imagen?");

    if (!confirmed) {
      return
    }

    try {
      await axios.patch("/api/update-user", { avatarUrl: "https://msckbtp4ac.ufs.sh/f/SWp3vLFhAmOpuuxQSjgIRJf60Wy4cv7DlVsrajz8Tk2wtEC1" })
      setShowDialog(false)
      showToast("Imagen eliminada con éxito", "success")
      reloadUser()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data?.message || "Ocurrió un error al eliminar", "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("Ocurrió un error inesperado", "error");
      }
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
      <div className="flex flex-col gap-2 mt-3">

        <div className="flex gap-2 justify-between items-center hover:bg-slate-100 p-2 rounded-lg cursor-pointer"
          onClick={() => onDeleteImage()}>
          <div className="flex gap-2">
            <div className="bg-red-50 rounded-lg p-2 h-fit">
              <Trash2 className="text-red-600" strokeWidth={1} />
            </div>
            <div className="">
              <span className="block font-semibold">Si, Eliminar</span>
              <span className="text-sm text-gray-600">Imagen perfil</span>
            </div>
          </div>
        </div>
      </div>
      {DialogComponent}
    </div>
  )
}