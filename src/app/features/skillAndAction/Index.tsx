"use client"

import AuthDetail from "@/components/elements/authDetail/AuthDetail";
import { useAppSelector } from "@/../store/hooks";
import SkillName from "./SkillName";
import styles from "./styles/SkillAndAction.module.scss";
import Actions from "./Actions";

export default function SkillAndActionIndex() {

  const {skillAndActionData} = useAppSelector((state) => state.skillAndAction)

  const userData = {
    userName: skillAndActionData.userName,
    userImage: skillAndActionData.userImage
  }

  const skillNameData = {
    userEmail: skillAndActionData.userEmail,
    skillName: skillAndActionData.skillName,
    reachName: skillAndActionData.reachName,

  }

  return (
    <div className={styles.container}>
      <h1 className={styles.page_title}>
        Skill and Action
      </h1>
        <AuthDetail userData={userData} />
      <SkillName {...skillNameData} />
      {
        skillAndActionData.actionDatas
          ? <Actions {...skillAndActionData.actionDatas} />
          : <Actions {...{}} />
      }

    </div>
  )
}