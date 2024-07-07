/* eslint-disable import/prefer-default-export */
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { CreateAddAction, deleteCreateActionName, editCreateSkillName } from "@/../store/slice/CreateChartSlice";
import { AppDispatch } from "@/../store/store";

export const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, setInputAction: Dispatch<SetStateAction<string>>) => {
  setInputAction(e.target.value);
}

export const onBlurHandler = (inputAction: string, setAddModalActions: Dispatch<SetStateAction<CreateAddAction[]>>, setInputAction: Dispatch<SetStateAction<string>>) => {
  if (inputAction !== '') {
    const addAction = { id: new Date().getTime(), name: inputAction }
    setAddModalActions((prev: CreateAddAction[]) => [...prev, addAction]);
    setInputAction('');
  }
}

export const onSubmitHandler = (e: FormEvent<HTMLFormElement>, inputAction: string, setAddModalActions: Dispatch<SetStateAction<CreateAddAction[]>>, setInputAction: Dispatch<SetStateAction<string>>) => {
  e.preventDefault();
  onBlurHandler(inputAction, setAddModalActions, setInputAction);
}

export const handleInputEdit = (setAddModalActions: Dispatch<SetStateAction<CreateAddAction[]>>, name: string, id: number) => {
  setAddModalActions((prevActions) => {
    const newAddActions = prevActions.map((action) => {
      if (action.id === id) {
        // eslint-disable-next-line no-param-reassign
        action.name = name;
      }
      return action;
    })
    return newAddActions;
  })
}

export const editSkillNameHandler = (e: ChangeEvent<HTMLInputElement>, setEditSkillName: Dispatch<SetStateAction<string>>) => {
  setEditSkillName(e.target.value)
}

export const onBlurEditSkillNameHandler = (skillName: string, reduxDispatch: AppDispatch, newSkillName: string) => {
  reduxDispatch(editCreateSkillName({ currentSkillName: skillName, newSkillName }));
}

export const editActionDeleteHandler = (index: number, editActionNames: string[], setEditActionNames: Dispatch<SetStateAction<string[]>>, reduxDispatch: AppDispatch, skillName: string) => {
  const newEditActionNames = [...editActionNames];
  newEditActionNames.splice(index, 1);
  setEditActionNames(newEditActionNames);
  reduxDispatch(deleteCreateActionName({ skillName, index }))
}

export const addActionDeleteHandler = (index: number, addModalActions: CreateAddAction[], setAddModalActions: Dispatch<SetStateAction<CreateAddAction[]>>) => {
  const newAddModalActions = [...addModalActions];
  newAddModalActions.splice(index, 1);
  setAddModalActions(newAddModalActions);
}