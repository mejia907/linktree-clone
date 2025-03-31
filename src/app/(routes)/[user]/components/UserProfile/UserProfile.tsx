import Image from "next/image";
import { UserProfileProps } from "./UserProfile.types";
import { TreePalm } from "lucide-react";
import MoreInfoProfile from "../MoreInfoProfile/MoreInfoProfile";

export default function UserProfile(props: UserProfileProps) {

  const { user } = props

  return (
    <div className="flex flex-col items-center justify-between gap-2 h-screen max-w-2xl mx-auto">

      {
        user?.backgroundImage ? (
          <Image src={user.backgroundImage}
            alt="Imagen de fondo del usuario"
            fill
            className="absolute top-0 left-0 w-full h-full"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200"></div>
        )
      }

      <div className="flex flex-col items-center gap-2 pt-32 w-full px-5 z-10">
        <MoreInfoProfile user={user} />

        <div>
          <Image src={user?.avatarUrl || "/avatar_default.png"}
            alt="Imagen de perfil del usuario"
            width={96}
            height={96}
            className="rounded-full aspect-square object-cover"
          />
        </div>

        <div className="text-center">
          <p className="font-semibold text-2xl">
            {user?.username}
          </p>
          {
            user?.bio && (
              <div className="my-2">
                <p className="text-center">{user?.bio}</p>
              </div>
            )}
        </div>

        <div className="flex gap-5 mt-5">
          {
            user?.links?.map((link) => (
              <a href={link.link || "#"} key={link.id} target="_blank">
                <Image
                  src={link.icon || ""}
                  alt={link.name || "Icono"}
                  width={35}
                  height={35}
                  className="hover:scale-110 transition-all duration-300"
                />
              </a>
            ))
          }
        </div>
      </div>
      <div className="pb-5 z-10">
        <div className="flex gap-2 items-center justify-center py-2 px-5 rounded-full bg-white shadow-lg">
          <TreePalm className="w-5 h-5" />
          <p className="font-semibold">Linktree-Clone</p>
        </div>
      </div>
    </div>
  );
}