import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import styles from "./Button.module.scss"

type ButtonName = {
  buttonName: 'like' | 'favorite' | 'create' | 'delete';
}

export type ModalToggleProps = {
  setIsModal: Dispatch<SetStateAction<boolean>>,
  toggleName: string,
};

interface JournalProps {
  reachName: string,
  skillName: string,
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

export function JournalButton({ reachName, skillName }: JournalProps) {
  return (
    <Link
      className={styles.journal_link}
      href={`${process.env.NEXT_PUBLIC_BASE_URL}/journal/${reachName}/${skillName}`}
    >
      <div className={styles.inner}>
        <span>
          Journal
        </span>
        <div className={styles.image_inner}>
          <Image src='/arrow.svg' fill sizes="100%" alt="arrow" />
        </div>
      </div>
    </Link>
  )
}

export function ModalToggleButton({ setIsModal, toggleName }: ModalToggleProps) {
  const toggleModal = () => {
    setIsModal((prev: boolean) => !prev);
  }
  return (
    <div className={styles.modalToggle}>
      <button type="button" onClick={() => { toggleModal() }}>
        +
      </button>
      <span>{toggleName}追加</span>
    </div>
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
      <div className={styles.inner}>
        <div className={styles.image_inner}>
          <Image src='/arrow.svg' fill alt="arrow" />
        </div>
        <span className={styles.backName}>
          Back
        </span>
      </div>
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