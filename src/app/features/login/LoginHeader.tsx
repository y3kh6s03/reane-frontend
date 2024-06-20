import Logo from "@/components/elements/logo/Logo";
import Link from "next/link";
import styles from "./styles/Header.module.scss"

export default function LoginHeader() {
  return (
    <div className={styles.login_header}>
      <div className={styles.header_icon}>
        <Logo size="lg" />
      </div>
      <Link className={styles.howTo_link} href='/howToUse'>
        How to use
      </Link>
    </div>
  )
}