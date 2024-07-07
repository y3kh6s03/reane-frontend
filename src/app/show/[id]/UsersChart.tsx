"use client"

import ChartIndex from "@/features/chartView/Index";
import { useAppDispatch, useAppSelector } from "@/../store/hooks";
import IsRegisterSkillModalProvider from "@/components/utils/IsRegisterSkillModailProvider";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getChartById } from "../../../store/slice/AllUsersChartsSlice";


export default function UsersChart() {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const id = parseInt(path.split("/")[2], 10);
  useEffect(() => {
    dispatch(getChartById(id))
  }, [dispatch, id])
  const { selectedChartData } = useAppSelector((state) => state.AllUsersChart);
  return (
    <IsRegisterSkillModalProvider>
      <ChartIndex chartData={selectedChartData} />
    </IsRegisterSkillModalProvider>
  )
}