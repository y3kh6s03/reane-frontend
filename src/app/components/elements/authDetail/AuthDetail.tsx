import Image from "next/image";
import styles from "./AuthDetail.module.scss"

interface UserData {
  userData: {
    userName: string | undefined,
    userImage: string | undefined,
  }
}

export default function AuthDetail({ userData }: UserData) {
  // DB取得データに変更
  const days = 224;
  return (
    <div className={styles.auth}>
      <div className={styles.auth_icon_container}>
        <Image src={userData?.userImage ?? ''} fill sizes="100%" alt="icon" />
      </div>
      <div className={styles.auth_details}>
        <span className={styles.auth_details_name}>
          {userData?.userName}
        </span>
        <span className={styles.auth_details_days}>
          Days: {days}
        </span>
      </div>
    </div>
  )
}