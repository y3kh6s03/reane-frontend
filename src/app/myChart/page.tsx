"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/../store/hooks";
import { ChartData, fetchAuthChartData } from "@/../store/slice/AuthChartsSlice";
import ChartIntro from "@/features/chartView/ChartIntro";
import IsRegisterSkillModalProvider from "@/components/utils/IsRegisterSkillModailProvider";
import LoadingAnimation from "@/components/elements/LoadingAnimation/LoadingAnimation";
import ChartIndex from "../features/chartView/Index";

export default function MyChart() {
  const { data: session } = useSession();
  const authEmail = session?.user?.email || '';
  const [currentMyChart, setCurrentMyChart] = useState<ChartData>()

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (authEmail) {
      dispatch(fetchAuthChartData({ authEmail }))
    }
  }, [dispatch, authEmail])

  const { authChartDatas, loading } = useAppSelector((state) => state.authChart);

  console.log(authChartDatas);

  useEffect(() => {
    if (authChartDatas && authChartDatas.length > 0) {
      const latestChartData = authChartDatas.slice()
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
      setCurrentMyChart(latestChartData);
    }
  }, [authChartDatas]);

  if (loading === true) {
    return (
      <LoadingAnimation />
    )
  }


  if (authChartDatas && authChartDatas?.length !== 0 && currentMyChart) {
    return (
      <IsRegisterSkillModalProvider key={currentMyChart.id} >
        <ChartIndex chartData={currentMyChart} setCurrentMyChart={setCurrentMyChart} />
        <h1>{loading}</h1>
      </IsRegisterSkillModalProvider>
    )
  }

  if (authChartDatas?.length === 0) {
    return (
      <ChartIntro />
    )
  }

}
