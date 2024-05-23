import styles from "./styles/chartDisp.module.scss";

interface ChartDispData {
  chartDispData: {
    createdAt: string | undefined | null,
    actionCount: number | undefined,
    executedCount: number | undefined
  }
}

export default function ChartDisp({ chartDispData }: ChartDispData) {
  return (
    <div className={styles.container}>
      <span className={styles.date}>since: {chartDispData.createdAt}</span>
      <span className={styles.action_count}>
        action: {chartDispData.executedCount} / {chartDispData.actionCount}
      </span>
    </div>
  )
}