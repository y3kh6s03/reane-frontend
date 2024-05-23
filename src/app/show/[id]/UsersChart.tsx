"use client"

import ChartIndex from "@/app/features/chartView/Index";
import { useAppSelector } from "@/store/hooks";

export default function UsersChart() {
  const { userChartData } = useAppSelector((state) => state.usersChart);
  const chartData = userChartData
  return (
      <ChartIndex chartData={chartData} />
  )
}