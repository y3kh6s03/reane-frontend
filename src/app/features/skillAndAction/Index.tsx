"use client"

import AuthDetail from "@/components/elements/authDetail/AuthDetail";
import { useAppSelector } from "@/../store/hooks";
import SkillName from "./SkillName";
import styles from "./styles/SkillAndAction.module.scss";
import Actions from "./Actions";

export default function SkillAndActionIndex() {

  const { skillAndActionData } = useAppSelector((state) => state.skillAndAction)

  const userData = {
    userName: skillAndActionData.userName,
    userImage: skillAndActionData.userImage
  }

  const skillNameData = {
    userEmail: skillAndActionData.userEmail,
    skillName: skillAndActionData.skillName,
    reachName: skillAndActionData.reachName
  }

  const actionProps = {
    skillName: skillAndActionData.skillName,
    reachName: skillAndActionData.reachName,
    actions: skillAndActionData.actionDatas
  }

  return (
    <div className={styles.container}>
      <div className={styles.page_title_container}>
        <h1 className={styles.page_title}>
          Skill and Action
        </h1>
        <AuthDetail userData={userData} />
      </div>
      <SkillName {...skillNameData} />
      {
        skillAndActionData.actionDatas
          ? <Actions {...actionProps} />
          : ''
      }

    </div >
  )
}