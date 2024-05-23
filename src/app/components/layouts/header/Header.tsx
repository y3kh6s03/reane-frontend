import Link from "next/link";
import Logo from "../../elements/logo/Logo";
import Logout from "../../elements/logout/Logout";
import styles from "./header.module.scss"

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href='/myChart'>
        <Logo size="sm" />
      </Link>
      <div className={styles.logout_container}>
        <Logout />
      </div>
    </div>
  )
}