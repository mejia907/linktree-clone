import Image from "next/image"
import { Palmtree } from "lucide-react";
import ListSocialNetworks from "../ListSocialNetworks/ListSocialNetworks"
import LinkSocialNetworks from "../LinkSocialNetworks/LinkSocialNetworks"
import { useUserInfo } from "@/hooks/useUser"
import { Skeleton } from "@/components/ui/skeleton";

export default function PhonePreview() {

  const { user, isLoading } = useUserInfo();

  return (
    <div className="my-5 flex justify-center">
      <div className="relative border-white border-[5px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden bg-white">

        {/* Imagen de fondo */}
        {isLoading ? (
          <Skeleton className="absolute inset-0 bg-gray-300 z-0" />
        ) : user?.backgroundImage ? (
          <>
            <Image
              src={user.backgroundImage}
              alt="Imagen de fondo del usuario"
              fill
              className="absolute inset-0 object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/30 z-0"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-200 z-0"></div>
        )}

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center p-6 w-full h-full">
          {/* Avatar */}
          {isLoading ? (
            <Skeleton className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
          ) : (
            <Image
              src={user?.avatarUrl || "/default-avatar.png"}
              alt="Avatar del usuario"
              width={80}
              height={80}
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
          )}

          {/* Nombre */}
          {isLoading ? (
            <Skeleton className="h-6 w-40 mt-3 bg-white/50" />
          ) : (
            <p className="font-semibold text-lg mt-3 text-white">{user?.name || "Usuario Anónimo"}</p>
          )}

          {/* Biografía */}
          {isLoading ? (
            <Skeleton className="h-4 w-48 mt-2 bg-white/50" />
          ) : user?.bio && (
            <p className="text-sm text-white mt-2 text-center px-4">
              {user.bio}
            </p>
          )}

          {/* Redes sociales */}
          <div className="mt-3 flex justify-center">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg bg-white/50" />
              ))
            ) : (
              <ListSocialNetworks />
            )}
          </div>

          {/* Lista de enlaces */}
          <div className="flex flex-col w-full mt-4 space-y-3">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg bg-white/50" />
              ))
            ) : (
              <LinkSocialNetworks />
            )}
          </div>

          <div className="absolute bottom-2 text-xs text-center w-full text-white">
            {isLoading ? (
              <Skeleton className="h-4 w-24 inline-block bg-white/50" />
            ) : (
              <>
                Linktree-Clone <Palmtree className="w-3 h-3 inline" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
