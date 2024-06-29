import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useAppDispatch } from "../../../../store/hooks";
import { ChartData, addedSkill } from "../../../../store/slice/AuthChartsSlice";

interface UseSkillRegistrationProps {
  chartData: ChartData | null,
  setErrorMsg: Dispatch<SetStateAction<string>>
}

export default function useSkillRegistration({ chartData, setErrorMsg }: UseSkillRegistrationProps) {

  const dispatch = useAppDispatch();

  const handleRegisterSkillModalSubmit = async (inputSkillName: string) => {

    if (!chartData) return;
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/reach/skill/${inputSkillName}`;
    const skillNamePayload = {
      id: chartData?.id,
      userEmail: chartData?.userEmail,
      inputSkillName
    }
    try {
      const res = await axios.patch(URL, skillNamePayload)
      if (res.status === 200) {
        const data = await res.data;
        const addedSkillPayload = {
          reachId: data.reach_id,
          id: data.id,
          skillName: data.name,
          updatedAt: data.updated_at
        }
        dispatch(addedSkill(addedSkillPayload));
      }
    } catch (error) {
      setErrorMsg(`Failed to submit skill registration: ${error}`);
    }
  }

  return { handleRegisterSkillModalSubmit };
}