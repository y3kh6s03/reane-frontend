/* eslint-disable import/prefer-default-export */

import axios from "axios";
import { FormEvent, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ActionDeleteProps } from "./type";


interface DeleteHandlerProps {
  skillName: string,
  reachName: string,
  userEmail: string,
  router: AppRouterInstance
}

export const deleteHandler = async ({ reachName, skillName, userEmail, router }: DeleteHandlerProps) => {
  const result = confirm('スキルを削除しますか？\nスキルに登録されたアクションも一緒に削除されます。')
  if (result) {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/skillName/${skillName}`;
    const deleteData = {
      reachName,
      skillName,
      userEmail
    }
    const res = await axios.delete(URL, {
      data: deleteData
    })
    if (res.status === 200) {
      router.push('/myChart');
    }
  }
}

export const actionDeleteHndler = async (
  actionDeleteProps: ActionDeleteProps,
  setActionList: (value: SetStateAction<{
    id: number;
    name: string;
    isCompleted: number;
  }[]>) => void,
  actionList: {
    id: number;
    name: string;
    isCompleted: number;
  }[]
) => {
  const result = confirm('アクションを削除します。\n振り返りも削除されますがいいですか？');
  if (result) {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/actionName/${actionDeleteProps.actionName}`;
    await axios.delete(URL, {
      data: {
        reachName: actionDeleteProps.reachName,
        skillName: actionDeleteProps.skillName,
        actionName: actionDeleteProps.actionName,
        actionId: actionDeleteProps.actionId
      }
    })
  }
  setActionList(actionList.filter(action => action.id !== actionDeleteProps.actionId));
}

export const actionNameSubmitHandler = async (
  e: FormEvent<HTMLFormElement>,
  actionName: string,
  actionId: number,
  reachName: string,
  skillName: string,
  setError: (error: string | null) => void
) => {
  e.preventDefault();
  setError(null); // エラーメッセージをリセット
  const form = new FormData(e.currentTarget);
  const editActionName = form.get(actionName);
  if (actionName !== editActionName) {
    const encordActionId = encodeURIComponent(actionId);
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/actionName/${encordActionId}`;
    const editActionNameData = {
      reachName,
      skillName,
      actionId,
      actionName,
      editActionName
    }
    try {
      await axios.post(URL, editActionNameData);
    } catch (error) {
      setError('アクション名の更新中にエラーが発生しました。');
    }
  }
}