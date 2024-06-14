import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { AddAction, CreateSkillData } from "../../../../store/slice/CreateChartSlice";
import { SkillData } from "../../../../store/slice/AuthChartsSlice";

export interface ActionInputProps {
  actionData: {
    setIsActionModal: Dispatch<SetStateAction<boolean>>,
    skillName: string,
    // setSkillName: Dispatch<SetStateAction<string>>
    addModalActions: AddAction[],
    setAddModalActions: Dispatch<SetStateAction<AddAction[]>>,
    inputAction: string,
    setInputAction: Dispatch<SetStateAction<string>>,
    addedActions?: SkillData | CreateSkillData,
    editSkillName: string,
    setEditSkillName: Dispatch<SetStateAction<string>>,
    editActionNames: string[],
    setEditActionNames: Dispatch<SetStateAction<string[]>>,
  }
};

export interface AddActions {
  id: number | null;
  name: string;
  isCompleted: number;
}

export interface ModalActionProps {
  userEmail: string,
  setModal: Dispatch<SetStateAction<boolean>>,
  reachName: string,
  skillName: string,
  actionList: AddActions[],
  setActionList: Dispatch<SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>>,
  modalActions: AddActions[],
  setModalActions: Dispatch<SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>>,
}


export interface FormSubmitHandlerProps {
  e: FormEvent<HTMLFormElement>,
  setModalActions: Dispatch<SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>>,
  setErrorMsg: (value: SetStateAction<string | null>) => void,
}

export interface ResponseData {
  message?: string
}

export interface AddActionHandlerProps {
  e: ChangeEvent<HTMLInputElement>,
  index: number,
  setModalActions: Dispatch<SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>>,
}

export interface AddActionSubmitHandlerProps {
  modalActions: AddActions[],
  actionList: AddActions[],
  setModal: (value: SetStateAction<boolean>) => void,
  userEmail: string,
  reachName: string,
  skillName: string,
  setErrorMsg: (value: SetStateAction<string | null>) => void,
  setActionList: Dispatch<SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>>
}

export interface AddActionNameDeleteHanderProps {
  index: number,
  id: number | null,
  userEmail: string,
  reachName: string,
  skillName: string,
  actionName: string,
  setModalActions: Dispatch<SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>>,
  setErrorMsg: (value: SetStateAction<string | null>) => void,
  setActionList: Dispatch<SetStateAction<{
    id: number | null;
    name: string;
    isCompleted: number;
  }[]>>
}