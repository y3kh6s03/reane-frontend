/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent } from "react";
import { ActionCheckHander, ActionDeleteHndlerProps, ActionNameFormHandlerProps } from "../type";


interface DeleteHandlerProps {
  id: number,
  skillName: string,
  reachName: string,
  userEmail: string,
  router: AppRouterInstance
}

interface EditSkillNameData {
  id: number,
  userEmail: string,
  reachName: string,
  currentSkillName: string,
  editSkillName: FormDataEntryValue,
}
interface HandleSkillNameSubmitProps {
  e: FormEvent<HTMLFormElement>,
  id: number,
  userEmail: string
  reachName: string,
  skillName: string,


}

export const handleSkillNameDelete = async ({ id, reachName, skillName, userEmail, router }: DeleteHandlerProps) => {
  const result = confirm('スキルを削除しますか？\nスキルに登録されたアクションも一緒に削除されます。')
  if (result) {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/skill/${skillName}`;
    const deleteData = {
      id,
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

export const handleSkillNameSubmit = async ({ e, id, userEmail, reachName, skillName }: HandleSkillNameSubmitProps) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const editSkillName = form.get('skillName') ?? '';
  const currentSkillName = skillName;
  if (editSkillName !== currentSkillName) {
    const editSkillNameData: EditSkillNameData = {
      id,
      reachName,
      editSkillName,
      currentSkillName,
      userEmail
    };
    const encordSkillName = encodeURIComponent(currentSkillName)
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/skill/${encordSkillName}`;
    await axios.post(URL, editSkillNameData);
  }
}

export const handleActionDelete = async (
  {
    reachName,
    skillName,
    actionName,
    actionId,
    setActionList,
    // actionList
  }: ActionDeleteHndlerProps) => {
  const result = confirm('アクションを削除します。\n振り返りも削除されますがいいですか？');
  if (result) {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/skill/action/${actionName}`;
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

export const handleActionNameSubmit = async (
  { e,
    index,
    actionName,
    actionId,
    reachName,
    skillName,
    setActionList,
    setErrorMsg
  }: ActionNameFormHandlerProps
) => {
  e.preventDefault();
  setErrorMsg(null);
  const form = new FormData(e.currentTarget);
  const editActionName = form.get(actionName);
  if (actionName !== editActionName && actionId) {
    const encordActionId = encodeURIComponent(actionId);
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/skill/action/${encordActionId}`;
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
      setErrorMsg('アクション名の更新中にエラーが発生しました。');
      return false;
    }
  }
  return false;
}

export const handleToggleActionCompletion = async (
  {
    actionId,
    index,
    actionList,
    setActionList,
    setErrorMsg
  }: ActionCheckHander
) => {
  setErrorMsg(null);
  setActionList((prev) =>
    prev.map((action, i) =>
      i === index ? { ...action, isCompleted: action.isCompleted === 1 ? 0 : 1 } : action
    )
  )
  const actionCheckPayload = {
    actionId,
    isCompleted: actionList[index].isCompleted
  }
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/skill/action/${actionId}`

  try {
    await axios.patch(URL, actionCheckPayload);

  } catch (error) {
    setErrorMsg('サーバーで処理が失敗してしまいました。')
  }
}