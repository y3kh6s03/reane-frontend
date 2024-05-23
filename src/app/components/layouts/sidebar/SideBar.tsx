// "use client"

// import { useAppSelector } from "@/store/hooks"
// import AuthDetail from "../../elements/authDetail/AuthDetail"
import styles from "./sidebar.module.scss"

export default function SideBar() {
  // const { chartData } = useAppSelector((state) => state.chart)
  // const userData={
  //   userName: chartData.authName,
  //   userImage: chartData.authImage
  // }
  return (
    <div className={styles.container}>
      {/* <AuthDetail userData={userData}/> */}
    </div>
    // ここには振り返りの一覧が表示されるようにしていくサイドバーのコンポーネントは呼び出す時にサイドバーというテキストを受け取った場合にサイドバーに表示するようのクラスが付与されてサイドバーに表示されるようになっていくよね
    // だから最初はシンプルに振り返りの一覧を表示するように作成すればOK
  )
}