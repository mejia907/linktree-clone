import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUserInfo } from "@/hooks/useUser"
import { Pencil } from "lucide-react"
import SelectorProfileImagine from "./SelectorProfileImage/SelectorProfileImagine"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileImage() {
  const [showDialog, setShowDialog] = useState(false)
  const { user, isLoading } = useUserInfo()

  {/* Tamaño de las imagenes y botones en pixels */}
  const imageSize = 80 
  const editButtonSize = 24 

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <div className="relative cursor-pointer group">
          {isLoading || !user ? (
            <Skeleton 
              className="rounded-full border-4 border-white shadow-lg w-20 h-20"
              style={{ width: imageSize, height: imageSize }}
            />
          ) : (
            <>
              <div className="relative">
                <Image
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt="Avatar del usuario"
                  width={imageSize}
                  height={imageSize}
                  className="rounded-full border-4 border-white shadow-xl object-cover transition-all duration-300 group-hover:opacity-90"
                  priority
                />
                <div 
                  className="bg-white rounded-full flex items-center justify-center border absolute right-0 bottom-0 p-1.5 transition-all group-hover:bg-indigo-100 group-hover:border-indigo-300"
                  style={{ width: editButtonSize, height: editButtonSize }}
                >
                  <Pencil className="text-gray-400 w-3 h-3 group-hover:text-indigo-500" />
                </div>
              </div>
            </>
          )}
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isLoading ? (
              <Skeleton className="h-6 w-40 mx-auto" />
            ) : (
              "Actualizar imagen de perfil"
            )}
          </DialogTitle>
          <div className="py-4">
            {isLoading ? (
              <div className="flex justify-center">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            ) : (
              <SelectorProfileImagine setShowDialog={setShowDialog} />
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}