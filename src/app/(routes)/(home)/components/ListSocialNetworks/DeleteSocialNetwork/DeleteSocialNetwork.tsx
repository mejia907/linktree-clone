import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { DeleteSocialNetworkProps } from "./DeleteSocialNetwork.types";
import { useUserInfo } from "@/hooks/useUser";

export default function DeleteSocialNetwork(props: DeleteSocialNetworkProps) {
  
  const { link, onReload } = props

 const { reloadUser } = useUserInfo()
  const { showToast } = useToast();

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  {/* Función para eliminar el link */}
  const onDelete = async () => {
    
    setLoading(true)

    try {
      await axios.delete(`/api/social-networks/${link.id}`);
      showToast("Enlace eliminado correctamente", "success");
      onReload(true);
      setShowDialog(false);
      reloadUser();
    } catch (error) {
      console.error("Error eliminando la red social:", error);
      showToast("Error al eliminar la red social", "error");
    } finally {
      setLoading(false);
      setShowDialog(false);
    }
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      {/* Botón para eliminar el link */}
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar esta enlace?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente este enlace de tu perfil.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* Botón para cancelar y confirmar la eliminación del link */}
        <AlertDialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowDialog(false)} disabled={loading} className="cursor-pointer">
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={loading} className="cursor-pointer">
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
