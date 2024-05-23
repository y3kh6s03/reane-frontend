import Image from "next/image";
import Link from "next/link";

import Button from "@/app/components/elements/button/Button";
import { Watch } from "@/app/components/elements/icons/Icons";
import styles from "./styles/UserCard.module.scss";

export default function UserCard() {
  const chartId = 1;
  return (
    <div className={styles.card_wrapper}>
      <Link href={`/show/${chartId}`} className={styles.card}>
        <div className={styles.user}>
          <div className={styles.user_icon_container}>
            <Image src="/defaultIcon.png" fill sizes="100%" alt="icon" />
          </div>
          <div className={styles.detail_container}>
            <span className={styles.user_name}>
              Mayuko Takahashi
            </span>
            <span className={styles.postage}>
              Days: 382
            </span>
          </div>
        </div>
        <div className={styles.chartdetail}>
          <span className={styles.chart_name}>
            REACH: ベンチプレス300
          </span>
          <p className={styles.chart_description}>
            {/* データ取得処理後は、skillsを列挙していく形式に変更 */}
            体力とフォームの向上を重点的に取り組むため、休息日にストレッチ
          </p>
        </div>
      </Link>
      <div className={styles.icons_container}>
        <Button buttonName="like" />
        <Button buttonName="favorite" />
        {/* データ取得後、値の更新 */}
        <Watch watchCount={100} />
      </div>
    </div>
  )
}