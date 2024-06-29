import AuthDetail, { UserData } from "../authDetail/AuthDetail";

import styles from "./PageTitle.module.scss";

interface PageTitleProps {
  title: string,
  userData?: UserData
}

export default function PageTitle({ title, userData }: PageTitleProps) {
  return (
    <div className={styles.page_title_container}>
      <h1 className={styles.page_title}>
        {title}
      </h1>
      {
        userData
        &&
        <AuthDetail {...userData} />
      }
    </div>
  )
}
