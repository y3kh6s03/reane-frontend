"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { ChartData, fetchAuthChartData } from "@/store/slice/AuthChartsSlice";
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
    <div>
      {authChartDatas &&
        authChartDatas.map((authChartData: ChartData) =>
          <ChartIndex key={authChartData.id} chartData={authChartData} />
        )
      }
    </div>
  )
}
