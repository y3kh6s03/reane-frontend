/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { deleteChart } from "../../../../store/slice/AuthChartsSlice";
import { AppDispatch } from "../../../../store/store";

export interface ReachData {
  id: number | undefined,
  name: string | undefined,
  userEmail: string | undefined,
  userName: string | undefined,
  userImage: string | undefined
}

interface HandleReachNameSubmitProps {
  e: FormEvent<HTMLFormElement>,
  reachData: ReachData,
  setReachName: Dispatch<SetStateAction<string>>,
  setErrorMsg: Dispatch<SetStateAction<string | null>>
}

interface HandleReachDeleteSubmitProps {
  id: number,
  userEmail: string,
  dispatch: AppDispatch,
  setErrorMsg: Dispatch<SetStateAction<string | null>>
}

export const handleReachNameSubmit = async ({ e, reachData, setReachName, setErrorMsg }: HandleReachNameSubmitProps) => {
  e.preventDefault();
  setErrorMsg('');
  const form = new FormData(e.currentTarget);
  const editReachName = form.get('reachName');
  if (editReachName !== reachData.name) {
    const editReachNamePayload = {
      id: reachData.id,
      editReachName,
      userEmail: reachData.userEmail,
    }
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/${reachData.id}`;
    try {
      const res = await axios.patch(URL, editReachNamePayload);
      const data = await res.data;
      setReachName(data.reach.name);
    } catch (error) {
      setErrorMsg('Reachの変更に失敗しました。ï');
    }
  }
}

export const handleReachDeleteSubmit = async ({ id, userEmail, dispatch, setErrorMsg }: HandleReachDeleteSubmitProps) => {
  const result = confirm('チャートを削除しますか？登録されているSkill, Action, 振り返りすべてが削除されます。');
  if (result) {
    const finalResult = confirm('こちらのチャートを本当に削除します。');
    setErrorMsg('');
    if (finalResult) {
      try {
        const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/${id}`;
        const reachDeletePayload = {
          id,
          userEmail
        }
        const res = await axios.delete(URL, { data: reachDeletePayload });
        if (res.status === 200) {
          dispatch(deleteChart(id));
        }
      } catch (error) {
        setErrorMsg(`チャートの削除に失敗しました。`)
      }
    }
  }
}