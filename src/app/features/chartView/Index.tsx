import { useSession } from "next-auth/react";
import { splitString } from "@/components/utils/chartUtils";
import AuthDetail from "@/components/elements/authDetail/AuthDetail";
import { ChartData } from "@/../store/slice/AuthChartsSlice";
import ModalContainer from "@/components/utils/ModalContainer";
import RegisterSkillModal from "@/components/elements/Modal/RegisterSkillModal";
import axios from "axios";
import { useIsRegisterSkillModal } from "@/components/libs/IsRegisterSkillModailProvider";
import styles from "./styles/ChartView.module.scss";
import Reach from "./Reach";

import ProgressMeter from "./ProgressMeter";
import ChartDisp from "./ChartDisp";
import Chart from "../../components/elements/chart/Chart";
import Button from "../../components/elements/button/Button";

interface ChartProps {
  chartData: ChartData | null
}

export default function ChartIndex({ chartData }: ChartProps) {
  const { data: session } = useSession();
  const authName = session?.user?.name;
  let dispCreatedAt;
  if (chartData?.createdAt) {
    dispCreatedAt = chartData?.createdAt ? splitString(chartData.createdAt, 'T') : '';
  }

  const userData = {
    userName: chartData?.userEmail,
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
      await axios.patch(URL, skillNamePayload)
    } catch (error) {
      console.error("Failed to submit skill registration:", error);
    }
  }

  return (
    <div id={`chart${chartData ? chartData.id : ''}`} className={styles.container}>

      <div className={styles.authDetail_container}>
        <AuthDetail userData={userData} />
      </div>

      <Reach {...reachData} />

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
        isRegisterSkillModal &&
        <ModalContainer targetName={`chart${chartData ? chartData.id : ''}`}>
          <RegisterSkillModal handleSubmit={handleRegisterSkillModalSubmit} />
        </ModalContainer>
      }
    </div>

  )
}