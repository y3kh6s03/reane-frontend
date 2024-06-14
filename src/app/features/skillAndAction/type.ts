import { Dispatch, FormEvent, SetStateAction } from "react";

export interface ActionProps {
  userEmail: string,
  reachName: string,
  skillName: string,
  actions: {
    id: number | null,
    name: string,
    isCompleted: number
  }[]
}

export interface SetActionList {
  value: SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>
}

export interface ActionNameFormHandlerProps {
  e: FormEvent<HTMLFormElement>,
  index: number,
  actionName: string,
  actionId: number | null,
  reachName: string,
  skillName: string,
  setActionList: Dispatch<SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>>,
  setError: (error: string | null) => void
}

export interface ActionDeleteHndlerProps {
  reachName: string,
  skillName: string,
  actionName: string,
  actionId: number | null
  setActionList: (value: SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>) => void,
  actionList: {
    id: number | null;
    name: string;
    isCompleted: number;
  }[]
}