import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUserInfo } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Palmtree } from "lucide-react";

export default function ButtonCopyProfile() {

  const { user } = useUserInfo()

  const [isCopyProfile, setIsCopyProfile] = useState(false)

  if (!user) return null

  const copyProfile = () => {
    const profileUrl = `${window.location.origin}/@${user.username}`
    navigator.clipboard.writeText(profileUrl)
    setIsCopyProfile(true)
    setTimeout(() => setIsCopyProfile(false), 2000)
  }

  return (
    <>
      {/* Copiar perfil */}
      <div className="pl-6 mt-6">
        <div
          className="border py-2 rounded-full flex items-center justify-between"
          onClick={copyProfile}
        >
          <span className="pl-4 flex items-center">
            <Palmtree strokeWidth={1} className="w-4 h-4 mr-2" /> {window.location.origin}/<span className="font-semibold">{user.username} </span>
          </span>
          <div className="flex items-center gap-2 pr-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 py-1 px-2 rounded-full font-semibold">
              {isCopyProfile ? "Copiado" : "Copiar"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}