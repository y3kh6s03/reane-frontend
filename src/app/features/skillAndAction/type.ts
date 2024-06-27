import { Dispatch, FormEvent, SetStateAction } from "react";

export interface ActionProps {
  userEmail: string,
  id: number,
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
  setErrorMsg: (error: string | null) => void
}

export interface ActionDeleteHndlerProps {
  reachName: string,
  skillName: string,
  actionName: string,
  actionId: number | null
  actionList: {
    id: number | null;
    name: string;
    isCompleted: number;
  }[]
  setActionList: (value: SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>) => void,
}

export interface ActionCheckHander {
  actionId: number | null,
  index: number,
  actionList: {
    id: number | null;
    name: string;
    isCompleted: number;
  }[],
  setActionList: (value: SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>) => void,
  setErrorMsg: (error: string | null) => void
}