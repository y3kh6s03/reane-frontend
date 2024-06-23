import { useSession } from "next-auth/react";
import { splitString } from "@/components/utils/chartUtils";
import AuthDetail from "@/components/elements/authDetail/AuthDetail";
import { ChartData, addedSkill } from "@/../store/slice/AuthChartsSlice";
import ModalContainer from "@/components/utils/ModalContainer";
import RegisterSkillModal from "@/components/elements/Modal/RegisterSkillModal";
import axios from "axios";
import { useIsRegisterSkillModal } from "@/components/utils/IsRegisterSkillModailProvider";
import { useState } from "react";
import styles from "./styles/ChartView.module.scss";
import Reach from "./Reach";

import ProgressMeter from "./ProgressMeter";
import ChartDisp from "./ChartDisp";
import Chart from "../../components/elements/chart/Chart";
import Button from "../../components/elements/button/Button";
import { useAppDispatch } from "../../../store/hooks";

interface ChartProps {
  chartData: ChartData | null
}

export default function ChartIndex({ chartData }: ChartProps) {
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const authName = session?.user?.name;
  let dispCreatedAt;
  if (chartData?.createdAt) {
    dispCreatedAt = chartData?.createdAt ? splitString(chartData.createdAt, 'T') : '';
  }
  const dispatch = useAppDispatch();

  const userData = {
    userName: chartData?.userName,
    userImage: chartData?.userImage
  }

  const reachData = {
    id: chartData?.id,
    name: chartData?.reachName,
    userEmail: chartData?.userEmail,
    userName: chartData?.userName,
    userImage: chartData?.userImage
  }

  const skillDatas = {
    id: chartData?.id,
    userName: chartData?.userName,
    userImage: chartData?.userImage,
    userEmail: chartData?.userEmail,
    reachName: chartData?.reachName,
    skills: chartData?.skills
  }

  const progressData = {
    actionCount: chartData?.actionCount,
    executedCount: chartData?.executedActionCount
  }

  const chartDispData = {
    createdAt: dispCreatedAt,
    actionCount: chartData?.actionCount,
    executedCount: chartData?.executedActionCount
  }

  const { isRegisterSkillModal, setIsRegisterSkillModal } = useIsRegisterSkillModal();

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

  return (
    <div id={`chart${chartData ? chartData.id : ''}`} className={styles.container}>

      <div className={styles.authDetail_container}>
        <AuthDetail userData={userData} />
      </div>

      <Reach {...reachData} />
      {
        errorMsg !== "" &&
        <span>{errorMsg}</span>
      }

      <div className={styles.skills_wrapper}>
        <Chart skillDatas={skillDatas} />
        <div className={styles.chatData_wrapper}>
          <ProgressMeter progressData={progressData} />
          {
            authName === chartData?.userName
              ?
              <button
                type="submit"
                className={styles.skillRegisterButton}
                onClick={() => { setIsRegisterSkillModal(prev => !prev) }}
              >
                +
              </button>
              :
              ''
          }
          <ChartDisp chartDispData={chartDispData} />
        </div>
      </div>

      {
        authName !== chartData?.userName
          ?
          <div className={styles.icons_container}>
            <Button buttonName="like" />
            <Button buttonName="favorite" />
            <Button buttonName="create" />
          </div>
          :
          ''
      }
      {
        authName === chartData?.userName &&
        isRegisterSkillModal &&
        <ModalContainer targetName={`chart${chartData ? chartData.id : ''}`}>
          <RegisterSkillModal handleSubmit={handleRegisterSkillModalSubmit} />
        </ModalContainer>
      }
    </div>

  )
}