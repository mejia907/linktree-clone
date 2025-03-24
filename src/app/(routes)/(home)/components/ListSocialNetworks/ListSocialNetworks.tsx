import Image from "next/image"
import { ListSocialNetworksProps } from "./ListSocialNetworks.types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import EditSocialNetwork from "./EditSocialNetWork/EditSocialNetwork"
import DeleteSocialNetwork from "./DeleteSocialNetwork/DeleteSocialNetwork"

export default function ListSocialNetworks({ links, onReload }: ListSocialNetworksProps) {
  return (
    <div className="grid gap-4 mt-4 max-w-2xl mx-auto">
      {links.map((link) => (
        <div 
          key={link.id} 
          className="flex items-center justify-between bg-white text-gray-900 py-3 px-5 rounded-full shadow-md"
        >
          {/* Icono + Nombre + Link */}
          <div className="flex items-center gap-3">
            {link.icon && (
              <Image
                src={link.icon}
                alt={link.name || "Icon"}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{link.name}</span>
              <span className="text-xs text-slate-500 truncate max-w-[150px]">{link.link}</span>
            </div>
          </div>

          {/* Botones: Abrir enlace y Editar */}
          <div className="flex gap-2 items-center">
            <Button size="icon" variant="ghost" asChild>
              <Link href={link.link || "#"} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 text-gray-600 hover:text-gray-800" />
              </Link>
            </Button>
            <EditSocialNetwork link={link} onReload={onReload} />
            <DeleteSocialNetwork link={link} onReload={onReload} />
          </div>
        </div>
      ))}
    </div>
  )
}
