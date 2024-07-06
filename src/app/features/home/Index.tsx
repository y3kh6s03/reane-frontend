"use client"

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/../store/hooks";
import { fetchAllUsersCharts } from "@/../store/thunks/AllUsersChartsThunk";
import Pagination from "@/components/elements/pagination/Pagination";
import PageTitle from "@/components/elements/pageTitle/PageTitle";
import MotionWrapper from "@/components/libs/MotionWrapper";
import LoadingAnimation from "@/components/elements/LoadingAnimation/LoadingAnimation";
import UserCard from "./UserCard";

import styles from "./styles/Home.module.scss"

export default function HomeIndex() {
  const { allUsersChartsDatas, loading } = useAppSelector(state => state.AllUsersChart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersCharts(1));
  }, [dispatch])

  if (loading === true) {
    return <LoadingAnimation />
  }

  if (loading === false) {
    return (
      <MotionWrapper>
        <div className={styles.container}>
          <PageTitle title="All Users Chart" />
          {
            allUsersChartsDatas.data
            &&
            allUsersChartsDatas.data.map((userChartData) =>
              <UserCard key={userChartData.id} {...userChartData} />
            )
          }
          <Pagination current_page={allUsersChartsDatas.current_page} last_page={allUsersChartsDatas.last_page} />
        </div>
      </MotionWrapper>
    );
  }
}