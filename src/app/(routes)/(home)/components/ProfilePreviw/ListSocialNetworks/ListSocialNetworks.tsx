import { useUserInfo } from "@/hooks/useUser";
import Image from "next/image";

export default function ListSocialNetworks() {

  const { links } = useUserInfo();

  if (!links) return null

  return (
    <>
      {/* Lista de redes sociales / logos */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        {links.map((link) => (
          <li
            key={link.id}
          >
            <a href={link.link || "#"} target="_blank" rel="noopener noreferrer">
              <Image
                src={link.icon || ""}
                alt={link.name || ""}
                width={30}
                height={30}
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}