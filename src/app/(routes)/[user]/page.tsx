"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
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
        const { data } = await axios.get(`/api/info-user/${username}`);
        setInfoUser(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          showToast(error.response?.data?.message || "Ocurrió un error al obtener la información", "error");
        } else if (error instanceof Error) {
          showToast(error.message, "error");
        } else {
          showToast("Ocurrió un error inesperado", "error");
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()
    if (reload && username) {
      fetchUserInfo()
      setReload(false)
    }
  }, [username, reload, router, showToast])

  if (isLoading) return <LoaderProfile />

  if (!infoUser) return <NotFoundUser />

  return (
    <UserProfile user={infoUser} />
  );
}