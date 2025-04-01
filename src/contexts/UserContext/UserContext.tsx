import { createContext, useEffect, useState, useCallback } from "react"
import { UserContextType, UserProviderProps } from "./UserContext.types"
import { useUser } from "@clerk/nextjs"
import { Link, User } from "@prisma/client"

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  links: null,
  reloadUser: () => {},
})

export function UserProvider({ children }: UserProviderProps) {

  const { user } = useUser()

  const [infoUser, setInfoUser] = useState<User | null>(null)
  const [links, setLinks] = useState<Link[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchUserInfo = useCallback(async () => {
    if (!user) return

    try {
      setIsLoading(true);
      const response = await fetch("/api/info-user")
      const data = await response.json()
      setInfoUser(data)
      setLinks(data.links || [])
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user?.id) {
      fetchUserInfo();
    }
  }, [user?.id, fetchUserInfo])

  return (
    <UserContext.Provider value={{ user: infoUser, links, isLoading, reloadUser: fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}