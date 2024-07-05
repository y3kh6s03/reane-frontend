"use client"

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchAllUsersCharts } from "../../../store/thunks/AllUsersChartsThunk";
import Tab from "./Tab";
import UserCard from "./UserCard";

export default function HomeIndex() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersCharts(5));
  }, [dispatch])
  const allUsersChartsData = useAppSelector(state => state.AllUsersChart);

  return (
    <div>
      <Tab />
      {
        allUsersChartsData.allUsersChartDatas
        &&
        Object.values(allUsersChartsData.allUsersChartDatas).map((userChartData) =>
          <UserCard key={userChartData.id} {...userChartData} />
        )
      }
    </div>
  );
}