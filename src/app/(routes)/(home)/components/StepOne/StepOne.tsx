import { Button } from "@/components/ui/button";
import { dataCreator } from "./StepOne.data";
import { useStepConfig } from "@/hooks/useStepConfig";

export default function StepOne() {

  // Acceder al estado global
  const { infoUser, setInfoUser, nextStep } = useStepConfig()

  // Función para manejar cambios en los checkboxes del tipo de usuario
  const handleClick = (value: string) => {
    setInfoUser((prev) => ({ ...prev, typeUser: value }));
  }

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">
        Cuéntanos sobre ti
      </h2>
      <p className="text-center">Esto nos ayuda a persnalizar tu experiencia. </p>
      <div className="grid grid-cols-1 gap-2 mt-4">
        {
          dataCreator.map((item) => (
            <div key={item.value} className="flex items-center gap-2">
              <input
                id={item.value}
                type="radio"
                name="typeUser"
                value={item.value}
                className="peer"
                checked={infoUser?.typeUser === item.value}
                onChange={() => handleClick(item.value)}
              />
              <label htmlFor={item.value} className="cursor-pointer peer-checked:bg-indigo-600 peer-checked:text-white px-3 py-2 rounded-full">
                {item.title}
              </label>
            </div>
          ))
        }
      </div>
      <div className="mt-4">
        <Button
          className="w-full bg-indigo-600 cursor-pointer"
          onClick={nextStep}
          disabled={!infoUser?.typeUser}
        >
          <span className="text-white">Continuar</span>
        </Button>
      </div>
    </div>
  );
}