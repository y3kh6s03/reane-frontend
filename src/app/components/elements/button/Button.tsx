import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react";
import styles from "./Button.module.scss"

type ButtonName = {
  buttonName: 'like' | 'favorite' | 'create' | 'delete';
}

export type ModalToggleProps = {
  modalToggleProps: {
    setIsModal: Dispatch<SetStateAction<boolean>>,
    toggleName: string,
  }
};

interface JournalProps {
  journal: string
}

interface CreateAndCancelProps {
  createAndCancelProps: {
    buttonName: 'CANCEL' | 'CREATE' | 'DELETE' | 'SAVE',
    handler: () => void
  }
}

export default function Button({ buttonName }: ButtonName) {
  return (
    <button className={styles.button} type="button">
      <div className={styles.icon_container}>
        <Image src={`/${buttonName}.svg`} fill sizes="100%" alt={`${buttonName}`} />
      </div>
    </button>
  )
}

export function JournalButton({ journal }: JournalProps) {
  return (
    <Link className={styles.journal_link} href={`http://localhost:3000/journal/${journal}`}>
      <div className={styles.title_container}>
        <span>
          振り返り
        </span>
      </div>
      <div className={styles.journal_link_inner}>
        <Image src='/arrow.svg' fill sizes="100%" alt="arrow" />
      </div>
    </Link>
  )
}

export function ModalToggleButton({ modalToggleProps }: ModalToggleProps) {
  const toggleModal = () => {
    modalToggleProps.setIsModal((prev: boolean) => !prev);
  }
  return (
    <button className={styles.addSkill} type="button" onClick={() => { toggleModal() }}>
      +
      <span>{modalToggleProps.toggleName}追加</span>
    </button>
  )
}

export function CreateAndCancelButton({ createAndCancelProps }: CreateAndCancelProps) {
  return (
    <button
      className={`${styles.createAndCancel_button} ${createAndCancelProps.buttonName}`}
      type="button"
      onClick={createAndCancelProps.handler}>
      {createAndCancelProps.buttonName}
    </button>
  )
}

// 編集ページにリンクするボタンをここで作成してコンポーネントかしていこう
// Reachからコードを取得してくる