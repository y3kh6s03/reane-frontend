"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/../store/hooks";

import { BackButton, JournalButton } from "@/components/elements/button/Button";
import PageTitle from "@/components/elements/pageTitle/PageTitle";
import MotionWrapper from "@/components/libs/MotionWrapper";
import Actions from "./Actions";
import SkillName from "./SkillName";

import styles from "./styles/SkillAndAction.module.scss";

export default function SkillAndActionIndex() {

  const { data } = useSession();
  const authEmail = data?.user?.email;

  const router = useRouter();

  const {
    userName,
    userEmail,
    userImage,
    id,
    reachName,
    skillName,
    actionDatas,
    days
  } = useAppSelector((state) => state.skillAndAction.skillAndActionData)

  const userData = {
    userName,
    userImage,
    days
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
    <MotionWrapper>
      <div className={styles.container}>
        <PageTitle title="Skill And Action" userData={userData} />
        <div className={styles.button_container}>
          <BackButton {...router} />
          {
            authEmail === userEmail
            &&
            <JournalButton reachName={reachName} skillName={skillName} />
          }
        </div>
        <SkillName {...skillNameData} />
        {
          actionDatas
            ? <Actions {...actionProps} />
            : ''
        }
      </div >
    </MotionWrapper>
  )
}