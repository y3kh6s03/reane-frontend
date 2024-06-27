import styles from "./styles/Archive.module.scss"

export default function Archive() {
  return (
    <div className={styles.container}>

      <div className={styles.date_inner}>
        <h3 className={styles.title}>
          DATE
        </h3>
        <p className={styles.date}>
          2024 / 01 / 31
        </p>
      </div>

      <div className={styles.inner}>
        <h3 className={styles.title}>
          REACH
        </h3>
        <p className={styles.name}>
          プログラムの設計
        </p>
      </div>

      <div className={styles.inner}>
        <h3 className={styles.title}>
          SKILL
        </h3>
        <p className={styles.name}>
          プログラムの設計
        </p>
      </div>

      <div className={styles.inner}>
        <h3 className={styles.title}>
          ACTION
        </h3>
        <p className={styles.name}>
          プログラムの設計
        </p>
      </div>

      <div className={styles.inner}>
        <h3 className={styles.title}>
          MEMO
        </h3>
        <p className={styles.description}>
          本日のトレーニングで、180kgのベンチプレス挙上目標に一歩近づきました。フォームに集中し、自信を持って重量を増やしていきます。成長と改善に意欲を持ち、目標達成に向けて頑張ります！
        </p>
      </div>

    </div>
  )
}