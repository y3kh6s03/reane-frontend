/* eslint-disable import/prefer-default-export */
import Image from "next/image";
import styles from "./Icons.module.scss";

type WatchCount = {
  watchCount: number
}

export function Watch({ watchCount }: WatchCount) {
  return (
    <div className={styles.watch_container}>
      <div className={styles.watch_inner}>
        <Image src='/eye.svg' fill sizes="100%" alt='icon' />
      </div>
      <span className={styles.watch_count}>{watchCount}</span>
    </div>
  )
}

export function Delete({ deleteHandler }: { deleteHandler: () => void }) {
  return (
    <button type='button' onClick={deleteHandler} className={styles.delete_container}>
      <Image src='./delete.svg' fill sizes='100%' alt='delete' />
    </button>
  )
}