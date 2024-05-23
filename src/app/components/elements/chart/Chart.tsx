'use client'

import { useRouter, usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SkillData } from "@/store/slice/AuthChartsSlice";
import { useAppDispatch } from "@/store/hooks";
import { currentSkillAndAction } from "@/store/slice/SkillAndActionSlice";
import styles from "./chart.module.scss"

interface SkillDatas {
  skillDatas: {
    userName: string | undefined,
    userImage: string | undefined,
    skills: SkillData | undefined,
    setIsActionModal?: Dispatch<SetStateAction<boolean>>;
    setSkillName?: Dispatch<SetStateAction<string>>
  },
}

export default function Chart({ skillDatas }: SkillDatas) {

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
      const actionDatas = skillDatas.skills[skillName]
      if (actionDatas) {
        const skillAndActionData = {
          userName: skillDatas.userName,
          userImage: skillDatas.userImage,
          skillName,
          actionDatas
        }
        dispatch(currentSkillAndAction(skillAndActionData));
        router.push(`/skillAndAction/${skillDatas.userName}/${skillName}`);
      }
    }
  }

  const skillLength = skillDatas.skills ? Object.entries(skillDatas.skills).length : 0;
  const [rad, setRad] = useState<number>();
  const [r, setR] = useState<number>();
  const [radOffset, setRadOffset] = useState<number>();
  const skillsContainer = useRef<HTMLDivElement | null>(null);
  const skillsInner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (skillsContainer.current && skillsInner.current && skillLength > 0) {
      const deg = 360.0 / skillLength;
      const circleRadius = skillsContainer.current.clientWidth / 2 - skillsInner.current.clientWidth / 2;
      const radianOffset = -Math.PI / 2;
      const angleInRadians = deg * Math.PI / 180.0;
      setRad(angleInRadians);
      setR(circleRadius);
      setRadOffset(radianOffset);
    }
  }, [skillLength]);

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
              <div
                ref={skillsInner}
                className={styles.skills_inner}
                style={{ left: x, top: y, backgroundColor: pathName === 'create' ? "gray" : '' }}
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
              </div>
            )
          })
          : ''
      }
    </div>
  )
}
