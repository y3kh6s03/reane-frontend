"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/../store/hooks"

import { BackButton, ModalToggleButton } from "@/../app/components/elements/button/Button"
import ModalContainer from "@/components/utils/ModalContainer"
import JournalInputModal from "@/../app/components/elements/Modal/JournalInputModal"
import PageTitle from "@/components/elements/pageTitle/PageTitle"
import Journal from "./Journal"

import styles from "./styles/Journal.module.scss"
import { fetchJournal } from "../../../store/thunks/journalThunks"


export default function JournalIndex() {

  const [isJournalModal, setIsJournalModal] = useState(false);
  const { authChartDatas } = useAppSelector(state => state.authChart);
  const pathName = usePathname();
  const pathReachName = decodeURIComponent(pathName.substring(1)).split('/')[1];
  const pathSkillName = decodeURIComponent(pathName.substring(1)).split('/')[2];
  const journalChartData = authChartDatas?.filter((chartData) =>
    chartData.reachName === pathReachName
  )[0]
  const skillId = journalChartData && journalChartData.skills[pathSkillName].id;
  const actionNames = journalChartData && journalChartData.skills[pathSkillName].actions.map((deta) => deta.name)

  const router = useRouter();

  const journalInputModalProps = {
    userEmail: journalChartData !== undefined ? journalChartData?.userEmail : '',
    id: journalChartData !== undefined ? journalChartData.id : -1,
    reachName: pathReachName,
    skillId: skillId !== undefined ? skillId : -1,
    skillName: pathSkillName,
    actionNames: actionNames !== undefined ? actionNames : [],
    setIsJournalModal,
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (journalChartData) {
      const fetchJournalPayload = {
        user_email: journalChartData.userEmail
      }
      dispatch(fetchJournal(fetchJournalPayload));
    }
  }, [dispatch, journalChartData]);

  const journals = useAppSelector(state => state.journal.journals);
  console.log(journals)
  return (
    <div id="journal" className={styles.wrapper}>
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
    </div >
  )
}