"use client"

import { JournalProps } from "@/features/journal/Journal"
import styles from "./styles/SideJournal.module.scss"

export default function SideJournal({
  date,
  reachName,
  skillName,
  actions,
  description
}: JournalProps) {
  return (
    <div className={styles.container}>

      <div className={styles.date_inner}>
        <h3 className={styles.title}>
          DATE
        </h3>
        <p className={styles.date}>
          {date}
        </p>
      </div>

      <div className={styles.inner}>
        <h3 className={styles.title}>
          REACH
        </h3>
        <p className={styles.name}>
          {reachName}
        </p>
      </div>

      <div className={styles.inner}>
        <h3 className={styles.title}>
          SKILL
        </h3>
        <p className={styles.name}>
          {skillName}
        </p>
      </div>

      <div className={styles.inner}>
        <h3 className={styles.title}>
          ACTION
        </h3>
        {
          actions.map((action) =>
            <p key={action.id} className={styles.name}>
              {action.name}
            </p>
          )
        }
      </div>

      <div className={styles.inner}>
        <h3 className={styles.title}>
          MEMO
        </h3>
        <p className={styles.description}>
          {description}
        </p>
      </div>

    </div>
  )
}