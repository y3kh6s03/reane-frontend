"use client"

import { ModalToggleButton } from "@/app/components/elements/button/Button"
import { useState } from "react"
import JournalInputModalContainer from "@/app/components/utils/JournalInputModalContainer"
import JournalInputModal from "@/app/components/elements/Modal/JournalInputModal"
import styles from "./styles/Journal.module.scss"
import SearchFilter from "./SearchFilter"
import Archive from "./Archive"

export default function JournalIndex() {
  const [isJournalModal, setIsJournalModal] = useState(false)
  const modalToggleProps = {
    setIsModal: setIsJournalModal,
    toggleName: '振り返り'
  }
  return (
    <div id="journal" className={styles.container}>
      <h1 className={styles.page_title}>
        Journal
      </h1>
      <ModalToggleButton modalToggleProps={modalToggleProps} />

      <div className={styles.searchContainer}>
        <SearchFilter searchTitle='Reach' searchName='WEB開発者' />
        <SearchFilter searchTitle='SKILL' searchName='フロントエンド開発' />
        <SearchFilter searchTitle='ACTION' searchName='web開発技術の向上' />
      </div>

      <span className={styles.holizonBar} />
      <div className={styles.archiveContainer}>
        <Archive/>
      </div>
      {
        isJournalModal
        &&
        <JournalInputModalContainer>
          <JournalInputModal setIsJournalModal={setIsJournalModal} />
        </JournalInputModalContainer>
      }
    </div>


  )
}