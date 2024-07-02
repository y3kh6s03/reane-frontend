"use client"

import { motion } from "framer-motion"

import useJournalData from "@/components/utils/customHooks/useJournalData"
import { BackButton, ModalToggleButton } from "@/../app/components/elements/button/Button"
import ModalContainer from "@/components/utils/ModalContainer"
import JournalInputModal from "@/../app/components/elements/Modal/JournalInputModal"
import PageTitle from "@/components/elements/pageTitle/PageTitle"
import Journal from "./Journal"

import styles from "./styles/Journal.module.scss"

export default function JournalIndex() {


  const { router, journals, journalInputModalProps, isJournalModal, setIsJournalModal } = useJournalData();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 100
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      transition={{
        delay: .3,
      }}
      id="journal" className={styles.wrapper}>
      <div className={styles.container}>
        <PageTitle title="Journal" />
        <div className={styles.button_container}>
          <BackButton {...router} />
          <div className={styles.button_inner}>
            <ModalToggleButton
              {...{ setIsModal: setIsJournalModal, toggleName: '振り返り' }} />
          </div>
        </div>
        {/*
      <div className={styles.searchContainer}>
        <SearchFilter searchTitle='Reach' searchName='WEB開発者' />
        <SearchFilter searchTitle='SKILL' searchName='フロントエンド開発' />
        <SearchFilter searchTitle='ACTION' searchName='web開発技術の向上' />
      </div> */}

        <span className={styles.holizonBar} />
        {
          journals?.map((journal) =>
            <div key={journal.journal_id} className={styles.archiveContainer} >
              <Journal {...journal} />
            </div>
          )
        }
        {
          isJournalModal
          &&
          <ModalContainer targetName='journal'>
            <JournalInputModal {...journalInputModalProps} />
          </ModalContainer>
        }
      </div>
    </motion.div >
  )
}