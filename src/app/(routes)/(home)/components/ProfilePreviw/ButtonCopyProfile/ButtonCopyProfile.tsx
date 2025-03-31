import { useState } from "react"
import { useUserInfo } from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
import { Palmtree, Check } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ButtonCopyProfile() {

  const { user, isLoading } = useUserInfo();

  const [isCopyProfile, setIsCopyProfile] = useState(false);

  {/* Función para copiar el perfil */}
  const copyProfile = () => {
    if (!user) return;
    const profileUrl = `${window.location.origin}/${user.username}`
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        setIsCopyProfile(true);
        setTimeout(() => setIsCopyProfile(false), 2000);
      })
      .catch(() => {
        setIsCopyProfile(false);
      })
  }

  return (
    <div className="pl-6 mt-6">
      {isLoading ? (
        <div className="border py-2 rounded-full flex items-center justify-between">
          <div className="pl-4 flex items-center w-full">
            <Skeleton className="w-4 h-4 mr-2 bg-white/70" />
            <Skeleton className="h-4 w-48 bg-white/70" />
          </div>
          <div className="pr-4">
            <Skeleton className="h-8 w-20 rounded-full bg-white/70" />
          </div>
        </div>
      ) : user ? (
        <div
          className="border py-2 rounded-full flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={copyProfile}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && copyProfile()}
        >
          <span className="pl-4 flex items-center text-sm">
            <Palmtree strokeWidth={1} className="w-4 h-4 mr-2 text-gray-500" /> 
            {window.location.origin}/<span className="font-semibold">{user.username}</span>
          </span>
          <div className="flex items-center gap-2 pr-4">
            <Button 
              className={`py-1 px-4 rounded-full font-medium cursor-pointer transition-all ${
                isCopyProfile 
                  ? "bg-green-500 hover:bg-green-600" 
                  : "bg-indigo-600 hover:bg-indigo-800"
              }`}
              size="sm"
            >
              {isCopyProfile ? (
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4" /> Copiado
                </span>
              ) : "Copiar"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}