import { LoaderCircle } from "lucide-react";

export default function LoaderProfile() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2">
      <LoaderCircle className="animate-spin h-10 w-10" />
      <p>Cargando...</p>
    </div>
  );
}