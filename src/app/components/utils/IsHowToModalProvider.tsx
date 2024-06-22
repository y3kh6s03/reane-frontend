"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";


interface IsHowToModalContextProps {
  isHowToModal: boolean;
  setIsHowToModal: Dispatch<SetStateAction<boolean>>;
}

const IsHowToContext = createContext<IsHowToModalContextProps | undefined>(undefined)

export default function IsHowToModalProvider({ children }: { children: ReactNode }) {
  const [isHowToModal, setIsHowToModal] = useState<boolean>(false);
  const value = useMemo(() => ({ isHowToModal, setIsHowToModal }), [isHowToModal, setIsHowToModal])
  return (
    <IsHowToContext.Provider value={value}>
      {children}
    </IsHowToContext.Provider>
  )
}

export const useIsHowToModal = () => {
  const context = useContext(IsHowToContext);
  if (!context) {
    throw new Error("useIsHowTModal must be used within an IsHowToModalProvider")
  }
  return context
}