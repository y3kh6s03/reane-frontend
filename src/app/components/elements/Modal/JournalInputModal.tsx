import { Dispatch, SetStateAction } from "react"
import styles from "./styles/JournalInput.module.scss"

interface JournalInputModalProps {
  reachName: string | undefined,
  skillName: string | undefined,
  actionNames: string[] | null,
  setIsJournalModal: Dispatch<SetStateAction<boolean>>,

}

export default function JournalInputModal({ reachName, skillName, actionNames, setIsJournalModal }: JournalInputModalProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form action={() => { }} className={styles.form}>
          <span className={styles.reachName}>
            <span className={styles.reachName_title}>
              REACH
            </span>
            {reachName}
          </span>
          <span className={styles.skillName}>
            <span className={styles.reachName_title}>
              SKILL
            </span>
            {skillName}
          </span>
          <label htmlFor="journal_action" className={styles.inputLabel}>
            ACTION
            <select name="action_name" className={styles.action_select}>
              {
                actionNames &&
                actionNames.map(actionName =>
                  <option key={actionName} value="action">
                    {actionName}
                  </option>
                )
              }
            </select>
          </label>
          <label htmlFor="journal_memo" className={styles.inputLabel}>
            MEMO
            <textarea className={styles.memo_textarea} name="memo" cols={30} rows={10} />
          </label>
          <div className={styles.button_container}>
            <button
              className={styles.cancel_button}
              type="button"
              onClick={() => { setIsJournalModal((prev: boolean) => !prev) }}>
              CANCEL
            </button>
            <button
              className={styles.save_button}
              type="button"
              onClick={() => { setIsJournalModal((prev: boolean) => !prev) }}>
              SAVE
            </button>
          </div>
        </form>
      </div >
    </div >
  )
}