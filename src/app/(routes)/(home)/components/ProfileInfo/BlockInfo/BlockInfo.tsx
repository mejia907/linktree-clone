import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUserInfo } from "@/hooks/useUser";
import FormNameAndUsername from "./FormNameAndUsername/FormNameAndUsername";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlockInfo() {

  const { user, isLoading } = useUserInfo()

  const [showDialog, setShowDialog] = useState(false)

  return (
    <div className="w-full flex flex-col gap-1 px-2">
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger className="text-left">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 bg-white" />
              <Skeleton className="h-4 w-32 bg-white" />
            </div>
          ) : (
            <>
              <span className="hover:underline cursor-pointer">{user?.username}</span>
              <span className="block text-sm text-gray-400 hover:underline cursor-pointer">{user?.bio ? "Editar biografía" : "Crear biografía"}</span>
            </>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nombre para mostrar, nombre de usuario y biografía</DialogTitle>
            <DialogDescription asChild>
              <FormNameAndUsername setShowDialog={setShowDialog} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}