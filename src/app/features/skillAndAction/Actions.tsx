"use client"

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { Delete, Plus } from "@/components/elements/icons/Icons";
import ModalContainer from "@/components/utils/ModalContainer";
import AddActionModal from "@/components/elements/Modal/AddActionModal";
import { handleActionDelete, handleActionNameSubmit, handleToggleActionCompletion } from "./handers/handler";
import { ActionProps } from "./type";

import styles from "./styles/Action.module.scss";
import { Action } from "../../../store/slice/AuthChartsSlice";

export default function Actions({ userEmail, reachName, skillName, actions }: ActionProps) {

  const [actionList, setActionList] = useState(actions);
  const [modalActions, setModalActions] = useState<Action[]>(actionList);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [executedCount, setExecutedCount] = useState(0);
  const [rate, setRate] = useState(0);

  const { data } = useSession();
  const authEmail = data?.user?.email

  useEffect(() => {
    setModalActions(actionList);
  }, [actionList]);

  useEffect(() => {
    const count = actionList.reduce((acc, action) => acc + (action.is_completed === 1 ? 1 : 0), 0);
    setExecutedCount(count);
    setRate(Math.floor((count / actionList.length) * 100));
  }, [actionList]);

  const actionNameForms = useRef<(HTMLFormElement | null)[]>([]);

  const handleActionNameBlur = async (index: number) => {
    const actionNameFormEvent = new Event('submit', { cancelable: true, bubbles: true });
    actionNameForms.current[index]?.dispatchEvent(actionNameFormEvent);
  }

  return (
    <div className={styles.container} id="actions">
      {errorMsg && <div className={styles.error}>{errorMsg}</div>}
      <h2 className={styles.action_title}>
        ACTION
      </h2>

      <div className={styles.skill_rate_container}>
        <span className={styles.skill_rate}>
          {rate}
          <span className={styles.skill_rate_parcent}>%</span>
        </span>
        <span className={styles.skill_count}>
          {executedCount} / {actionList.length}
        </span>
      </div>

      {
        userEmail === authEmail
          ?
          <>
            {
              actionList.map((actionData, index) => {
                const actionId = actionData.id;
                const actionName = actionData.name;
                return (
                  <div key={actionId} className={styles.actions_container}>

                    <form className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={actionData.is_completed === 1}
                        onChange={() => {
                          handleToggleActionCompletion({ actionId, index, actionList, setActionList, setErrorMsg });
                        }}
                      />
                    </form>

                    <form
                      ref={(el) => { actionNameForms.current[index] = el }}
                      onSubmit={(e) => {
                        handleActionNameSubmit({ e, index, actionName, actionId, reachName, skillName, setActionList, setErrorMsg });
                      }}
                      className={styles.action_item}
                    >
                      <input
                        className={styles.action_name}
                        type="text"
                        placeholder="アクションを入力"
                        name={actionName}
                        defaultValue={actionName}
                        onBlur={() => { handleActionNameBlur(index) }}
                      />
                    </form>
                    <Delete deleteHandler={() => { handleActionDelete({ reachName, skillName, actionName, actionId, setActionList, actionList }) }} />
                  </div>
                );
              })
            }
            <div className={styles.icon_container}>
              <Plus pulsHandler={() => { setIsModal((prev) => !prev) }} />
            </div>
          </>
          :
          <>
            {
              actionList.map((actionData, index) => {
                const actionId = actionData.id;
                const actionName = actionData.name;
                return (
                  <div key={actionId} className={styles.actions_container}>

                    <div className={styles.checkbox}>
                      <span>{index + 1}</span>
                    </div>

                    <div className={styles.action_item}
                    >
                      <span className={styles.action_name}>
                        {actionName}
                      </span>

                    </div>
                  </div>
                );
              })
            }
          </>
      }

      {
        isModal
        &&
        (
          <ModalContainer targetName="actions">
            <AddActionModal
              userEmail={userEmail}
              reachName={reachName}
              skillName={skillName}
              actionList={actionList}
              setActionList={setActionList}
              setIsModal={setIsModal}
              modalActions={modalActions}
              setModalActions={setModalActions}
            />
          </ModalContainer>
        )
      }
    </div >
  );
}
