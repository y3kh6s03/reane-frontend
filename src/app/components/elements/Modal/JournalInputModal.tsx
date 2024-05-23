import { Dispatch, SetStateAction } from "react"
import styles from "./styles/JournalInput.module.scss"

interface SetIsJournalModalProps {
  setIsJournalModal: Dispatch<SetStateAction<boolean>>
}

export default function JournalInputModal({ setIsJournalModal }: SetIsJournalModalProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form action={() => { }} className={styles.form}>
          <label htmlFor="journal_action" className={styles.inputLabel}>
            ACTION
            <select name="action_name" className={styles.action_select}>
              <option value="action">action1</option>
              <option value="action2">action2</option>
              <option value="action3">action3</option>
              <option value="action4">action4</option>
              <option value="action5">action5</option>
            </select>
          </label>
          <label htmlFor="journal_time" className={styles.inputLabel}>
            TIME
            <input className={styles.time_input} type="time" id="journal_time" />
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