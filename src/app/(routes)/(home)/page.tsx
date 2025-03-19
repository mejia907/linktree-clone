"use client"

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { TreePalm } from "lucide-react";
import LinkProfile from "./components/LinkProfile/LinkProfile";
import { Link, User } from "@prisma/client";
import LoaderProfile from "@/components/ui/shared/LoaderProfile/LoaderProfile";
import { StepConfigUserProvider } from "@/contexts/StepConfigUser/StepConfigUser";
import { HandlerSteps } from "./components/HandlerSteps/HandlerSteps";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import { UserProvider } from "@/contexts/UserContext/UserContext";

export default function HomePage() {

  const { user } = useUser()

  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [reload, setReload] = useState(false)
  const [infoUser, setInfoUser] = useState<User & { links: Link[] } | null>(null)

  useEffect(() => {
    const checkFirstVisit = async () => {
      const response = await fetch("/api/info-user");
      const data = await response.json();

      setInfoUser(data);
      setIsFirstVisit(data.firstLogin);
    }
    checkFirstVisit()
    if (reload) {
      checkFirstVisit()
      setReload(false)
    }
  }, [user?.id, reload, user])

  if (!user || !infoUser) {
    return <LoaderProfile />
  }

  if (isFirstVisit) {
    return (
      <StepConfigUserProvider>
        <HandlerSteps onReload={setReload} />
      </StepConfigUserProvider>
    );
  }

  return (
    <UserProvider>
      <div className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4 px-4">
        <div>
          <LinkProfile />

          <ProfileInfo onReload={setReload} />

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
    </UserProvider>
  )
}
