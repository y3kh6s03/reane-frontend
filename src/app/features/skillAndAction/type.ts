import { Dispatch, FormEvent, SetStateAction } from "react";
import { Action } from "../../../store/slice/AuthChartsSlice";

export interface ActionProps {
  userEmail: string,
  id: number,
  reachName: string,
  skillName: string,
  actions: Action[]
}

export interface SetActionList {
  value: SetStateAction<{
    id: number | undefined;
    name: string;
    is_completed: number;
  }[]>
}

export interface ActionNameFormHandlerProps {
  e: FormEvent<HTMLFormElement>,
  index: number,
  actionName: string,
  actionId: number | undefined,
  reachName: string,
  skillName: string,
  setActionList: Dispatch<SetStateAction<Action[]>>,
  setErrorMsg: (error: string | null) => void
}

export interface ActionDeleteHndlerProps {
  reachName: string,
  skillName: string,
  actionName: string,
  actionId: number | undefined
  actionList: Action[]
  setActionList: (value: SetStateAction<Action[]>) => void,
}

export interface ActionCheckHander {
  actionId: number | undefined,
  index: number,
  actionList: Action[],
  setActionList: (value: SetStateAction<Action[]>) => void,
  setErrorMsg: (error: string | null) => void
}