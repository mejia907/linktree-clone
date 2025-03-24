import { Lock } from "lucide-react";
import ButtonsHeader from "./ButtonsHeader/ButtonsHeader";
import ButtonCopyProfile from "./ButtonCopyProfile/ButtonCopyProfile";
import PhonePreview from "./PhonePreview/PhonePreview";

export default function ProfilePreview() {
  return (
    <div className="border-l-[#e0e2d9] border-[1px] border-transparent px-2">
      {/* Botones de cabecera */}
      <ButtonsHeader />
      {/* Copiar perfil */}
      <ButtonCopyProfile />
      {/* Vista de celular */}
      <PhonePreview />
      {/* Ocultar logo */}
      <div className="flex items-center justify-center mt-20">
        <p className="flex gap-1 items-center font-semibold cursor-pointer">
          Ocultar logo de Linktree-Clone
        </p>
        <Lock className="w-4 h-4 ml-2" />
      </div>
    </div>
  );
}