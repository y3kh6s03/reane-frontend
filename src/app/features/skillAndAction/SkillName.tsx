"use client"

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { Delete } from "@/components/elements/icons/Icons";
import { handleSkillNameDelete, handleSkillNameSubmit } from "./handers/handler";

import styles from "./styles/SkillName.module.scss";

interface SkillNameProps {
  id: number,
  skillName: string,
  reachName: string,
  userEmail: string,
}

export default function SkillName({ userEmail, id, reachName, skillName }: SkillNameProps) {

  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter();

  const handleSkillNameBlur = () => {
    if (formRef.current) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  }

  return (
    <div className={styles.container}>
      <form
        ref={formRef}
        onSubmit={(e) => { handleSkillNameSubmit({ e, id, userEmail, reachName, skillName }) }}
        className={styles.title_container}>
        <h2 className={styles.skill_title}>
          SKILL
          <Delete deleteHandler={() => { handleSkillNameDelete({ userEmail, id, reachName, skillName, router }) }} />
        </h2>
        <input
          type="text"
          className={styles.skill_title_name}
          defaultValue={skillName}
          name="skillName"
          onBlur={() => {
            handleSkillNameBlur()
          }}
        />

      </form>
    </div>
  )
}