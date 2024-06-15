/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { Dispatch, FormEvent, SetStateAction } from "react";

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
  setReachName: Dispatch<SetStateAction<string>>
}

export const handleReachNameSubmit = async ({ e, reachData, setReachName }: HandleReachNameSubmitProps) => {
  e.preventDefault();
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
      console.error('Failed to update reach name:', error);
    }

  }
}