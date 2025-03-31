import Image from "next/image";
import { SocialLinksProps } from "./SocialLinks.types";
import { Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { socialLinks } from "./SocialLinks.data";

export default function SocialLinks(props: SocialLinksProps) {

  const { userName } = props

  const { showToast } = useToast();

  const copyClipboard = () => {
    const profileUrl = `${window.location.origin}/${userName}`
    navigator.clipboard.writeText(profileUrl || "").then(() => {
      showToast("Perfil copiado al portapapeles", "success");
    }).catch(() => {
      showToast("Error al copiar el perfil", "error");
    })
  };

  return (
    <div className="overflow-auto">
      <div className="flex gap-6 py-4">
        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={copyClipboard}>
          <div className="bg-neutral-200 relative flex h-10 w-10 items-center justify-center rounded-[320px]">
            <Link className="w-5 h-5 hover:scale-110 transition-all duration-300" />
          </div>
          <span className="text-xs font-semibold">Copiar perfil</span>
        </div>
        {
          socialLinks.map((link) => (
            <a key={link.id} href={`${link.link}/${userName}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 cursor-pointer">
              <Image src={link.icon} alt={link.text} width={40} height={40} className="hover:scale-110 transition-all duration-300" />
              <span className="text-xs font-semibold">{link.text}</span>
            </a>
          ))
        }
      </div>
    </div>
  );
}