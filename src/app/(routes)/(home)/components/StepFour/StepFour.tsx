import { useState } from "react"
import axios from "axios"
import Image from "next/image"
import { dataStepFourImages } from "./StepFour.data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStepConfig } from "@/hooks/useStepConfig"
import { UploadButton } from "@/lib/uploadthing"
import { Loader2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StepFour() {

  const { infoUser, setInfoUser, nextStep } = useStepConfig()
  const { showToast } = useToast();

  const [name, setName] = useState(infoUser.name || "")
  const [userName, setUserName] = useState(infoUser.userName || "")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [showUploadAvatar, setShowUploadAvatar] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(infoUser.avatarUrl || "")

  const [isLoading, setIsLoading] = useState(false);

  console.log(infoUser.platforms);
  

  // Función para manejar la selección de una imagen de perfil
  const handleAvatarSelect = (src: string) => {
    setSelectedAvatar(src)
    setInfoUser((prev) => ({ ...prev, avatarUrl: src }))
  };

  // Función para continuar al siguiente paso
  const handleContinue = async () => {
    if (!name.trim() || !userName.trim()) {
      showToast('Todos los campos son obligatorios', 'error')
      return
    }

    if (!selectedAvatar) {
      showToast('Selecciona una imagen de perfil', 'error')
      return
    }

    setIsLoading(true);

    // Actualizar los datos en el estado
    setInfoUser((prev) => ({
      ...prev,
      name,
      userName,
    }))

    // Enviar los datos al servidor
    try {
      const response = await axios.post("/api/user", {
        name,
        userName,
        avatarUrl: selectedAvatar,
        links: infoUser.platforms,
        typeUser: infoUser.typeUser,
      });

      if (response.status === 200) {
        nextStep();
      }
    } catch (error: any) {
      showToast(error.response?.data?.message || "Ocurrió un error", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">Añadir detalles del perfil</h2>
      <p className="text-center">Selecciona una imagen de perfil</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-4 items-center">
        {dataStepFourImages.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer ${selectedAvatar === item.src ? "bg-violet-500" : "hover:bg-violet-300"
              }`}
            onClick={() => handleAvatarSelect(item.src)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={300}
              height={300}
              className="h-1/2 w-xl rounded-full"
            />
          </div>
        ))}
        {avatarUrl && (
          <div
            className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer ${selectedAvatar === avatarUrl ? "bg-violet-500" : "hover:bg-violet-300"
              }`}
            onClick={() => handleAvatarSelect(avatarUrl)}
          >
            <Image
              src={avatarUrl}
              alt="Avatar"
              width={300}
              height={300}
              className="h-1/2 w-xl rounded-full object-cover"
            />
          </div>
        )}
        {showUploadAvatar ? (
          <UploadButton
            className="rounded-md text-slate-800 bg-slate-200 h-full"
            endpoint="profileImage"
            onClientUploadComplete={(res) => {
              if (res) {
                setAvatarUrl(res[0].url);
                setSelectedAvatar(res[0].url);
                setShowUploadAvatar(false);
              }
            }}
            onUploadError={(error) => {
              showToast("Error al subir la imagen", "error");
            }}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center hover:bg-slate-100 h-full rounded-full cursor-pointer border"
            onClick={() => setShowUploadAvatar(!showUploadAvatar)}
          >
            <Plus className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg my-3 text-center">Adiciona tu nombre de usuario</h3>
        <div className="grid gap-4">
          <Input
            placeholder="Nombre completo"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Nombre de usuario"
            className="w-full"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          className="w-full bg-indigo-600 cursor-pointer"
          onClick={handleContinue}
          disabled={!name.trim() || !userName.trim() || !selectedAvatar || isLoading}
        >
           {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" /> 
          ) : (
            <span className="text-white">Continuar</span>
          )}
        </Button>
      </div>
    </div>
  )
}