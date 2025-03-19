import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUserInfo } from "@/hooks/useUser";
import { Pencil } from "lucide-react";
import SelectorProfileImagine from "./SelectorProfileImage/SelectorProfileImagine";

export default function ProfileImage() {

  const [showDialog, setShowDialog] = useState(false);

  const { user } = useUserInfo()

  if (!user) return null

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger className="text-left">
        <div className="relative">
          <Image
            src={user.avatarUrl || "/default-avatar.png"}
            alt="Avatar"
            width={64}
            height={64}
            className="rounded-full border-4 border-white shadow-xl object-cover"
          />
          <div className="bg-white rounded-full flex items-center justify-center border  absolute right-[-5px] bottom-[-10px] p-1.5">
            <Pencil className="text-slate-300 w-4 h-4" />

          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nombre para mostrar y biografía</DialogTitle>
          <DialogDescription asChild>
            <SelectorProfileImagine setShowDialog={setShowDialog} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  );
}