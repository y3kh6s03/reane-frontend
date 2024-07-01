"use client"

import { useAppSelector } from "../../../../store/hooks"
import SideJournal from "./SideJournal"
import styles from "./styles/Sidebar.module.scss"

export default function SideBar() {

  const journals = useAppSelector(state => state.journal.journals);

  return (
    <div className={styles.container}>
      {
        journals
        &&
        journals.map((journal) =>
          <SideJournal
            {...journal}
            key={journal.journal_id} />
        )
      }
    </div>
  )
}