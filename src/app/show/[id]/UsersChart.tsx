"use client"

import ChartIndex from "@/features/chartView/Index";
import { useAppSelector } from "@/../store/hooks";
import IsRegisterSkillModalProvider from "@/components/utils/IsRegisterSkillModailProvider";

export default function UsersChart() {
  const { userChartData } = useAppSelector((state) => state.usersChart);
  const chartData = userChartData
  return (
    <IsRegisterSkillModalProvider>
      <ChartIndex chartData={chartData} />
    </IsRegisterSkillModalProvider>
  )
}