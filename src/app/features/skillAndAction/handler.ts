/* eslint-disable import/prefer-default-export */

import axios from "axios";
// import { SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ActionDeleteHndlerProps, ActionNameFormHandlerProps } from "./type";


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

export const actionDeleteHndler = async ({
  reachName,
  skillName,
  actionName,
  actionId,
  setActionList,
  // actionList
}: ActionDeleteHndlerProps) => {
  const result = confirm('アクションを削除します。\n振り返りも削除されますがいいですか？');
  if (result) {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/actionName/${actionName}`;
    await axios.delete(URL, {
      data: {
        reachName,
        skillName,
        actionName,
        actionId,
      }
    })
    setActionList((prev) => prev.filter((action) => action.name !== actionName))
  }
}

export const actionNameFormHandler = async ({ e,
  index,
  actionName,
  actionId,
  reachName,
  skillName,
  setActionList,
  setError
}: ActionNameFormHandlerProps
) => {
  e.preventDefault();
  setError(null);
  const form = new FormData(e.currentTarget);
  const editActionName = form.get(actionName);
  if (actionName !== editActionName && actionId) {
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
      const res = await axios.post(URL, editActionNameData);
      const data = await res.data;
      if (res.status === 200) {
        setActionList((prev) => {
          const currentActions = [...prev];
          currentActions[index] = { ...data };
          return [...currentActions];
        })
      }

      return true;
    } catch (error) {
      setError('アクション名の更新中にエラーが発生しました。');
      return false;
    }
  }
  return false;
}