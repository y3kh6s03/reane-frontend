"use client"

import { Delete } from "@/components/elements/icons/Icons";
import { useRef, useState } from "react";
import styles from "./styles/Action.module.scss";
import { ActionProps } from "./type";
import { actionDeleteHndler, actionNameSubmitHandler } from "./handler";

export default function Actions({ reachName, skillName, actions }: ActionProps) {

  const [actionList, setActionList] = useState(actions);
  const [error, setError] = useState<string | null>(null);

  const actionCount = Object.keys(actions).length
  let executedCount = 0;
  Object.values(actions).forEach((val) => {
    if (val.isCompleted === 1) {
      executedCount += 1
    }
  })
  const rate = Math.floor(executedCount / actionCount * 100)

  const actionNameForms = useRef<(HTMLFormElement | null)[]>([]);

  const actionNameBlurHandler = async (index: number) => {
    const actionNameFormEvnet = new Event('submit', { cancelable: true, bubbles: true });
    actionNameForms.current[index]?.dispatchEvent(actionNameFormEvnet);
  }

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
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
        actionList.map((actionData, index) => {
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
                onSubmit={(e) => { actionNameSubmitHandler(e, actionName, actionId, reachName, skillName, setError) }}
                className={styles.action_name}
              >
                <input
                  type="text"
                  placeholder="アクションを入力"
                  name={actionName}
                  defaultValue={actionName}
                  onBlur={() => { actionNameBlurHandler(index) }}
                />
                <Delete deleteHandler={() => { actionDeleteHndler({ reachName, skillName, actionName, actionId }, setActionList, actionList) }} />
              </form>

              {/* <JournalButton /> */}
            </div>
          )
        })
      }
    </div>
  )
}