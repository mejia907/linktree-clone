import { ReactNode } from "react";

export type StepConfigUserContextType = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  infoUser: InfoUserType
  setInfoUser: React.Dispatch<React.SetStateAction<InfoUserType>>
  totalStep: number
  nextStep: () => void
  prevStep: () => void
};

type InfoUserType = {
  typeUser: string
  name: string
  platforms: {
    icon: string
    name: string
    link: string
    error?: string
  }[]
  avatarUrl: string
  userName: string
}

export type StepConfigUserProviderProps = {
  children: ReactNode
}