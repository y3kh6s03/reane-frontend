/* eslint-disable import/prefer-default-export */
import Image from "next/image";
import styles from "./Icons.module.scss";

type WatchCount = {
  watchCount: number
}

export function Watch({ watchCount }: WatchCount) {
  return (
    <div className={styles.watch}>
      <div className={styles.icon_container}>
        <Image src='/eye.svg' fill sizes="100%" alt='icon' />
      </div>
      <span className={styles.watch_count}>{watchCount}</span>
    </div>
  )
}