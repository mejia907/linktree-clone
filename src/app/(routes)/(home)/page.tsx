import { TreePalm } from "lucide-react";
import LinkProfile from "./components/LinkProfile/LinkProfile";
import { db } from "@/lib/db";

export default function HomePage() {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4 px-4">
     <div>
      <LinkProfile />

      <div>
        <p>Profile info</p>
      </div>

      <div className="mt-20 flex flex-col items-center">
        <div className="py-10 text-center justify-center flex flex-col items-center text-gray-400 font-semibold">
          <TreePalm className="h-20 w-20" strokeWidth={1} />
          <p>Muéstrale al mundo quién eres</p>
          <p>Añade un enlace para comenzar</p>
        </div>

      </div>

     </div>
     <div>
      <p>Profile preview</p>
     </div>
    </div>
  );
}
