"use client"


import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { JournalButton } from "@/../app/components/elements/button/Button";
import axios from "axios";
import { Delete } from "@/components/elements/icons/Icons";
import styles from "./styles/SkillName.module.scss";
import { deleteHandler } from "./handler";

interface SkillNameProps {
  skillName: string,
  reachName: string,
  userEmail: string,
}

interface EditSkillNameData {
  userEmail: string,
  reachName: string,
  currentSkillName: string,
  editSkillName: FormDataEntryValue,
}

export default function SkillName({ skillName, reachName, userEmail }: SkillNameProps) {

  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter();

  const formTestHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const editSkillName = form.get('skillName') ?? '';
    const currentSkillName = skillName;
    if (editSkillName !== currentSkillName) {
      const editSkillNameData: EditSkillNameData = { reachName, editSkillName, currentSkillName, userEmail };
      const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/${editSkillName}`; await axios.post(URL, editSkillNameData)
    }
  }

  const inputHandler = () => {
    if (formRef.current) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  }

  return (
    <div className={styles.container}>
      <form
        ref={formRef}
        onSubmit={(e) => { formTestHandler(e) }}
        className={styles.title_container}>
        <h2 className={styles.skill_title}>
          SKILL
          <Delete deleteHandler={() => { deleteHandler({ skillName, reachName, userEmail, router }) }} />
        </h2>
        <input
          type="text"
          className={styles.skill_title_name}
          defaultValue={skillName}
          name="skillName"
          onBlur={() => {
            inputHandler()
          }}
        />
      </form>
      <JournalButton journal="" />
    </div>
  )
}