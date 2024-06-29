"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/../store/hooks";

import { BackButton, JournalButton } from "@/components/elements/button/Button";
import PageTitle from "@/components/elements/pageTitle/PageTitle";
import Actions from "./Actions";
import SkillName from "./SkillName";

import styles from "./styles/SkillAndAction.module.scss";

export default function SkillAndActionIndex() {

  const { data } = useSession();
  const authEmail = data?.user?.email;

  const router = useRouter();

  const { skillAndActionData } = useAppSelector((state) => state.skillAndAction)

  const { userName, userEmail, userImage, id, reachName, skillName, actionDatas, } = skillAndActionData

  const userData = {
    userName,
    userImage
  }

  const skillNameData = {
    id,
    userEmail,
    skillName,
    reachName,
  }

  const actionProps = {
    userEmail,
    id,
    skillName,
    reachName,
    actions: actionDatas,
  }

  return (
    <div className={styles.container}>
      <PageTitle title="Skill And Action" userData={userData} />
      <div className={styles.button_container}>
        <BackButton {...router} />
        {
          authEmail === skillAndActionData.userEmail
          &&
          <JournalButton reachName={reachName} skillName={skillName} />
        }
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