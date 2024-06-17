"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";


interface IsRegisterSkillModalContextProps {
  isRegisterSkillModal: boolean,
  setIsRegisterSkillModal: Dispatch<SetStateAction<boolean>>
}

const IsRegisterSkillModalContext = createContext<IsRegisterSkillModalContextProps | undefined>(undefined);

export default function IsRegisterSkillModalProvider({ children }: { children: ReactNode }) {
  const [isRegisterSkillModal, setIsRegisterSkillModal] = useState<boolean>(false);
  const value = useMemo(() => ({ isRegisterSkillModal, setIsRegisterSkillModal }), [isRegisterSkillModal, setIsRegisterSkillModal]);

  return (
    <IsRegisterSkillModalContext.Provider value={value}>
      {children}
    </IsRegisterSkillModalContext.Provider>
  )
}

export function useIsRegisterSkillModal() {
  const context = useContext(IsRegisterSkillModalContext);
  if (!context) {
    throw new Error("useIsEdit must be used within an IsEditProvider");
  }
  return context;
};