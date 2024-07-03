import Image from "next/image";
import Link from "next/link";

import { SkillData } from "@/../store/slice/AuthChartsSlice";
import { calcElapsedDays } from "@/components/utils/chartUtils";

import styles from "./styles/UserCard.module.scss";

interface UserCardProps {
  id: number,
  userImage: string,
  userName: string,
  createdAt: string,
  reachName: string,
  skills: SkillData
}

export default function UserCard({
  id,
  userImage,
  userName,
  createdAt,
  reachName,
  skills
}: UserCardProps) {
  const chartId = id;
  const elapsedDays = calcElapsedDays(createdAt);
  return (
    <div className={styles.card_wrapper}>
      <Link href={`/show/${chartId}`} className={styles.card}>
        <div className={styles.user}>
          <div className={styles.user_icon_container}>
            <Image src={userImage} fill sizes="100%" alt="icon" />
          </div>
          <div className={styles.detail_container}>
            <span className={styles.user_name}>
              {userName}
            </span>
            <span className={styles.postage}>
              Days: {elapsedDays}
            </span>
          </div>
        </div>
        <div className={styles.chartdetail}>
          <span className={styles.chart_name}>
            REACH: {reachName}
          </span>
          <div className={styles.chart_description}>
            Action
            {
              Object.entries(skills).map((skill) =>
                <div
                  key={skill[1].id}
                  className={styles.action_inner}
                >
                  {
                    skill[1].actions.map((action) =>
                      <span
                        key={action.id}
                      >{action.name},</span>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </Link>
      {/* <div className={styles.icons_container}>
        <Button buttonName="like" />
        <Button buttonName="favorite" />
        <Watch watchCount={100} />
      </div> */}
    </div>
  )
}