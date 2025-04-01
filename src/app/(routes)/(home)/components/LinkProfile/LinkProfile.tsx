"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/useUser";

export default function LinkProfile() {
  
  const { user } = useUserInfo()

  const [isCopiedLink, setIsCopiedLink] = useState(false)

  {/* Copiar enlace de perfil */}
  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`)
    setIsCopiedLink(true)
  }
  return (
    <>
      {/* Enlace de perfil */}
      <div className="bg-indigo-100 rounded-3xl mt-2">
        <div className="flex flex-col justify-center items-center text-center py-4 px-4 gap-2 md:flex-row md:justify-between md:text-left">
          <span className="text-sm">
            <span className="font-semibold">🔥 Tu linktree-Clone está activo: </span>
            {window.location.origin}/{user?.username}
          </span>
          <Button
            onClick={copyLink}
            variant="outline"
            className="cursor-pointer rounded-full px-4 bg-white font-semibold text-xs md:text-[16px]">
            {isCopiedLink ? "Copiado" : "Copiar tú enlace"}
          </Button>
        </div>
      </div>
    </>
  )
}