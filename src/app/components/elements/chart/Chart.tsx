'use client'

import { Dispatch, SetStateAction, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { SkillData } from "@/../store/slice/AuthChartsSlice";
import { useAppDispatch } from "@/../store/hooks";
import { currentSkillAndAction } from "@/../store/slice/SkillAndActionSlice";
import useCircularLayout from "@/components/utils/customHooks/useCircularLayout";
import { CreateSkillData } from "../../../../store/slice/CreateChartSlice";

import styles from "./Chart.module.scss"

interface ChartDatas {
  skillDatas: {
    id?: number | undefined,
    userName: string | undefined,
    userImage: string | undefined,
    userEmail: string | undefined,
    reachName: string | undefined,
    skills: SkillData | CreateSkillData | undefined,
    setIsActionModal?: Dispatch<SetStateAction<boolean>>;
    setSkillName?: Dispatch<SetStateAction<string>>
  },
}

export default function Chart({ skillDatas }: ChartDatas) {

  const pathName = usePathname().substring(1);
  const modalOpen = (skill: string) => {
    if (skillDatas.setIsActionModal && skillDatas.setSkillName) {
      skillDatas.setIsActionModal((prev) => !prev);
      skillDatas.setSkillName(skill)
    }
  }

  const dispatch = useAppDispatch();

  const router = useRouter();
  const skillAndActionRedirect = (skillName: string) => {
    if (skillDatas.skills && skillDatas.userName && skillDatas.userImage) {
      const actionDatas = skillDatas.skills[skillName].actions;
      if (actionDatas) {
        const skillAndActionData = {
          id: skillDatas.id,
          userName: skillDatas.userName,
          userImage: skillDatas.userImage,
          userEmail: skillDatas.userEmail,
          reachName: skillDatas.reachName,
          skillName,
          actionDatas
        }
        dispatch(currentSkillAndAction(skillAndActionData));
        router.push(`/skillAndAction/${skillDatas.userName}/${skillDatas.reachName}/${skillName}`);
      }
    }
  }

  const skillLength = skillDatas.skills ? Object.entries(skillDatas.skills).length : 0;
  const skillsContainer = useRef<HTMLDivElement | null>(null);
  const skillsInner = useRef<HTMLDivElement | null>(null);
  const { rad, r, radOffset } = useCircularLayout({ skillsContainer, skillsInner, skillLength })

  return (
    <div
      ref={skillsContainer}
      className={styles.skills_container}
    >
      {
        skillDatas.skills !== undefined
          ?
          Object.entries(skillDatas.skills).map((skillData, index) => {
            const skillName = skillData[0]
            const y = rad && radOffset && r
              ? Math.sin(rad * index + radOffset) * r + r
              : 0;
            const x = rad && radOffset && r
              ? Math.cos(rad * index + radOffset) * r + r
              : 0;
            return (
              <motion.div
                ref={skillsInner}
                className={styles.skills_inner}
                initial={{
                  opacity: 0,
                  top: "40%",
                  left: "100%",
                }}
                animate={{
                  opacity: 1,
                  left: x,
                  top: y,
                }}
                transition={{
                  duration: .2,
                  ease: 'easeInOut',
                  delay: .3 + .1 * index
                }}
                style={{ backgroundColor: pathName === 'create' ? "gray" : '' }}
                key={skillName}
                role="button"
                tabIndex={0}
                onClick={pathName === 'create'
                  ? () => { modalOpen(skillName) }
                  : () => { skillAndActionRedirect(skillName) }
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    const actionToPerform = pathName === 'create'
                      ? () => modalOpen(skillName)
                      : () => { skillAndActionRedirect(skillName) }
                    actionToPerform();
                  }
                }}
              >
                <span
                  className={styles.skills_inner_name}
                >
                  {skillName}
                </span>
              </motion.div>
            )
          })
          : ''
      }
    </div>
  )
}
