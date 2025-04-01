import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useStepConfig } from "@/hooks/useStepConfig"
import { linksSocialNetwork } from "@/data/linksSocialNetwork"

export default function StepTwo() {

  {/* Acceder al estado global */}
  const { infoUser, setInfoUser, nextStep } = useStepConfig()

  {/* Estado para almacenar las plataformas seleccionadas */}
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(infoUser?.platforms.map(platform => platform.name) || []);

  {/* Función para manejar la selección de plataformas */}
  const handlePlatformSelection = (platformName: string) => {
    if (selectedPlatforms.includes(platformName)) {
      setSelectedPlatforms(selectedPlatforms.filter(platform => platform !== platformName))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformName])
    }
  }

  {/* Función para continuar al siguiente paso */}
  const handleContinue = () => {
    setInfoUser((prev) => ({
      ...prev,
      platforms: linksSocialNetwork.filter(platform => selectedPlatforms.includes(platform.name))
    }))
    nextStep()
  }

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">¿En qué plataformas estás?</h2>
      <p className="text-center">Selecciona en los que tu estes</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mt-4">
        {
          linksSocialNetwork.map(({ icon, name }) => (
            <div
              key={name}
              className={`flex flex-col gap-1 items-center rounded-lg py-3 hover:violet-300 transition-all duration-300 cursor-pointer ${selectedPlatforms.includes(name) ? "bg-violet-900 text-white" : "bg-slate-100 text-violet-900"}`}
              onClick={() => handlePlatformSelection(name)}
            >
              <Image src={icon} alt={name} width={40} height={40} />
              <p className="text-sm">{name}</p>
            </div>
          ))
        }
      </div>
      <div className="mt-4">
        <Button
          className="w-full bg-indigo-600 cursor-pointer"
          onClick={handleContinue}
          disabled={selectedPlatforms.length === 0}
        >
          <span className="text-white">Continuar</span>
        </Button>
      </div>
    </div>
  )
}