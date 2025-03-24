import { useUserInfo } from "@/hooks/useUser";
import Link from "next/link";

export default function LinkSocialNetworks() {
    const { links } = useUserInfo();
  return (
    <>
    {/* Lista de redes sociales / Cards */}
    {links?.map((link, index) => (
      <Link
        key={index}
        href={link.link || "#"}
        target="_blank"
        className="w-full bg-white text-gray-900 text-center py-2 rounded-full font-semibold hover:bg-gray-100 transition"
      >
        {link.name}
      </Link>
    ))}
    </>
  )
}