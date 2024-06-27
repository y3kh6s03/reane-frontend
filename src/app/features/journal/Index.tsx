"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useAppSelector } from "@/../store/hooks"

import { ModalToggleButton } from "@/../app/components/elements/button/Button"
import ModalContainer from "@/components/utils/ModalContainer"
import JournalInputModal from "@/../app/components/elements/Modal/JournalInputModal"
import SearchFilter from "./SearchFilter"
import Archive from "./Archive"

import styles from "./styles/Journal.module.scss"


export default function JournalIndex() {

  const [isJournalModal, setIsJournalModal] = useState(false);
  const authChartDatas = useAppSelector(state => state.authChart);
  const pathName = usePathname();
  const pathReachName = decodeURIComponent(pathName.substring(1)).split('/')[1];
  const pathSkillName = decodeURIComponent(pathName.substring(1)).split('/')[2];
  const actionNames = authChartDatas.authChartDatas && authChartDatas.authChartDatas[0].skills[pathSkillName].actions.map((deta) => deta.name)

  const journalInputModalProps = {
    reachName: pathReachName,
    skillName: pathSkillName,
    actionNames,
    setIsJournalModal,
  }

  const modalToggleProps = {
    setIsModal: setIsJournalModal,
    toggleName: '振り返り'
  }

  return (
    <div id="journal"className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.page_title}>
          Journal
        </h1>
        <ModalToggleButton modalToggleProps={modalToggleProps} />
        {/*
      <div className={styles.searchContainer}>
        <SearchFilter searchTitle='Reach' searchName='WEB開発者' />
        <SearchFilter searchTitle='SKILL' searchName='フロントエンド開発' />
        <SearchFilter searchTitle='ACTION' searchName='web開発技術の向上' />
      </div> */}

        <span className={styles.holizonBar} />
        <div className={styles.archiveContainer}>
          <Archive />
        </div>
        {
          isJournalModal
          &&
          <ModalContainer targetName='journal'>
            <JournalInputModal {...journalInputModalProps} />
          </ModalContainer>
        }
      </div>
    </div>
  )
}