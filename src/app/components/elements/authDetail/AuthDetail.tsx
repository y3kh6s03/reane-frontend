import Image from "next/image";
import styles from "./AuthDetail.module.scss"

export interface UserData {
  userName: string | undefined,
  userImage: string | undefined,
  days: number
}

export default function AuthDetail({ userName, userImage, days }: UserData) {
  // DB取得データに変更
  return (
    <div className={styles.auth}>
      <div className={styles.auth_icon_container}>
        <Image src={userImage ?? ''} fill sizes="100%" alt="icon" />
      </div>
      <div className={styles.auth_details}>
        <span className={styles.auth_details_name}>
          {userName}
        </span>
        <span className={styles.auth_details_days}>
          Days: {days}
        </span>
      </div>
    </div>
  )
}