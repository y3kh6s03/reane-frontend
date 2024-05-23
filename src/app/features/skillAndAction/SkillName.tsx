"use client"

import { JournalButton } from "@/app/components/elements/button/Button";
import styles from "./styles/SkillName.module.scss";

interface SkillNameProps {
  skillName: string
}

export default function SkillName({skillName}:SkillNameProps) {

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h2 className={styles.skill_title}>
          SKILL
        </h2>
        <h3 className={styles.skill_title_name}>
          {skillName}
        </h3>
      </div>
      <JournalButton />
    </div>
  )
}