"use client"

import { Delete, Plus } from "@/components/elements/icons/Icons";
import { useEffect, useRef, useState } from "react";
import ModalContainer from "@/components/utils/ModalContainer";
import AddActionModal from "@/components/elements/Modal/AddActionModal";
import { AddActions } from "@/components/elements/Modal/types";
// import { AxiosResponse } from "axios";
import { ActionProps } from "./type";
import { actionDeleteHndler, actionNameFormHandler } from "./handler";
import styles from "./styles/Action.module.scss";

export default function Actions({ userEmail, reachName, skillName, actions }: ActionProps) {

  const [actionList, setActionList] = useState(actions);
  const [modalActions, setModalActions] = useState<AddActions[]>(actionList);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    setModalActions(actionList);
    console.log(actionList);
  }, [actionList]);

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
    <div className={styles.container} id="actions">
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
          const actionId = actionData.id;
          const actionName = actionData.name;
          return (
            <div key={actionId} className={styles.actions_container}>

              <form
                className={styles.checkbox}
                onSubmit={() => { }}
              >
                <input type="checkbox" />
              </form>

              <form
                ref={(el) => { actionNameForms.current[index] = el }}
                onSubmit={async (e) => {
                  await actionNameFormHandler({ e, index, actionName, actionId, reachName, skillName, setActionList, setError });
                }}
                className={styles.action_name}
              >
                <input
                  type="text"
                  placeholder="アクションを入力"
                  name={actionName}
                  defaultValue={actionName}
                  onBlur={() => { actionNameBlurHandler(index) }}
                />
                <Delete deleteHandler={() => { actionDeleteHndler({ reachName, skillName, actionName, actionId, setActionList, actionList }) }} />
              </form>

              {/* <JournalButton /> */}
            </div>
          )
        })
      }
      <div className={styles.icon_container}>
        <Plus pulsHandler={() => { setModal((prev) => !prev) }} />
      </div>

      {
        modal
          ?
          <ModalContainer targetName="actions">
            <AddActionModal
              userEmail={userEmail}
              reachName={reachName}
              skillName={skillName}
              actionList={actionList}
              setActionList={setActionList}
              setModal={setModal}
              modalActions={modalActions}
              setModalActions={setModalActions}
            />
          </ModalContainer>
          :
          ''
      }

    </div>
  )
}