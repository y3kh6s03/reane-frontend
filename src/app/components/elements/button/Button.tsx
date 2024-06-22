import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import styles from "./Button.module.scss"

type ButtonName = {
  buttonName: 'like' | 'favorite' | 'create' | 'delete';
}

export type ModalToggleProps = {
  modalToggleProps: {
    setIsRegisterSkillModal: Dispatch<SetStateAction<boolean>>,
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
    <Link className={styles.journal_link} href={`${process.env.NEXT_PUBLIC_BASE_URL}/journal/${journal}`}>
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
    modalToggleProps.setIsRegisterSkillModal((prev: boolean) => !prev);
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

export function BackButton({ back }: AppRouterInstance) {
  return (
    <button
      className={styles.back}
      type="submit"
      onClick={() => { back() }}
    >
      <Image src='/arrow.svg' fill alt="arrow" />
      Back
    </button>
  )
}

export function HowToButton({ setIsHowToModal }: { setIsHowToModal: Dispatch<SetStateAction<boolean>> }) {
  return (
    <button
      type="submit"
      className={styles.howTo_link}
      onClick={() => setIsHowToModal(prev => !prev)}
    >
      How to use
    </button>
  )
}

// 編集ページにリンクするボタンをここで作成してコンポーネントかしていこう
// Reachからコードを取得してくる