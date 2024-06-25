import { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import styles from "./styles/ChartSelect.module.scss"
import { useAppSelector } from "../../../store/hooks";
import { ChartData } from "../../../store/slice/AuthChartsSlice";



export default function ChartSlect({ setCurrentMyChart }: { setCurrentMyChart: Dispatch<SetStateAction<ChartData | undefined>> | undefined }) {

  const formRef = useRef<HTMLFormElement>(null);

  const { authChartDatas } = useAppSelector(state => state.authChart)

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
    if (authChartDatas) {
      const reachNameChartData = authChartDatas.find((authChartData) => authChartData.reachName === selectedChartName)
      if (reachNameChartData && setCurrentMyChart) {
        setCurrentMyChart(reachNameChartData);
      }
    }
  }
  return (
    <form
      className={styles.form}
      ref={formRef}
      onSubmit={(e) => { handleChartNameSelectedFormSubmit(e) }}>
      <label
        htmlFor="chartName"
        style={{
          marginRight: '1rem',
          font: 'normal 1rem/1rem var(--font-en)'
        }}
      >
        Choose on your chart:
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
  )
}