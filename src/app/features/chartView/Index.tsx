/* eslint-disable react/require-default-props */
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { ChartData } from "@/../store/slice/AuthChartsSlice";
import {motion} from "framer-motion";

import { splitString } from "@/components/utils/chartUtils";
import AuthDetail from "@/components/elements/authDetail/AuthDetail";
import RegisterSkillModal from "@/components/elements/Modal/RegisterSkillModal";
import ModalContainer from "@/components/utils/ModalContainer";
import { useIsRegisterSkillModal } from "@/components/utils/IsRegisterSkillModailProvider";
import Button from "@/components/elements/button/Button";
import Chart from "@/components/elements/chart/Chart";
import useSkillRegistration from "@/components/utils/customHooks/useSkillRegistration";
import Reach from "./Reach";
import ProgressMeter from "./ProgressMeter";
import ChartDisp from "./ChartDisp";
import ChartSlect from "./ChartSelect";

import styles from "./styles/ChartView.module.scss";

interface ChartPropsIndex {
  chartData: ChartData | null,
  setCurrentMyChart?: Dispatch<SetStateAction<ChartData | undefined>> | undefined
}

export default function ChartIndex({ chartData, setCurrentMyChart = () => { } }: ChartPropsIndex) {
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const authName = session?.user?.name;
  let dispCreatedAt;
  if (chartData?.createdAt) {
    dispCreatedAt = chartData?.createdAt ? splitString(chartData.createdAt, 'T') : '';
  }
  const { handleRegisterSkillModalSubmit } = useSkillRegistration({ chartData, setErrorMsg })
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

  return (
    <motion.div
     id={`chart${chartData ? chartData.id : ''}`}
      className={styles.container}
      initial={{
        opacity: 0,
        x: 100
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      transition={{
        delay: .3,
      }}
      >

      <div className={styles.authDetail_container}>
        <AuthDetail {...userData} />
      </div>

      <Reach {...reachData} />
      {
        errorMsg !== "" &&
        <span>{errorMsg}</span>
      }

      {
        authName === userData.userName
          ?
          <ChartSlect setCurrentMyChart={setCurrentMyChart} />
          :
          <div className={styles.icons_container}>
            <Button buttonName="like" />
            <Button buttonName="favorite" />
            <Button buttonName="create" />
          </div>
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
        authName === chartData?.userName &&
        isRegisterSkillModal &&
        <ModalContainer targetName={`chart${chartData ? chartData.id : ''}`}>
          <RegisterSkillModal handleSubmit={handleRegisterSkillModalSubmit} />
        </ModalContainer>
      }
    </motion.div>
  )
}