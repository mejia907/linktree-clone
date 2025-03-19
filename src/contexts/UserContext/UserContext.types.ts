import { Link, User } from "@prisma/client";

export type UserContextType = {
  user: User | null
  links: Link[] | null
  isLoading: boolean
  reloadUser: () => void
}

export type UserProviderProps = {
  children: React.ReactNode
}