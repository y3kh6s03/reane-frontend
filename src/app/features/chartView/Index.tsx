/* eslint-disable react/require-default-props */
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { ChartData } from "@/../store/slice/AuthChartsSlice";
import MotionWrapper from "@/components/libs/MotionWrapper";
import { useRouter } from "next/navigation";


import { calcCreatedAt, calcElapsedDays } from "@/components/utils/chartUtils";
import AuthDetail from "@/components/elements/authDetail/AuthDetail";
import RegisterSkillModal from "@/components/elements/Modal/RegisterSkillModal";
import ModalContainer from "@/components/utils/ModalContainer";
import { useIsRegisterSkillModal } from "@/components/utils/IsRegisterSkillModailProvider";
import Chart from "@/components/elements/chart/Chart";
import useSkillRegistration from "@/components/utils/customHooks/useSkillRegistration";
import { BackButton } from "@/components/elements/button/Button";
import Reach from "./Reach";
import ProgressMeter from "./ProgressMeter";
import ChartDisp from "./ChartDisp";
import ChartSlect from "./ChartSelect";

import styles from "./styles/ChartView.module.scss";
import QuoteCreateButton from "./QuoteCreateButton";

interface ChartPropsIndex {
  chartData: ChartData | null,
  setCurrentMyChart?: Dispatch<SetStateAction<ChartData | undefined>> | undefined
}

export default function ChartIndex({ chartData, setCurrentMyChart = () => { } }: ChartPropsIndex) {
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const authName = session?.user?.name;
  const authEmail = session?.user?.email;
  const authImage = session?.user?.image;

  const dispCreatedAt = chartData && calcCreatedAt(chartData?.createdAt)
  const { handleRegisterSkillModalSubmit } = useSkillRegistration({ chartData, setErrorMsg })
  const days = chartData?.createdAt ? calcElapsedDays(chartData.createdAt) : 0;

  const userData = {
    userName: chartData?.userName || 'unname',
    userImage: chartData?.userImage || '',
    userEmail: chartData?.userEmail || 'unEmail',
    days
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
    skills: chartData?.skills,
    days
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

  const quoteCreateChartPayLoad = {
    userName: authName || '',
    userImage: authImage || '',
    userEmail: authEmail || '',
    reachName: chartData?.reachName || '',
    skills: chartData?.skills || {},
  }

  const { isRegisterSkillModal, setIsRegisterSkillModal } = useIsRegisterSkillModal();

  const router = useRouter();

  return (
    <MotionWrapper>
      <div id={`chart${chartData ? chartData.id : ''}`} className={styles.container}>
        <div className={styles.backButton_container}>
          <BackButton {...router} />
        </div>
        <div className={styles.authDetail_container}>
          {
            userData.userImage
            &&
            <AuthDetail {...userData} />
          }
        </div>

        <Reach {...reachData} />
        {
          errorMsg !== "" &&
          <span>{errorMsg}</span>
        }

        {
          authName === userData.userName
          &&
          <ChartSlect setCurrentMyChart={setCurrentMyChart} />
        }

        <div className={styles.skills_wrapper}>
          <Chart skillDatas={skillDatas} />
          <div className={styles.chatData_wrapper}>
            <ProgressMeter progressData={progressData} />
            {
              authName === chartData?.userName
                ?
                <button
                  className={styles.skillRegisterButton}
                  type="submit"
                  onClick={() => { setIsRegisterSkillModal(prev => !prev) }}
                >
                  +
                </button>
                :
                <QuoteCreateButton quoteCreateChartPayLoad={quoteCreateChartPayLoad} />
            }
            <ChartDisp chartDispData={chartDispData} />
          </div>
        </div>

        {
          authName === chartData?.userName &&
          isRegisterSkillModal &&
          <ModalContainer targetName={`chart${chartData ? chartData.id : ''}`}>
            <RegisterSkillModal handleSubmit={handleRegisterSkillModalSubmit} />
          </ModalContainer>
        }
      </div>
    </MotionWrapper>
  )
}