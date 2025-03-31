import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoreInfoProfileProps } from "./MoreInfoProfile.types";
import { Ellipsis, TreePalm } from "lucide-react";
import Image from "next/image";
import SocialLinks from "../SolcialLinks/SocialLinks";

export default function MoreInfoProfile(props: MoreInfoProfileProps) {

  const { user } = props

  return (
    <div className="max-w-lg w-full mx-auto flex items-end justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-400 p-2 rounded-full opacity-90 hover:opacity-70 cursor-pointer">
            <Ellipsis strokeWidth={1} className="text-white" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Compartir Perfil</DialogTitle>
            <div className="gap-4 py-4">
              <div className="flex p-4 rounded-lg bg-teal-700 text-white flex-col items-center justify-center">
                <Image
                  src={user.avatarUrl || "/avatar_default.png"}
                  alt="Avatar del usuario"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-white shadow-xl object-cover transition-all duration-300 group-hover:opacity-90"
                />
                <p className="font-semibold text-2xl">{user.name}</p>
                <div className="flex items-center gap-1 font-semibold">
                  <TreePalm className="w-4 h-4 text-white" />
                  {user.username}
                </div>
              </div>
              <SocialLinks userName={user.username} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}