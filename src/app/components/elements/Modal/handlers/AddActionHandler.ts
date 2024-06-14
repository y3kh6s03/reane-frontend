/* eslint-disable import/prefer-default-export */

import axios, { AxiosError } from "axios";
import { AddActionHandlerProps, AddActionNameDeleteHanderProps, AddActionSubmitHandlerProps, FormSubmitHandlerProps, ResponseData } from "../types";

export const formSubmitHandler = ({ e, setModalActions, setErrorMsg }: FormSubmitHandlerProps) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const addActionName = form.get('addActionName');
  if (typeof addActionName === 'string' && addActionName.trim() !== '') {
    setModalActions((prev) => {
      if (prev.some(action => action.name === addActionName)) {
        setErrorMsg('同じ名前のACTIONは登録できません')
        return prev;
      }
      setErrorMsg(null)
      return [...prev, { id: null, name: addActionName, isCompleted: 0 }]
    })
  };
  const inputField = e.currentTarget.querySelector('input[name="addActionName"]') as HTMLInputElement;
  if (inputField) {
    inputField.value = '';
  }
}

export const addActionHandler = ({ e, index, setModalActions }: AddActionHandlerProps) => {
  const actionName = e.target.value;
  setModalActions((prev) => {
    const currentAddActions = [...prev];
    currentAddActions[index] = { ...currentAddActions[index], name: actionName };
    return [...currentAddActions]
  })
}

export const addActionNameDeleteHander = async ({ index, id, userEmail, reachName, skillName, actionName, setModalActions, setErrorMsg, setActionList }: AddActionNameDeleteHanderProps) => {

  if (id !== null) {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/skill/action/id`;
    try {
      const res = await axios.delete(URL, {
        data: {
          userEmail,
          reachName,
          skillName,
          actionName,
          actionId: id
        }
      })
      if (res.status === 200) {
        setModalActions((prev) => {
          const currentAddActions = [...prev];
          currentAddActions.splice(index, 1);
          return [...currentAddActions];
        })
        setActionList((prev) => prev.filter(action => action.id !== id))
      }
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData>;
      if (axiosError.response) {
        setErrorMsg(`削除に失敗しました。: ${axiosError.response.data.message || '削除に失敗しました。サーバー処理でエラーが発生しました。'}`);
      } else if (axiosError.request) {
        setErrorMsg('サーバーからの応答がありません。');
      } else {
        setErrorMsg(`削除に失敗しました。: ${axiosError.message}`);
      }
    }

  } else {
    setModalActions((prev) => {
      const currentAddActions = [...prev];
      currentAddActions.splice(index, 1);
      return [...currentAddActions];
    })
  }
}

export const addActionSubmitHandler = async ({
  modalActions,
  actionList,
  setIsModal,
  userEmail,
  reachName,
  skillName,
  setErrorMsg,
  setActionList
}: AddActionSubmitHandlerProps) => {
  if (JSON.stringify(modalActions) === JSON.stringify(actionList)) {
    setIsModal((prev) => !prev)
    return;
  }
  const addActionPayload = {
    userEmail,
    reachName,
    skillName,
    modalActions,
  }
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/skill/action/put`;

  try {
    const res = await axios.put(URL, addActionPayload);
    const data = await res.data;
    if (res.status === 200) {
      setActionList([...data]);
      setIsModal((prev) => !prev);
      setErrorMsg(null);
    } else {
      setErrorMsg('サーバー処理でエラーが発生しました。')
    }
  } catch (error) {
    const axiosError = error as AxiosError<ResponseData>;
    if (axiosError.response) {
      setErrorMsg(`エラーが発生しました: ${axiosError.response.data.message || 'サーバー処理でエラーが発生しました。'}`);
    } else if (axiosError.request) {
      setErrorMsg('サーバーからの応答がありません。');
    } else {
      setErrorMsg(`エラーが発生しました: ${axiosError.message}`);
    }
  }
}