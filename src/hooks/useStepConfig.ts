import { useContext } from "react";
import { StepConfigUserContext } from "@/contexts/StepConfigUser/StepConfigUser";

export const  useStepConfig = () => useContext(StepConfigUserContext)