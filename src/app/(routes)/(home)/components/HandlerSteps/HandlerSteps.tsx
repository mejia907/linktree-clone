import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HandlerStepProps } from "./HandlerStep.types";
import { useStepConfig } from "@/hooks/useStepConfig";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import StepOne from "../StepOne/StepOne";
import StepTwo from "../StepTwo/StepTwo";
import StepThree from "../StepThree/StepThree";
import StepFour from "../StepFour/StepFour";
import Summary from "../Summary/Summary";

export function HandlerSteps(props: HandlerStepProps) {
  const { onReload } = props;
  const [openDialog, setOpenDialog] = useState(true);
  const { totalStep, step, setStep, nextStep, prevStep } = useStepConfig();

  // Calcular el porcentaje de avance
  const progressValue = totalStep > 0 ? (step / totalStep) * 100 : 0;

  // cerrar dialog cuando se llega al ultimo paso
  useEffect(() => {
    if (step > totalStep) {
      onReload((prev) => !prev);
      setOpenDialog(false);
    }
  }, [step, totalStep]);

  return (
    <>
      {/* Modal para mostrar los pasos de configuración */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {step > 1 && step <= totalStep && (
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={prevStep}
                >
                  Anterior <ArrowLeft />
                </Button>
              )}
              <div className="mb-2 text-center">
                Paso {step} de {totalStep}
              </div>
              <Progress value={progressValue} className="w-full" />
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                {step === 1 && (
                  <StepOne />
                )}
                {step === 2 && (
                  <StepTwo />
                )}
                {step === 3 && (
                  <StepThree />
                )}
                {step === 4 && (
                  <StepFour />
                )}
                {step === 5 && (
                  <Summary />
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}