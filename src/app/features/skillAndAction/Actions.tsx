"use client"

// import { useState } from "react";
// import Button, { JournalButton } from "@/../app/components/elements/button/Button";

import { Delete } from "@/components/elements/icons/Icons";
// import { ActionData } from "@/../store/slice/AuthChartsSlice";
import axios from "axios";
import { FormEvent, useRef } from "react";
import styles from "./styles/Action.module.scss";

interface ActionProps {
  reachName: string,
  skillName: string,
  actions: {
    id: number,
    name: string,
    isCompleted: number
  }[]
}

export default function Actions({ reachName, skillName, actions }: ActionProps) {
  const actionCount = Object.keys(actions).length
  let executedCount = 0;
  Object.values(actions).forEach((val) => {
    if (val.isCompleted === 1) {
      executedCount += 1
    }
  })
  const rate = Math.floor(executedCount / actionCount * 100)

  const actionNameForms = useRef<(HTMLFormElement | null)[]>([]);

  const actionNameSubmitHandler = async (e: FormEvent<HTMLFormElement>, actionName: string, actionId: number) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const editActionName = form.get(actionName);
    if (actionName !== editActionName) {
      const encordActionId = encodeURIComponent(actionId);
      const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/actionName/${encordActionId}`;
      const editActionNameData = {
        reachName,
        skillName,
        actionId,
        actionName,
        editActionName
      }
      await axios.post(URL, editActionNameData);
    }
  }

  const actionNameBlurHandler = async (index: number) => {
    const actionNameFormEvnet = new Event('submit', { cancelable: true, bubbles: true });
    actionNameForms.current[index]?.dispatchEvent(actionNameFormEvnet);
  }

  return (
    <div className={styles.container}>

      <h2 className={styles.action_title}>
        ACTION
      </h2>

      <div className={styles.skill_rate_container}>
        <span className={styles.skill_rate}>
          {/* 取得データに変更 */}
          {rate}
          <span className={styles.skill_rate_parcent}>%</span>
        </span>
        <span className={styles.skill_count}>
          {executedCount} / {actionCount}
        </span>
      </div>

      {
        Object.values(actions).map((actionData, index) => {
          const actionName = actionData.name;
          const actionId = actionData.id;
          return (
            <div key={actionData.id} className={styles.actions_container}>

              <form
                className={styles.checkbox}
                onSubmit={() => { }}
              >
                <input type="checkbox" />
              </form>

              <form
                ref={(el) => { actionNameForms.current[index] = el }}
                onSubmit={(e) => { actionNameSubmitHandler(e, actionName, actionId) }}
                className={styles.action_name}
              >
                <input
                  type="text"
                  placeholder="アクションを入力"
                  name={actionName}
                  defaultValue={actionName}
                  onBlur={() => { actionNameBlurHandler(index) }}
                />
                <Delete deleteHandler={() => { }} />
              </form>

              {/* <JournalButton /> */}
            </div>
          )
        })
      }
    </div>
  )
}