"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Link, User } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import LoaderProfile from "@/components/ui/shared/LoaderProfile/LoaderProfile";
import NotFoundUser from "./components/NotFoundUser";
import UserProfile from "./components/UserProfile/UserProfile";

export default function UserPage() {

  const params = useParams();
  const { user: username } = params

  const [reload, setReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [infoUser, setInfoUser] = useState<User & { links: Link[] } | null>(null)

  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!username) router.push('/')

      setIsLoading(true)

      try {
        const response = await fetch(`/api/info-user/${username}`)

        if (!response.ok) throw new Error('Error al obtener la información del usuario')

        const data = await response.json()

        setInfoUser(data)
      } catch (error: any) {
        showToast(error.response?.data?.message || 'Error al obtener la información del usuario', 'error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()
    if (reload) {
      fetchUserInfo()
      setReload(false)
    }
  }, [username, reload, router])

  if (isLoading) return <LoaderProfile />

  if (!infoUser) return <NotFoundUser />

  return (
    <UserProfile user={infoUser} />
  );
}