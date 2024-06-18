"use client"

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/../store/hooks";
import { ChartData, fetchAuthChartData } from "@/../store/slice/AuthChartsSlice";
import ChartIntro from "@/features/chartView/ChartIntro";
import IsRegisterSkillModalProvider from "@/components/libs/IsRegisterSkillModailProvider";
import ChartIndex from "../features/chartView/Index";

export default function MyChart() {
  const { data: session } = useSession();
  const authEmail = session?.user?.email || '';

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (authEmail) {
      dispatch(fetchAuthChartData({ authEmail }))
    }
  }, [dispatch, authEmail])

  const { authChartDatas } = useAppSelector((state) => state.authChart)

  return (
    <div id='chart'>
      {
        authChartDatas && authChartDatas?.length !== 0
          ?
          authChartDatas.map((authChartData: ChartData) =>
            <IsRegisterSkillModalProvider key={authChartData.id} >
              <div>
                <ChartIndex chartData={authChartData} />
              </div>
            </IsRegisterSkillModalProvider>
          )
          :
          <ChartIntro />
      }
    </div>
  )
}
