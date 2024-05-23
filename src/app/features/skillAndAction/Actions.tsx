"use client"

// import { useState } from "react";
// import Button, { JournalButton } from "@/app/components/elements/button/Button";
import Button from "@/app/components/elements/button/Button";
import { ActionData } from "@/store/slice/AuthChartsSlice";
import styles from "./styles/Action.module.scss";

type ActionProps = ActionData

export default function Actions(actions: ActionProps) {
  console.log(actions)
  const actionCount = Object.keys(actions).length
  let executedCount = 0;
  Object.values(actions).forEach((val) => {
    if (val === 1) {
      executedCount += 1
    }
  })
  const rate = Math.floor(executedCount / actionCount * 100)

  const dammyFunction = async () => {
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
        Object.values(actions).map((actionData) => {
          const actionName = actionData.name
          return (
            <div key={actionData.id} className={styles.actions_container}>
              <form className={styles.checkbox} onChange={dammyFunction}>
                <input type="checkbox" />
              </form>
              <form className={styles.action_name} onBlur={dammyFunction}>
                <input
                  type="text"
                  placeholder="アクションを入力"
                  value={actionName}
                  // onChange={(e) => setinputActionName(e.target.value)}
                  onChange={() => { }}
                />
              </form>
              <Button buttonName="delete" />
              {/* <JournalButton /> */}
            </div>
          )
        })
      }

    </div>
  )
}