"use client"

import { Dispatch, SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";

import styles from "./styles/JournalInput.module.scss"

interface JournalInputModalProps {
  id: number | undefined,
  reachName: string | undefined,
  skillId: number | undefined,
  skillName: string | undefined,
  actionNames: string[] | undefined,
  setIsJournalModal: Dispatch<SetStateAction<boolean>>,
}

export default function JournalInputModal({
  id,
  reachName,
  skillId,
  skillName,
  actionNames,
  setIsJournalModal
}: JournalInputModalProps) {

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      actionNames: [{ select: actionNames ? actionNames[0] : '' }],
      description: ''
    }
  }
  );
  const { fields, append, remove } = useFieldArray({
    name: "actionNames",
    control
  })

  const handleJournalSubmit = handleSubmit(async (data) => {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/journal`;
    const journalPayload = {
      reach_id: id,
      skill_id:skillId,
      data,
    }
    const res = await axios.post(URL, journalPayload);
    const resData = await res.data;
    console.log(resData);
    // setIsJournalModal(prev => !prev)
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={handleJournalSubmit}
        >
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
          <label
            htmlFor="journal_action"
            className={styles.inputLabel}
          >
            ACTION
            {
              fields.map((field, index) =>
                <select
                  key={field.id}
                  className={styles.action_select}
                  {...register(`actionNames.${index}.select`, {
                    required: {
                      value: true,
                      message: "入力必須項目"
                    }
                  })}
                >
                  {
                    actionNames &&
                    actionNames.map((actionName) =>
                      <option
                        key={actionName}
                        value={actionName}
                      >
                        {actionName}
                      </option>
                    )
                  }
                </select>
              )
            }
            {
              fields.length > 1
              &&
              <button
                className={styles.removeAction_button}
                type="button"
                onClick={() => remove(fields.length - 1)}
              >
                削除
              </button>
            }
          </label>
          {
            actionNames && fields.length < actionNames.length &&
            <button
              type="button"
              className={styles.appendAction_button}
              onClick={() => { append({ select: '' }) }}
            >
              追加
            </button>
          }

          <label htmlFor="journal_memo" className={styles.inputLabel}>
            MEMO
            <textarea
              className={styles.memo_textarea}
              {...register("description", {
                required: {
                  value: true,
                  message: "入力必須項目です。"
                },
                minLength: {
                  value: 5,
                  message: "文字数5文字以上を入力してください。"
                },
                maxLength: {
                  value: 500,
                  message: "文字数500文字以下で入力してください。"
                }
              })}
              cols={30} rows={10} />
            {
              errors.description?.message
              &&
              typeof errors.description.message === 'string'
              &&
              <span>{errors.description.message}</span>
            }
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
              type="submit"
            >
              SAVE
            </button>
          </div>
        </form>
      </div >
    </div >
  )
}