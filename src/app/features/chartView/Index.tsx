import { useSession } from "next-auth/react";
import { splitString } from "@/components/utils/chartUtils";
import AuthDetail from "@/components/elements/authDetail/AuthDetail";
import { ChartData } from "@/../store/slice/AuthChartsSlice";
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
    dispCreatedAt = splitString(chartData && chartData?.createdAt, 'T');
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

  return (
    <div className={styles.container}>
      <div className={styles.authDetail_container}>
        <AuthDetail userData={userData} />
      </div>
      <Reach {...reachData} />
      <div className={styles.skills_wrapper}>
        <Chart skillDatas={skillDatas} />

        <ProgressMeter progressData={progressData} />
        <ChartDisp chartDispData={chartDispData} />
      </div>
      {
        authName !== chartData?.userName
          ? <div className={styles.icons_container}>
            <Button buttonName="like" />
            <Button buttonName="favorite" />
            <Button buttonName="create" />
          </div>
          : ''
      }
    </div>
  )
}