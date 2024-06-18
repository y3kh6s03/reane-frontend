import Link from "next/link";
import styles from "./styles/ChartIntro.module.scss";

export default function ChartIntro() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        今すぐマンダラチャートを<br />
        作成する
      </h1>
      <Link className={styles.link} href="/create">
        CREAT
      </Link>
    </div>
  )
}