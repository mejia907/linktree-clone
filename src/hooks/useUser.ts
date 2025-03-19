import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext/UserContext";

export const useUserInfo = () => useContext(UserContext)