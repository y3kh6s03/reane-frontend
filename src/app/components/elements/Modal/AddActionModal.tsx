"use client"

import { useState } from "react";
import { CreateAndCancelButton } from "../button/Button";
import { Delete } from "../icons/Icons";
import styles from "./styles/AddAction.module.scss";
import { addActionHandler, addActionNameDeleteHander, addActionSubmitHandler, formSubmitHandler } from "./handlers/AddActionHandler";
import { ModalActionProps } from "./types";

export default function AddActionModal({ userEmail, setModal, reachName, skillName, actionList, setActionList,modalActions,setModalActions  }: ModalActionProps) {

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>
          ACTION追加
        </h3>
        <form
          className={styles.form}
          onSubmit={(e) => formSubmitHandler({ e, setModalActions, setErrorMsg })}
        >
          <input
            className={styles.form_input}
            type="text"
            name="addActionName"
            placeholder="ACTIONを追加してください"
            defaultValue=''
          />
          {errorMsg && (
            <div className={styles.error_msg}>{errorMsg}</div>
          )}
        </form>

        <ul className={styles.addActions_container}>

          {
            modalActions.map(({ name, id }, index) => {
              const actionName = name
              const keyId = index
              return (
                <li key={keyId} className={styles.addActions_item}>
                  <input
                    type="text"
                    value={actionName}
                    onChange={(e) => {
                      addActionHandler({ e, index, setModalActions })
                    }}
                  />
                  <div className={styles.deleteIcon_container}>
                    <Delete deleteHandler={() => { addActionNameDeleteHander({ index, id, userEmail, reachName, skillName, actionName, setModalActions, setErrorMsg, setActionList }) }} />
                  </div>
                </li>
              )

            })
          }

        </ul>
        <div className={styles.button_container}>
          <CreateAndCancelButton createAndCancelProps={{ buttonName: 'CANCEL', handler: () => { setModal((prev) => !prev) } }} />
          <CreateAndCancelButton createAndCancelProps={{ buttonName: 'SAVE', handler: () => { addActionSubmitHandler({ modalActions, setModal, userEmail, reachName, skillName, actionList, setActionList, setErrorMsg }) } }} />
        </div>
      </div>
    </div >
  )
}