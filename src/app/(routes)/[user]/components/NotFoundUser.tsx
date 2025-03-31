import { TreePalm } from "lucide-react";
import Link from "next/link";

export default function NotFoundUser() {
  return (
    <div className="h-screen flex flex-col justify-between items-center">

      <div className="mt-40 text-center items-center flex flex-col gap-5">
        <TreePalm className="w-16 h-16 text-green-400" />
        <p className="text-2xl">La pagina que estas buscando no existe</p>
        <p>
          ¿Quieres que este sea tu nombre de usuario? {" "}
          <Link href="/" className="underline">Crear tu perfil ahora</Link>
        </p>
      </div>
      <div className="inline-flex font-semibold pb-5 gap-2 items-center justify-center">
        Linktree-Clone <TreePalm className="w-4 h-4 text-green-400" />
      </div>

    </div>
  );
}