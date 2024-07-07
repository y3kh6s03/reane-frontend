import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { CreateAddAction, CreateSkills } from "@/../store/slice/CreateChartSlice";
import { Action, SkillData } from "../../../../store/slice/AuthChartsSlice";

export interface ActionInputProps {
  actionData: {
    setIsActionModal: Dispatch<SetStateAction<boolean>>,
    skillName: string,
    addModalActions: CreateAddAction[],
    setAddModalActions: Dispatch<SetStateAction<CreateAddAction[]>>,
    inputAction: string,
    setInputAction: Dispatch<SetStateAction<string>>,
    addedActions?: SkillData | CreateSkills,
    editSkillName: string,
    setEditSkillName: Dispatch<SetStateAction<string>>,
    editActionNames: string[],
    setEditActionNames: Dispatch<SetStateAction<string[]>>,
  }
};

export interface AddActions {
  id: number | undefined;
  name: string;
  is_completed: number;
}

export interface ModalActionProps {
  userEmail: string,
  setIsModal: Dispatch<SetStateAction<boolean>>,
  reachName: string,
  skillName: string,
  actionList: Action[],
  setActionList: Dispatch<SetStateAction<Action[]>>,
  modalActions: Action[],
  setModalActions: Dispatch<SetStateAction<Action[]>>,
}


export interface FormSubmitHandlerProps {
  e: FormEvent<HTMLFormElement>,
  setModalActions: Dispatch<SetStateAction<Action[]>>,
  setErrorMsg: (value: SetStateAction<string | null>) => void,
}

export interface ResponseData {
  message?: string
}

export interface AddActionHandlerProps {
  e: ChangeEvent<HTMLInputElement>,
  index: number,
  setModalActions: Dispatch<SetStateAction<Action[]>>,
}

export interface AddActionSubmitHandlerProps {
  modalActions: Action[],
  actionList: Action[],
  setIsModal: (value: SetStateAction<boolean>) => void,
  userEmail: string,
  reachName: string,
  skillName: string,
  setErrorMsg: (value: SetStateAction<string | null>) => void,
  setActionList: Dispatch<SetStateAction<Action[]>>
}

export interface AddActionNameDeleteHanderProps {
  index: number,
  id: number | undefined,
  userEmail: string,
  reachName: string,
  skillName: string,
  actionName: string,
  setModalActions: Dispatch<SetStateAction<Action[]>>,
  setErrorMsg: (value: SetStateAction<string | null>) => void,
  setActionList: Dispatch<SetStateAction<Action[]>>
}