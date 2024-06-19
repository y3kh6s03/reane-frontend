"use client"

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/../store/hooks";
import { ChartData, fetchAuthChartData } from "@/../store/slice/AuthChartsSlice";
import ChartIntro from "@/features/chartView/ChartIntro";
import IsRegisterSkillModalProvider from "@/components/libs/IsRegisterSkillModailProvider";
import ChartIndex from "../features/chartView/Index";
import styles from "./MyChart.module.scss";

export default function MyChart() {
  const [currentMyChart, setCurrentMyChart] = useState<ChartData>()
  const { data: session } = useSession();
  const authEmail = session?.user?.email || '';
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (authEmail) {
      dispatch(fetchAuthChartData({ authEmail }))
    }
  }, [dispatch, authEmail])

  const { authChartDatas } = useAppSelector((state) => state.authChart);

  useEffect(() => {
    if (authChartDatas && authChartDatas.length > 0) {
      const latestChartData = authChartDatas.slice()
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
      setCurrentMyChart(latestChartData);
    }
  }, [authChartDatas]);

  const chartNames = authChartDatas
    ?.slice()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .map(chartData => chartData.reachName);

  const handleChartNameSelectedBlur = () => {
    if (formRef.current) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  }
  const handleChartNameSelectedFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const selectedChartName = form.get('chartName');
    setCurrentMyChart(authChartDatas?.find((authChartData) => authChartData.reachName === selectedChartName));
  }

  return (
    <div id='chart'>
      {
        authChartDatas &&
          authChartDatas?.length !== 0 &&
          currentMyChart
          ?
          <IsRegisterSkillModalProvider key={currentMyChart.id} >
            <div>
              <form
                className={styles.form}
                ref={formRef}
                onSubmit={(e) => { handleChartNameSelectedFormSubmit(e) }}>
                <label
                  htmlFor="chartName"
                  style={{
                    marginRight: '1rem',
                    font: 'normal 1rem/1.5rem var(--font-en)'
                  }}
                >
                  Choose an your chart:
                </label>
                <select
                  className={styles.select}
                  id="chartName"
                  name="chartName"
                  onChange={() => { handleChartNameSelectedBlur() }}
                >
                  {
                    chartNames &&
                    chartNames?.map((chartName) =>
                      <option
                        key={`${chartName}`}
                        value={`${chartName}`}
                        defaultValue='MyChartの選択'
                      >{chartName}</option>
                    )
                  }
                </select>
              </form>
              <ChartIndex chartData={currentMyChart} />
            </div>
          </IsRegisterSkillModalProvider>
          :
          <ChartIntro />
      }
    </div>
  )
}
