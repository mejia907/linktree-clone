"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LinkProfile() {
  const [isCopiedLink, setIsCopiedLink] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/linktreeclone`)
    setIsCopiedLink(true)
  }
  return (
    <div className="bg-indigo-100 rounded-3xl">
      <div className="flex flex-col justify-center items-center text-center py-4 px-4 gap-2 md:flex-row md:justify-between md:text-left">
        <span className="text-sm">
          <span>Tu linktree clone está activo: </span>
          {window.location.origin}@linktreeclone
        </span>
        <Button
          onClick={copyLink}
          variant="outline"
          className="cursor-pointer rounded-full px-4 bg-white font-semibold text-xs md:text-[16px]">
          {isCopiedLink ? "Copiado" : "Copiar tú enlace"}
        </Button>
      </div>
    </div>
  );
}