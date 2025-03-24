import { Button } from "@/components/ui/button";
import Confetti from "@/components/ui/shared/Confetti/Confetti";
import { useStepConfig } from "@/hooks/useStepConfig";
import Image from "next/image";

export default function Summary() {

  const { infoUser, nextStep } = useStepConfig()
  const { avatarUrl, name, userName, typeUser, platforms } = infoUser

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">
        Tu linktree-Clone esta listo
      </h2>
      <p className="text-center">Es hora de compartir con el mundo.</p>

      <div className="relative">
        {/* Avatar */}
        <div className="flex justify-center mt-4">
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-xl object-cover"
          />
        </div>
        <div>
          {/* Información del perfil */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-500">{userName}</p>
            <p className="text-gray-400">{typeUser}</p>
            <div className="space-y-3 mt-4">
              {
                platforms.map((platform, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Image
                      src={platform.icon}
                      alt={platform.name}
                      width={40}
                      height={40}
                    />
                    <p className="text-gray-700 text-sm font-medium">
                      {platform.name}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
          {/* Confetti al finalizar el formulario */}
          <Confetti />
          <div className="mt-4">
            <Button 
              className="w-full bg-indigo-600 cursor-pointer"
              onClick={() => nextStep()}
            >
              Ir al perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}