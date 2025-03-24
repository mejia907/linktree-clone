import { Button } from "@/components/ui/button"
import { dataCreator } from "./StepOne.data"
import { useStepConfig } from "@/hooks/useStepConfig"

export default function StepOne() {

  // Acceder al estado global del usuario
  const { infoUser, setInfoUser, nextStep } = useStepConfig()

  // Función para manejar cambios en el radio de tipo de usuario
  const handleClick = (value: string) => {
    setInfoUser((prev) => ({ ...prev, typeUser: value }))
  };

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">Cuéntanos sobre ti</h2>
      <p className="text-center">Esto nos ayuda a personalizar tu experiencia.</p>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {dataCreator.map((item) => {
          const isSelected = infoUser?.typeUser === item.value;

          return (
            <label
              key={item.value}
              htmlFor={`radio-${item.value}`}
              className={`flex flex-col items-start gap-1 cursor-pointer p-3 rounded-lg transition-all duration-300 w-full border text-gray-800 
                ${isSelected ? " border-indigo-600 border-2" : "bg-white  border-gray-300"}
              `}
              onClick={() => handleClick(item.value)}
            >
              <input
                id={`radio-${item.value}`}
                type="radio"
                name="typeUser"
                value={item.value}
                className="hidden"
                checked={isSelected}
                readOnly // Evita advertencias en React
              />
              <span className="font-semibold">{item.title}</span>
              <p className="text-xs text-gray-600">{item.description}</p>
            </label>
          );
        })}
      </div>

      <div className="mt-4">
        <Button
          className="w-full bg-indigo-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-2 rounded-lg"
          onClick={nextStep}
          disabled={!infoUser?.typeUser}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
