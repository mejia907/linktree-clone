import { toast } from "sonner";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type ToastType = "success" | "warning" | "error";

export const useToast = () => {
  const showToast = (message: string, type: ToastType = "success") => {
    const config = {
      success: {
        icon: <CheckCircle className="text-white w-5 h-5" />,
        style: { backgroundColor: "#22c55e", color: "white", fontWeight: "bold", borderRadius: "0.5rem" },
      },
      warning: {
        icon: <AlertTriangle className="text-white  w-5 h-5" />,
        style: { backgroundColor: "#facc15", color: "black", fontWeight: "bold", borderRadius: "0.5rem" },
      },
      error: {
        icon: <XCircle className="text-white w-5 h-5" />,
        style: { backgroundColor: "#ef4444", color: "white", fontWeight: "bold", borderRadius: "0.5rem" },
      },
    };

    toast(message, {
      icon: config[type].icon,
      style: config[type].style,
      duration: 3000,
    });
  };

  return { showToast };
};
