import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolveFn, setResolveFn] = useState<((result: boolean) => void) | null>(null);
  const [message, setMessage] = useState<string>(''); 

  const confirm = (message: string): Promise<boolean> => {
    setMessage(message);  // Asignar el mensaje cuando se llame
    setIsOpen(true);
    
    return new Promise<boolean>((resolve) => {
      setResolveFn(() => resolve); // Guarda la función resolve
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    resolveFn?.(true); // Resuelve la promesa con 'true' cuando se confirma
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolveFn?.(false); // Resuelve la promesa con 'false' cuando se cancela
  };

  return {
    confirm,
    DialogComponent: (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmación</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>{message}</p> {/* Usar el estado message */}
          </div>
          <DialogFooter>
            <Button onClick={handleCancel} variant="outline" className="mr-2 cursor-pointer">
              Cancelar
            </Button>
            <Button onClick={handleConfirm} className="bg-indigo-600 cursor-pointer">
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  };
};
