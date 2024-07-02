"use client"

import { useEffect } from "react"
import LoadingAnimation from "@/components/elements/LoadingAnimation/LoadingAnimation"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { fetchJournal } from "../../../../store/thunks/journalThunks"
import SideJournal from "./SideJournal"
import styles from "./styles/Sidebar.module.scss"

export default function SideBar({ authEmail }: { authEmail: string }) {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchJournal({ user_email: authEmail }))
  }, [authEmail, dispatch])
  const { journals, loading } = useAppSelector(state => state.journal);

  if (loading) {
    return (
      <div className={styles.container}>
        <h3>Journal</h3>
        <LoadingAnimation />
      </div>
    )
  }

  if (journals?.length === 0) {
    return (
      <div className={styles.container}>
        <h3>Journal</h3>
        <span className={styles.span}>振り返りがなにもありません</span>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h3>Journal</h3>
      {
        journals && journals.length !== 0
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