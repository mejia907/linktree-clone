import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStepConfig } from "@/hooks/useStepConfig";
import Image from "next/image";

export default function StepThree() {

  {/* Acceder al estado global */}
  const { infoUser, setInfoUser, nextStep } = useStepConfig()

  {/* Función para validar la URL */}
  const isValidUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url)
  }

  {/* Función para manejar cambios en el enlace */}
  const handleInputChange = (index: number, value: string) => {
    const updatedPlatforms = [...infoUser.platforms];
    updatedPlatforms[index].link = value;

    {/* Validar la URL */}
    let error = "";
    if (value.trim() !== "" && !isValidUrl(value)) {
      error = "Ingresa una URL válida";
    }

    {/* Actualizar el error */}
    updatedPlatforms[index].error = error;

    setInfoUser((prev) => ({ ...prev, platforms: updatedPlatforms }));
  }

  // Función para continuar al siguiente paso
  const handleContinue = () => {
    const updatedPlatforms = infoUser.platforms.map((platform, index) => ({
      ...platform,
      link: platform.link || "",
    }))
    setInfoUser((prev) => ({ ...prev, platforms: updatedPlatforms }))
    nextStep()
  }

  {/* Verificar si todos los enlaces son válidos */}
  const allLinksValid = infoUser.platforms.every(
    (platform) =>
      platform.link.trim() !== "" && !platform.error
  )

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">Adiciona tus links</h2>
      <p className="text-center">Completa los campos para añadir tus links</p>

      {infoUser.platforms.map(({ icon, name, link, error }, index) => (
        <div key={name} className="flex items-center gap-2 mt-4">
          <div className="flex flex-col gap-2 items-center">
            <Image src={icon} alt={name} width={40} height={40} />
          </div>
          <div className="w-full">
            <Input
              type="url"
              id={`link-${name}`}
              name={`link-${name}`}
              value={link || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Link de ${name}`}
              className="w-full rounden-lg border p-2 text-sm"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
        </div>
      ))}

      <div className="mt-4">
        <Button
          className="w-full bg-indigo-600 cursor-pointer"
          onClick={handleContinue}
          disabled={!allLinksValid}
        >
          <span className="text-white">Continuar</span>
        </Button>
      </div>
    </div>
  );
}